
# 12. gyakorlat - Authentication & AuthGuard

## Bevezető

Jelen gyakorlati anyag az azonosítást és a végpontok levédését mutatja be.

## Projekt futtatása

1. Repository klónozása (pl.: ```$ git clone https://github.com/jankiz/Web-development-frameworks.git```)
2. Navigálás a mappába: ```$ cd web-development-frameworks/12\ -\ Authentication\ &\ AuthGuard/```
3. Függőségek telepítése: ```$ npm install```
4. Projekt futtatása: ```$ ng serve```

## Videó

[LINK](https://youtu.be/ZCQd3JcOJlc)

## Autentikáció

Az autentikáció (vagy azonosítás) egy esszenciális pontja a modern web-alkalmazásoknak, és ezeknek is számos módja ismert. A legegyszerűbb és legrégebbi megoldás az email/jelszó páros alapú hitelesítés, de esetenként kényelmetlen lehet sok különböző fiók neveket és jelszavakat megjegyezni. Épp ezért az azonosítást elvégeztethetjük egy megbízható szolgáltatóval is (pl.: a Google-le vagy Apple-lel, stb.).

Az azonosítás a szerver oldal feladata, viszont a mai szervermentes architektúrákban, ezek már fejlesztés nélkül, csupán rövid konfigurációval megvalósíthatóak. A Google Firebase platformja is lehetőséget kínál az azonosításra egy önálló autentikációs modullal (szolgáltatással), amely nemcsak a hagyományos email/jelszó alapú azonosítást teszi lehetővé, de támogatja valamennyi nagy szolgáltató általi hitelesítést is.

## AngularFireAuth

A Firebase hivatalos Angular SDK-ja tartalmazza az autentikációs modul eléréséhez szükséges függvényeket egy Angular Service-be burkolva. Az AngularFire inicializálásán túl a Firebase valamennyi szolgáltatása önálló modulként található meg, így az azonosításért felelőset is importálnunk kell valamely modulunkban.

> app.module.ts

```typescript
import { AppRoutingModule } from './app-routing.module';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
```

A modul importálását követően maga a szolgáltatás már a konstruktoron keresztül használható tetszőleges osztályban, amelyik a modulhoz tartozik vagy hierarchiailag alá van rendelve.

> auth.service.ts

```typescript
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private afAuth: AngularFireAuth) { }

    async logout(): Promise<void> {
        await this.afAuth.signOut();
    }

    login(email: string, password: string): Promise<any> {
        return this.afAuth.signInWithEmailAndPassword(email, password);
    }

    authenticated(): boolean {
        return this.afAuth.authState !== null;
    }

    currentUserObservable(): any {
        return this.afAuth.authState;
    }
}
```

Főbb adattagok és függvények:

| adattag | használat |
|:-------------:|:-------------:|
| ```authState``` | Megmutatja, hogy van-e bejelentkezett felhasználó. Ha igen, akkor tartalmazza a felhasználó objektumot Observable-be burkolva. |
| ```currentUser``` | Az aktuálisan bejelentkezett felhasználó objektum Promise-ba burkolva. |
| ```user``` | Az aktuálisan bejelentkezett felhasználó objektum Observable-be burkolva. |

| függvény | használat |
|:-------------:|:-------------:|
| ```createUserWithEmailAndPassword```| Email/jelszó alapú regisztrációt valósít meg. |
| ```signInWithEmailAndPassword``` | Felhasználó beléptetése email/jelszó párossal. |
| ```signOut``` | Felhasználó kijelentkeztetése. |

## AuthGuard

Egy web-alkalmazásnál szintén fontos az, hogy illetéktelen felhasználók ne tudjanak megnyitni olyan oldalakat, amelyek mögött olyan adat található, amelyekre nem jogosultak. Ez akár lehetne jogosultságkezelés problémaköre is, viszont ez teljesen más, ha csak egyszerűen a regisztrált és a nem-regisztrált felhasználók között szeretnénk különbséget tenni.

Az olyan oldalakat (végpontokat), amelyeket csak regisztrált és autentikált felhasználóknak szeretnénk elérhetővé tenni, azokat ún. AuthGuard-okkal szoktuk védeni. Az AuthGuard feladata gyakorlatilag az, hogy egy végpont megnyitásakor ellenőrzi, hogy a felhasználó azonosította-e már magát. Ennek a logikája természetesen a fejlesztő kezében van.

### AuthGuard implementáció

#### AuthGuard service megvalósítás

> auth.guard.ts

```typescript
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private auth: AuthService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.currentUserObservable().pipe(
            take(1),
            map(user => !!user),
            tap(loggedIn => {
                if (!loggedIn) {
                    this.router.navigate(['/login']);
                }
            })
        );
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}
```

Az AuthGuard feladata a CanActivate interfész implementálása. Amennyiben vannak alárendelt végpontok is (alacsonyabb szintű router module-ok), akkor a CanActivateChild interfész is szükséges lehet.

Mindkét interfész rendelkezik egy kötelezően implementálandó függvénnyel, ezek a ```canActive()``` és a ```canActivateChild()``` neveket viselik. Paraméterezésük megegyezik, az aktuális route-ot és annak állapotát kell, hogy megkapják. A logika a fejlesztő kezében van, a mi esetünkben a bejelentkezett felhasználót ellenőrizzük, ami egy Observable-be van burkolva.

#### Route levédése

> app-routing.module.ts

```typescript
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

> home-routing.module.ts

```typescript
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'splash', pathMatch: 'full' },
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'splash',
                loadChildren: () => import('./../splash-screen/splash-screen.module').then(m => m.SplashScreenModule),
            },
            {
                path: 'movies',
                loadChildren: () => import('./../movie/list/movie-list.module').then(m => m.MovieListModule),
            },
            {
                path: 'games',
                loadChildren: () => import('./../game/list/game-list.module').then(m => m.GameListModule),
            }
        ],
        canActivateChild: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }
```

Ahogy a példákban is látható a végpont levédése csupán az elkészített AuthGuard megadásával történik meg. A definiált végpont (route) ```canActivate``` kulcsában adhatjuk meg az AuthGuard-okat (akár többet is), amelyek eldöntik, hogy a megnyitásra jogosult-e a felhasználó. Ennek a logikája a ```canActivate()``` függvényben van definiálva. Gyermek modulok betöltését pedig a ```canActivateChild``` kulccsal és a hozzátartozó AuthGuard-ok megadásával tehetjük meg.

## Szerkesztők

Forráskód és videó: Kokrehel Grácián (kokrehel@inf.u-szeged.hu)

Leírás: Jánki Zoltán R. (jankiz@inf.u-szeged.hu)
