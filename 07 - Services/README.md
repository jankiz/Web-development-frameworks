# 7. gyakorlat - Services

## Bevezető

Jelen gyakorlati anyag az Angular Material használatát használatát hivatott bemutatni.

## Projekt futtatása

1. Repository klónozása (pl.: ```$ git clone https://github.com/jankiz/Web-development-frameworks.git```)
2. Navigálás a mappába: ```$ cd web-development-frameworks/07\ -\ Services/```
3. Függőségek telepítése: ```$ npm install```
4. Projekt futtatása: ```$ ng serve```

## Videó
[LINK](https://youtu.be/Nih47MOAN5Q)

## Google Firebase

A Google egyik felhő-alapú megoldása a Firebase. A Google Firebase a Platform as a Service (PaaS) kategóriába esik, azaz a fejlesztők egy platformot kapnak, amely számos szolgáltatást tartalmaz (autentikáció, adatbázis, cloud function, tárhely, stb.). Ezeket a fejlesztők tetszőlegesen konfigurálhatják, azonban a használatukhoz nincs szükség hosszas telepítési folyamatokra, hiszen ezt a platform garantálja. A Firebase két billing plan-t kínál: a free (spark) és a pay as you go (blaze) formákat. A free plan esetében nem történik számlázás (nem kell bankkártya adatokat megadni), ingyenesen használhatóak a szolgáltatások egy jelentős része, azonban ez korlátokkal bír (lsd.: [Pricing plans](https://firebase.google.com/pricing)). A pay as you go, ahogy nevében is benne van, a szolgáltatások használata után fizetünk, tehát nem fix havi díjat vonnak le tőlünk. A szolgáltatások mindegyike és korlátozás nélkül elérhető.

### Cloud Firestore

A Google Cloud Firestore egy NoSQL adatbázist kínál számunkra, amely nagyon hasonlít a MongoDB struktúrájához. Ez gyakorlatilag egy dokumentum-orientált adatbázis rendszer. Ennek a kicsit pontosabb értelmezéséhez megpróbálunk párhuzamot húzni a relációs adatbázisok és a dokumentum-orientált adatbázisok között.

| Relációs adatbázis | Dokumentum-orientált adatbázis |
|:-------------:|:-------------:|
| tábla | kollekció |
| rekord | dokumentum |
| mező | mező |

A relációs adatbázisokban (pl.: MySQL) vannak tábláink, a táblákba beszúrt elemeket rekordoknak neveztük, a táblában lévő elemek egyes adattagjait mezőknek hívjuk. A relációs adatbázisokban szereplő táblákkal ekvivalens a dokumentum-orientált adatbázisokban a kollekció, amely összegyűjti az egy kategóriába eső dokumentumokat (relációs adatbázisnál rekordokat).

A Firestore dokumentumait kvázi JSON objektumok formájában tudjuk leírni, az implementáció során ezt is fogjuk használni. Érdemes áttekinteni a [Firestore képességeit](https://firebase.google.com/docs/firestore/query-data/queries), mielőtt adatmodellt tervezünk, ugyanis vannak megszorítások az egyes szűrésekre vonatkozóan. Természetesen a szűrő feltételek operátorai folyamatosan bővülnek, de ezeket mindig tartsuk szem előtt.

### Angular Firebase integráció

#### Firebase környezeti változók
A Firebase szolgáltatásainak megszólítása számos keretrendszeren keresztül elérhető, a minta kódok több programozási nyelven is elkészültek. A Firebase projekt létrehozása során a beállításoknál (Project settings) egy új alkalmazást kell a projekthez hozzárendelnünk. Ez az alkalmazás lehet web, mobil (iOS/Android), vagy Unity alkalmazás is, és akár több is hozzárendelhető a projekthez (akár ugyanabból a típusból is). 

A projekt hozzáadását követően az adott platformnak megfelelő környezeti változók előállnak, amelyek másolhatóak, és beilleszthetőek a projektünkbe. Web esetén ez az alábbi formában jelenik meg.

```typescript
var firebaseConfig =  {  
  apiKey: "YOUR_API_KEY",  
  authDomain: "YOUR_AUTH_DOMAIN",  
  databaseURL: "YOUR_DB_URL",  
  projectId: "YOUR_PROJECT_ID",  
  storageBucket: "YOUR_BUCKET",  
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  
  appId: "YOUR_APP_ID",  
  measurementId: "YOUR_MEASUREMENT_ID"  
};
```

Ezeket a konfigurációs adatokat az ```src/environments/environment.ts``` fájlban szoktuk elhelyezni. A host-olt alkalmazás (végtermék) viszont egy production környezetben kerül kitelepítésre, így ezeket a környezeti változókat az ```src/environments/environment.prod.ts``` fájlban is érdemes már ilyenkor elhelyezni.

> environment.ts

```typescript
export  const  environment = {
  firebaseConfig =  {  
    apiKey: "YOUR_API_KEY",  
    authDomain: "YOUR_AUTH_DOMAIN",  
    databaseURL: "YOUR_DB_URL",  
    projectId: "YOUR_PROJECT_ID",  
    storageBucket: "YOUR_BUCKET",  
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  
    appId: "YOUR_APP_ID",  
    measurementId: "YOUR_MEASUREMENT_ID"  
  },
  production: false
};
```

#### Firebase SDK

A Firebase projektek elérhetőségek egy ún. SDK (Software Development Kit) segítségével valósulnak meg. Ezek adott keretrendszerhez vagy programozási nyelvhez kerülnek publikálásra. Számunkra az Angular SDK beszerzése szükséges, amelynek a hivatalos GitHub repository-ja [ITT](https://github.com/angular/angularfire) található. A repository tartalmaz valamennyi részhez részletes Readme fájlt leírással, amelyek segítik az SDK használatát és működésének megértését.

Az ```@angular/fire``` egy NPM modul, amely ```npm install`` paranccsal telepíthető.

```sh
$ npm install --save @angular/fire
```

A sikeres telepítést követően az SDK-t inicializálnunk kell, valamint a korábban bemutatott környezeti változókat át kell adnunk. Az inicializálást az ```@angular/fire``` moduljának (```AngularFireModule```) ```initializeApp()``` metódusával tehetjük meg. Mivel ez egy modul, így ezt egy Angular modulban kell importálnunk, de ugyanígy az inicializáló függvény is lefuttattható helyben. Az ```initializeApp()``` függvény paraméterként a Firebase projekt által generált ```firebaseConfig``` struktúrájú objektumot vár.

A Firebase egyes szolgáltatásaihoz tartozó SDK-k is külön modulokba vannak szervezve, így mindig importálnunk kell azt is, amelyet használni szeretnénk (pl.: Firestore esetén az ```AngularFirestoreModule```, autentikáció esetén ```AngularFireAuthModule```).

> app.module.ts

```typescript
import { environment } from  '../environments/environment';
import { BrowserModule } from  '@angular/platform-browser';
import { NgModule } from  '@angular/core';
import { AppComponent } from  './app.component';
import { BrowserAnimationsModule } from  '@angular/platform-browser/animations';
import { HomeModule } from  './pages/home/home.module';
import { AngularFireModule } from  '@angular/fire';
import { AngularFirestoreModule } from  '@angular/fire/firestore';
import { AngularFireAuthModule } from  '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
```

Tehát a Firebase platform szolgáltatásai modulokba vannak szervezve, de a modulok a komponenseken belül nem használhatóak. A modulokon belül minden szolgáltatás egy Angular szolgáltatás (Angular service) formájában valósul meg, amelyet injektálva meg tudjuk szólítani a Firebase platform adott szolgáltatását.

## Angular Service

Az Angular Service (szolgáltatás) egy tervezési mintát valósít meg. A szolgáltatások felelnek az adatok delegálásáért a kliens és a szerver vagy a kliens és bármilyen adatforrás között. Ilyen formában az adatbegyűjtés és továbbítás egy önálló osztályba kerül kiszervezésre, amelyet a komponensek fognak felhasználni.

A szolgáltatások generálhatóak az Angular CLI segítségével is, mellyel nem csak az osztály definíciót, de a szolgáltatás definíció vázát is megkapjuk.

```sh
$ ng generate service services/fb-base
```

Annak érdekében, hogy ezek tetszőleges komponensben felhasználhatóak legyenek, és ne kelljen új objektum példányokat létrehozni, az ún. injektálási technikát használjuk. Ezzel kvázi singleton-ként  jönnek létre a service-ek. Megjelöljük, hogy mi az, amit injektálhatóvá teszünk az ```@Injectable()``` dekorátor segítségével (ez lesz a service), illetve, hogy azt melyik modulba injektáljuk (```providedIn: 'root'``` kifejezéssel a fő modulba (```app.module.ts```).

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FbBaseService {/*...*/}
```

A szolgáltatások felhasználásának a módja az, hogy ezt a kvázi singleton-t a komponens konstruktorának a paraméterlistájába tesszük ```private``` láthatósággal. Ezzel a szolgáltatás saját adattagként kerül injektálásra és a szolgáltatás metódusai elérhetőek a komponensből.

> home.component.ts

```typescript
import { Component } from '@angular/core';
import { FbBaseService } from '../../services/fb-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  constructor(private service: FbBaseService) {/*...*/}
}
```

## Aszinkron műveletek

A NodeJS futtatókörnyezet egyik alapelve a Non-Blocking I/O technika alkalmazása, amellyel a számításigényes vagy időigényes feladatokat aszinkron módon futtatjuk (mintha a háttérben futna), és nem blokkoljuk a felhasználói felületet (UI-t) annak érdekében, hogy a felhasználói élményt fenn tudjuk tartani. Tehát egy időigényes művelet futásáig nem blokkoljuk az alkalmazást, továbbra is elérhető és kattintható valamennyi UI elem.
A JavaScript/TypeScript világban ezeket az aszinkron műveleteket 3-féleképp kezelhetjük:

- Callback
- Promise
- Observable

A Callback volt az első JavaScript-es megoldás az aszinkron műveletekre, azonban ezeket manapság egyre kevésbé használjuk. Kezelésük bonyolultabb, nincs eszköztár (függvények), amellyel akár több callback-et összefűzhetünk, stb. A Promise és az Observable két objektumtípus, amelyek mindegyike az aszinkronitás kezelésére szolgál, azonban eltérő technikával dolgoznak.

### Promise

A Promise a JavaScript-ben is támogatott (extra modulok telepítése és importálása nem szükséges), így ennek a használata TypeScript-ben is függőségek használata nélkül működik. A Promise-ok olyan objektumok, amelyek egy esemény sikerességétől függően küldenek adatot. A Promise-ok írásakor két ágat különböztetünk meg: a sikeres és a hibát tartalmazó ágat. Az alábbi kód egy mintát szolgáltat a Promise-ok létrehozására és megértésére.

```typescript
promiseReturningFunction(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (true) {
      resolve('successful');
    } else {
      reject('error');
    }
  });
}
```

A Promise objektum tehát két ággal rendelkezik: a hibamentes (```resolve()```) és a hibát tartalmazó (```reject()```) ágakkal. Ennek ott lesz jelentősége, amikor a Promise-ba burkolt objektumot vagy adatot szeretnénk kinyerni. A ```resolve()``` és a ```reject()``` gyakorlatilag callback függvények, amelyekkel tetszőleges típusú objektumot tudunk küldeni kvázi esemény formájában. Az esemény bekövetkeztét a két függvény meghívása jelenti.

A Promise-ok kezelésére két bevett szokás van: a hagyományos aszinkron módszer és az újabb ```async-await``` technika. Ha a fenti ```promiseReturningFunction()``` függvényt vesszük alapul, akkor a függvény meghívását követően egy ```Promise``` típusú objektumot kapunk, amelyben egy ```string``` található.

#### Aszinkron technika

Tfh. a ```promiseReturningFunction()``` egy service-ben implementált metódus. A service-ünk megszólításához használt komponens (vagy osztály) adattagunk neve legyen myService.

```typescript
myPromiseHandlerFunction(): void {
  this.myService.promiseReturningFunction().then((data: string) => {
    console.log(data);
  }).catch((error: any) => {
    console.log(error);
  }).finally(() => {
    console.log('Do something finally');
  });
}
```

A ```promiseReturningFunction()``` visszatérési értéke ```string```-et tartalmazó Promise volt, azaz ```Promise<string>```. A különböző ágakat eltérő függvényekkel kezelünk, ezek sorban:

- ```then()```: akkor lépünk ebbe az ágba, ha a Promise ```resolve()``` függvénye hívódott meg, azaz sikeresen lefutott a benne lévő logika.
- ```catch()```: akkor lépünk ebbe az ágba, ha a ```reject()``` függvény hívódott meg, tehát hiba keletkezett.
- ```finally()```: ez az ág mindenképp lefut, függetlenül attól, hogy az adatot kaptuk-e meg vagy a hibát.

Az egyes függvények adatokat is szolgáltatnak vissza, a ```then()``` ág a sikeres futást követően az adatot tartalmazza, amit a Promise tárol. A ```catch()``` ág paramétere maga a hiba, ami a Promise-ban található. A ```finally()``` ágnak nincs paramétere, mert ilyenkor már adat nem keletkezik, de egy végső logikát le tudunk még futtatni függetlenül a Promise kimenetelétől. Az egyes ágak implementálása nem kötelező, de ajánlott a ```then()``` és a ```catch()``` részek megírása a korrekt adat- és hibakezelés végett.

Ez a technika előszeretettel alkalmazott például adatbázis lekérések eredményeinek visszajuttatására vagy rekordok beszúrására, hiszen a késleltetés mértéke nem garantált, azaz nem tudjuk pontosan, hogy az adat mikor válik elérhetővé. Ezekkel a függvényekkel viszont pontosan az események bekövetkeztéhez tudunk forráskódot kötni.

#### async-await techika

A fentebb látott aszinkron technika zavaró lehet azok számára, akik még nem lambda függvényekkel és aszinkron hívásokkal, így van egy olyan bevált technika is, amellyel pontosan ugyanez kiváltható, és szinkron kódot tudunk írni.

Maradva az előző példánál a Promise kezelését most szinkron kóddal írjuk meg.

```typescript
async myPromiseHandlerFunction(): void {
  try {
    const data = await this.myService.promiseReturningFunction();
    console.log(data);
  } catch(error: any) {
    console.log(error);
  }
}
```

A fenti kódban ugyanúgy egy ```Promise<string>``` visszatéréssel bír a ```promiseReturningFunction()```, viszont a Promise által szolgáltatott eredményt szeretnénk bevárni. Ezt az ```await``` kulcsszóval megtehetjük, így a mögötte levő kódrészlet csak akkor fut le, ha a ```promiseReturningFunction()``` visszatért a Promise-szal és benne az adattal (vagy a hibával). 

FONTOS! Az ```await``` használatához szükséges a függvényt megjelölni az ```async``` kulcsszóval, ezért nevezik ezt a technikát async-await-nek. További fontos megjegyzés, hogy azok a függvények, amelyek ```async``` kulcsszóval vannak ellátva, azok is Promise-szal térnek vissza. Ez jelen esetben a ```void``` miatt ```Promise<void>``` típus lesz.

Megfigyelhető, hogy most nem készült ```then()``` ág és abból nyíló ```catch()``` ág. Ez azért van,  mert az ```await``` egyúttal a kibontást is elvégzi, tehát az egyenlőséggel továbbadható a Promise-ban elrejtett objektum. (Egyébként megírható a ```then()``` ág ilyenkor is, nem hibás szintaktikailag, de nincs értelme...)

A hibakezelés ilyen formában kicsit trükkösebb, mert nem használunk ```then()``` és ```catch()``` ágakat a Promise kezelésére. Ilyenkor érdemes a jól ismert ```try-catch``` blokkot alkalmazni a hibakezelésre.

### Observable

Az Observable egy másik technika az aszinkron műveletek kezelésére és az objektumok továbbítására. Az Observable típus az ```rxjs``` modulban van definiálva. Ezt az Angular projekt generálásakor a CLI alapból hozzáadja a projekthez, mint függőséget, tehát külön telepítenünk nem szükséges. Az ```rxjs``` modul az ún. reaktív programozást valósítja meg, amely számos más keretrendszer alatt is értelmezett, és a könyvtár telepíthető.

Az Observable-ök kicsit bonyolultabb objektumok, mindazonáltal az ```rxjs```-en keresztül számos olyan metódus és további objektum elérhető, amellyel akár több Observable-t is tudunk egyszerre kezelni, több aszinkron folyamatot összevárni, és egyként kezelni, vagy egyéb feltételek mentén az elrejtett adatot manipulálni. Az alábbi példa bemutatja egy Observable létrehozásának folyamatát az egyszerűbb megértés végett.

```typescript
import { Observable, Subscriber } from 'rxjs';

observableReturningFunction(): Observable<string> {
  return new Observable((subscriber: Subscriber<string>) => {
    if (true) {
      subscriber.next('successful');
      subscriber.next('successful');
    } else {
      subscriber.error('error');
    }
    subscriber.complete();
  });
}
```

Az Observable típus tehát importálandó az ```rxjs``` modulból. Az Observable paramétere egy ```Subscriber``` típusú objektum, amely az adatokat vagy a hibákat az Observable-be teszi, továbbá értesít, ha nincs további küldendő adat. Ezeket az alábbi függvényekkel teszi meg:

- ```next()```: új adat küldése
- ```error()```: hiba küldése
- ```complete()```: adatfolyam lezárása

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
<app-game-card *ngFor="let item of games | async" [game]="item" appOnHover></app-game-card>
```

### Promise vs. Observable

Ahogy azt a példakódokból is láttuk mindketten alkalmasak aszinkron műveletek végrehajtására és kezelésére. A fő különbség az adatok visszajuttatásának módjában rejlik. Míg a Promise egyszer közöl adatot, és az addig elérhető összeset küldi, addig az Observable egy adatfolyamot nyit, amelyben az adatok kisebb egységet formájában kerül átküldésre. A Promise-nál a ```resolve()``` függvényben egyszerre küldünk mindent, amit szeretnénk, az Observable-nél a ```Subscriber``` adatrészeket küld a ```next()``` függvényen keresztül vagy hibát az ```error()```-on keresztül. Az adatfolyam végét a ```complete()``` függvény meghívásával jelezzük.

## AngularFirestore service használata

Ahogy azt korábban megvizsgáltuk, az AngularFireModule valamennyi Firebase szolgáltatást magába foglal. Az egyes szolgáltatások külön Angular Service-ek formájában vannak implementálva, azaz injektálhatóak a projektünk tetszőleges pontjában. Az adatbázissal történő interakcióhoz az AngularFirestore service-t fogjuk használni miután az AngularFireModule inicializálása megtörtént.

### AngularFirestore

A lekérdezéseinket szeretnénk mi is a tervezési minta mentén kiszervezni szolgáltatásokba (service-ekbe), ezért az AngularFirestore service példányt egy általunk létrehozott service-en belül fogjuk használni. A következő példák bemutatják az alap CRUD (Create-Read-Update-Delete) műveleteket a Google Cloud Firestore szolgáltatáson keresztül.

#### Create

Az alábbi példa egy egyszerű Firestore dokumentum beszúrását mutatja be egy előre generált azonosítóval. Annak érdekében, hogy a kódunk újrahasznosítható legyen, nem egy konkrét Firestore kollekcióra írjuk meg az ```add()``` függvényünket, hanem paraméterezhetőre, így tetszőleges kollekcióra használható lesz a későbbiekben.

> fb-base.service.ts

```typescript
import { Game } from '../shared/models/game.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, Query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class FbBaseService {

constructor(private afs: AngularFirestore) { }

async add(collectionName: string, data: Game, id?: string): Promise<string> {
  const uid = id ? id : this.afs.createId();
  data.id = uid;
  await this.afs.collection(collectionName).doc(uid).set(data);
  // await this.afs.collection(collectionName).add(data);
  return uid;
}
```

A Firestore adatbázisba az írási műveleteket mindig Promise-okkal kezeljük. Ennek célja, hogy értesüljünk minden egyes rekord írásáról (még akkor is, ha többet szeretnénk egyszerre beszúrni vagy frissíteni).

Az AngularFirestore service használatához privát adattagként a konstruktor paraméterlistájához adjuk az ```afs``` adattaggal. Ezt követően a service a ```this.afs``` kifejezéssel elérhető a teljes ```FbBaseService``` osztályban. A kollekciók neve ```string``` formában használható. Az adatbázis műveleteknél meg kell adnunk, hogy melyik kollekció érintett (adat lekérés, írás és törlés esetén is), erre szolgál a ```this.afs.collection()``` metódus. Paraméterként átadásra kerül a kollekció neve.

Adat beszúrása kétféleképp történhet:

- rögzített azonosítóval: ilyenkor egy általunk megadott dokumentum azonosítóval szúrjuk be az elemet.
- azonosító nélkül: ilyenkor a Firestore maga generál egy azonosítót a beszúrás pillanatában.

Rögzített azonosító esetén a ```doc()``` függvénnyel megadjuk a kívánt azonosítót (ami egy ```string``` minden esetben), majd a ```set()``` függvénnyel megadjuk a beszúrni kívánt objektumot (kvázi JSON formában). A ```doc()``` függvény egy DocumentReference típusú objektumot ad vissza, amely egy konkrét dokumentumra történő hivatkozás azonosító alapján. Az azonosító generálása megtörténhet tetszőlegesen, azonban maga a Firestore generátor technikája is alkalmazható a ```createId()``` metóduson keresztül.

Ha nincs előre generált azonosítónk, akkor a Firestore fog egyet automatikusan a beszúráskor létrehozni, és ilyenkor csak magát az objektumot kell megadnunk, amit rögzíteni szeretnénk az adatbázisban. Ilyenkor az ```add()``` függvényt használjuk.

FONTOS! Elsőre furcsának tűnhet, hogy egy ```uid``` adattaggal térünk vissza a függvényben, ami csupán egy generált ```string```, azonban a függvény visszatérési értéke mégis ```Promise<string>```. Hogyan lehetséges ez?

> Mint ahogy azt a Promise-oknál az ```async-await``` technikánál magyaráztuk, az ```async``` kulcsszóval ellátott függvények mindig Promise-t adnak vissza. A függvény végén található return utasítás adja meg, hogy a Promise-ban milyen típusú objektumot küldünk vissza.

FONTOS! Továbbá már maga a ```set()``` vagy az ```add()``` függvény is Promise-szal tér vissza (hiszen ```await```-et írtunk elé). Akkor miért nem ezeket használjuk visszatérési értékként?

> Csupán azért, mert a Firestore ugyan generál eseményt a rekord írásának (beszúrás vagy frissítés) sikerességéről, azonban konkrét adatot nem küld vissza a kliens számára. Mivel az adatbázisok alkalmazásánál megszokott az, hogy a beszúrt rekordot vagy azonosítóját visszakapjuk a sikeresség esetén, ezért mi magunk küldjük vissza a komponens számára ezt az információt, ha a beszúrás sikeres volt.

Az ```await``` kulcsszóval elérhetjük, hogy a generált azonosítót csak akkor adjuk vissza a komponens számára, ha a beszúrás végbement és sikeres volt. 

#### Read

Az alábbi példa egy egyszerű Firestore lekérdezést mutat be egy rendezés kíséretében. Annak érdekében, hogy a kódunk újrahasznosítható legyen, nem egy konkrét Firestore kollekcióra írjuk meg a ```get()``` függvényünket, hanem paraméterezhetőre, így tetszőleges kollekcióra használható lesz a későbbiekben.

> fb-base.service.ts

```typescript
import { Game } from '../shared/models/game.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, Query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class FbBaseService {

constructor(private afs: AngularFirestore) { }

get(collectionName: string): Observable<Game[]> {
  return this.afs.collection(collectionName, ref  => {
    let query: CollectionReference | Query = ref;
    query = query.orderBy('title', 'asc');
    return query;
  }).valueChanges() as Observable<Game[]>;
}
```

Amennyiben az adatbázisban szeretnénk további műveleteket végrehajtani (pl.: szűrést, rendezést, limitálást), akkor a visszatérő ```CollectionReference``` típusú objektumon keresztül ezeket hozzárendelhetjük a lekérdezésünkhöz. A ```collection()``` függvény tehát egy kollekcióra mutató referenciával tér vissza. Ez önmagában tehát nem egy Observable vagy Promise még, csak egy referencia.

A referencián keresztül megadhatunk egyéb feltételeket, ez látható a ```ref => {/*...*/}``` részben. A ```where()``` függvénnyel szűrőfeltételt tudunk megadni mezőnév-reláció-érték formájában. Az ```orderBy()``` metódussal rendezést tudunk megadni egy mező mentén.

FONTOS! A különböző lekérdező függvények visszatérési értéke megegyezik a ```Query``` objektummal, és nem helyben adja hozzá az új feltételt, ezért az egyenlőség szükségszerű.

```typescript
query = query.orderBy('title', 'asc');
```

Mivel a ```collection()``` függvény visszatérési értékét módosítjuk a mi kódunkban (bővítjük feltételekkel), ezért az új, bővített eredménnyel kell visszatérnünk, így a ```return query;``` utasítás szükséges.

A CollectionReference típusból szeretnénk konkrét objektumokat visszajuttatni a komponensünknek egy Observable-be burkolva, így szükséges meghívnunk a ```valueChanges()``` metódust. Ez már Observable-t fog visszaadni, amelyben a példa szerint Game-eket tartalmazó tömbünk van.

#### Update

Az alábbi példa egy egyszerű Firestore dokumentum frissítését mutatja be. Annak érdekében, hogy a kódunk újrahasznosítható legyen, nem egy konkrét Firestore kollekcióra írjuk meg az ```update()``` függvényünket, hanem paraméterezhetőre, így tetszőleges kollekcióra használható lesz a későbbiekben.

> fb-base.service.ts

```typescript
import { Game } from '../shared/models/game.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, Query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class FbBaseService {

constructor(private afs: AngularFirestore) { }

async update(collectionName: string, id: string, data: any): Promise<string> {
  await this.afs.collection(collectionName).doc(id).update(data);
  return id;
}
```

Az adatbázis dokumentum frissítéséhez mindenképp szükségünk van arra az egyedi azonosítóra, amely a dokumentumot jelöli. Így tudjuk beazonosítani, hogy mely létező rekordot kell módosítani.

A frissítésre is (akárcsak a beszúrásra) két opciónk van:

- elküldjük a teljes módosított dokumentumot (objektumot) az adatbázisnak
- csak a dokumentum módosított részét küldjük el az adatbázisnak

Ha a teljes dokumentumot akarjuk elküldeni, úgy is frissül az adatbázisban tárolt objektumunk, azonban olyankor a Create részben bemutatott ```set()``` függvényt kell használni, és paraméterként átadni a teljes dokumentumot.

Ha csak egy dokumentumrészt szeretnénk módosítani, használjuk az ```update()``` függvényt, amely egy dokumentumrészletet vár paraméterül. Ez lehet csak egyetlen adattag kulcs-érték párral megadva, de lehet akár egy beágyazott objektum is. Ha szeretnénk adatot is visszaküldeni az esemény bekövetkeztekor, akkor alkalmazható az ```async-await``` technika itt is.

#### Delete

Az alábbi példa egy egyszerű Firestore dokumentum törlését mutatja be. Annak érdekében, hogy a kódunk újrahasznosítható legyen, nem egy konkrét Firestore kollekcióra írjuk meg a ```delete()``` függvényünket, hanem paraméterezhetőre, így tetszőleges kollekcióra használható lesz a későbbiekben.

> fb-base.service.ts

```typescript
import { Game } from '../shared/models/game.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, Query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class FbBaseService {

constructor(private afs: AngularFirestore) { }

async delete(collectionName: string, id: string): Promise<string> {
  await this.afs.collection(collectionName).doc(id).delete();
  return id;
}
```

Az adatbázis dokumentum frissítéséhez mindenképp szükségünk van arra az egyedi azonosítóra, amely a dokumentumot jelöli. Így tudjuk beazonosítani, hogy mely létező rekordot kell módosítani.

A DocumentReference előállta után a ```delete()``` függvénnyel törlést kezdeményezhetünk az adatbázis felé. A komponens felé adatot az ```async-await``` technikával tudunk közölni.

## Szerkesztők

Forráskód és videó: Kokrehel Grácián (kokrehel@inf.u-szeged.hu)

Leírás: Jánki Zoltán R. (jankiz@inf.u-szeged.hu)
