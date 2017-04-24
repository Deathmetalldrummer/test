## Объектно-ориентированное программирование
### Классы
TypeScript реализует объектно-ориентированный подход, в нем есть полноценная поддержка классов. Для определения нового класса применяется ключевое слово **class**:
```typescript
class User {
    id: number;
    name: string;
    getInfo(): string {
        return "id:" + this.id + " name:" + this.name;
    }
}
```
Теперь мы можем создать объекты данного класса:
```typescript
let tom: User = new User();
tom.id = 1;
tom.name = "Tom";
console.log(tom.getInfo());

let alice: User = new User();
alice.id = 2;
alice.name = "Alice";
console.log(alice.getInfo());
```

Кроме обычных функций классы имеют специальные функции - конструкторы, **constructor**. Конструкторы выполняют начальную инициализацию объекта.

```typescript
class User {
    id: number;
    name: string;
    constructor(userId: number, userName: string) {
        this.id = userId;
        this.name = userName;
    }
    getInfo(): string {
        return "id:" + this.id + " name:" + this.name;
    }
}

let tom: User = new User(1, "Tom");
console.log(tom.getInfo());
tom.id = 4;

let alice: User = new User(2, "Alice");
console.log(alice.getInfo());
```

Для конструкторов также, как и для обычных функций, в TS можно определить несколько версий:

```typescript
class User {
    id: number;
    name: string;
    constructor(userId: number, userName: string);
    constructor(userId: string, userName: string);
    constructor(userId: any, userName: string) {
        this.id = userId;
        this.name = userName;
    }
    getInfo(): string {
        return "id:" + this.id + " name:" + this.name;
    }
}

let tom: User = new User(1, "Tom");
console.log(tom.getInfo());
tom = new User("4", "Tom");
console.log(tom.getInfo());
```

### Статические свойства и функции

Статические функции и свойства определяются с помощью ключевого слова **static**:

```typescript
class Operation {
    static PI: number = 3.14;
    static getSquare(radius: number): number {
        return Operation.PI * radius * radius;
    }
}
let result = Operation.getSquare(30);
console.log("Площадь круга с радиусом 30 равна " + result);
let result2 = Operation.PI * 30 * 30;
console.log(result2);   // 2826
```


## Наследование
Одним из ключевых моментов объектно-ориентированной парадигмы является наследование. В TypeScript наследование реализуется с помощью ключевого слова **extends**:
```typescript
class User {
    name: string;
    constructor(userName: string) {
        this.name = userName;
    }
    getInfo(): void {
        console.log("Имя: " + this.name);
    }
}

class Employee extends User {
    company: string;
    work(): void {
        console.log(this.name + " работает в компании " + this.company);
    }
}
```
Класс Employee является подклассом или наследуется от класса User,а класс User называется родительским или базовым классом. При наследовании класс Employee перенимает весь функционал класса User - все его свойства и функции и может их использовать.


### Переопределение базовых классов
Кроме определения своего функционала подклассы могут переопределять уже имеющийся фукционал в базовых классах.

```typescript
class User {
    name: string;
    constructor(userName: string) {
        this.name = userName;
    }
    getInfo(): void {
        console.log("Имя: " + this.name);
    }
    getClassName(): string {
        return "User";
    }
}
class Employee extends User {
    company: string;
    constructor(employeeCompany: string, userName: string) {
        super(userName);
        this.company = employeeCompany;
    }
    getInfo(): void {
        super.getInfo();
        console.log("Работает в компании: " + this.company);
    }
    getClassName(): string {
        return "Employee";
    }
}

let tom: User = new User("Tom");
tom.getInfo();
console.log(tom.getClassName());

let alice: User = new Employee("Microsoft", "Alice");
alice.getInfo();
console.log(alice.getClassName());

let bill: Employee = new Employee("Google", "Bill");
bill.getInfo();
console.log(bill.getClassName());
```



### Переопределение конструктора
```typescript
constructor(employeeCompany: string, userName: string) {
    super(userName);
    this.company = employeeCompany;
}
```

Если подкласс определяет свой конструктор, то в нем должен быть вызов конструктора базового класса. С помощью ключевого слова **super** подкласс может обратиться к функционалу базового класса. В данном случае идет обращение к конструктору класса User, который устанавливает значение свойства name: super(userName)



