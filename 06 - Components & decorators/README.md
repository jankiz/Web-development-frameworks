
# 6. gyakorlat - Komponensek és dekorátorok

## Bevezető

Jelen gyakorlati anyag az Angular komponensek között kialakítható hierarchiát és a főbb dekorátorok használatát hivatott bemutatni.

## Projekt futtatása

1. Repository klónozása (pl.: ```$ git clone https://github.com/jankiz/Web-development-frameworks.git```)

2. Navigálás a mappába: ```$ cd web-development-frameworks/06\ -\ Components\ &\ decorators/```

3. Függőségek telepítése: ```$ npm install```

4. Projekt futtatása: ```$ ng serve```

## Videó

[LINK](https://youtu.be/jnUSiicz2Oo)

## Komponensek hierarchikus felépítése

Az Angular keretrendszer lehetővé teszi azt számunkra, hogy az alkalmazásunkat egymástól jól elkülöníthető részek mentén szervezzük ún. komponensekbe és/vagy modulokba. Ez a filozófia a NodeJS futtató környezetből öröklődik, hiszen ahogy a függőségeket tartalmazó mappa (```node_modules```) is árulkodik, a fő szempont a modulokra bontás, azaz a modularizáció.

Az Angular modulok önmagukban nem alkalmasak logika hordozására, ugyanis ezek közvetlenül nincsenek hozzárendelve a megjelenéshez (view-hoz). A megjelenést és a logikát összekötik az ún. komponensek, viszont a komponesenk modulokba szervezhetőek a könnyebb és optimálisabb kezelés végett.

Amikor egy oldalt vagy egy oldalrészt kívánunk betölteni, akkor a komponenst kell elérnünk (ezt jellemzően a modulon keresztül tesszük meg), a megjelenítéshez pedig a komponens megjelenését hordozó HTML kódot kell betöltenünk az ún. selector segítségével.

### @Output() dekorátor

Korábban már láthattuk az ```@Input()``` dekorátor használatát. Ezt a dekorátort egy komponens osztály (gyermek osztály) adattagjához rendeltük hozzá, amelynek egy ezt meghívó komponens (ős komponens) adatot tud átadni. Itt a szülő-gyermek viszony nem öröklődést hivatott jelölni, csupán a komponensek alárendeltségét, hierarchiáját. Ezt úgy kell elképzelni, mint amikor egy ```<p>hello</p>``` HTML kódrészletet beágyazok  ```<div></div>``` tag-ek közé, és az alábbi eredményt kapom:

```html
<div>
  <p>hello</p>
</div>
```

Ebben az esetben mind a ```<div></div>```, mind a ```<p></p>``` komponenseket lehetnének. Pontosan ugyanez történik az Angular keretrendszerben is, mint ahogy ezt mutatja a ```home.component.html``` fájl tartalma is.

> home.component.html

```html
<span [ngSwitch]="category">
  <span *ngSwitchCase="'movie'" class="container">
    <app-movie-card *ngFor="let item of movies" [movie]="item" appOnHover></app-movie-card>
  </span>
</span>
```

Az ```@Input()``` dekorátor - gyakorlatilag - ellentétje az ```@Output()``` dekorátor. Míg az ```@Input()``` adatot fogad egy magasabb szinten lévő komponenstől, addig az ```@Output()``` adatot küld a magasabb szinten lévő számára.

> Mikor lehet erre szükségünk?
Tfh. van egy olyan oldalunk, amelyen rendelünk egy terméket, viszont a termék rendelését véglegesítéséhez meg kell adnunk néhány adatot (szállítási cím, számlázási cím, fizetési mód), és ezeket külön komponensekben tesszük meg. Ha regisztrált fiókunk van, akkor a legtöbb mezőt már ki tudjuk tölteni a korábban felvitt adatok alapján, így ezeket a felsorolt lépéseket (szállítási cím, számlázási cím, fizetési mód) megvalósító komponenseknek át tudjuk adni. A felsorolt 3 komponens megkapja a megfelelő adatokat, azonban előfordulhat, hogy a felhasználó szeretné módosítani a szállítási címet, mert elköltözött. A módosítást a rendelés véglegesítéséhez visszafelé kell propagálnunk annak a komponensnek, amely a teljes rendelést oldalt megvalósítja, hiszen ez fogja továbbítani a szerver felé is az adatokat. Ezeket tipikusan ```@Output()``` dekorátor segítségével valósítjuk meg.

### EventEmitter

Az input-ok inicializálása (mivel adattagokról van szó) akkor történik meg, amikor maga a komponens betöltésre kerül. Így tudjuk az esemény bekövetkeztének időpontját. Az output-oknál egy kicsit más a helyzet, hiszen előfordulhat, hogy az a komponens, amely az adatot visszaküldi az őt meghívónak, nem fog megszűnni, így nem feltétlenül köthető konkrét eseményhez.

Pontosan ebből a megfontolásból generálnak maguk az output-ok eseményt, hogy a túl oldalon, (a fogadónak) legyen mire feliratkozni. Az események kiváltását az Angular keretrendszerben az ```EventEmitter```-ek hivatottak ellátni. Ezért egy ```@Output()``` dekorátorral ellátott adattag ```EventEmitter``` típussal bír. Mivel alapvetően egy generikusról van szó, hiszen az eseményen keresztül bármilyen adatot visszaküldhetünk (számot, karakterláncot, objektumot, tömböt, stb.), ezért megjelölhetjük, hogy a létrehozott ```EventEmitter``` milyen típusú objektumot fog kibocsátani.

> movie-card.component.ts

```typescript
import { Component, EventEmitter, Output } from  '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
  @Output() getMovie = new EventEmitter<Movie>();
}
```

Ebben a példában a getMovie egy eseményt kibocsátó objektum, amely Movie típusú objektumok küldésére alkalmas. Az Output dekorátor definíciója az ```@angular/core``` modulban található, így onnan kell importálnunk.

Az ```EventEmitter``` objektumok az esemény kibocsátását az ```emit()``` függvénnyel idézik elő, paraméterként pedig az esemény során továbbítandó objektumot várják.

> movie-card.component.html

```html
<mat-card *ngIf="movie" (click)="getMovie.emit(movie)">
  <!-- more source codes comes here... -->
</mat-card>
```

Ahogy a példában is látszik, mivel a ```getMovie``` egy adattagja a komponens osztályának, így a HTML kódban is elérhető, mint változó. A direktíváknak át tudunk adni egyszerű TypeScript logikát is, így teljesen valid, ha itt hívjuk meg a ```getMovie``` objektum ```emit()``` függvényét. Ezzel ekvivalensek az alábbi TypeScript és HTML kódrészletek együttese.

```html
<mat-card *ngIf="movie" (click)="emitMovie()">
  <!-- more source codes comes here... -->
</mat-card>
```

```typescript
import { Component, EventEmitter, Input, Output } from  '@angular/core';
import { Movie } from  './../../../shared/models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
  @Input() movie: Movie = {} as any;
  @Output() getMovie = new EventEmitter<Movie>();

  emitMovie(): void {
    this.getMovie.emit(this.movie);
  }
}
```

### EventEmitter eseményének kezelése

Az előző szekcióban láthattuk, hogy hogyan tudunk adatot kibocsátani a komponensünkből egy eseménybe burkolva azt. Azonban ezt az eseményt el is kell fognunk, hogy az adattal tovább tudjunk dolgozni. A kibocsátott eseményt az a komponens érheti el először, amely meghívta az alárendelt komponenst.

A komponens selector-on keresztüli meghívásakor az ```@Input()``` dekorátorral ellátott adattagokat ```[]``` zárójelek között jelöltük. Az ```@Output()``` dekorátorral ellátott adattagokat (```EventEmitter-eket```) ```()``` zárójelek között jelöljük.

> @Input()

```html
<app-movie-card *ngFor="let item of movies" [movie]="item"></app-movie-card>
```

> @Output()

```html
<app-movie-card (getMovie)="goToDetails($event)"></app-movie-card>
```


> Ezzel értelmet nyerhet az is, hogy a korábban tanult [(ngModel)] direktíva (kétirányú adatösszekötés) miért kapott dupla zárójelet: egyszerre input és output direktíva is.

Az események bekövetkeztekor egy függvényt kell meghívnunk, amely egy ```event``` argumentummal rendelkezik. Ez a paraméter fogja tartalmazni az értéket, amit az ```EventEmitter``` objektum az ```emit()``` függvényen keresztül kibocsát.

> A ```$event``` szintaxis a JavaScript és a HTML kód keveréséből maradt fent, ez egy egyszerű változó jelölés HTML kódban.

Tehát, amikor az ```emit()``` függvény meghívódik a gyermek komponensben, a ```goToDetails()``` függvény lefut az ősben. Ezt természetesen implementálnia kell a fejlesztőnek.

> home.component.ts

```typescript
goToDetails(event: Movie | Game): void {
  this.detailData = event;
  this.page = 'details';
}
```

## Filter függvény

A lokális (kliens-oldali) szűrés egyik legkézenfekvőbb formája a ```filter()``` függvény használata. Ez egy tömb típusra implementált JavaScript függvény, amely kvázi aszinkron módon (lambda kifejezés formájában) szűri le a tömb elemeit egy megadott feltétel mentén.

> home.component.ts

```typescript
onFavorite(event: Movie): void {
  /*
  other source codes come here...
  */
  this.favorites = this.favorites.filter(item => item.star);
}
```

A fenti példában a ```favorites``` tömb frissülni fog azokkal a ```favorites``` tömb elemekkel (objektumokkal), amelyeknek az adattagja logikai IGAZ értékkel tér vissza.

A filter gyakorlatilag egy ```for``` ciklust valósít meg (egész pontosan ```foreach```-et), ahol az ```item``` egy lokális változó, amely minden iterációban felveszi a tömb soron következő elemét. Ezek az elemek jelen esetben objektumok, amelyeknek van egy ```star``` adattagjuk. A ```star``` adattagot minden iterációban logikailag kiértékeljük (true/false), és amennyiben igaz értéket kapunk, a ```filter()``` függvény megtartja a tömb elemét.

> Ez természetesen nem csak boolean adattagok vizsgálatára használható, hanem tetszőleges objektumokra is, hiszen logikailag kiértékelhető: ```true```, ha van értéke, ```false```, ha ```undefined``` vagy ```null```.

## Életciklus metódusok (Lifecycle Hooks)

Mivel az Angular komponensek betöltését és megszüntetését a keretrendszer szabályozza, így ezeknek is vannak életciklusaik, és ismertek azok a fázisok, amelyeknek bekövetkezte ismert. Ilyen egy komponens létrejötte, megszűnése, azonban ezek a legfontosabb események is felbonthatóak tovább kisebb fázisokra.

Egy generált komponens esetében találkozhattunk már az előre definiált ```ngOnInit()``` függvénnyel, amely mindig szerepel, és az osztály definícióban megjelenik az ```implements OnInit``` rész. Az ```ngOnInit()``` egy életciklusbeli metódus, amely egy komponens létrejöttekor garantáltan le fog futni (ha nincs hiba már hamarabb... :))

