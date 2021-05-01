
# 11. gyakorlat - RxJS

## Bevezető

Jelen gyakorlati anyag az Angular űrlapok (Form-ok) és azok egy domain modellhez kötését hivatott bemutatni.

## Projekt futtatása

1. Repository klónozása (pl.: ```$ git clone https://github.com/jankiz/Web-development-frameworks.git```)
2. Navigálás a mappába: ```$ cd web-development-frameworks/11\ -\ RxJS/```
3. Függőségek telepítése: ```$ npm install```
4. Projekt futtatása: ```$ ng serve```

## Videó

[LINK](https://youtu.be/3wnQfFTvnTc)

## RxJS - Reaktív programozás

Az [RxJS](https://rxjs-dev.firebaseapp.com/) egy könyvtár (csomag), amely az aszinkron és esemény-alapú programozást valósítja meg adatfolyam (Observable) sorozatok formájában. Ezt nevezzük reaktív programozásnak is. Egyetlen fő típusra épít, mely az Observable, altípusok az Observer, Scheduler és a Subject, valamint ezen túl léteznek ún. operátorok, amelyek segítik az események és az aszinkronitás kezelését.

**RxJS alap fogalmak:**

- *Observable:* ez testesíti meg a jövőbeli események és értékek meghívhatóságát.
- *Observer:* callback, amely tudja, hogy hogyan figyeljen egy esemény bekövetkeztét.
- *Subscription:* ez jelenti egy Observable meghívásának a bekövetkeztét. Alapvető funkciója a futtatás leállítása.
- *Operators:* olyan egyszerű függvények, amelyek a funkcionális programozás eszközeivel lehetővé teszik az adatfolyamok kezelését.
- *Subject:* ez tulajdonképpen az eseménykibocsátó (EventEmitter).
- *Schedulers:* centralizált objektumok, amelyek a konkurens eseményeket kezelnek, és lehetővé teszik, hogy kontrolláljuk az esemény meghívásának időpontját (pl.: ```setTimeout()```).

## Aszinkron műveletek

A NodeJS futtatókörnyezet egyik alapelve a Non-Blocking I/O technika alkalmazása, amellyel a számításigényes vagy időigényes feladatokat aszinkron módon futtatjuk (mintha a háttérben futna), és nem blokkoljuk a felhasználói felületet (UI-t) annak érdekében, hogy a felhasználói élményt fenn tudjuk tartani. Tehát egy időigényes művelet futásáig nem blokkoljuk az alkalmazást, továbbra is elérhető és kattintható valamennyi UI elem.

A JavaScript/TypeScript világban ezeket az aszinkron műveleteket 3-féleképp kezelhetjük:

- Callback
- Promise
- Observable

Ebben a gyakorlati anyagban az Observable-re koncentrálunk.

### Observable

Az Observable egy másik technika az aszinkron műveletek kezelésére és az objektumok továbbítására. Az Observable típus az ```rxjs``` modulban van definiálva. Ezt az Angular projekt generálásakor a CLI alapból hozzáadja a projekthez, mint függőséget, tehát külön telepítenünk nem szükséges. Az ```rxjs``` modul az ún. reaktív programozást valósítja meg, amely számos más keretrendszer alatt is értelmezett, és a könyvtár telepíthető.

Az Observable-ök kicsit bonyolultabb objektumok, mindazonáltal az ```rxjs```-en keresztül számos olyan metódus és további objektum elérhető, amellyel akár több Observable-t is tudunk egyszerre kezelni, több aszinkron folyamatot összevárni, és egyként kezelni, vagy egyéb feltételek mentén az elrejtett adatot manipulálni. Az alábbi példa bemutatja egy Observable létrehozásának folyamatát az egyszerűbb megértés végett.

```typescript
import { Observable, Subscriber } from 'rxjs';

observableReturningFunction(): Observable<string> {
  return new Observable((subscriber: Subscriber<string>) => {
    if (true) {
      subscriber.next('successful');
    } else {
      subscriber.error('error');
    }
    subscriber.complete();
  });
}
```

Az Observable típus tehát importálandó az ```rxjs``` modulból. Az Observable paramétere egy ```Subscriber``` típusú objektum, amely az adatokat vagy a hibákat az Observable-be teszi, továbbá értesít, ha nincs további küldendő adat. Ezeket az alábbi függvényekkel teszi meg:

-  ```next()```: új adat küldése
-  ```error()```: hiba küldése
-  ```complete()```: adatfolyam lezárása

Ahogy láthatjuk a példában, akár többször is meghívhatjuk a ```next()``` függvényt, tehát több részletben is tudunk adatot küldeni. Ez az Observable egyik sajátossága, hogy egy ún. adatfolyamot nyit, és részletekben küld adatot.

#### Observable kezelése TypeScript kódban

Tfh. az ```observableReturningFunction()``` egy service-ben implementált metódus. A service-ünk megszólításához használt komponens (vagy osztály) adattagunk neve legyen myService.

```typescript
myObservableHandlerFunction(): void {
  const subscription = this.myService.observableReturningFunction().subscribe((data: string) => {
    console.log(data);
  }, (error: any) => {
    console.log(error);
  });
}
```

A ```observableReturningFunction()``` visszatérési értéke ```string```-et tartalmazó Observable volt, azaz ```Observable<string>```. Az Observable által előállított adatfolyamra fel kell iratkoznunk, ezt a ```subscribe()``` függvénnyel tehetjük meg. A ```subscribe()``` egyetlen paramétere az adatrész, amit a ```next()``` függvényen keresztül szolgáltat vissza az Subscriber objektum. Az adatfolyam természetesen tartalmazhat hibát is, ezt egy error-t tartalmazó callback-kel kezelünk le. Az adatfolyam mindaddig él, amíg vagy hibát nem kapunk vagy a ```complete()``` függvény meghívása meg nem történik a Subscriber részéről. Természetesen, a ```subscribe()``` függvénynek is van visszatérési értéke, mégpedig egy ```Subscription``` típusú objektum (szintén az ```rxjs``` modulban van definiálva). Ezen keresztül menedzselhető az adatfolyamról történő feliratkozás állapota.

Az adatfolyamokról mindenképp érdemes leiratkozni, ha már nem várunk több adatot vagy a komponensünket megszüntetjük. Ezzel tudjuk garantálni azt, hogy memória szivárgás (memory leak) ne fordulhasson elő.

```typescript
subscription.unsubscribe();
```

Ez az Observable-ök hagyományos kezelési módja.

#### Observable kezelése HTML kódban (AsyncPipe)

Az Observable által nyitott adatfolyam nem csak a ```subscribe()``` függvénnyel kezelhető TypeScript kódban, hanem akár a HTML kódban is feliratkozhatunk az adatfolyamra egy Pipe segítségével. Ezt nevezzük AsyncPipe-nak. A HTML kódban az Observable-t magát adjuk meg, mint megjelenítendő objektumot, azonban ellátjuk egy pipe-pal, ami mögé az ```async``` kifejezést írjuk. Az alábbi példában a games egy ```Observable<Game[]>``` típusú objektum, amelynek a kibontását az AsyncPipe végzi el. Az AsyncPipe előnye a hagyományos módszerrel szemben, hogy a leiratkozás automatikusan megtörténik a komponens megszűnésekor.

> home.component.html

```html
<app-game-card *ngFor="let item of games | async" [game]="item"  appOnHover></app-game-card>
```

### RxJS függvények

Az RxJS alap függvényei közül más ismerjük a ```subscribe()```-ot és az ```unsubscribe()```-ot, amelyek az adatfolyamra történő feliratkozás és leiratkozást valósítják meg. Most néhány olyan függvényt vizsgálunk meg, amelyek az Observable létrehozást, manipulációt alapozzák meg.

#### of

Az Observable előállítása történhet a már bemutatott konstruktoron keresztül is, azonban tetszőleges adatsorból is előállíthatunk egy új Observable-t a ```of()``` függvény segítségével.

```typescript
import { Observable, of} from 'rxjs';

export class TestService {
  return5NumbersAsObservable(): Observable<any> {
    return of(1, 2, 3, 4, 5);
  }
}
```

#### from

Az Observable előállítása történhet a már bemutatott konstruktoron keresztül is, azonban tetszőleges tömbből is előállíthatunk egy új Observable-t a ```from()``` függvény segítségével.

```typescript
import { Observable, from } from 'rxjs';

export class TestService {
  return5NumbersAsObservable(): Observable<any> {
    return from([1, 2, 3, 4, 5]);
  }
}
```

Az iménti kód ```return5NumbersAsObservable()``` függvénye egy 5 elemű tömböt ad vissza Observable (adatfolyam) formájában.

#### pipe

Az Observable-ökön végezhető műveletek operátorok formájában kerültek implementálásra. Az operátorok mindegyike egy Observable operátorral (OperatorFunction) tér vissza, így logikus lehet akár többnek az összefűzése. Pont ezen gondolatmenet miatt kell az operátorok használata előtt a ```pipe()``` függvényt használni, amelyen keresztül az operátorok összefűzhetőek, és lefuttathatóak, majd a ```pipe()``` egy új Observable-lel tér vissza.

> FONTOS! A pipe egy alap Observable függvény (mint a ```subscribe()```, ```unsubscribe()```), amely n függvény összeűfésére alkalmas, így importálásra nincs szükség.

```typescript
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

export class TestService {
  return5NumbersAsObservable(): Observable<any> {
    return from([1, 2, 3, 4, 5]).pipe(map(value => return value > 2));
  }
}
```

> A ```map()``` függvényt ezután vizsgáljuk meg.

#### forkJoin

A forkJoin függvény egy új Observable-t hoz létre már meglévő különböző Observable-ökből. Ennek eredményeként az összes adatfolyam bevárja egymást, így az utolsóként eredményt szolgáltató határozza meg az összes adatfolyam megérkezését.

```typescript
import { Observable, from, forkJoin } from 'rxjs';

export class TestService {
  return10NumbersAsObservable(): Observable<any> {
    let obs1 = from([1, 2, 3, 4, 5]);
    let obs2 = from([6, 7, 8, 9, 10]);
    return forkJoin(obs1, obs2);
  }
}
```

#### throwError

A throwError alkalmas arra, hogy egy Observable-ben ne legyen semmilyen adat, viszont hibát produkáljunk az Observer felé.

```typescript
import { Observable, throwError } from 'rxjs';

export class TestService {
  throwErrorInObservable(): Observable<any> {
    return throwError('Sorry! Error');
  }
}
```

### RxJS operátorok

Az események aszinkron működése miatt nem determinisztikus azok bekövetkezése, tovább az adatfolyamok ezt a jelenséget tovább bonyolítják. Előfordulhatnak olyan szituációk, amikor az adatfolyamok megérkezésének sorrendje számít, vagy szeretnénk rögzített szűréseket végezni az adatokon, esetleg az adatfolyamok egyidejű felhasználására van szükségünk, tehát az eseményeknél szükséges, hogy kvázi egyszerre érkezzenek meg (bevárják egymást). Ezeket a célokat hivatottak ellátni az ún. RxJS operátorok, amelyekből néhányat megvizsgálunk. Az RxJS operátorokat a ```rxjs/operators``` modulból importáljuk.

#### filter

A filter ekvivalensen működik a JavaScript-es filter függvénnyel, azonban ez az Observable-ökön értelmezett verzió, amelyet külön importálni kell.

```typescript
import { Observable, from} from 'rxjs';
import { filter } from 'rxjs/operators';

export class TestService {
  return5NumbersAsObservable(): Observable<any> {
    return from([1, 2, 3, 4, 5]).pipe(filter(i => i > 1));
  }
}
```

#### map

```typescript
import { Observable, from} from 'rxjs';
import { map } from 'rxjs/operators';

export class TestService {
  return5NumbersAsObservable(): Observable<any> {
    return from([1, 2, 3, 4, 5]).pipe(filter(i => i > 1));
  }
}
```

#### map

A map gyakorlatilag egy ```for``` ciklusként működik, amely minden iterációban felveszi a tömb adott elemének értékét.

```typescript
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

export class TestService {
  return5NumbersAsObservable(): Observable<any> {
    return from([1, 2, 3, 4, 5]).pipe(map(value => return value > 2));
  }
}
```

A példánkban csak azokat az elemeket tartjuk meg az Observable-ben, amelyek 2-nél nagyobbak.

#### startWith

A startWith a teljes adatfolyam elé beszúr egy új **azonos típusú!!!** elemet.

```typescript
import { Observable, from } from 'rxjs';
import { startWith } from 'rxjs/operators';

export class TestService {
  returnFirstNNumbersAsObservable(): Observable<any> {
    return from([1, 2, 3, 4, 5]).pipe(startWith(0));
  }
}
```

#### catchError

Egy belső hibakezelési módszer az adatfolyamba, amely az adatokra vonatkozik, nem pedig magára az adatfolyam futásának helyességére.

```typescript
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class TestService {
  returnFirstNNumbersAsObservable(): Observable<any> {
    return from([1, 2, 3, 4, 5]).pipe(catchError(error => {
      console.log(error);
    }));
  }
}
```

#### debounceTime

A debounceTime egy számot vár paraméterül, amely milliszekundumban megadja a várakozási időt, mielőtt egy új érték kerülne az adatfolyamba.

```typescript
import { Observable, from } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export class TestService {
  returnFirstNNumbersAsObservable(): Observable<any> {
    return from([1, 2, 3, 4, 5]).pipe(debounceTime(200));
  }
}
```

Jelen esetben az adatfolyam akkor kerül továbbításra, ha 200 milliszekundumig nem érkezik új adat.

#### take

A ```take()```-et nevezhetnénk akár ```take(n)```-nek is, ugyanis egy számot vár paraméterül, és az első ```n``` elemet adja vissza az Observable adatfolyamból.

```typescript
import { Observable, from } from 'rxjs';
import { take } from 'rxjs/operators';

export class TestService {
  returnFirstNNumbersAsObservable(): Observable<any> {
    return from([1, 2, 3, 4, 5]).pipe(take(2));
  }
}
```

A példakód az első két számjegyet (1, 2) adja vissza egy Observable-ben.

### Promise vs. Observable

Ahogy azt a példakódokból is láttuk mindketten alkalmasak aszinkron műveletek végrehajtására és kezelésére. A fő különbség az adatok visszajuttatásának módjában rejlik. Míg a Promise egyszer közöl adatot, és az addig elérhető összeset küldi, addig az Observable egy adatfolyamot nyit, amelyben az adatok kisebb egységet formájában kerül átküldésre. A Promise-nál a ```resolve()``` függvényben egyszerre küldünk mindent, amit szeretnénk, az Observable-nél a ```Subscriber``` adatrészeket küld a ```next()``` függvényen keresztül vagy hibát az ```error()```-on keresztül. Az adatfolyam végét a ```complete()``` függvény meghívásával jelezzük.

## Szerkesztők

Forráskód és videó: Kokrehel Grácián (kokrehel@inf.u-szeged.hu)

Leírás: Jánki Zoltán R. (jankiz@inf.u-szeged.hu)