### Переопределение методов
Подобным образом переопределяется метод getInfo(). В классе Employee в этом методе мы также вызываем с помощью ключевого слова **super** реализацию данного метода из базового класса:
```typescript
getInfo(): void {
    super.getInfo();    // вызов реализации из базового класса
    console.log("Работает в компании: " + this.company);
}
```
Однако в принцпе это необязательно делать, и мы можем просто переопределить метод без вызов реализации базового класса, как случае с getClassName:
```typescript
getClassName(): string {
	return "Employee";
}
```


## Интерфейсы
### Интерфейсы объектов
Интерфейс определяет свойства и методы, которые объект должен реализовать. Другими словами, интерфейс - это определение кастомного типа данных, но без реализации. Интерфейсы определяются с помощью ключевого слова **interface**.
```typescript
interface IUser {
	id: number;
	name: string;
}
let employee: IUser = {
    id: 1,
    name: "Tom"
}
console.log("id: " + employee.id);
console.log("name: " + employee.name);
```

По сути employee - обычный объект за тем исключением, что он имеет тип IUser. Если правильнее говорить, то employee реализует интерфейс IUser. Причем эта реализация накладывает на employee некоторые ограничения. Так, employee должен реализовать все свойства и методы интерфейса IUser, поэтому при определении employee данный объект обязательно должен включать в себя свойства id и name.

Параметры методов также могут представлять интерфейсы:
```typescript
function getEmployeeInfo(user: IUser): void {
    console.log("id: " + user.id);
    console.log("name: " + user.name)
}
getEmployeeInfo(employee);
```

И также можно возвращать объекты интерфейса:
```typescript
function buildUser(userId: number, userName: string): IUser {
    return { id: userId, name: userName };
}
let newUser = buildUser(2, "Bill");
console.log("id: " + newUser.id);
console.log("name: " + newUser.name)
```

При определении интерфейса мы можем задать некоторые свойства как необязательные с помощью знака вопроса:
```typescript
interface IUser {
    id: number;
    name: string;
    age?: number;
}
let employee: IUser = { id: 1, name: "Alice", age: 23 }
let manager: IUser = { id: 2, name: "Tom" }
```
Свойство **age** помечено как необязательное, поэтому его можно не определять в объектах.

Кроме свойств интерфейсы могут определять функции:
```typescript
interface IUser {
    id: number;
    name: string;
    getFullName(surname: string): string;
}
let employee: IUser = {
    id: 1,
    name: "Alice",
    getFullName : function (surname: string): string {
        return this.name + " " + surname;
    }
}
let fullName = employee.getFullName("Tompson");
console.log(fullName); // Alice Tompson
```

### Интерфейсы классов

Интерфейсы могут быть реализованы не только объектами, но и классами. Для этого используется ключевое слово **implements**:
```typescript
interface IUser {
    id: number;
    name: string;
    getFullName(surname: string): string;
}
 class User implements IUser{
    id: number;
    name: string;
    age: number;
    constructor(userId: number, userName: string, userAge: number) {
        this.id = userId;
        this.name = userName;
        this.age = userAge;
    }
    getFullName(surname: string): string {
         return this.name + " " + surname;
    }
}
let tom = new User(1, "Tom", 23);
console.log(tom.getFullName("Simpson"));
```
Класс User реализует интерфейс IUser. В этом случае класс User обязан определить все те же свойства и функции, которые есть в IUser.

При этом объект tom является как объектом User, так и объектом IUser:
```typescript
let tom :IUser = new User(1, "Tom", 23);
//или
let tom :User = new User(1, "Tom", 23);
```

### Наследование интерфейсов
Интерфейсы, как и классы, могут наследоваться:
```typescript
interface IMovable {
    speed: number;
    move(): void;
}
interface ICar extends IMovable {
    fill(): void;
}
class Car implements ICar {
    speed: number;
    move(): void {
         console.log("Машина едет со скоростью " + this.speed + " км/ч");
    }
    fill(): void {
        console.log("Заправляем машину топливом");
    }
}
let auto = new Car();
auto.speed = 60;
auto.fill();
auto.move();
```

