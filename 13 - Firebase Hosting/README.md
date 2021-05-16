# 13. gyakorlat - Firebase Hosting

## Bevezető

Jelen gyakorlati anyag az web-alkalmazások host-olását mutatja be a Firebase platform segítségével.

## Projekt futtatása

1. Repository klónozása (pl.: ```$ git clone https://github.com/jankiz/Web-development-frameworks.git```)
2. Navigálás a mappába: ```$ cd web-development-frameworks/13\ -\ Firebase\ Hosting/```
3. Függőségek telepítése: ```$ npm install```
4. Projekt futtatása: ```$ ng serve```

## Videó

[LINK](https://youtu.be/DlGGjDoARMw)

## Hosting

Az Angular-os fejlesztések során láthattuk, hogy a forráskódunk változtatásának hatására a teljes projekt fordítása ismételten megtörténik, majd egy adott URL-en keresztül (domain:port párossal) megnyitható egy böngészőben.

Ami ilyenkor történik, az a meglévő TypeScript és HTML kódhalmaz együttesen átfordul JavaScript és HTML kóddá, amely egy böngésző számára is értelmezhető. Annak érdekében, hogy akár komplexebb logikát is tudjunk a böngészőben futtatni, és a kéréseinket ki tudja szolgálni az alkalmazás, az Angular keretrendszer az ```ng serve``` hatására olyan, mintha egy HTTP szervert futtatna a gépünkön. Ez az egész memóriában történik, amely megszólítható a 4200-as porton, a localhost domain pedig a saját lokális IP-címünkre mutat.

Ennek következtében, amit látunk a böngészőben, az egy fordított kód, amit egy "HTTP szerver" küld a böngészőnek a HTTP GET kérés következtében.

Ez azonban csak lokálisan érhető el, de szeretnénk, hogy az alkalmazásunk a világhálón keresztül bárhol elérhető lenne. Az elv hasonló, egy HTTP szerverre van szükség, viszont a mi saját 4200-as portunk nem elérhető alapértelmezés szerint akárki számára. Ezért az alkalmazásunk valahol host-olnunk kell. A Firebase platform erre kínál lehetőséget ingyenesen a **Firebase Hosting** szolgáltatáson keresztül.

## Hosting előkészületek

Ha egy JavaScript-alapú web-alkalmazást szeretnénk host-olni, akkor a forráskódunkból először is elő kell állítanunk azt a JS+HTML kódhalmazt, amelyet egy böngésző értelmezni tud.

Az ```ng serve``` esetében ez a kódhalmaz csak temporálisan jön létre a memóriában, azaz fizikailag nem léteznek a fájlok. Ahhoz, hogy ezeket a kódokat fájlba tudjuk menteni, csak egy build-elésre van szükségünk. Az Angular projektek build-elését az ```ng build``` paranccsal válthatjuk ki. Ennek eredményeként egy JavaScript bundle készül a projektről, amely tartalmazza a forráskódot egy minify-olt verzióban, esetenként map fájlokkal és HTML fájlokkal tarkítva. A ```ng build``` parancs mögött megadható a konkrét környezet, amely különböző speciális fordítási technikákat tartalmazhat (pl.: production build esetén ```ng build --prod```).

Jellemzően a HTTP szervereknek egy ilyen végtermékre van szükségük, így ezt a parancsot érdemes használni kitelepítéskor. A környezet részletes konfigurációja megtalálható az ```angular.json``` fájlban.

A környezetek során figyelni kell arra, hogy a környezeti változók (environments.ts és environments.prod.ts) mit tartalmaz, hiszen ezek nagyban befolyásolják a program helyes működését.

## Firebase Hosting

A Firebase platform egy szolgáltatása a Firebase Hosting, amely lehetővé teszi verziózottan web-alkalmazások deploy-olását és host-olását egy Google szerveren. A Firebase projekt alapján létrejön egy domain, amely elérhető bárki számára a világhálón. A szolgáltatás rendelkezik ingyenes kvótával, tehát bárki számára elérhető.

A deploy-hoz szükség van tehát az előállt JavaScript bundle-re ls HTML kódokra, valamint egy index.html fájlra. A deploy-t a Firebase CLI-n keresztül hajthatjuk végre.

A Firebase Hosting URL-ek domain sémája a projekt azonosítójából állnak elő az alábbi formában: ```https://project-id.web.app```. Ettől el lehet térni természetesen, ez konfiguráció kérdése.

## Firebase CLI használata

A Firebase CLI telepítése az alábbi paranccsal történik: ```$ npm install -g firebase-tools```

A sikeres telepítést követően a parancssorban a ```firebase``` parancs hatására megjelenik a parancs használatának a leírása.

A Firebase projektek CLI-n keresztüli megszólításához szükséges egy autentikáció a ```firebase login``` parancs segítségével. Ez egy böngésző ablakot nyit és végez átirányítást, ahol a Google fiókunkkal be tudunk lépni. A terminálba visszatérő token segítségével tudunk hozzáférni a projektjeinkhez.

Egy Angular projektet úgy köthetünk legegyszerűbben egy Firebase projekthez, hogy a projekt mappa gyökerében kiadjuk a ```firebase init``` parancsot. Ez a parancs végigvezet bennünket egy kvázi "varázslón", és elvégezhetjük a hozzárendelést. Az inicializálás eredményeképp létrejön egy ```firebase.json``` és egy ```.firebaserc``` rejtett fájl.

A ```.firebaserc``` fájl írja le a projekt összerendeléseket. Egy Angular projekt akár több Firebase projekthez is hozzárendelhető, ezeket külön nevekkel láthatjuk el (pl.: development, staging, production, default). A ```.firebaserc``` tartalma a megadott név és a projekt azonosítójának kulcs-érték megfeleltetése.

A ```firebase.json``` fájl tartalmazza a Firebase szolgáltatások leírását és azok használatát. Amennyiben host-olni szeretnénk web-alkalmazásunkat, akkor a JSON-ben a ```"hosting"``` kulcs jelenik meg, és annak a rövid konfigurációs leírása. Az alábbi leírás erre mutat példát.

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

A JSON az alábbi jelentéssel bír:

- public: mely mappa tartalmazza a fordított JavaScript bundle-öket és az index.html fájlt.
- ignore: miket nem kell kitelepíteni, felmásolni a szerverre.
- rewrites: mivel egy single-page alkalmazásunk van, így a route-ok megfelelő működése érdekében mindig az index.html-re kell visszanavigálni.

Ha minden konfiguráció helyes, akkor már csak a kész terméket kell deploy-olni. A kész termékhez tehát szükséges egy production build (```ng build --prod```), amelynek eredmény a ```dist``` mappába kerül (ez konfigurálható a ```tsconfig.json```-ben). A deploy-hoz egy ```firebase deploy``` parancsra van szükség. Ha sikeresen végbement a kitelepítés, akkor az eredmény a Firebase által adott URL-en keresztül megtekinthető.

## Szerkesztők

Forráskód és videó: Kokrehel Grácián (kokrehel@inf.u-szeged.hu)

Leírás: Jánki Zoltán R. (jankiz@inf.u-szeged.hu)