Ha ez egy életciklusbeli metódus, és lefut a komponens létrejöttekor, akkor felmerülhet a kérdés, hogy:
- de mégis mikor?
- mi az, ami ilyenkor már elérhető?
- illetve milyen további fázisok ismertek még egy komponens életében?

Ezek részletes leírása megtalálható az [Angular hivatalos oldalán](https://angular.io/guide/lifecycle-hooks) is ábrákkal szemléltetve, azonban a legfontosabbakra érdemes néhány mondatot áldozni.

FONTOS! Valamennyi Angular Lifecycle Hook felüldefiniálásához az osztály (komponens) neve mögött az ```implements``` kulcsszóval  meg kell jelölni a metódus nevét (többet is lehet egymás mögött felsorakoztatva), és ezeket importálni kell az ```@angular/core```-ból.

> Példa

```typescript
import { Component, OnDestroy, OnInit } from  '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  ngOnInit(): void { /*...*/ }
  ngOnDestroy(): void { /*...*/ }
}
```

> Best practice!
Lifecycle Hook metódusoknak ugyan megadhatóak paraméterek, viszont ezeket kézzel meghívni nem ildomos!

### constructor()

Ez egy speciális metódus, amely a TypeScript osztályok velejárói, nem Angular specifikus metódus. Pont ezért nem is található meg a Lifecycle Hooks listában. Amikor egy komponenst meghívunk, először maga az osztály példány jön létre (mint objektum), így a konstruktor fog meghívódni. Ő az első, minden Angular Lifecycle Hook előtt meghívódik, és garantáltan le fog futni egyszer, így tökéletes akár adattagok inicializálására vagy szolgáltatás (service) példányok begyűjtésére (ezt hamarosan látni fogjuk!).

### ngOnChanges()

Az ```ngOnChanges(changes: SimpleChanges)``` egy Lifecycle Hook metódus, amely minden komponens létrejöttekor meghívódik, és a konstruktor után elsőként fut le. Fontos azonban megjegyezni, hogy ez a metódus az input adattagok változását figyeli, így minden ```@Input()``` dekorátorral ellátott adattag értékváltozásakor meg fog hívódni. A változásokat egy ```SimpleChanges``` objektumban kapjuk meg, mely a metódus paramétere.

### ngOnInit()

Az ```ngOnInit()``` függvény a sorban a következő, amely garantáltan egyszer fut le egy komponens életében. (Ez csak úgy futtatható le újból, ha manuálisan ráhívunk a metódusra, de mint azt említettük, nem szép dolog!) Az adattagok inicializálása ezen a ponton már megtörtént, így minden szükséges objektum a memóriában van. Legjobb hely arra, hogy például adatbázis (szerver) felé kéréseket indítsunk, hiszen az ezeket tartalmazó szolgáltatások és input adattagok elérhetőek és rendelkeznek értékkel.

### ngAfterViewInit()

Ez az a pont, ahol minden DOM elem elérhető, így nyugodtan lehet rájuk és a direktívákra hivatkozni a TypeScript logikából. Ez a metódus is egyszer fog meghívódni a komponens inicializálása során.

### ngOnDestroy()

A komponens életciklusának utolsó metódusa, amely a komponens megszűnését, memóriából való törlését jelenti. Egyszer fut le, és a komponens élete ezzel fejeződik be. Tökéletes hely az feliratkozott eseményekről való leiratkozásra (szolgáltatásoknál látni fogjuk), illetve az objektumok megszüntetésére. Ezekkel az apróságokkal javíthatunk az alkalmazás performanciáján, és elkerülhetjük az ún. memória szivárgást (memory leak).

## Angular specifikus HTML elemek

### ng-content

Az ng-content Angular HTML tag egy olyan komponenst valósít meg, amely az őstől fogadott HTML kódokat jeleníti meg azon a helyen, ahol a tag-et használjuk.

> Példa: comp-a.component.html (selector: comp-a)

```html
<button>
  <ng-content></ng-content>
</button>
```

> Példa: comp-b.component.html
```html
<comp-a>Click me!</comp-a>
```

A fenti példában a Click me! szöveg pontosan a ```<button></button>``` tag-ek között fog megjelenni, hiszen az ng-content komponens ott került meghívásra.

Az ```ng-content``` ```select``` attribútumával konkrét CSS osztály szerint vagy HTML tag szerint is behelyettesíthetőek a HTML kódrészletek, amelyeket az ős komponensből kaptunk.

### ng-container

Az ng-container HTML tag egy olyan specifikus Angular keretrendszerbeli komponens, amely oly módon különíti el a benne lévő HTML kódrészletet, hogy különálló DOM elem nem jön létre. Ezt előszeretettel használjuk strukturális direktívák (pl.: ```*ngIf```) esetén, ugyanis ilyenkor a megjelenés nem igényel további CSS módosításokat, és egy fájlban elhelyezhetjük a különböző feltételekhez kötött megjelenéseket.

### ng-template

Az ng-template egy újabb olyan HTML tag, amely nem jelenik meg a DOM-on, kizárólag a megjelenést szabályozza strukturális direktívák mentén (pl.: *ngIf). Ezzel komplett template-eket tudunk feltételhez kötötten megjeleníteni, ahol a template egy lokális változón keresztül érhető el.

> Példa

```html
<div *ngIf="booleanExpression; then template1 else template2">
  <p>This content is not shown</p>
</div>

<ng-template #template1>
  <p>content to render when the booleanExpression is true.</p>
</ng-template>

<ng-template #template2>
  <p>content to render when booleanExpression is false.</p>
</ng-template>
```

## @HostListener() dekorátor

A HostListener dekorátor segítségével tudunk egy komponens HTML eleméhez egyedi interakciókat rendelni (pl.: kattintás vagy gomb lenyomásának eseménye).

> Példa

```typescript
import { HostListener, Component } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  counter = 0;
  
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.counter++;
  }
}
```

A fenti példa tetszőleges gomb lenyomásával növeli a ```counter``` adattag értékét 1-gyel. A dekorátor mögött egy eseményt jelölünk meg, majd azt a metódust, amelynek le kell futnia az esemény bekövetkeztekor.

## Szerkesztők

Forráskód és videó: Kokrehel Grácián (kokrehel@inf.u-szeged.hu)

Leírás: Jánki Zoltán R. (jankiz@inf.u-szeged.hu)