### Интерфейсы функций
Интерфейсы функций содержат определение типа функции. Затем они должны быть реализованы объектом, который представляет функцию данного типа:
```typescript
interface FullNameBuilder {
    (name: string, surname: string): string;
}
let simpleBuilder: FullNameBuilder = function (name:string, surname: string): string {
        return "Mr. " + name + " " + surname;
}
let fullName = simpleBuilder("Bob", "Simpson");
console.log(fullName); // Mr. Bob Simpson
```



### Интерфейсы массивов

Интерфейсы массивов описывают объекты, к которым можно обращаться по индексу, как, например, к массивам
```typescript
interface StringArray {
    [index: number]: string;
}

let phones: StringArray;
phones = ["iPhone 7", "HTC 10", "HP Elite x3"];

let myPhone: string = phones[0];
console.log(myPhone);
```
Здесь определен интерфейс StringArray, который содержит сигнатуру массива. Эта сигнатура указывает, что объект, который реализует StringArray, может индексироваться с помощью чисел (объекта типа number). И, кроме того, данный объект должен хранить объекты типа string, то есть строки.

Выше индекс представлял тип number. Но мы можем использовать для индексации и тип string:
```typescript
interface Dictionary {
    [index: string]: string;
}

var colors: Dictionary = {};
colors["red"] = "#ff0000";
colors["green"] = "#00ff00";
colors["blue"] = "#0000ff";

console.log(colors["red"]);
```



### Гибридные интерфейсы
Интерфейсы могут сочетать различные стили, могут применяться сразу как к определению объекта, так и к определению функции:
```typescript
interface PersonInfo {
    (name: string, surname: string):void;
    fullName: string;
    password: string;
    authenticate(): void;
}
function personBuilder(): PersonInfo {
    let person = <PersonInfo>function (name: string, surname: string): void{
        person.fullName = name + " " + surname;
    };
    person.authenticate = function () {
        console.log(person.fullName + " входит в систему с паролем " + person.password);
    };
    return person;
}
let tom = personBuilder();
tom("Tom", "Simpson");
tom.password = "qwerty";
tom.authenticate();
```
Тип функции, определяемый в таком гибридном интерфейсе, как правило, выступает в роли конструктора объекта. В данном случае такой конструктор имеет тип (name: string, surname: string):void;.

А функция, которая представляет данный интерфейс (в данном случае - функция personBuilder), реализует эту функцию конструктора, и также может использовать другие свойства и методы, которые были определены в интерфейсе.




## Преобразование типов





## Модификаторы и методы доступа
Одной из ключевых концепций объектно-ориентированного программирования является инкапсуляция, подразумевающая сокрытие от внешнего доступа к состоянию объекта и управление доступом к этому состоянию. Обычно для этого во многих ООП-языках используются модификаторы доступа. В TypeScript три модификатора: **public**, **protected** и **private**.

Если к свойствам и функциям классов не применяется модификатор, то такие свойства и функции расцениваются как будто они определены с модификатором **public**.
```typescript
class User {
    name: string;
    public year: number;
}
```

### private
Если же к свойствам и методам применяется модификатор private, то к ним нельзя будет обратиться извне при создании объекта данного класса.
```typescript
class User {
    private _name: string;
    private _year: number;
    constructor(name: string, age: number) {
        this._name = name;
        this._year = this.setYear(age);
    }
    public displayName(): void {
        console.log("name: " + this._name);
    }
    private setYear(age: number): number {
        return new Date().getFullYear() - age;
    }
}
let tom = new User("Tom", 24);
tom.displayName();
// console.log(tom._name); // нельзя обратиться, так как _name - private
// tom.setYear(45); // нельзя обратиться, так как функция - private
```


### protected
Модификатор **protected** во многом аналогичен private - свойства и методы с данным модификатором не видны из вне, но к ним можно обратиться из классов-наследников:
```typescript
class User {
    private name: string;
    protected age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    public displayInfo(): void {
        console.log("name: " + this.name + "; age: " + this.age);
    }
}
class Employee extends User {
    private company: string;
    constructor(name: string, age: number, company: string) {
        super(name, age);
        this.company = company;
    }
    public showData(): void {
        console.log("Age: " + this.age);
        //console.log("Name: " + this.name); // не работает, так как name - private
    }
}
```

