
# 8. gyakorlat - Routing

## Bevezető

Jelen gyakorlati anyag az Angular komponensek közötti végpont-alapú (route-alapú) navigációt hivatott bemutatni, illetve a végpontok definiálásának módjait.

## Projekt futtatása

1. Repository klónozása (pl.: ```$ git clone https://github.com/jankiz/Web-development-frameworks.git```)

2. Navigálás a mappába: ```$ cd web-development-frameworks/08\ -\ Routing/```

3. Függőségek telepítése: ```$ npm install```

4. Projekt futtatása: ```$ ng serve```

## Videó

[LINK](https://youtu.be/fSRbavVDL0Y)

## Routing

A korábbiakban megtanultuk, hogy egy Angular alkalmazást hogyan bonthatunk fel, illetve hogyan érdemes felbontani komponensekre és modulokra. Azt azonban még nem láttuk, hogy hogyan tehetjük ezeket a komponenseket külön oldalakra, azaz ne csak a komponensek töltődjenek újra, hanem teljes oldalak. Ezt hivatott megvalósítani az Angular Routing. Így tudjuk külön ún. végpontokra (endpoints) kiszervezni az egyes oldalakat, és így valósíthatjuk meg az ún. lazy loading-ot.

## Routing module generálása

Az Angular Routing-ot a keretrendszer konvenciói szerint érdemes egy önálló Routing fájlba kiszervezni. Ha az Angular CLI-vel generálunk egy projektet, kínálkozik a lehetőség, hogy a routing képességet hozzáadjuk a projekthez.

![CLI](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXgAAAAOCAIAAACq85CZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANrSURBVGhD7VnrapQxEO0rVkRE24ogYi8giIj2l4/mK1hEhMouIghaLQiCiIpumyVOM7czSXa7a/PRH/ttJjNnTiYnk+3G9PT39sHhxux5Tv7O3q3nz/mTLYpXb/aF8TRX82AMhaK0GyM4C0IoRe0AFupB4znEf0sZuNnZ/LvTV8SgnaJqHl6cP3U8FHPpK+p2JjRb+4dzlUkokuIsS2hSHGMB2temjlxxli2IdEpH2MsRLDw1g5mOWYf477jE7a6M9Wrkh04PuULlgCWftMkQGj4qEzj98mtr79mFsSE0eq3hq4tbhjS9fRtoHlqEpnoDRNPpxWo0Lm6/NIR4oBaVoUKTGyLu0A8x+fzz9u7TfzwCKsMbEF5nBQtuIXLWaIuIHOlaCLHVdPHgu1FrZUN47HBGCni12TjzaEYS4h9JtlhEGjFPd9fFrhMO3m6WEftQ/RSk0ZTdRUT4KQAj8qdJgHv94Qb5G9GnozVvT37cevBkjhhTGbp4iR23UKIF5NpzisUp9gZITvC9ahhrG6CY0piXWGch/CCeKM4oz1F7ZIMVPBQ1WWxjo35EBQR5c8tJA4n7d0MUqdUJjXhXSl/mBww0Nzv++P3m/cdDaJDDoUJoxMISDze7qSlGo0KQkdNdBBY3ImTaSR4VFDcvu6MROwhwZ4r6EsXvxloLoTFuRvVC8+bDtxv3HoHbjJpVdzFi4YILYOBcu44G5NylCxcC3sFVbCQRdtRP1F7raAxhQmgR61n7EsG8HKEBKyebuTedumsUheH/RvP6/dfrdx9GOxpKKLIA0ZPKtTfKvQueUH8hlldI+BABRfJCYCN+ovxHfUY7rHUUGveEMDpKjR9+VICiY2iNqzKzEB3+6/Tq3em1Owe9hKYgiB8OqbnldUl7b8omt3eZFZsjo+V2T6ECD+2xeUFQwOmzka+bC6ei2HL4uU1hi/xrOBF+KoTG1o7GOuHlZFNt2GtDGp+0JMT6txeC49RKFyyebAb+WCO6NYTG72WSx6PpyebOfhT0ytrjG29lU7gKwKId01XghKsSP6W684DKRHvgl5NPm9t77X4u10P0BLtctCM6PfZz3zdo0Tqg7swYv+l2jzV3eCY0O2svNItiZ/gdDAwGujBwNPmvrk5dOBlOBgODgc4M0EvH+DwYGAwMBhbBwF8UM4aeN/NCugAAAABJRU5ErkJggg==)
Ezen a ponton egy ```y```-t választva egy ```app-routing.module.ts``` fájl kerül generálásra az ```src/app``` mappában.

Az Angular CLI további lehetőségeket nem biztosít a generálásra!

## Routes (végpont definíciók)

Az alkalmazás végpontjait egy tömbben gyűjtjük össze, amelyet a ```Routes``` típus ír le. A tömb elemei ```Route``` típusú objektumok, és az alábbi attribútumokkal fontosak számunkra:

- ```path```: itt adjuk meg az útvonalat (a végpontot) magát
- ```redirectTo```: átirányítást adhatunk meg egy másik végpontra vonatkozóan
- ```pathMatch```: ```prefix``` vagy ```full``` értékeket vehet fel, és megadható az útvonal egyezés fajtája
- ```loadChildren```: a lazy-loading-ot megvalósító objektum (az almodulokban definiált route-ok betöltése ezen keresztül történik meg)
- ```data```: egyéb adat küldése a route-on keresztül a komponens számára
- ```component```: itt adható meg, hogy az adott végpont meghívásakor mely komponens töltődjön be.

Az alábbi példa bemutat néhány végpont definíciót.

> app-routing.module.ts

```typescript
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsModule),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
```

> registration-routing.module.ts

```typescript
const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
    data: { title: 'Regisztráció - Webkert' }
  }
];
```

> details-routing.module.ts

```typescript
const routes: Routes = [
  {
    path: ':dataNameStr/:id',
    component: DetailsComponent,
    data: { title: 'Részletek - Webkert' }
  }
];
```

> FONTOS! Az útvonalak (route-ok) definícióinak a sorrendje számít. Az adatstruktúránk tömb, tehát rendezett kollekcióban gyűjtjük össze az elemeket. A program egy végpont meghívásakor végigiterál a tömb elemein, és az első egyezés esetén betölti a megfelelő komponenst.

Az ún. wildcard route-ok (```**```) szolgálnak arra, hogy ne legyen olyan eset az alkalmazás használata során, hogy nem töltődik be semmi (tipikus 404-es HTTP hiba elkerülése végett). Ennek okán a wildcard path definíció semmiképp sem kerülhet a lista elejére, hiszen ez a helyettesítő route tetszőleges útvonalat elfogad, és bármit is próbálunk megnyitni, mindig az itt megadott komponens töltődik be (jelen esetben ez átnavigál a home-ra). Ezért a wildcard route-okat MINDIG a listák végére tesszük.

A ```loadChildren``` adattag egy kvázi callback-et vár, amelyen keresztül más routing modul tartalom is betölthető (pl.: almodulokban definiált route-ok). A callback aszinkron módon (egy Promise formájában) tölti be az elérési útvonalon található modul alatti route-okat.

```typescript
loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsModule)
```

Az URL-ek tartalmazhatnak paramétereket is. Ezt láthatjuk a 3. példában, ahol mind a ```dataNameStr``` és az ```id``` is paraméterek. A paramétereket ```:```-tal jelöljük, majd utána egy tetszőlegesen választott változónév. A paraméterek az aktív komponensben elérhetjük egy service segítségével.

> details.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  id?: string;
  dataNameStr?: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    if (params?.id) {
      this.id = params.id;
      this.dataNameStr = params.dataNameStr;
    }
  }
}
```

Az ```ActivatedRoute``` service visszaszolgáltatja az éppen aktív végpontot, és a ```snapshot.params``` adattagon keresztül elérhetőek a paraméterek a megadott neveken (jelen esetben ```id``` és ```dataNameStr``` változókban).

## Routing modulok

Annak érdekében, hogy a lazy-loading megvalósulhasson, a végpontokat a főbb modulokhoz kötjük. Így egy komponens csak akkor fog betöltődni, ha azt tényleg használjuk is.
Minden Angular projekt, amely használ routing-ot, rendelkezik egy fő routing modullal. Ez a mi esetünkben az ```app-routing.module.ts``` fájlban található ```AppRoutingModule```. Az egyes almodulok is rendelkezhetnek saját route definíciókkal, ennek technikai akadálya nincs, azonban a feldolgozáskor figyelni kell, hogy melyik tartozik az ős modulhoz, melyik egy alárendelt modulhoz. A következő példákon a Routing modulok felépítését vizsgáljuk meg.

> app-routing.module.ts

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  /* ROUTE DEFINITIONS */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
```

