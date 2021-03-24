# 5. gyakorlat - Angular Material

## Bevezető

Jelen gyakorlati anyag az Angular Material használatát hivatott bemutatni.

## Projekt futtatása

1. Repository klónozása (pl.: ```$ git clone https://github.com/jankiz/Web-development-frameworks.git```)
2. Navigálás a mappába: ```$ cd web-development-frameworks/05\ -\ Angular\ Material/```
3. Függőségek telepítése: ```$ npm install```
4. Projekt futtatása: ```$ ng serve```

## Videó
[LINK](https://youtu.be/xQnCNLc75C0)

## Angular Material

Az Angular Material egy UI komponenseket tartalmazó könyvtár, amely a különböző előre elkészített, stílusjegyekkel felruházott komponenseket modulokba szervezi. Ilyen tekintetben külön modulként található meg egy kártya (```mat-card```) komponens, egy ikon (```mat-icon```). Vannak természetesen olyan komponensek is, amelyek csak egyszerű direktívaként jelennek meg (pl.: MatButton), de ezek is önálló modulokat formálnak?

Hogy ez miért jó? Azért, mert csak azok a modulok és komponensek töltődnek be a memóriába, amelyeket tényleg használni is szeretnénk.

## Fejlesztési lépések

Az alábbi szekcióban lépésről lépésre megvizsgáljuk a projekt forráskódjának főbb részeit.

### Angular Material telepítési útmutató

Az Angular Material párhuzamosan fejlődik a keretrendszerrel, és az Angular 5 verziótól vált hivatalosan is támogatottá, illetve stabil verzióval elérhetővé. A párhuzamos fejlesztés annyit jelent, hogy a Material fő verziószáma (az első számjegy) együtt mozog az Angular keretrendszerével. Ezt fontos tudni, ugyanis a Material csak ezáltal tud 100%-ig kompatibilis lenni a keretrendszerrel. Mielőtt telepítjük a Material-t az NPM segítségével, győződjünk meg arról, hogy milyen verziójú Angular library-ket használunk (ezt a package.json és a package-lock.json fájlokból kiolvashatjuk). Ha ez ismert, akkor el tudjuk dönteni, hogy melyik Material verziót kell telepítenünk. Ha az Angular csomagok (pl.: ```@angular/core```) és a Material fő verziószáma nem egyezik meg, számos fordítási és futási hibát kaphatunk. A Material [hivatalos oldalán](https://material.angular.io/) található leírások is verziókhoz vannak kötve, így információ gyűjtés során figyeljünk arra, hogy a megfelelő Material verzió leírását böngésszük!

Jelen tananyag az Angular 11 fő verziószámú csomagokra épít, így a használt Material verzió is 11-es fő verziószámmal bír. Ha a Material, mint függőség telepítésekor a 11-es fő verziójú csomagot szeretnénk telepíteni, akkor az alábbi módon rögzíthetjük a telepítendő csomag verziószámát. A verziószámokról bővebb tájékoztatást ad az [NPM repository Versions szekciója](https://www.npmjs.com/package/@angular/material)

```sh
$ npm install --save @angular/material@11
```

A telepítéshez használjuk az Angular Material hivatalos oldalán található parancsokat és megemlített csomagokat a hibamentes fejlesztés érdekében.

### Néhány főbb Material elem használata

#### Button
A Material rendelkezésre bocsát előre megszerkesztett nyomógomb stílusokat. Ezek elérhetőek a ```MatButtonModule```-on keresztül. Mivel ez egy modul, így ezt nekünk egy modulban kell importálnunk. Ennek a helye lehet akár a külső ```AppModule``` is, de ebben az esetben ezt minden alárendelt modul el fogja érni (be fog töltődni). Például, ha ezeket a stílusjegyeket csak a Login oldalon kívánjuk használni, akkor elegendő kizárólagosan az ahhoz tartozó modulban importálni (```login.module.ts```).

> login.module.ts

```typescript
import { MatButtonModule } from  '@angular/material/button';
import { NgModule } from  '@angular/core';
import { CommonModule } from  '@angular/common';
import { LoginComponent } from  './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [LoginComponent],
})

export class LoginModule { }
```

> login.component.html

```html
<button mat-button>REGISZTRÁCIÓ</button>
```

A MatButtonModule a ```<button></button>``` HTML5 elemhez hozzárendelhető direktívák formájában valósítja meg a stílusjegyeket. Ilyen direktíva például a ```mat-button``` és a ```mat-raised-button```.

#### Card

A kártyák (card-ok) egy igen közkedvelt UI komponenst valósítanak meg, mobile-first megközelítésben gyakran alkalmazott technika, amellyel egy kvázi általános konténer készül, amely szövegek, képek megjelenítésére kíváló. Ennek használatára szintén a ```login.module.ts``` fájlban találunk példát.

> login.module.ts

```typescript
import { MatCardModule } from  '@angular/material/card';
import { NgModule } from  '@angular/core';
import { CommonModule } from  '@angular/common';
import { LoginComponent } from  './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, MatCardModule],
  exports: [LoginComponent],
})

export class LoginModule { }
```

A kártyák egy ```mat-card``` selector-ral ellátott komponensben kerültek implementálásra. Ennek számos alárendelt komponense van, amellyel egy kártya főbb elemei mai design elveknek megfelelően (mobile-first megközelítésben) formázottan jelennek meg. Ilyen alárendelt elemek például:

- ```<mat-card-header></mat-card-header>```: Kártya fejléc
- ```<mat-card-footer></mat-card-footer>```: Kártya lábléc
- ```<mat-card-content></mat-card-content>```: Kártya fő tartalma
- ```<mat-card-title></mat-card-title>```: Kártya címe (header-ön belül)
- ```<mat-card-subtitle></mat-card-subtitle>```: Kártya alcíme (header-ön belül)

#### Icon

Napjainkban egyre gyakoribb az ikonok használata hosszú szövegek kiírása helyett. Például a telefonszám szöveg helyett egy telefon ikonnal rengeteg helyet megtakaríthatunk, és abszolút informatív a felhasználó számára. Az ikonok tárháza ugyan véges, de mégis olyan széles a paletta, hogy szinte bármit kifejezhetünk velük. Az elérhető ikonok ezen a [linken](https://material.io/resources/icons/?style=baseline) elérhetőek. Csupán az ikon nevét kell megadnunk a ```<mat-icon></mat-icon>``` tag-ek között, és a ```MatIconModule```-t kell importálnunk a kívánt modulban.

> movie-card.module.ts

```typescript
import { MatIconModule } from  '@angular/material/icon';
import { NgModule } from  '@angular/core';
import { CommonModule } from  '@angular/common';
import { MovieCardComponent } from  './movie-card.component';

@NgModule({
  declarations: [MovieCardComponent],
  imports: [CommonModule, MatIconModule],
  exports: [MovieCardComponent]
})

export class MovieCardModule { }
```

> movie-card.component.html

```html
<mat-icon>star_outline</mat-icon>
```

#### Toolbar

A Toolbar Material komponens a web-alkalmazások fejléceinek, címeinek megjelenítésére szolgáló konténer. Leggyakrabban a menüvel vagy konkrétan az ún. hamburger-menüvel együtt kerül felhasználásra ez a komponens felül rögzített formában annak érdekében, hogy az oldalunk bármely pontján járva könnyedén tudjunk navigálni más oldalra az alkalmazáson belül. 

> nav.module.ts

```typescript
import { MatToolbarModule } from  '@angular/material/toolbar';
import { NgModule } from  '@angular/core';
import { CommonModule } from  '@angular/common';
import { NavComponent } from  './nav.component';

@NgModule({
declarations: [NavComponent],
imports: [CommonModule, MatToolbarModule],
exports: [NavComponent],
})
export class NavModule { }
```

> nav.component.html

```html
<mat-toolbar>
  <mat-toolbar-row>Some menu comes here...</mat-toolbar-row>
</mat-toolbar>
```

#### Menu

Mint ahogy azt beharangoztuk a Toolbar-nál, a Material rendelkezik előre elkészített menü komponenssel is. Ezt a ```MatMenuModule```-on keresztül érhetjük el. A legördülő menük egy kicsit komplexebb komponensek, ugyanis ennek megjelenítésére, vagy elrejtésére felhasználói interakcióra van szükség (pl.: egy klikk eseményre).

> nav.module.ts

```typescript
import { MatMenuModule } from  '@angular/material/menu';
import { NgModule } from  '@angular/core';
import { CommonModule } from  '@angular/common';
import { NavComponent } from  './nav.component';

@NgModule({
declarations: [NavComponent],
imports: [CommonModule, MatMenuModule],
exports: [NavComponent],
})
export class NavModule { }
```

> nav.component.html

```html
<button mat-button [matMenuTriggerFor]="menu">
  Username&nbsp;<mat-icon>arrow_drop_down</mat-icon>
</button>

<mat-menu #menu="matMenu">
  <button mat-menu-item disabled>
    <mat-icon>person</mat-icon><span>Profil</span>
  </button>
  <button mat-menu-item disabled>
    <mat-icon>settings</mat-icon><span>Beállítások</span>
  </button>
  <button mat-menu-item>
    <mat-icon>arrow_back</mat-icon><span>Kijelentkezés</span>
  </button>
</mat-menu>
```

A fenti kódban létrehoztunk egy nyomógombot, amely a Username szöveget és egy lefelé mutató nyilat tartalmaz. A gombra kattintva a ```[matMenuTriggerFor]``` direktíva segítségével a ```menu``` változóval ellátott Material komponenst keresi, aminek ```mat-menu``` selector-ral kell legyen ellátva a helyes működés érdekében.
A ```mat-menu``` komponens meghívásakor létrejövő ```#menu``` egy lokális változó, amelyet kizárólag ebben a komponensben (```nav.component.html```) fogunk elérni, és erre hivatkozik pontosan a ```matMenuTriggerFor``` direktíva.
FONTOS! A ```menu``` lokális változónak a ```matMenu```-t kell értékül adni!

A menü egyes elemeit a ```mat-menu-item``` direktíva segítségével tudjuk megfelelő módon megjeleníteni és pozícionálni.

#### Dialog

A felugró dialógus ablakokat sem kell szerencsére a fejlesztőnek magának megírnia, hiszen a Material erre is biztosít lehetőséget, csak használni kell. Ez egy szolgáltatás formájában A ```MatDialog``` egy szolgáltatás (service), amely a ```MatDialogModule```-ban található. A szolgáltatáson keresztül egy tetszőleges Angular komponens ültethető be a dialógus ablakba (ez a forráskódunk esetében a ```GameAddComponent```), továbbá a dialógushoz rendelt eseményeket tudjuk itt kezelni (pl.: dialógus ablak bezására). Az alábbi példa segít ezt jobban megérteni.

> home.component.ts

```typescript
import { Component } from  '@angular/core';
import { MatDialog } from  '@angular/material/dialog';
import { GameAddComponent } from  '../game/add/game-add.component';
import { GAMES } from  './../../shared/database/game.database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  games = GAMES;

  constructor(private dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(GameAddComponent, {});
    // tslint:disable-next-line: deprecation
    dialogRef.afterClosed().subscribe(result  => {
      if (result && result.title) {
        this.movies.push(result);
      }
      dialogRef.unsubscribe();
    });
  }
}
```

> home.component.html

```html
<button mat-fab class="action-btn" (click)="openDialog()">
  <mat-icon>add</mat-icon>
</button>
```

A dialógus megnyitását egy gombra kattintáshoz szeretnénk kötni. Ehhez a dialógus megnyitását egy külön függvénybe szervezzük, ez lesz az ```openDialog()```  metódus a ```HomeComponent```-ben. A metódus meghívását úgy köthetjük egy UI elem kattintásához, hogy a ```(click)``` kimeneti direktívához rendeljük a metódust, ez található a ```home.component.html``` fájl ```<button>``` tag-jénél. Ilyen klikk-esemény tetszőleges HTML5 tag-hez hozzárendelhető.

Az ```openDialog()``` metódust a HTML kódot hordozó komponensben kell létrehoznunk. A MatDialog meghívása egy szolgáltatáson (service-en) keresztül valósul meg. Szolgáltatásokról még ugyan nem tanultunk, ezek később kerülnek elő, azonban a használathoz fontos azt tudni róluk, hogy ezek is TypeScript osztályok, amelyek használatához példányosítanunk kell őket. FONTOS! A szolgáltatások kvázi Singleton-ként működnek, azaz egy példányban vannak jelen a teljes projektben, így csak a konkrét példányt kell egy adattag formájában elérnünk. Ennek egy speciális módja az Angular-ban az osztály privát paramétereként történő átadása a konstruktornak.

```typescript
constructor(private dialog: MatDialog) { }
```

Így a ```MatDialog``` szolgáltatás és a benne definiált adattagok, metódusok elérhetőek a komponens privát adattagjaként. A ```MatDialog``` szolgáltatás ```open()``` metódusa egy dialógusablakot nyit meg, melynek tartalma egy tetszőlegesen megválasztott komponens HTML és TypeScript kódjával töltődik fel. Ez jelen példában a ```GameAddComponent```. Az ```open()``` metódus visszatér a konkrét dialógusablakra mutató referenciával, ezt tároljuk el a ```dialogRef``` konstansban. A dialógusablakok eseményeinek (pl.: ablak bezárása (```afterClosed()```) bekövetkeztének időpontjára nincs garancia (nem determinisztikus, az sem biztos, hogy megtörténik), ezért ezeknek a kvázi figyelését aszinkron műveletekkel érhetjük el. Az ilyen eseményekre  feliratkozhatunk a ```subscribe()``` függvénnyel, mely abban az esetben produkál eredményt, ha az esemény bekövetkezik, és ez elérhető a komponensünk számára is. Ezt tartalmazza a ```result``` objektum. Amennyiben ez a ```result``` elérhető, úgy a mögötte megadott kódblokk kerül lefuttatásra. Így garantálhatjuk azt, hogy az adat (jelen esetben a dialógus által produkált eredmény) elérhető egy adott időpillanatban, és az így létrejövő objektumok elérhetőek a komponensben.

Annak érdekében, hogy ezek a feliratkozások ne okozzanak memóriaszivárgást (memory-leak), ha nincs rájuk többé szükségünk, javasolt leiratkozni róluk az ```unsubscribe()``` metódussal.

#### Table

A Material táblázatos megjelenítésre minden táblázat elem direktívák formájában kerül megvalósításra, amelyek az alap HTML5 táblázat elemekhez rendelhető hozzá. Ezek a direktívák a ```MatTableModule``` importálásával érhetőek el.

> details.module.ts

```typescript
import { NgModule } from  '@angular/core';
import { CommonModule } from  '@angular/common';
import { DetailsComponent } from  './details.component';
import { MatTableModule } from  '@angular/material/table';

@NgModule({
  declarations: [DetailsComponent],
  imports: [CommonModule, MatTableModule],
  exports: [DetailsComponent],
})
export class DetailsModule { }
```

> details.component.ts

```typescript
import { Component } from  '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const  ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}
```

> details.component.html

```html
<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

  <ng-container matColumnDef="position">
    <th mat-header-cell *matHeaderCellDef> No. </th>
    <td mat-cell *matCellDef="let element"> {{element.position}} </td>
  </ng-container>

  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef> Name </th>
    <td mat-cell *matCellDef="let element"> {{element.name}} </td>
  </ng-container>

  <ng-container matColumnDef="weight">
    <th mat-header-cell *matHeaderCellDef> Weight </th>
    <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
  </ng-container>

  <ng-container matColumnDef="symbol">
    <th mat-header-cell *matHeaderCellDef> Symbol </th>
    <td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
```

A Material táblázat természetesen sokkal bővebb palettával rendelkezik, mint ami itt bemutatásra kerül. Ezek részletes leírása a Material [hivatalos oldalán](https://material.angular.io/components/table/overview) megtalálható.

Az alap Material táblázat képességek a ```mat-table``` direktívában vannak definiálva. A táblázathoz hozzárendelhető egy ```[dataSource]``` input direktíva, amellyel megadható maga az adatforrás (jellemzően tömb formában), amelynek elemeivel fel szeretnénk tölteni a táblázatunkat. Értékül megadható a konkrét komponens adattag (tömb), amely az adatokat hordozza. Ez a mi esetünkben szintén ```dataSource``` névre hallgat.

Az ```<ng-container></ng-container>``` egy olyan logikai konténert hoz létre, amely tényleges DOM elemként sosem jelenik meg, azonban logikailag mégis elszeparálja az egymástól különálló elemeket. Ez tökéletesen használható akár lokális változók (```#```) létrehozására ugyanazzal a névvel (pl.: ```let element```). Itt a táblázat egyes oszlopait szeparáljuk el egymástól. A ```matColumnDef``` direktívában adjuk meg, hogy a táblázat egyes sorainak (objektumainak) a cellái (elemei) melyik objektum adattaghoz (kulcshoz) tartoznak.

A ```<th>``` és ```<td>``` tag-ek már konkrét cellákat jelölnek a táblázaton belül, így ezeket a megfelelő ```mat-header-cell``` és ```mat-cell``` direktívákkal látjuk el a Material stílusjegyek használata érdekében. A fejlécek és az egyes cellák elemeinek tartalmát ```*matHeaderCellDef``` és a ```*matCellDef``` strukturális direktívákkal jelöljük meg, függően attól, hogy fejlécről vagy egyszerű celláról van szó. A létrehozott ```element``` lokális változó gyakorlatilag végigiterál az átadott ```dataSource``` tömbön, és minden iterációban felveszi a tömb egy adott elemének értékét.

Joggal felmerül a kérdés, hogy vajon ebben a táblázatban hol vannak definiálva az egyes sorok...

Mivel minden cellatartalom és fejléctartalom kulcsok mentén vannak definiálva, ezért a sorok is hasonló elven kerülnek inicializálásra. Az egyes oszlopok és sorok megfelelő összerendeléséhez a sorokat is definiálni kell, ezt hivatottak megcsinálni a ```*matHeaderRowDef``` és a ```*matRowDef``` strukturális direktívák. A ```displayedColumns``` komponens adattag kizárólag az oszlopokhoz rendelt kulcsokat tartalmazzák (tömb formában), amelyekkel a ```dataSource``` tömbben lévő objektumok egyes adattagjait (kulcsait) megtalálják.

Ugyan zavaró lehet, hogy az egyes HTML5 elemek össze-vissza kerülnek implementálásra (pl.: ```<td>``` elem nincs ```<tr>``` elembe ágyazva), de voltaképp a ```mat-table``` direktíva minden összerendelést korrekt módon végrehajt.

## Szerkesztők

Forráskód és videó: Kokrehel Grácián (kokrehel@inf.u-szeged.hu)

Leírás: Jánki Zoltán R. (jankiz@inf.u-szeged.hu)