### Методы доступа (get/set)
В стандарте JavaScript ECMAScript 5 была предложена концепция методов доступа: для доступа к свойству определяется пара методов - get-метод для получения значения свойства и set-метод для установки значения.
Методы доступа определяются как обычные методы, только перед ними ставятся ключевые слова get/set.
```typescript
class User {
    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(n: string) {
        this._name = n;
    }
}
let tom = new User();
tom.name = "Tom";   // срабатывает set-метод
console.log(tom.name);  // срабатывает get-метод
```







## Обобщения
TypeScript является строго типизированным языком, однако иногда надо построить функционал так, чтобы он мог использовать данные любых типов. В некоторых случаях мы могли бы использовать тип any:
```typescript
function getId(id: any): any {
    return id;
}
let result = getId(5);
console.log(result);
```

Однако в этом случае мы не можем использовать результат функции как объект того типа, который передан в функцию. Для нас это тип any. Если бы вместо числа 5 в функцию передавался бы объект какого-нибудь класса, и нам потом надо было бы использовать этот объект, например, вызывать у него функции, то это было бы проблематично. И чтобы конкретизировать возвращаемый тип, мы можем использовать обобщения:
```typescript
function getId<T>(id: T): T {
    return id;
}
```
С помощью выражения <T> мы указываем, что функция getId типизирована определенным типом T. При выполнении функции вместо Т будет подставляться конкретный тип. Причем на этапе компиляции конкретный тип не известен. И возвращать функция будет объект этого типа. Например:
```typescript
function getId<T>(id: T): T {
    return id;
}
let result = getId<number>(5);
console.log(result);
```
Поскольку число 5 представляет объект number, то вместо T будет применяться number. При вызове функции можно не указывать явным образом тип параметра. То есть вместо getId<number>(5) можно просто написать getId(5). Тогда используемый в функции тип будет выведен неявно.

Подобным образом еще можно использовать обобщенные массивы:
```typescript
function getString<T>(arg: Array<T>): Array<T> {
    let result = "";
    for (let i = 0; i < arg.length; i++) {
        if (i > 0)
            result += ",";
        result += arg[i].toString();
    }
    console.log(result);
    return arg;
}

let result = getString<number>( [1, 2, 34, 5]);
console.log(result);
```
В данном случае вне зависимости от типа данных, переданных в массиве, все его элементы соединятся в одну общую строку.



### Обобщенные классы и интерфейсы
Кроме обобщенных функций и массивов также бывают обобщенные классы и интерфейсы:
```typescript
class User<T> {
    private _id: T;
    constructor(id:T) {
        this._id=id;
    }
    getId(): T {
        return this._id;
    }
}

let tom = new User<number>(3);
console.log(tom.getId()); // возвращает number

let alice = new User<string>("vsf");
console.log(alice.getId()); // возвращает string
```
Только в данном случае надо учитывать, что если мы типизировали объект определенным типом, то сменить данный тип уже не получится. То есть в следующем случае второе создание объекта не будет работать, так как объект tom уже типизирован типом number:
```typescript
let tom = new User<number>(3);
console.log(tom.getId());
tom = new User<string>("vsf"); // ошибка
```
Все то же самое и с интерфейсами:
```typescript
interface IUser<T> {
    getId(): T;
}
class User<T> implements IUser<T> {
    private _id: T;
    constructor(id:T) {
        this._id=id;
    }
    getId(): T {
        return this._id;
    }
}
```
### Ограничения обобщений
Иногда необходимо использовать обобщения, однако принимать любой тип в функцию или класс вместо параметра T нежелательно. Например, пусть имеется следующий интерфейс и классы его реализующие:
```typescript
interface IUser {
    getInfo();
}
class User implements IUser {
    _id: number;
    _name: string;
    constructor(id:number, name:string) {
        this._id = id;
        this._name = name;
    }
    getInfo() {
        console.log("id: " + this._id + "; name: " + this._name);
    }
}

class Employee extends User {
    _company: string;
    constructor(id: number, name: string, company: string) {
        super(id, name);
        this._company = company;
    }
    getInfo() {
        console.log("id: " + this._id + "; name: " + this._name+"; company:"+this._company);
    }
}
```
Теперь пусть у нас будет класс, выводящий информацию о пользователях:
```typescript
class UserInfo<T extends IUser>{
    getUserInfo(user: T): void{
        user.getInfo();
    }
}
```
В методе getUserInfo мы хотим использовать функцию getInfo(), предполагая, что в качестве параметра будет передаваться объект IUser. Но чтобы нельзя было передать объекты любого типа, а только объекты IUser, устанавливается ограничения с помощью ключевого слова extends.