> registration-routing.module.ts

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  /* ROUTE DEFINITIONS */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class RegistrationRoutingModule { }
```

Amennyiben a végpont definíciók rendelkezésünkre állnak, csupán a ```RouterModule```-nak kell átadni őket a ```Routes``` típust használva. Az ős modulban a ```RouterModule.forRoot()``` függvényét használjuk, míg az almodulokban a ```RouterModule.forChild()``` függvényét. Mindkét esetben paraméterként a route-okat kell átadnunk.

Mindkét függvény egy NgModule-t készít, ezért ezek meghívásait az ```@NgModule()``` definíció imports tömbjében intézzük. Ha bekerül a modul az exports tömbbe is, akkor importálható lesz más modulokban is.

> FONTOS! Egy Angular projektben egy ```forRoot()``` függvényhívás lehet, viszont almodulokból több is lehet, így ```forChild()``` hívás több is lehet egy projektben. Ez a mechanizmus szoros kapcsolatban áll a Singleton tervezési mintával.

A ```forRoot()``` függvénynek paraméterként megadható egy ```config``` objektum is, amelyen keresztül a modul betöltési stratégia konfigurálható.

## Route-alapú komponens betöltés

Korábbana komponenseket a selector-ok segítségével hívtuk meg, és töltöttük be őket. Mivel route-ok (végpontok) használata esetén futási időben dől el, hogy melyik komponensnek kell betöltődnie (függően attól, hogy melyik végpontra navigálunk), így az ```index.html``` tartalmát ügyesen kell cserélgetni.

Ezt hivatott ellátni a speciális ```<router-outlet></router-outlet>``` tag pár. Ahol ez megjelenik, ott egy végpont mögött álló komponens kerül betöltésre.

## Navigáció végpontok között

A navigációt két végpont között kétféleképp valósíthatjuk meg egy Angular alkalmazásban:

- TypeScript logikából: a ```Router``` service-en keresztül a ```navigateByUrl()``` függvény segítségével az alábbi formában: 

```typescript
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  /* COMPONENT DEFINITION COMES HERE... */
})

