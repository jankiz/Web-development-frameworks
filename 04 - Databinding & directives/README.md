# 4. gyakorlat - Databinding & directives

## Bevezető

Jelen gyakorlati anyag az Angular adatkötését és a direktívák használatát hivatott bemutatni.

## Projekt futtatása

1. Repository klónozása (pl.: ```$ git clone https://github.com/jankiz/Web-development-frameworks.git```)
2. Navigálás a mappába: ```$ cd web-development-frameworks/04\ -\ Databinding\ \&\ directives/```
3. Függőségek telepítése: ```$ npm install```
4. Projekt futtatása: ```$ ng serve```

## Videó
[LINK](https://youtu.be/xx-ZETWlqy8)

## Fejlesztési lépések

Az alábbi szekcióban lépésről lépésre megvizsgáljuk a projekt forráskódjának főbb részeit.

### HomeModule előállítása

Az Angular (és természetesen a NodeJS, mint futtatókörnyezet is) a modularizációra, mint koncepcióra épít, így minden részegység modulok formájában kerül megvalósításra. Ez nagyban segíti az újrafelhasználhatóságot, továbbá performanciai okokból érdemes egy web-alkalmazás különálló részeit (pl.: az egyes oldalakat) modulokba szervezni. A modulokon belül komponenseket használunk mind a megjelenés, mind pedig a logika implementálására. Az alkalmazás fő képernyőjét (gerincét) a Home oldal fogja alkotni, így ez egy önálló modult fog képezni.
Az Angular CLI nagyban megkönnyíti a fejlesztők dolgát azzal, hogy a modul, illetve a komponens vázak legenerálhatóak. Az alábbi parancs segítségével előállítjuk a HomeModule-t, amelyet szeretnénk az oldalak (pages) mappába tenni.

```$ ng generate module pages/home```

### Komponensek létrehozása

A modulok önmagukban nem alkalmasak arra, hogy HTML kódot és TypeScript logikát társítsunk egymáshoz, erre szolgálnak a komponensek. Ezért minden létrehozott module rendelkezni fog egy vagy több komponenssel. A komponensek egy oldal azon önálló részegységei, amelyek logikailag elkülöníthetőek egymástól.

```$ ng generate component pages/home```

A komponenseket a modulok foglalják magukba, ezért fontos, hogy az adott modul alatt definiált komponensek megjelenjenek a modul ```declarations``` tömbjében.  Továbbá mivel a modularizáció a fő szempont az alkalmazás felépítése szempontjából, ezért modulok kerülnek importálásra, de így még nem érhetőek el az alattuk definiált komponensek. A NodeJS megfontolása szerint minden importálható, ami exportálásra került, ezért a komponenst exportálnunk is kell, hogy az a modul importálásával együtt elérhető legyen más modulokban (pl.: AppModule) is.

```typescript
@NgModule({
  declarations: [HomeComponent],
  imports: [...],
  exports: [HomeComponent]
})
```

Így már a komponens kódja vagy selector-a meghívható bárhol, ahol a HomeModule importálásra kerül.
Ehhez hasonló módon járunk el a movie-card és a splash-screen modulok, illetve komponensek esetében is.

### Film adatmodell definiálása

Mivel az alkalmazásunk filmek bemutatására és információk megjelenítésére szolgál, így tartsuk szem előtt, hogy ehhez kapcsolódó adatokat szeretnénk kezelni. Mivel az Angular a TypeScript nyelvet használja a logika implementálására, érdemes a típusosság adta lehetőségeket használni, és ezzel jelentős mértékben csökkenthetőek a típusok figyelmen kívül hagyásából származó hibák (pl.: nem létező adattag, inicializálatlan adattag, stb.).

Ezért a filmek adatainak tárolására érdemes létrehozni egy interfészt (interface), amellyel ugyan implementáció nem tartozik még a különböző film objektumokhoz, viszont egy megszorítást használhatunk a típusra, és ezzel együtt a használt adattagokra.

```typescript
export  interface  Movie {
  id: number;
  title: string;
  description: string;
  imdb: number;
  lengthMin?: number;
  img?: string;
}
```

A Movie interfész tehát alkalmas arra, hogy Movie típusú objektumokat tudjunk létrehozni, valamint az adattagok tekintetében megadhatóak azok, amelyek kötelezően használandóak, illetve az ún. opcionálisak (?).

### Adatkötés (Databinding)

Az Angular adatkötésnek két fajtája létezik: az egyirányú (one-way) és a kétirányú (two-way).

#### Egyirányú adatkötés (One-way Databinding)
Ez az a forma, amikor a logikából a megjelenéshez szeretnénk adatot közölni adattagok segítségével. Ezek jellemzően megjelenítési célokat szolgálnak, és mivel egyirányú az adatkötés, az adattag értéke nem változik a logikában. Ennek a formája a HTML kódban jelenik meg, ahol is a komponenshez tartozó HTML kódba a komponens adattagjain keresztül küldünk adatot. Szintaxis: ```{{propertyName}}```

```html
<div>{{movie.imdb}}</div>
```

Ebben a példában a korábban létrehozott Movie interfész segítségével definiált ```movie``` adattag (movie-card.component.ts) ```imdb ``` adattagjának értékét jelenítjük meg.

#### Kétirányú adatkötés (Two-way Databinding)
Ez az a forma, amikor a logikából nemcsak a megjelenéshez szeretnénk adatot közölni adattagok segítségével, hanem a felületen esetlegesen módosított értékeket visszaközölni a komponens logika felé. Ezek jellemzően input mezők (vagy form-ok) segítségével történnek, és mivel kétirányú az adatkötés, az adattag értéke nemcsak látható a felhasználó számára, hanem módosítható is, amely közlésre kerül a logika felé.
Ennek használatához szükséges az Angular FormsModule (```@angular/forms``` alatt található). Ezt a modult kell importálni abban a modulban, amelynek a komponensei használják a kétirányú adatkötést. A kétirányú adatkötést az ngModel direktívával alkalmazzuk a HTML kódban hivatkozva a komponensünk kívánt adattagjára.
Szintaxis: ```[(ngModel)]="propertyName"```

>home.component.html

```html
<div class="container">
  <input type="text" [(ngModel)]="category">
</div>
```

Ebben a példában egy beviteli (input) mezőhöz kapcsolunk egy adattagot, amin keresztül a beviteli mező tartalma elérhetővé válik a TypeScript logikában is. A ```category``` egy ```string``` adattag a HomeComponent-ben, és az ngModel direktíva segítségével az adat mindkét irányban (megjelenés és logika) közvetítve van.

### Direktívák (Directives)

A direktívák gyakorlatilag olyan osztályok, amelyek egy Angular alkalmazás elemeinek a viselkedését képesek befolyásolni.

#### Főbb típusok és alkalmazásaik

A direktíváknak 3 fő típusát különböztetjük meg:

- Komponensek: gyakorlatilag minden létrehozott komponens egy direktíva, amely egy sablonnal (template-tel) bír.
- Attribútum direktívák: ezek hivatottak befolyásolni egy komponens vagy elem megjelenését és viselkedését. Példa: ```ngClass```, ```ngStyle```,``` ngModel```.
- Strukturális direktívák: a megjelenést befolyásolják olyan formában, hogy új vagy meglévő DOM elemeket jelenít meg vagy tüntet el. Példa: ```ngIf```, ```ngSwitch```, ```ngFor```.

##### Példa attribútum direktívára

```html
<div [ngClass]="isTrue ? 'true-class' : 'false-class'">Use a CSS class based on a boolean evaluation.</div>
```

Ebben a példában az ```ngClass``` direktíva egy feltételhez kötve alkalmas CSS stílust egy DOM elemen. Ezek a direktívák alkalmasak minimális logika mentén egy DOM elem vagy komponens megjelenését és viselkedését szabályozni. Az ```isTrue``` egy adattagja a komponensnek (vagy egy korábban definiált lokális változó). Ha az ```isTrue``` kiértékelése IGAZ értékkel tér vissza, akkor az implementált ```true-class``` CSS osztály és annak stílusjegyei kerülnek alkalmazásra a teljes ```<div></div>``` DOM elemen, ellenkező esetben a ```false-class``` osztály.

##### Példa strukturális direktívára

>home.component.html

```html
<app-movie-card  *ngFor="let item of movies"></app-movie-card>
```

A fenti példában a ```MovieCardComponent``` kerül betöltésre az ```<app-movie-card></app-movie-card>``` HTML tag-ek (mint selector) segítségével. Az ```*ngFor``` direktíva egy ```for``` ciklus segítségével végigiterál a ```HomeComponent```-ben létrehozott ```movies``` tömbön, és elemenként létrejön egy ```MovieCardComponent```. A példában szereplő ```item``` egy lokális változó (a változó neve tetszőlegesen megválasztható), amely minden iterációban felveszi a tömb adott elemének értékét. Ez a változó nem a komponens adattagja, kizárólag itt érhető el (```let``` kulcsszóval definiált változó).

---

>movie-card.component.html

```html
<mat-card-subtitle  *ngIf="movie.lengthMin">({{ + movie.lengthMin}}p)</mat-card-subtitle>
```

Ebben a példában az ```*ngIf``` direktíva segítségével egy feltétel kiértékelése mentén tudunk egy HTML elemet megjeleníteni vagy elrejteni. A feltétel visszatérési értéke egy boolean érték (true/false). A ```lengthMin``` adattag a Movie interfészben került definiálásra, amely egy számot jelöl. Amennyiben a ```lengthMin``` értéke ```0``` vagy ```undefined```, a kiértékelés HAMIS értékkel tér vissza, így ebben az esetben a ```<mat-card-subtitle></mat-card-subtitle>``` DOM elem nem kerül megjelenítésre, minden más esetben IGAZ értéket kapunk, és megjelenik a DOM elem.

#### Egyedi direktívák

Az Angular keretrendszer lehetőséget biztosít a direktívák tekintetében arra is, hogy egyedi (saját névvel ellátott) direktívát fejlesszünk akár komplexebb logikával. A direktívák (mint ahogy azt fentebb tárgyaltuk) TypeScript osztályok formájában kerülnek megvalósításra, és a speciális ```@Directive()``` dekorátort használjuk a definiálásukra. Természetesen, a direktívák is beburkolhatóak modulokba, így könnyedén importálhatókká válnak más modulokban. A ```@Directive()``` dekorátor definíciója a ```@angular/core``` NPM csomagban található.
Direktívák szintén generálhatóak az Angular CLI segítségével. Az alábbi példa parancs egy OnHover direktívát generál a ```shared/directives``` mappában, és a hozzá tartozó selector az ```appOnHover``` nevet fogja viselni.

```sh
$ ng generate directive shared/directives/on-hover
```

A direktívák selector-ában megadott string segítségével alkalmazhatóak a direktívák azokban a komponensekben, ahol a direktíva (vagy a direktíva modulja) importálásra kerül.

```html
<div appOnHover>Simple text!</div>
```

### Input dekorátor

A modularizáltság következtében joggal merül fel a kérdés, hogy az egyes komponensek között hogyan valósulhat meg az adatátvitel. Ezeket hivatottak ellátni az ```@Input()```, ```@Output()``` dekorátorok. Ezek segítségével megjelölhetjük a komponens különböző adattagjait attól függően, hogy az adott komponensben adatot szeretnénk fogadni, avagy adatot szeretnénk küldeni. Mindkét dekorátor a ```@angular/core``` NPM csomagban található, így ezeket innen tudjuk importálni.

>movie-card.component.ts

```typescript
export  class  MovieCardComponent  implements  OnInit {
  @Input() movie?: Movie;

  constructor() {...}
  ngOnInit(): void {...}
}
```

>home.component.html

```html
<app-movie-card *ngFor="let item of movies" [movie]="item"></app-movie-card>
```

Ebben a példában a ```MovieCardComponent``` movie adattagját állítottuk be input-ként, ami azt jelenti, hogy a komponens meghívásakor adatot tudunk átadni az abból a komponensből, ahol a selector-t alkalmazzuk (ez a HomeComponent lesz). Az ```item``` egy lokális változó, amely a ```for``` ciklusnál jön létre, és felveszi minden iterációban a ```movies``` tömb adott elemének értékét.

FONTOS! Az input adattagokat használatkor mindig a tömb operátorral jelöljük ```[]```. Ez jelöli azt, hogy ez az adattag bemeneti (input) adattag.

---

### Szerkesztők

Forráskód és videó: Kokrehel Grácián (kokrehel@inf.u-szeged.hu)

Leírás: Jánki Zoltán R. (jankiz@inf.u-szeged.hu)