И затем мы можем использовать класс, передавая подходящие объекты:
```typescript
let tom = new User(3, "Tom");
let alice = new Employee(4, "Alice", "Microsoft");
let userStore = new UserInfo();
userStore.getUserInfo(tom);
userStore.getUserInfo(alice);
```
Кстати в данном случае также можно было бы ограничить параметр не интерфейсом IUser, а классом User: class UserInfo<T extends User>




### Ключевое слово new
Чтобы создать новый объект в коде обобщений, нам надо указать, что обобщенный тип T имеет конструктор. Это означает, что вместо параметра type:T нам надо указать type: {new(): T;}. Например, следующий обобщенный интерфейс работать не будет:
```typescript
function UserFactory<T>(): T {
    return new T(); // ошибк компиляции
}
```
Чтобы интерфейс начал работать, используем слово new:
```typescript
function userFactory<T>(type: { new (): T; }): T {
    return new type();
}
class User {
    constructor() {
        console.log("создан объект User");
    }
}

let user : User = userFactory(User);
```






## Миксины
TypeScript, как и многие объектно-ориентированные языки, как, например, Java или C#, не позволяет использовать напрямую множественное наследование. Мы можем реализовать множество интерфейсов в классе, но унаследовать его можем только от одного класса. Однако функциональность миксинов (mixins) частично позволяют унаследовать свойства и методы сразу двух и более классов.

Рассмотрим на примере. Пусть, у нас есть класс Animal, который представляет животное, и класс Transport, который представляет транспортное средство. Оба эти класса имеют свой уникальный функционал, который позволяет выполнять заложенные в них задачи. И также пусть у нас будет класс, который представляет лошадь - с одной стороны, лошадь является животным и наследует все черты, присущие животному, а с другой стороны, лошадь также можно использовать в качестве транспортного средства. То есть для создания подобного класса было бы неплохо унаследовать его сразу и от класса Animal, и от класса Transport. Решим эту задачу на языке TypeScript:
```typescript
class Animal {
    feed():void {
        console.log("кормим животное");
    }
}
class Transport {
    speed: number=0;
    move(): void {
        if (this.speed == 0) {
            console.log("Стоим на месте");
        }
        else if (this.speed > 0) {
            console.log("Перемещаемся со скоростью " + this.speed + " км/ч");
        }
    }
}
class Horse implements Animal, Transport {
    speed: number=0;
    feed: () => void;
    move: () => void;
}
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
applyMixins(Horse, [Animal, Transport]);

let pony: Horse = new Horse();
pony.feed();
pony.move();
pony.speed = 4;
pony.move();
```
Для наследования функционала классов в определении миксина-класса Horse применяется ключевое слово implements, после которого идет перечисление наследуемых классов. Сам класс Horse при этому должен определить все те свойства и методы, которые определены в примененных классах. При этом вместо полного описания методов используется определение функции: feed: () => void;. Сама реализация будет браться из родительского класса.

Но чтобы миксин мог унаследовать функционал, этого недостаточно. Нам еще надо использовать специальную функцию, которая перекопирует функционал из родительских классов в миксин:
```typescript
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
```

Первым параметром идет класс-миксин, а второй параметр - массив применяемых классов.

Несмотря на то, что таким образом мы все таки можем применить множественное наследование, но все же данный способ имеет ряд ограничений:

Миксин может унаследовать только те свойства и методы, которые непосредственно определены в применяемом классе. Поэтому данный способ не будет работать, если применяемый класс, в свою очередь, также наследует какие-то свойства и методы от другого класса.

Если родительские классы определяют метод с одним и тем же именем, то миксин наследует только тот метод, который копируется в него последним в функции applyMixins.




