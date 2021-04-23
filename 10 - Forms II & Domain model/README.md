# 10. gyakorlat - Forms II. & Domain model

## Bevezető

Jelen gyakorlati anyag az Angular űrlapok (Form-ok) és azok egy domain modellhez kötését hivatott bemutatni.

## Projekt futtatása

1. Repository klónozása (pl.: ```$ git clone https://github.com/jankiz/Web-development-frameworks.git```)
2. Navigálás a mappába: ```$ cd web-development-frameworks/10\ -\ Forms\ II\ \&\ Domain\ model/```
3. Függőségek telepítése: ```$ npm install```
4. Projekt futtatása: ```$ ng serve```

## Videó
[LINK](https://youtu.be/0lyjWYK5PlM)

## Angular Forms II.

A múlt alkalommal megismerkedtünk az Angular Form-okkal. Ez a tananyag bemutatja, hogy az űrlapok hogyan köthetőek adatmodellhez, vagy idegen szóval domain modellhez.

## FHIR Person adatmodell

A felhasználók kezeléséhez - főleg egy egészségügyi rendszerben - a legjobb választás az [FHIR](https://www.hl7.org/fhir/) szabvány. Ez a szabvány valamennyi egészségügyben megjelenő objektumot leír erőforrások formájában, és azokat a megfelelő adattagokon keresztül köti is egymáshoz.

A Person erőforrás a demográfiai és adminisztratív információit írja le egy felhasználónak. Ennek hivatalos dokumentációja [ITT](https://www.hl7.org/fhir/person.html) érhető el.

### FormGroup megvalósítás

Az adatmodell alapján jól látszik, hogy melyek azok a mezők, amelyek kötelezően kitöltendőek. Ezt a kardinalitás oszlop mutatja, mely négy jelölést tartalmazhat:

0..1 - a mező kitöltése nem kötelező, de legfeljebb egy objektumot tartalmazhat
0..\* - a mező kitöltése nem kötelező, de bármennyi elemet (objektumot) tartalmazhat
1..1 - a mező kitöltése kötelező, és legfeljebb egy objektumot tartalmaz
1..\* - a mező kitöltése kötelező, és bármennyi elemet (objektumot) tartalmazhat

A kardinalitáson túl fontos szerepet tölt be a típus is, hiszen ebből látszik, hogy elemi adattípussal kell dolgoznunk az adott mező esetében vagy komplex objektum típusokkal. Erre néhány példa:

- string - egy egyszerű karakterlánc kerül átadásra
- date - dátum formátum, mely jellemzően string formában tárolódik (tehát nem komplex objektum)
- ContactPoint - egy olyan komplex objektum, amely egy személy vagy szervezet elérhetőségét írja le újabb adattagokkal/mezőkkel

Amennyiben ezek az információk ismertek, már könnyedén eldönthető, hogy egy konkrét mező milyen Form objektumnak feleltethető meg. Ezek lehetnek FormGroup-ok, FormArray-ek és FormControl-ok. A megfeleltetésben segít a 9. gyakorlatnál található táblázat a Form elemek és az OOP közötti megfeleltetésről.

Ilyen formában a Person erőforrás az alábbi Angular Form-mal írható le:

```typescript
const person = new FormGroup({
  id: new FormControl(),
  address: new FormArray([]),
  active: new FormControl(),
  birthDate: new FormControl(),
  gender: new FormControl(),
  name: new FormArray([])
});
```

Mivel a Person erőforrásban egyetlen mező sem kötelező a kardinalitást tekintve, így csak azt használjuk fel, amelyiket szeretnénk is használni vagy tárolni a felhasználóinknál.

- id - legfeljebb 1 eleme lehet, string, tehát FormControl lesz
- address - bármennyi eleme lehet, Address típusokat tartalmazó tömb, tehát FormArray lesz
- active - legfeljebb 1 eleme lehet, boolean, tehát FormControl lesz
- birthDate - legfeljebb 1 eleme lehet, date string, tehát FormControl lesz
- gender - legfeljebb 1 eleme lehet, string, tehát FormControl lesz (a gender elemei enumerációba vannak szervezve, tehát a lehetséges értékek elérhetőek)
- name - bármennyi eleme lehet, HumanName típusokat tartalmazó tömb, tehát FormArray lesz

A FormArray-ek esetében ha komplex objektumokat tartalmaz a tömb, akkor azok újabb FormGroup-okat fognak jelenteni a FormArray-en belül.

## TypeScript Getters & Setters

A TypeScript nyelv az objektum-orientáltság végett alkalmazza a getter/setter technikát is. A ```get``` és ```set``` kulcsszavakkal ellátott függvények az osztály adattagjaivá válnak, és amennyiben egy ilyen adattag értékét kiolvassuk vagy beállítjuk, a megfelelő ```get``` vagy ```set``` kulcsszóval ellátott függvény meghívódik. Az alábbi példa segíti a működés megértését.

```typescript
class Person {
    firstName: string;
    lastName: string;

    public get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    public set fullName(name: string) {
        let parts = name.split(' ');
        if (parts.length != 2) {
            throw new Error('Invalid name format: first last');
        }
        this.firstName = parts[0];
        this.lastName = parts[1];
    }
}
```

```typescript
let person = new Person();
person.fullname = 'John Doe';
 
console.log(person.fullName);
```

Az első részben látható egy Person class implementáció **(nem FHIR szabványos!!!)**. Az osztály két adattagja a ```firstName``` és a ```lastName``` string-ek, viszont lehetőséget biztosít az osztály arra, hogy a teljes nevet megkapjuk egyben, illetve teljes név megadása alapján külön eltároljuk a vezetéknevet és a keresztnevet.

A ```get``` kulcsszóval ellátott függvény (```fullName```) ilyen formában a Person osztály adattagjává válik, így a példányosítást követően az adattag meghívásakor (```person.fullName```) lefut a ```get``` kulcsszóval ellátott függvény.

A ```set``` esetében ugyanez történik, adattaggá válik a függvény neve, és a példányosítás után ha az adattagnak értéket adunk, akkor a ```set``` kulcsszóval ellátott függvény lefut (azaz szétbontja a paraméterként megadott nevet a program, és külön eltárolja a vezetéknevet és a keresztnevet).

## Szerkesztők

Forráskód és videó: Kokrehel Grácián (kokrehel@inf.u-szeged.hu)

Leírás: Jánki Zoltán R. (jankiz@inf.u-szeged.hu)