export class MyComponent {
  constructor(private router: Router) { }

  navToHome(): void {
    this.router.navigateByUrl('/home');
  }
}
```

- HTML kódból direktívával: a ```[routerLink]``` direktíva segítségével megadhatjuk, hogy az adott HTML5 elemre kattintva hova navigáljunk az alábbi formában:

```html
<div [routerLink]="[/home]"></div>
```

> A ```routerLink``` direktíva bármely HTML5 tag-hez hozzárendelhető.

> FONTOS! A ```routerLink``` direktíva használatához a komponens moduljában importálnunk kell a ```RouterModule```-t!

## Location-alapú navigáció

Böngészőkben előszeretettel használjuk a "vissza" és az "előre" gombokat a korábban meglátogatott oldalak gyorsabb elérése végett. Ezeket nem csak a hagyományos böngészős gombokon keresztül érhetjük el (mobil platformokon esetenként ez nem is látható), hanem akár a forráskódunkban is meghívhatjuk ezeket a funkciókat. Ezt a funkciót az Angular Location szolgáltatásán (service-én) keresztül érhetjük el.

> details.component.ts

```typescript
import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent {

  constructor(private location: Location) { }

  close(): void {
    this.location.back();
  }
}
```

A ```back()``` függvénnyel egy oldalt visszafelé navigálunk a platform history-jában. A ```forward()``` függvénnyel pedig előremutató navigációt tudunk végrehajtani a platform history-jában.

## Szerkesztők

Forráskód és videó: Kokrehel Grácián (kokrehel@inf.u-szeged.hu)

Leírás: Jánki Zoltán R. (jankiz@inf.u-szeged.hu)