## Пространства имен
Для организации больших программ предназначены пространства имен. Пространства имен содержат группу классов, интерфейсов, функций, других пространств имен, которые могут использоваться в некотором общем контексте.

Для определения пространств имен используется ключевое слово namespace:
```typescript
namespace UserNamespace {
    export interface IUser {
        displayInfo();
    }
    export class User implements IUser {
        private _id: number;
        private _name: string;
        constructor(id: number, name: string) {
            this._id = id;
            this._name = name;
        }
        displayInfo() {
            console.log("id: " + this._id + "; name: " + this._name);
        }
    }

    let defaultUser: IUser = new User(2, "Tom");
}
```

В данном случае модуль называется UserNamespace и содержит интерфейс, класс и объект defaultUser. Чтобы типы и объекты, определенные в модуле, были видны извне, они определяются с ключевым словом export. В этом случае вне модуля мы сможем создать объект класса User:

```typescript
let alice = new UserNamespace.User(4, "Alice");
alice.displayInfo();
```
Однако извне к объекту defaultUser мы не сможем обратиться, так как он не помечен с помощью слова export.

Пространства имен могут быть вложенными:

```typescript
namespace UserNamespace.Employees {
    export class Employee extends User {
    }
    export class Manager extends User { }
}

let bill = new UserNamespace.Employees.Employee(5, "Bill");
bill.displayInfo();
```

Причем в этом случае нам не надо писать полное имя класса User с учетом модуля.



### Псевдонимы
Возможно, нам приходится создавать множество объектов UserNamespace.Employees.Employee, но каждый раз набирать полное имя класса с учетом пространств имен, вероятно, не всем понравиться, особенно когда модули имеют глубокую вложенность по принципу матрешки. Чтобы сократить объем кода, мы можем использовать псевдонимы, задаваемые с помощью ключевого слова import. Например:
```typescript
namespace UserNamespace.Employees {
    export class Employee extends User {
    }
    export class Manager extends User { }
}

import employee = UserNamespace.Employees.Employee;
let alice = new employee(4, "Alice");
alice.displayInfo();
let bill = new employee(5, "Bill");
bill.displayInfo();
```

После объявления псевдонима employee будет рассматриваться как краткое имя для UserNamespace.Employees.Employee.

### Слияние модулей
В программе можно несколько раз объявить модуль с одним и тем же именем, в этом случае все эти определения потом сольются в один модуль.
```typescript
namespace UserNamespace {
    export class User{
    }
}
namespace UserNamespace {
    export class Employee extends User {
    }
    export class Manager extends User { }
}
```

Будет аналогично следующему пространству имен:

```typescript
namespace UserNamespace {
    export class User{
    }
    export class Employee extends User {
    }
    export class Manager extends User { }
}
```

Однако если в одном определении пространства имен используются типы и объекты из другого определения, то такие типы и объекты должны быть помечены с помощью export:

```typescript
namespace UserNamespace {
    export class User{
    }
    let defaultUser: User = new User(2, "Tom");
}
namespace UserNamespace {
    export function getDefaultUser(): IUser {
        return defaultUser; // ошибка - defaultUser не экспортируется
    }
}
```
Подобным образом пространства имен могут объединяться с классами, перечислениями и функциями, которые имеют одинаковые имена. Например:
```typescript
class User {
    private _id: number;
    private _name: string;
    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }
    public displayInfo() {
        console.log("id: " + this._id + "; name: " + this._name);
    }
}
namespace User {
    let defaultUser: User = new User(2, "Tom");
    export function getDefaultUser(): User {
        return defaultUser;
    }
}

let alice = new User(4, "Alice");
alice.displayInfo();

let bill = new User(5, "Bill");
bill.displayInfo();

let tom = User.getDefaultUser();
tom.displayInfo();
```
Здесь пространство имен User объединяется с классом User. Правда, при создании объектов User для них будет недоступна функциональность, определенная внутри пространства, и наоборот.

