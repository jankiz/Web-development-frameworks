# 9. gyakorlat - Forms

## Bevezető

Jelen gyakorlati anyag az Angular űrlapok (Form-ok) használatát hivatott bemutatni.

## Projekt futtatása

1. Repository klónozása (pl.: ```$ git clone https://github.com/jankiz/Web-development-frameworks.git```)
2. Navigálás a mappába: ```$ cd web-development-frameworks/09\ -\ Forms/```
3. Függőségek telepítése: ```$ npm install```
4. Projekt futtatása: ```$ ng serve```

## Videó
[LINK](https://youtu.be/3wnQfFTvnTc)

## Angular Forms

Az Angular keretrendszer, mint a modern web-alkalmazások egyik vezető keretrendszere komoly hangsúlyt fektet a beviteli mezők kezelésére. Ezek összefogására ún. űrlapot szokás használni, amely magába foglal egy oldalon megjelenő valamennyi input mezőt és az adatok továbbításáért vagy manipulációjáért felelős gombokat.

A Form-ok segítségével egyszerűen köthetjük az adatokat egy adatmodellhez, vagy az adatmodellt megvalósító interfészhez/osztályhoz. Ezen a képességen túl egyszerűen paraméterezhetővé válnak az input mezők oly módon, hogy egyszerű logikát is tudunk a kitöltésekhez társítani (pl.: validátorok). Az adatok nem egyszerű változókban lesznek eltárolva, hanem maga az űrlap egy objektumot fog megvalósítani.

## Form modulok

A Form-okhoz kapcsolódóan rengeteg implementáció készült. A következőkben az ezeket átfogó modulokat fogjuk röviden áttekinteni.

### FormsModule

A FormsModule talán már ismerős lehet a kétirányú-adatkötés (ngModel direktíva) részből. Ez tartalmazza az alap Form elemeket képességeket (pl.: a kétirányú-adatkötést)
Az importálása abban a modulban kell, hogy megtörténjen, amelyik modulhoz tartozó komponensben szeretnénk a változókat és a beviteli mezőket összerendelni.

> registration.module.ts

```typescript
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule, FormsModule]
})

export class RegistrationModule { }
```

### ReactiveFormsModule

A ReactiveFormsModule a már ismert kétirányú-adatkötésen túl mutat. Ez bevezeti a modell alapú megközelítést, továbbá ezzel követhetőek könnyedén a beviteli mezők állapotai és annak változásai. Tartalmazza az alap Form elemeket: FormGroup, FormControl, stb.
Az importálása abban a modulban kell megtörténnie, amelyik modulhoz tartozó komponensben használni szeretnénk a Form típusok valamelyikét.

> registration.module.ts

```typescript
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule, ReactiveFormsModule]
})

export class RegistrationModule { }
```

### MatFormFieldModule

Az űrlapok előre design-olt formáit tartalmazza a Material ```MatFormFieldModule```-ja. Az elkészített form field komponens formájában került megvalósításra, amelyet a ```<mat-form-field></mat-form-field>``` selector segítségével tölthetünk be, és direktívák segítségével paraméterezhetünk fel.

> registration.module.ts

```typescript
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule, MatFormFieldModule]
})

export class RegistrationModule { }
```

### MatInputModule

A beviteli mezők előre design-olt formáit tartalmazza a Material ```MatInputModule```-ja. Az elkészített beviteli mező direktíva formájában került megvalósításra, amelyet az ```<input />``` HTML5 tag-hez rendelhetünk hozzá. A direktíva a ```matInput``` névre hallgat.

> registration.module.ts

```typescript
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule, MatInputModule]
})

export class RegistrationModule { }
```

## Form implementáció

A következő részben a Form elemeit vizsgáljuk meg részletesen.

### FormGroup, FormArray, FormControl

A teljes űrlapot magába foglaló elem a FormGroup, amely tartalmazhat további FormGroup-okat, FormArray-eket és újabb FormControl-okat. Ha ezeknek az objektum-orientált megfeltetését keressük, akkor az alábbi táblázat segíthet megérteni a Form-ok hierarchiáját.

| Angular Form elem | Objektum-orientált programkód elem |
|:-------------:|:-------------:|
| FormGroup | objektum |
| FormArray | tömb |
| FormControl | elemi adattípus |

A Form-ok inicializálása ebben az esetben a komponens kódban történik meg, majd ezt mint komponens adattagot tudjuk hozzákötni a HTML5 form elemekhez.

> registration.component.ts

```typescript
import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password1: new FormControl(),
    password2: new FormControl()
  });
}
```

> registration.component.html

```html
<form [formGroup]="form" (ngSubmit)="registration()">
  <mat-form-field class="max-width">
    <mat-label>Felhasználónév</mat-label>
    <input matInput type="text" name="nickname" placeholder="Pl. Patko85" required formControlName="username">
  </mat-form-field>
  <mat-form-field class="max-width">
    <mat-label>E-mail</mat-label>
    <input type="email" name="email" matInput placeholder="Pl. pat@example.com" formControlName="email">
  </mat-form-field>
  <mat-form-field class="max-width">
    <mat-label>Jelszó</mat-label>
    <input type="password" name="password" matInput placeholder="Jelszó" formControlName="password1">
  </mat-form-field>
  <mat-form-field class="max-width">
    <mat-label>Jelszó újra</mat-label>
    <input type="password" name="password" matInput #password2 placeholder="Jelszó újra" formControlName="password2">
  </mat-form-field>
  <button type="submit" mat-raised-button color="primary" class="max-width" [disabled]="form.invalid">REGISZTRÁCIÓ</button>
</form>
```

Jelen példában a FormGroup magát az űrlapot foglalja össze. A FormControl-ok (```username, email, password1, password2```) az egyes input mezőkért felelnek az alkalmazásban.

A HTML oldalon a ```form``` komponens adattagot a ```<form></form>``` tag-hez rendeljük hozzá a ```[formGroup]``` input direktíván keresztül. Ez a hierarchiában a legkülső elem. Az egyes FormControl-okat az input-okhoz rendeljük a ```formControlName``` direktíván keresztül. Ezzel megvalósul a kétirányú adatkötés, és nincs szükség az ```[(ngModel)]``` direktívára.

A form adatainak továbbítása a submit utasítással történik meg. Ezt a form-ok esetében egy ```(ngSubmit)``` EventEmitter objektummal küldjük vissza, és a form-okat kezelő modulok kezelik az elfogott adatokat események formájában.

### Egyéb Form képességek

#### Validator

Az űrlapoknál nagyon gyakran feltételekhez kötjük egy beviteli mező tartalmát (pl.: kötelező kitölteni, csak szám írható be vagy legalább 6 karakter hosszú string szükséges). Ezek ellenőrzését hivatottak kezelni az ún. validator-ok. Valamennyi validator egy feltételen alapul, azonban vannak, amelyeknek a megadása egyszerű (előre implementált), illetve vannak, amelyeket a fejlesztőnek kell implementálnia.

> Például a kötelezően kitöltendő mezőket a ```required``` validator kezeli, de egy IP-címet váró mezőhöz a fejlesztőnek kell írnia egy reguláris kifejezést, ami az IP-cím mintát pontosan leírja.

> registration.component.ts

```typescript
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(),
    email: ('', [Validators.required, Validators.email]),
    password1: new FormControl('', [Validators.minLength(6), Validators.required]),
    password2: new FormControl('', [Validators.minLength(6), Validators.required])
  });
}
```

A fenti kódrészletben a ```form``` adattag 3 mezője is kapott validator-t. A ```Validators``` osztály ugyan függvényeket definiál a mezők validálására, mi viszont konkrétan a függvény nevét adjuk át a FormControl-nak (nem függvényhívás formájában). Néhány fontosabb validátor és annak használata:

- ```required```: kötelezően kitöltendő mezők esetén
- ```email```: email reguláris kifejezés alapján ellenőrzi a mező tartalmát
- ```minLength(x)```: minimum x megadandó karakterszám a beviteli mezőben
- ```pattern(x)```: x reguláris kifejezés mentén ellenőrzi a beviteli mező tartalmát (itt adható meg tetszőleges validator)

#### FormGroup adattagok és függvények

##### value

Adott FormGroup control objektumait tudjuk lekérdezni, és azok értékeit.

##### valid()

Boolean értékkel visszatér, hogy a teljes FormGroup tartalma valid-e (igaz, ha valid).

##### invalid()

Boolean értékkel visszatér, hogy a teljes FormGroup tartalma invalid-e (igaz, ha invalid).

#### FormControl adattagok és függvények

##### valueChanges

A FormControl objektumok tartalmát vizsgálja, hogy abban történt-e változás. Változás esetén egy Observable formájában küld eseményt.

##### setValidators()

Ezen keresztül rendelhető hozzá egy validator egy létező FormControl-hoz.

##### valid()

Boolean értékkel visszatér, hogy az adott FormControl tartalma valid-e (igaz, ha valid).

##### invalid()

Boolean értékkel visszatér, hogy az adott FormControl tartalma invalid-e (igaz, ha invalid).

## Szerkesztők

Forráskód és videó: Kokrehel Grácián (kokrehel@inf.u-szeged.hu)

Leírás: Jánki Zoltán R. (jankiz@inf.u-szeged.hu)