То же самое относится к функциям:
```typescript
class User {
    private _id: number;
    private _name: string;
    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }
    public displayInfo() {
        console.log("id: " + this._id + "; name: " + this._name);
    }
}
function buildUser(id: number, name:string) : User {
    return new User(id, name);
}
namespace buildUser {
    let defaultUser: User = new User(2, "Tom");
    export function getDefaultUser(): User {
        return defaultUser;
    }
}

let alice = buildUser(4, "Alice");
alice.displayInfo();

let tom = buildUser.getDefaultUser();
tom.displayInfo();
```




## Модули
### Определение модуля и экспорт
TypeScript поддерживает работу с модулями. Модули в некотором смысле похожи на пространства имен: они могут заключать различные классы, интерфейсы, функции, объекты. Но при этому модули подключаются в приложение не посредством тега <script>, а с помощью загрузчика модулей.

Все модули имеют определенный формат и относятся к определенной системе. Всего мы можем использовать 5 различных систем модулей:

AMD

CommonJS

UMD

System

ES 2015

Для выбора нужной системы в Visual Studio мы можем перейти в настройки проекта и отметить нужную опцию:

Модули в TypeScript
При компиляции из командной строки или терминала для установки модуля необходимо передать соответствующее значение параметру --module:

tsc --module commonjs main.ts // для CommonJS
tsc --module amd main.ts // для AMD
tsc --module umd main.ts // для UMD
tsc --module system main.ts // для SytemJS
А для загрузки модулей можно выбрать один из следующих загрузчиков:

RequireJS: RequireJS использует синтаксис, известный как асинхронное определение модуля или asynchronous module definition(AMD)

Browserify: использует синтаксис CommonJS

SystemJS: универсальный загрузчик, может применяться для модулей любого типа

Далее мы рассмотрим синтаксис ECMAScript 2015, с которым более подробно можно ознакомиться здесь, однако при желании можно выбрать любую другую систему модулей.

Определение модуля и экспорт

Пусть у нас будет в проекте файл mobiles.ts:
```typescript
export interface Device {
    model: string;
    company: string;
    displayInfo(): void;
}
export class Smartphone implements Device {
    model: string;
    company: string;
    displayInfo(): void {
        console.log("Смартфон. Модель: " + this.model + " производитель: "+this.company);
    }
}
export class Tablet implements Device  {
    model: string;
    company: string;
    displayInfo(): void {
        console.log("Планшет. Модель: " + this.model + " производитель: " + this.company);
    }
}
```
Чтобы классы, интерфейсы, функции были видны извне, они определяются с ключевым словом export.

Но мы могли бы и по другому экспортировать все сущности:
```typescript
interface Device {
    //......................
}
class Smartphone implements Device {
    //........................
}
class Tablet implements Device  {
    //.................
}
export {Device, Tablet, Smartphone as Phone};
```
При экспорте можно определить псевдоним для типа с помощью ключевого слова as. Это имя затем может применяться при импорта класса.




### Импорт
Чтобы задействовать модуль в приложении, его надо импортировать с помощью оператора import. Например, импортируем класс Smartphone из выше определенного модуля mobiles.ts:
```typescript
import {Smartphone} from "./mobiles";
let iphone: Smartphone = new Smartphone();
iphone.company = "Apple";
iphone.model = "iPhone 7";
iphone.displayInfo();
```
Чтобы импортировать несколько типов, мы можем указать их названия через запятую:
```typescript
import {Device, Smartphone, Tablet} from "./mobiles";
let iphone: Smartphone = new Smartphone();
```
Опять же с помощью оператора as можно указать псевдоним для типа:
```typescript
import {Smartphone as Phone} from "./mobiles";
let iphone: Phone = new Phone();
```
Можно импортировать сразу весь модуль:
```typescript
import * as mobiles from "./lib/mobiles"; // псевдоним для модуля - mobiles
let iphone: mobiles.Device = new mobiles.Tablet();
iphone.displayInfo();
```




### Экспорт по умолчанию
Параметры экспорта по умолчанию позволяют определить тип, который будет импортироваться из модуля по умолчанию. К примеру, добавим новый модуль smartwatch.ts:
```typescript
export default class SmartWatch {
    model:string;
}
```
Ключевое слово default позволяет установить класс SmartWatch в качестве типа по умолчанию. И затем мы можем импортировать его следующим образом:
```typescript
import SmartWatch from "./smartwatch";
let iwatch: SmartWatch = new SmartWatch();
```
