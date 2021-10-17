# ECMA Script


##### [ES6](#ES6)

- [import/export](#import_export)
- [let/const](#let_const)
- [Тип данных Symbol](#symbol)
- [Строковые шаблоны и разделители](#string_template)
- [Стрелочные функции](#arrow_func)
- [Параметры по умолчанию](#dafault_param)
- [Расширение возможностей литералов объекта](#object_literals)
- [Spread/Rest операторы](#spread_rest)
- [Восьмеричный и двоичный литералы](#octal_binary_literals)
- [For…of](#for_of)
- [Деструктуризация](#destructuring)
- [Промисы](#promise)
- [Классы](#class)
- [Наследование](#extends)
- [Поиск в массиве](#array_find)
- [Map и WeakMap](#map_weakmap)
- [Set и WeakSet](#set_weakset)
- [Генераторы](#generators)
- [Итераторы](#iterators)

<br/>

##### [ES7](#ES7)

- [Проверка на наличие элемента в массиве](#array_prototype_includes)
- [Оператор возведения в степень **](#exponentiation)

<br/>

##### [ES8](#ES8)

- [Object.values()](#object_values)
- [Object.entries()](#object_entries)
- [Завершающие запятые в параметрах функций.](#trailing_commas)
- [Заполнение строк до заданной длины (String padding)](#string_padding)
- [Сведения о собственных свойствах объекта.](#getownpropertydescriptors)
- [Async/Await](#async_await)
- [Разделяемая память и атомарные операции](#memory_and_atomic_operations)

<br/>

##### [ES9](#ES9)

- [Spread/Rest для объектов](#object_rest_spread)
- [Метод промиса finally()](#promise_finally)
- [Асинхронные итераторы (for await of)](#for_await_of)
- [Новые функции регулярных выражений](#es9_regexp)

<br/>

##### [ES10](#ES10)

- [String.trimStart() и String.trimEnd()](#trimstart_trimend)
- [Параметры для catch. (try…catch err param)](#try_catch_err_param)
- [Function.prototype.toString()](#function_tostring)
- [Свойство описания символа. (Symbol.prototype.description)](#symbol_description)
- [Object.fromEntries()](#object_fromentries)
- [Array.prototype.flat()](#array_flat)
- [Array.prototype.flatMap()](#array_flatmap)
- [Хорошо сформированный JSON.stringify()](#es10_json_stringify)

<br/>

##### [ES11](#ES11)

- [Динамический импорт](#dynamic_import)
- [BigInt](#es11_bigint)
- [globalThis](#globalthis)
- [Оператор опциональной последовательности](#optional_chaining)
- [Module namespace exports](#namespace_exports)
- [Проверка на null](#nullish_coalescing)
- [Ожидание всех промисов](#promise_allsettled)
- [String.matchAll](#string_matchall)
- [Порядок выполнения for-in](#for_in_mechanics)


<br/><br/><br/>


## ES6 <a name="ES6"></a>

### import/export <a name="import_export"></a>

[MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/import)

```js
import defaultExport from "module-name";
import * as name from "module-name";
import { export } from "module-name";
import { export as alias } from "module-name";
import { export1 , export2 } from "module-name";
import { export1 , export2 as alias2 , […] } from "module-name";
import defaultExport, { export [ , […] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
import("/module-name.js").then(module => {…}) // Динамический импорт
```

- `defaultExport`

  Имя объекта, который будет ссылаться на значение экспорта по умолчанию (дефолтный экспорт) из модуля.

- `module-name`

  Имя модуля для импорта. Это зачастую относительный или абсолютный путь к `.js` файлу модуля без указания расширения `.js`. Некоторые сборщики могут разрешать или даже требовать использования расширения; проверяйте своё рабочее окружение. Допускаются только строки с одиночными или двойными кавычками.

- `name`

  Имя локального объекта, который будет использован как своего рода пространство имён, ссылающееся на импортируемые значения.

- `export, exportN`

  Имена значений, которые будут импортированы.

- `alias, aliasN`

  Имена, которые будут ссылаться на импортируемые значения.



Инструкция **export** используется для экспорта функций, объектов или примитивов из файла (или модуля)

[MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/export)

```js
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // или var
export let name1 = …, name2 = …, …, nameN; // или var, const

export default выражение;
export default function (…) { … } // или class, function*
export default function name1(…) { … } // или class, function*
export { name1 as default, … };

export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
```

<br/><br/>


### Объявления переменных **let**/**const**. Блочная область видимости (Block scope variables) <a name="let_const"></a>

Проблема `var` в том, что переменная "протекает" в другие блоки кода, такие как циклы `for` или блоки условий `if`

Ключевое слово `let`/ `const` позволяет объявлять переменные с ограниченной областью видимости — только для блока {...}, в котором происходит объявление

```js
let isTrue = true;
const isFalse = false;

// ES5
{
  var privateES5 = 1;
}
console.log(privateES5); // 1

// ES6
{
  let privateES6 = 1;
}
console.log(privateES6); // Uncaught ReferenceError

// ES5 (IIFE (immediately-invoked function expression))
(function(){
  var privateES5 = 1;
})();

console.log(privateES5); // Uncaught ReferenceError
```

```javascript
// var
var test = 5;
if (true) {
	var test = 10;
	alert(test); //введет 10
}

alert(test); //введет 10 - значение изменилось

// let/const
let test = 5;
if (true) {
	let test = 10;
	alert(test); //введет 10
}

alert(test); //введет 5 - значение не изменилось
```

<details>
<summary>Ещё пример</summary>

```js
// ES5
var x = 'outer';
function test(inner) {
  if (inner) {
    var x = 'inner'; // scope whole function
    return x;
  }
  return x; // gets redefined on line 4
}

test(false); // undefined 
test(true); // inner

// ES6
let x = 'outer';
function test(inner) {
  if (inner) {
    let x = 'inner';
    return x;
  }
  return x; // gets result from line 1 as expected
}

test(false); // outer
test(true); // inner
```
</details>

<br/><br/>


### Тип данных Symbol <a name="symbol"></a>

Symbol это уникальный и неизменяемый тип данных, представленный в ES6. Целью `Symbol` является создание уникального идентификатора, к которому нельзя получить доступ.

Вот как можно создать `Symbol`:

```js
var sym = Symbol("опциональное описание");
console.log(typeof sym); // symbol
```

Заметим, что использовать `new` вместе с `Symbol(…)` нельзя.

Если `Symbol` используется как свойство/ключ объекта, он сохраняется таким специальным образом, что свойство не будет показано при нормальном перечислении свойств объекта.

```js
var o = {
    val: 10,
    [Symbol("случайный")]: "Я - символ",
};

console.log(Object.getOwnPropertyNames(o)); // val
```

Чтобы извлечь символьные свойства объекта, нужно использовать `Object.getOwnPropertySymbols(o)`

<br/><br/>


### Строковые шаблоны и разделители <a name="string_template"></a>

#### Template Literals

```js
// ES5
var first = 'Adrian';
var last = 'Mejia';
console.log('Your name is ' + first + ' ' + last + '.');

// ES6
const first = 'Adrian';
const last = 'Mejia';
console.log(`Your name is ${first} ${last}.`);
```

#### Multi-line strings

Не нужно больше конкатенировать строки с + `\n`:

```js
// ES5
var template = '<ul>\n' +
'	<li>List item</li>\n' +
'	<li>List item</li>\n' +
'</ul>';

// ES6
const template = `<ul>
	<li>List item</li>
	<li>List item</li>
</ul>`;
```

<br/><br/>


### Стрелочные функции  <a name="arrow_func"></a>

Стрелочные функции не имеют своего `this`

```js
// Классическое функциональное выражение
let addition = function(a, b) {
    return a + b;
};

// Стрелочная функция
let addition = (a, b) => a + b;
let addition = (a, b) => {
    return a + b;
};
```

<br/><br/>


### Параметры по умолчанию  <a name="dafault_param"></a>

ES6 позволяет установить параметры по умолчанию при объявлении функции. Вот простой пример:

```js
let getFinalPrice = (price, tax = 0.7) => price + price * tax;
getFinalPrice(500); // 850, так как значение tax не задано

getFinalPrice(500, 0.2); // 600, значение tax по-умолчанию заменяется на 0.2
```


<details>
<summary>Ещё пример</summary>


```js
// ES5
function point(x, y, isFlag){
  x = x || 0;
  y = y || -1;
  isFlag = isFlag || true;
  console.log(x,y, isFlag);
}

point(0, 0) // 0 -1 true 
point(0, 0, false) // 0 -1 true 
point(1) // 1 -1 true
point() // 0 -1 true
```

Это распространенный паттерн проверки наличия значения переменной. Но тут есть некоторые проблемы:

- передаем 0, 0 получаем 0, -1
- передаем false, но получаем true.

Если параметр по умолчанию это булева переменная или если задать значение 0, то ничего не получится.Нужно проверять на undefined так как false, null, undefined и 0 – это все falsy-значения. С числами можно так:

```js
/// ES5
function point(x, y, isFlag){
  x = x || 0;
  y = typeof(y) === 'undefined' ? -1 : y;
  isFlag = typeof(isFlag) === 'undefined' ? true : isFlag;
  console.log(x,y, isFlag);
}

point(0, 0) // 0 0 true
point(0, 0, false) // 0 0 false
point(1) // 1 -1 true
point() // 0 -1 true
```

С проверкой на undefined все работает как нужно.
</details>

<br/><br/>


### Расширение возможностей литералов объекта  <a name="object_literals"></a>

ES6 позволяет объявить литералы объекта с помощью короткого синтаксиса для инициализации свойств из переменных и определения функциональных методов. Также, стандарт обеспечивает возможность вычисления свойств непосредственно в литерале объекта.

```js
function getCar(make, model, value) {
    return {
        // с синтаксисом короткой записи можно
        // пропускать значение свойства, если оно
        // совпадает с именем переменной, значение
        // которой мы хотим использовать
        make,  // аналогично make: make
        model, // аналогично model: model
        value, // аналогично value: value

        // вычисляемые свойства теперь работают в
        // литералах объекта
        ['make' + make]: true,

        // Короткая запись метода объекта пропускает
        // ключевое слово `function` и двоеточие. Вместо
        // "depreciate: function() {}" можно написать:
        depreciate() {
            this.value -= 2500;
        }
    };
}

let car = getCar('Kia', 'Sorento', 40000);
console.log(car);
// {
//     make: 'Kia',
//     model:'Sorento',
//     value: 40000,
//     makeKia: true,
//     depreciate: function()
// }
```

<br/><br/>


### Spread/Rest операторы  <a name="spread_rest"></a>

```js
function foo(x, y, z) {
    console.log(x, y, z);
}

let arr = [1, 2, 3];
foo(...arr); // 1 2 3


function foo(...args) {
    console.log(args);
}
foo(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]


function log(...arg) {
    console.log(...arg);
}
log(1, 2, 3, 4, 5); // 1, 2, 3, 4, 5
```



<details>
<summary>Ещё пример</summary>


В ES5 работать с переменным количеством аргументов неудобно.

```js
// ES5
function printf(format) {
  var params = [].slice.call(arguments, 1);
  console.log('params: ', params);
  console.log('format: ', format);
}

printf('%s %d %.2f', 'adrian', 321, Math.PI);
```

С rest  `...` все намного проще.

```js
// ES6
function printf(format, ...params) {
  console.log('params: ', params);
  console.log('format: ', format);
}

printf('%s %d %.2f', 'adrian', 321, Math.PI);
```

Переходим от `apply()` к spread. Опять же, `...` спешит на помощь:

```js
// ES5
Math.max.apply(Math, [2,100,1,6,43]) // 100

// ES6
Math.max(...[2,100,1,6,43]) // 100
```

Мы также перешли от `concat` к spread'у:

```js
// ES5
var array1 = [2,100,1,6,43];
var array2 = ['a', 'b', 'c', 'd'];
var array3 = [false, true, null, undefined];

console.log(array1.concat(array2, array3));

// ES6
const array1 = [2,100,1,6,43];
const array2 = ['a', 'b', 'c', 'd'];
const array3 = [false, true, null, undefined];

console.log([...array1, ...array2, ...array3]);
```

</details>

<br/><br/>


### Восьмеричный и двоичный литералы <a name="octal_binary_literals"></a>

В ES6 появилась новая поддержка для восьмеричных и двоичных литералов.
Добавление к началу числа `0o` или `0O` преобразует его в восьмеричную систему счисления (аналогично, `0b` или `0B` преобразует в двоичную систему счисления). 

```js
let oValue = 0o10;
console.log(oValue); // 8

let bValue = 0b10;
console.log(bValue); // 2
```

<br/><br/>


### For…of  <a name="for_of"></a>

- `for...of` используется для перебора в цикле итерируемых объектов, например, массивов.

```js
let nicknames = ['di', 'boo', 'punkeye'];
nicknames.size = 3;
for (let nickname of nicknames) {
    console.log(nickname);
}
// di
// boo
// punkeye
```

- `for...in` используется для перебора в цикле всех доступных для перебора (enumerable) свойств объекта. Если с массивом поработали как с объектом и добавили в него какое-либо свойство: в этом случае это свойство также попадет в перебор.

```js
let nicknames = ['di', 'boo', 'punkeye'];
nicknames.size = 3;
for (let nickname in nicknames) {
    console.log(nickname);
}
// 0
// 1
// 2
// size
```

Итераторы работают и для строк - в этом случае в цикле строка будет перебираться посимвольно:

```javascript
for (let symbol of/in 'слово') {
	alert(symbol); //выведет 'c', 'л', 'о', 'в', 'о'
}
```

<br/><br/>


### Деструктуризация (Destructuring Assignment) <a name="destructuring"></a>

Деструктуризация - это разделение массива или объекта в отдельные переменные

```js
const arr = ['Иванов', 'Иван', '20 лет', 1994, 'Январь'];
const obj = {
	color: 'red',
	width: 400,
	height: 500
};

let [first, second] = [1, 2, 3, 4];
let {x: a, y: b, z: c} = {x: 1,y: 2,z: 3};

let [,, age] = arr;
let [surname, name, ...rest] = arr;
let {color, width, height, font, bg = false} = obj; // font = undefined; bg = false
let {color: c, width: w, height: h} = obj;
```

#### Обмен значениями

```js
let a = 1;
let b = 2;

[a, b] = [b, a];
```

#### Деструктуризация и сопоставление параметров (Деструктуризация в функциях)

```js
const user = {firstName: 'Adrian', lastName: 'Mejia'};

function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}

console.log(getFullName(user)); // Adrian Mejia
```

#### Глубокое сопоставление

```js
function settings() {
  return { display: { color: 'red' }, keyboard: { layout: 'querty'} };
}

const {display: {color: displayColor}, keyboard: {layout: keyboardLayout}} = settings();

console.log(displayColor, keyboardLayout); // red querty
```

<br/><br/>


### Промисы  <a name="promise"></a>

В ES6 появилась встроенная поддержка промисов. Промис это объект, который ждёт выполнения асинхронной операции, после которого (т.е. после выполнения) промис принимает одно из двух состояний: fulfilled (resolved, успешное выполнение) или rejected (выполнено с ошибкой).

Стандартным способом создания промиса является конструктор `new Promise()`, который принимает обработчик с двумя функциями как параметрами. Первый обработчик (обычно именуемый `resolve`) представляет собой функцию для вызова вместе с будущим значением, когда оно будет готово; второй обработчик (обычно именуемый `reject`) является функцией, которая вызывается для отказа от выполнения промиса, если он не может определить будущее значение.

```js
var p = new Promise(function(resolve, reject) {
    if (/* условие */) {
        resolve(/* значение */);  // fulfilled successfully (успешный результат)
    } else {
        reject(/* reason */);  // rejected (ошибка)
    }
});
```

Каждый промис обладает методом `then`, в котором есть два коллбэка. Первый коллбэк вызывается, если промис успешно выполнен (resolved), тогда как второй коллбэк вызывается, если промис выполнен с ошибкой (rejected).

```js
p.then((val) => console.log("Промис успешно выполнен", val),
       (err) => console.log("Промис выполнен с ошибкой", err));
```

При возвращении значения от `then` коллбэки передадут значение следующему коллбэку `then`.

```js
var hello = new Promise(function(resolve, reject) {  
    resolve("Привет");
});

hello.then((str) => `${str} Мир`)
     .then((str) => `${str}!`)
     .then((str) => console.log(str)) // Привет Мир!
```

При возвращении промиса, успешно обработанное значение промиса пройдёт к следующему коллбэку, для того, чтобы эффективно соединить их вместе.
Эта простая техника помогает избежать ада с коллбэками ("callback hell").

```js
var p = new Promise(function(resolve, reject) {  
    resolve(1);
});

var eventuallyAdd1 = (val) => {
    return new Promise(function(resolve, reject){
        resolve(val + 1);
    });
}

p.then(eventuallyAdd1)
 .then(eventuallyAdd1)
 .then((val) => console.log(val)) // 3
```

<br/><br/>


### Классы  <a name="class"></a>

В ES6 представили новый синтаксис для классов. Здесь стоит отметить, что класс ES6 не представляет собой новую объектно-ориентированную модель наследования. Это просто синтаксический сахар для существующего в JavaScript прототипного наследования.

Класс в ES6 представляет собой просто новый синтаксис для работы с прототипами и функциями-конструкторами, которые мы привыкли использовать в ES5.

Функции, записанные с помощью ключевого слова `static`, используются для объявления статических свойств класса.

```js
class Task {
    constructor() {
        console.log("Создан экземпляр task!");
    }

    showId() {
        console.log(23);
    }
    
    static loadAll() {
        console.log("Загружаем все tasks...");
    }
}

console.log(typeof Task); // function
let task = new Task(); // "Создан экземпляр task!"
task.showId(); // 23
Task.loadAll(); // "Загружаем все tasks..."
```

<br/><br/>


### Наследование (extends и super в классах)  <a name="extends"></a>

Посмотрим на следующий код:

```js
class Car {
    constructor() {
        console.log("Создаём новый автомобиль");
    }
}

class Porsche extends Car {
    constructor() {
        super();
        console.log("Создаём Porsche");
    }
}

let c = new Porsche();
// Создаём новый автомобиль
// Создаём Porsche
```

В ES6 ключевое слово `extends` позволяет классу-потомку наследовать от родительского класса. Важно отметить, что конструктор класса-потомка должен вызывать super() и делать это до использования ключевого слова `this`.

Также, в классе-потомке можно вызвать метод родительского класса с помощью `super.имяМетодаРодителя()`.

О чём стоит помнить:

- Объявления классов не поднимаются наверх (not hoisted). Сначала нужно объявить класс и только после этого использовать его, иначе будет ошибка ReferenceError.
- Нет необходимости использовать ключевое слово `function` во время задания функций внутри определения класса.

<br/><br/>


### Поиск в массиве ( Array.prototype.findIndex(), Array.prototype.find() ) <a name="array_find"></a>

#### find

Метод **find()** возвращает значение первого найденного в массиве элемента, которое удовлетворяет условию переданному в callback функции. В противном случае возвращается **undefined**

```js
['one', 'two', 'three',	'four'].find((item) => item === 'five'); // undefined
['one', 'two', 'three',	'four'].find((item) => item === 'three'); // 'three'
```

#### findIndex

Метод **findIndex()** возвращает индекс в массиве, если элемент удовлетворяет условию проверяющей функции. В противном случае возвращается -1.

```js
['one', 'two', 'three',	'four'].findIndex((item) => item === 'five'); // -1
['one', 'two', 'three',	'four'].findIndex((item) => item === 'three'); // 2
```

<br/><br/>


### Map и WeakMap <a name="map_weakmap"></a>

`WeakMap` это `Map`, в котором ключи обладают неустойчивыми связями, что позволяет не мешать сборщику мусора удалять элементы `WeakMap`. Это означает, что можно не беспокоиться об утечках памяти.

Стоить отметить, что в `WeakMap`, в отличие от `Map`, *каждый ключ должен быть объектом*.

Для `WeakMap` есть только четыре метода: `delete(ключ)`, `has(ключ)`, `get(ключ)` и `set(ключ, значение)`.

```js
let w = new WeakMap();
w.set('a', 'b');
// Uncaught TypeError: Invalid value used as weak map key

var o1 = {},
    o2 = function(){},
    o3 = window;

w.set(o1, 37);
w.set(o2, "azerty");
w.set(o3, undefined);

w.get(o3); // undefined, потому что это заданное значение

w.has(o1); // true
w.delete(o1);
w.has(o1); // false
```

<br/><br/>


### Set и WeakSet <a name="set_weakset"></a>

Объекты **Set** это коллекции уникальных значений. Дублированные значения игнорируются, т.к. коллекция должна содержать только уникальные значения. Значения могут быть примитивами или ссылками на объекты.

```js
let mySet = new Set([1, 1, 2, 2, 3, 3]);
mySet.size; // 3
mySet.has(1); // true
mySet.add('строки');
mySet.add({ a: 1, b:2 });
```

Вы можете перебирать `Set` в цикле с помощью `forEach` или `for...of`. Перебор происходит в том же порядке, что и вставка.

```js
mySet.forEach((item) => {
    console.log(item);
    // 1
    // 2
    // 3
    // 'строки'
    // Object { a: 1, b: 2 }
});

for (let value of mySet) {
    console.log(value);
    // 1
    // 2
    // 3
    // 'строки'
    // Object { a: 1, b: 2 }
}
```

У `Set` также есть методы `delete()` и `clear()`.

**WeakSet**

Аналогично `WeakMap`, объект `WeakSet` позволяет хранить *объекты* с неустойчивыми связями в коллекции. Объект в `WeakSet` уникален.

```js
var ws = new WeakSet();
var obj = {};
var foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false, foo не был добавлен к коллекции

ws.delete(window); // удаляет window из коллекции
ws.has(window);    // false, window был удалён
```

<br/><br/>


### Генераторы <a name="generators"></a>

Функции-генераторы представляют собой новую особенность ES6, которая позволяет функции создавать много значений в течение некоторого периода времени, возвращая объект (называемый генератором), который может быть итерирован для выброса значений из функции по одному за раз.

Функция-генератор возвращает **итерируемый объект** при своём вызове.
Функция-генератор записывается с помощью знака `*` после ключевого слова `function`, а в теле функции должно присутствовать ключевое слово `yield`.

```js
function *infiniteNumbers() {
    var n = 1;
    while (true) {
        yield n++;
    }
}

var numbers = infiniteNumbers(); // возвращает перебираемый объект

numbers.next(); // { value: 1, done: false }
numbers.next(); // { value: 2, done: false }
numbers.next(); // { value: 3, done: false }
```

Каждый раз при вызове `yield` возвращённое значение становится следующим значением в последовательности.

Такжезаметим, что генераторы вычисляют свои возвращённые значения по запросу, что позволяет им эффективно представлять последовательности, затратные с точки зрения вычислений, или даже бесконечные последовательности.

<br/><br/>


### Итераторы <a name="iterators"></a>

Итератор обращается к элементам коллекции по одному, в то же время сохраняя память о своей текущей позиции в этой коллекции. У итератора есть метод `next()`, который возвращает следующий элемент в последовательности. Этот метод возвращает объект с двумя свойствами: done (окончен ли перебор) и value (значение).

В ES6 есть метод `Symbol.iterator`, который определяет итератор для объекта по-умолчанию. При каждой необходимости перебора в цикле для объекта (например, в начале цикла for..of), его метод итератора вызывается без аргументов, и возвращённый итератор используется для того, чтобы получить значения для перебора.

Посмотрим на массив, который является перебираемым (iterable), и на итератор, который есть у массива для обработки его значений:

```js
var arr = [11,12,13];
var itr = arr[Symbol.iterator]();

itr.next(); // { value: 11, done: false }
itr.next(); // { value: 12, done: false }
itr.next(); // { value: 13, done: false }

itr.next(); // { value: undefined, done: true }
```

Заметим, что можно написать собственный итератор через определение `obj[Symbol.iterator]()` с описанием объекта.


<br/><br/><br/>


## ES7 <a name="ES7"></a>

### Проверка на наличие элемента в массиве. Array.prototype.includes ()  <a name="Array_prototype_includes"></a>

Функция `includes()` вводит более читаемый синтаксис для проверки, содержит ли массив элемент, возвращая в зависимости от этого `true` или `false`.

Ранее, чтобы проверить, содержит ли массив элемент, использовался `indexOf`, который проверял индексы в массиве и возвращал `-1`, если элемента там нет.

```js
// ES5
if (['1', '2'].indexOf('3') !== -1) {
  // ...
}

// ES6
if (['1', '2'].includes('3')) {
  // ...
}

// indexOf использует строгое (===) стравнение
[NaN].includes(NaN); // true
[NaN].indexOf(NaN); // -1
```

<br/><br/>


### Оператор возведения в степень **  <a name="exponentiation"></a>

Оператор возведения в степень `**` является эквивалентом `Math.pow()`, но добавлен в язык, вместо того чтобы быть функцией библиотеки.

```js
Math.pow(4, 2) === 4 ** 2;
```


<br/><br/><br/>


## ES8 <a name="ES8"></a>

### Object.values() <a name="object_values"></a>

Этот метод возвращает массив, содержащий значения собственных свойств объекта, то есть таких свойств, которые содержит сам объект, а не тех, которые доступны ему через цепочку прототипов.

```js
const person = { name: 'Fred', age: 87 }
const personValues = Object.values(person) 
console.log(personValues) // ['Fred', 87]
```

`Object.values()` также работает с массивами:

```js
const people = ["Alex", "Julia"];
Object.values(people); // ["Alex", "Julia"]
```

<br/><br/>


### Object.entries() <a name="object_entries"></a>

Этот метод возвращает массив, каждый элемент которого также является массивом, содержащим, в формате `[key, value]`, ключи и значения собственных свойств объекта.

```js
const person = { name: 'Fred', age: 87 }
const personValues = Object.entries(person) 
console.log(personValues) // [['name', 'Fred'], ['age', 87]]
```

`Object.entries()` также работает с массивами:

```js
const people = ["Alex", "Julia"];
Object.entries(people); // [['0', 'Alex'], ['1', 'Julia']]
```

<br/><br/>


### Завершающие запятые в параметрах функций. <a name="trailing_commas"></a>

Эта возможность позволяет оставлять запятую в конце списка параметров или аргументов, соответственно, при объявлении и при вызове функций.

```js
const doSomething = (
  var1, 
  var2,
) => {
  //...
}
doSomething(
  'test1',
  'test2',
)
```


Это повышает удобство работы с системами контроля версий. А именно, речь идёт о том, что, при добавлении новых параметров в функцию, не приходится менять существующий код только ради вставки запятой.

<br/><br/>


### Заполнение строк до заданной длины (String padding) <a name="string_padding"></a>

Целью заполнения строки является добавление символов в строку, чтобы она достигла определенной длины.

```js
str.padStart(targetLength [, padString]);
```

 Если параметр `padString` не задан —  используется символ пробела.

```js
// padStart()
"test".padStart(4); // 'test'
"test".padStart(5); // ' test'
"test".padStart(8); // '    test'
"test".padStart(8, "abcd"); // 'abcdtest'


// padEnd()
"test".padEnd(4); // 'test'
"test".padEnd(5); // 'test '
"test".padEnd(8); // 'test    '
"test".padEnd(8, "abcd"); // 'testabcd'
```

<br/><br/>


### Сведения о собственных свойствах объекта. Object.getOwnPropertyDescriptors() <a name="getownpropertydescriptors"></a>

Метод возвращает сведения обо всех собственных свойствах объекта. Со свойствами объектов ассоциированы наборы атрибутов (дескрипторы). В частности, речь идёт о следующих атрибутах:

- `value` — значение свойства объекта.
- `writable` — содержит `true` если свойство можно менять.
- `get` — содержит функцию-геттер, связанную со свойством, или, если такой функции нет — `undefined`.
- `set` — содержит функцию-сеттер для свойства или `undefined`.
- `configurable` — если тут будет `false` — свойство нельзя удалять, нельзя менять его атрибуты за исключением значения.
- `enumerable` — если в этом свойстве будет содержаться true — `свойство` является перечислимым


Метод принимает объект, сведения о свойствах которого нужно узнать, и возвращает объект, содержащий эти сведения.

```js
const person = { name: 'Fred', age: 87 }
const propDescr = Object.getOwnPropertyDescriptors(person)
console.log(propDescr) 
/*
{ name:
   { value: 'Fred',
     writable: true,
     enumerable: true,
     configurable: true },
  age:
   { value: 87,
     writable: true,
     enumerable: true,
     configurable: true } }
*/
```


Зачем нужен этот метод? Дело в том, что он позволяет **создавать мелкие копии объектов**, **копируя**, помимо других свойств, **геттеры и сеттеры**. Этого нельзя было сделать, пользуясь для копирования объектов методом `Object.assign()`, который появился в стандарте ES6.

В следующем примере имеется объект с сеттером, который выводит, с помощью `console.log()` то, что пытаются записать в его соответствующее свойство.

```js
const person1 = {
  set name(newName) {
      console.log(newName)
  }
}

person1.name = 'x' // x
```


Попробуем скопировать этот объект, воспользовавшись методом `assign()`.

```js
const person2 = {}
Object.assign(person2, person1)

person2.name = 'x' // в консоль ничего не попадает, сеттер не скопирован
```


Как видно, такой подход не работает. Свойство `name`, которое в исходном объекте было сеттером, теперь представлено в виде обычного свойства.

Теперь выполним копирование объекта с использованием методов `Object.defineProperties()` (он появился в ES5.1) и `Object.getOwnPropertyDescriptors()`.

```js
const person3 = {}
Object.defineProperties(person3,
  Object.getOwnPropertyDescriptors(person1))

person3.name = 'x' //x
```

Здесь в копии объекта сеттер остался.

Надо отметить, что ограничения, характерные для `Object.assign()`, свойственны и для метода `Object.create()` при использовании его для клонирования объектов.

<br/><br/>


### Async/Await <a name="async_await"></a>

В стандарте ES2017 появилась конструкция `async/await`, которую можно считать важнейшим новшеством этой версии языка.

Асинхронные функции представляют собой комбинацию промисов и генераторов, они упрощают конструкции, для описания которых раньше требовался большой объём шаблонного кода и неудобные в работе цепочки промисов. Фактически, речь идёт о высокоуровневой абстракции над промисами.

Когда в стандарте ES2015 появились промисы, они призваны были решить существующие проблемы с асинхронным кодом, что они и сделали. Но за те два года, которые разделяют стандарты ES2015 и ES2017, стало ясно, что промисы нельзя считать окончательным решением этих проблем.

В частности, промисы были нацелены на решение проблемы «ада коллбэков», но, решив эту проблему, они сами показали себя не с лучшей стороны из-за усложнения кода, в котором они используются. Собственно говоря, конструкция `async/await` решает проблему промисов и повышает удобство работы с асинхронным кодом.

Рассмотрим пример.

```js
function doSomethingAsync() {
  return new Promise((resolve) => {
      setTimeout(() => resolve('I did something'), 3000)
  })
}
async function doSomething() {
  console.log(await doSomethingAsync())
}
console.log('Before')
doSomething()
console.log('After')
```

Этот код выведет в консоль следующее.

```
Before
After
I did something
```

Как видно, после вызова `doSomething()` программа продолжает выполняться, после `Before` в консоль тут же выводится `After`, а после того, как пройдут три секунды, выводится `I did something`.

#### Последовательный вызов асинхронных функций

При необходимости асинхронные функции могут формировать нечто вроде цепочек вызовов. Такие конструкции отличаются лучшей читабельностью, чем нечто подобное, основанное исключительно на промисах. Это можно видеть на следующем примере.

```js
function promiseToDoSomething() {
  return new Promise((resolve)=>{
      setTimeout(() => resolve('I did something'), 10000)
  })
}
async function watchOverSomeoneDoingSomething() {
  const something = await promiseToDoSomething()
  return something + ' and I watched'
}
async function watchOverSomeoneWatchingSomeoneDoingSomething() {
  const something = await watchOverSomeoneDoingSomething()
  return something + ' and I watched as well'
}
watchOverSomeoneWatchingSomeoneDoingSomething().then((res) => {
  console.log(res) // I did something and I watched and I watched as well
})
```

<br/><br/>


### Разделяемая память и атомарные операции <a name="memory_and_atomic_operations"></a>


<br/><br/><br/>


## ES9 <a name="ES9"></a>

### Spread/Rest для объектов (Object Rest/Spread) <a name="object_rest_spread"></a>

```js
const { first, second, ...others } = 
  { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }
console.log(first) //1
console.log(second) //2
console.log(others) //{ third: 3, fourth: 4, fifth: 5 }

const items = { first, second, ...others }
console.log(items) //{ first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }
```

<br/><br/>


### Метод Promise.prototype.finally() <a name="promise_finally"></a>

Если промис успешно разрешается — осуществляется вызов очередного метода `then()`. Если что-то идёт не так — вызывается метод `catch()`. Метод `finally()` позволяет выполнять некий код независимо от того, что происходило до этого.

```js
fetch('file.json')
  .then(data => data.json())
  .catch(error => console.error(error))
  .finally(() => console.log('finished'))
```

<br/><br/>


### Асинхронные итераторы (for await of) <a name="for_await_of"></a>

Новая конструкция `for-await-of` позволяет вызывать асинхронные функции, возвращающие промисы, в циклах. Такие циклы ожидают разрешения промиса перед переходом к следующему шагу. Вот как это выглядит.

```js
for await (const line of readLines(filePath)) {
  console.log(line)
}


const promises = [
  new Promise(resolve => resolve(1)),
  new Promise(resolve => resolve(2)),
  new Promise(resolve => resolve(3))
];

async function test1() {
  for await (const obj of promises) {
    console.log(obj);
  }
}

test1(); // 1, 2, 3
```

Так как он использует `await`,  `for-await-of` можно использовать только внутри `async` функций, как обычный `await` в async/await.

<br/><br/>


### Новые функции регулярных выражений <a name="es9_regexp"></a>

[https://frontend-stuff.com/blog/es2018/#улучшения-регулярных-выражений](https://frontend-stuff.com/blog/es2018/#улучшения-регулярных-выражений)


<br/><br/><br/>


## ES10 <a name="ES10"></a>

### String.trimStart() и String.trimEnd() <a name="trimstart_trimend"></a>

Эти два метода используются для очистки пустых символов в начале и конце строки, методы не изменяют исходную строку.

```javascript
const greeting = "    Hello everyone    ";
greeting.trimStart(); // "Hello everyone    "
greeting.trimEnd(); // "    Hello world"
```

<br/><br/>


### Параметры для catch. (try…catch err param) <a name="try_catch_err_param"></a>

В ES10 мы можем опустить круглые скобки после catch

```javascript
try{
    // ... 
}catch{
    // ...
}
```

<br/><br/>


### Function.prototype.toString() <a name="function_tostring"></a>

До ES10 Function.prototype.toString() возвращал только тело функции, а не комментарии и пробелы в нем. После ES10 метод возвращает содержимое функции полностью.

```javascript
function /* a comment */ name() {/*...*/}

// ES9
name.toString(); // "function name() {}"
// ES10
name.toString(); // "function /* a comment */ name () {/*...*/}"
```

<br/><br/>


### Свойство описания символа. (Symbol.prototype.description) <a name="symbol_description"></a>

Мы знаем, что при создании объекта Symbol мы можем передать строку как описание символа, а в ES10 мы можем получить доступ к этой строке напрямую через атрибут description.

```javascript
var s = Symbol('test symbol');
console.log(s.description); // "test symbol"
```

Этот атрибут можно использовать только для доступа, его нельзя назначать и изменять

```javascript
s.description = 'new description'
console.log(s.description); // "test symbol"
```

<br/><br/>


### Object.fromEntries() <a name="object_fromentries"></a>

Этот метод противоположен методу Object.entries в ES8. Метод Object.entries используется для возврата свойств и значений объекта в массиве, а Object.fromEntries может изменить его обратно на исходный объект.

```javascript
let arr = Object.entries({foo:1,bar:2});
console.log('arr',arr); // arr [["foo", 1], ["bar", 2]]
let obj = Object.fromEntries(arr);
console.log('obj',obj); // obj {foo: 1, bar: 2}
```

Что касается противоположности двух методов, если массив передается методу Object.entries, исходный массив не может быть возвращен с помощью Object.fromEntries, может быть возвращен только один объект

```javascript
let arr = Object.entries([1,2]);
console.log('arr',arr); // arr [["0", 1], ["1", 2]]
let obj = Object.fromEntries(arr);
console.log('obj',obj); // obj {0: 1, 1: 2}
```

Сценарий, который приводит к потери данных:

```js
const students = [
  ["john", 22],
  ["alex", 22],
  ["julia", 21],
  ["alex", 20],
];

const studentObj = Object.fromEntries(students);
// { john: 22, alex: 20, julia: 21 }
// первый alex был перезаписан
```

<br/><br/>


### Array.prototype.flat() <a name="array_flat"></a>

`Array.flat()` возвращает новый массив, в котором все подмассивы были рекурсивно “подняты” на указанный уровень глубины. Вызов `Array.flat()` без каких-либо аргументов сглаживает только первый уровень глубины. Можно указать необязательный аргумент глубины или вызвать функцию последовательно.

```js
const arr = [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]];

arr.flat(); // [1, 2, 3, 4, 5, 6, Array(4)];
arr.flat().flat(); // [1, 2, 3, 4, 5, 6, 7, 8, 9, Array(3)];
arr.flat(3); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// Или, если ты не уверен в глубине массива:
arr.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

<br/><br/>


### Array.prototype.flatMap() <a name="array_flatmap"></a>

Метод `flatMap()` идентичен методу `map` ES6, но в то же время сглаживает первый уровень глубины массива. Метод `flatMap()` сначала перебирает каждый элемент с помощью функции `map()`, а затем выравнивает результат через `flat()` в новый массив. `flatMap()` весьма полезен, так как объединение обоих методов в один - более эффективно.

```js
const arr = [1, 2, 3, 4, 5];

arr.map((x) => [x, x * 2]);
// [Array(2), Array(2), Array(2), Array(2), Array(2)]
// 0: (2)[1, 2]
// 1: (2)[2, 4]
// 2: (2)[3, 6]
// 3: (2)[4, 8]
// 4: (2)[5, 10]

arr.flatMap((v) => [v, v * 2]);
// [1, 2, 2, 4, 3, 6, 4, 8, 5, 10]
```

```js
const sandwich = ["bread", "peanut butter and jelly", "bread"];

// Помни String.split() возвращает массив строк:
const ingredientArrays = sandwich.map((item) => item.split(" and "));
// [["bread"], ["peanut butter","jelly"], ["bread"]]

const ingredientsList = sandwich.flatMap((item) => item.split(" and "));
// ['bread', 'peanut butter', 'jelly', 'bread']
```

<br/><br/>


### Хорошо сформированный JSON.stringify() <a name="es10_json_stringify"></a>

Исправленный вывод `JSON.stringify()` при обработке суррогатных кодовых точек UTF-8 (от U+D800 до U+DFFF).

Перед этим изменением вызов `JSON.stringify()` возвращал некорректный символ Unicode («�»).

Теперь эти суррогатные кодовые точки можно безопасно представить в виде строк, используя `JSON.stringify()`, и преобразовать обратно в их исходное представление, используя `JSON.parse()`.

```js
JSON.stringify('\uD800');
> '"�"'

JSON.stringify('\uD800');
> '"\\ud800"'
```


<br/><br/><br/>


## ES11 <a name="ES11"></a>

### Динамический импорт <a name="dynamic_import"></a>

“Динамический импорт” в JavaScript даёт возможность динамически импортировать файлы JS в виде модулей. Так же, как мы делаем это с помощью Webpack и Babel на данный момент.

Эта функция поможет получить код по запросу (более известный как разделение кода - code splitting), без дополнительных затрат на webpack или другие пакеты модулей. Также ты можешь загрузить код в блоке `if-else`.

Динамический `import ()` возвращает обещание (Promise). Следовательно, импорт теперь может быть назначен переменной с помощью `async / await`.

```js
// utils.js
export function add(a, b) {
  return a + b;
}
// ---------
// index.js
// Вариант 1
(async function () {
  const module = await import("./utils");
  const sum = module.add(2, 3);
  console.log(sum); // 5
})();

// Вариант 2
async function load() {
  const module = await import("./utils");
  const sum = module.add(2, 3);
  console.log(sum); // 5
}
load();

// Вариант 3
function load() {
  return import("./add").then((module) => {
    const sum = module.add(2, 3);
    console.log(sum); // 5
  });
}
load();
```

<br/><br/>


### BigInt <a name="es11_bigint"></a>

Одна из самых ожидаемых функций в JavaScript, и она наконец-то здесь. `BigInt` это встроенный объект, который предоставляет способ представлять целые числа больше `pow(2, 53) - 1`, наибольшего числа, которое JavaScript может надежно представить с Number примитивом.

На данный момент максимальное число, которое можно хранить как целое число в JavaScript, равно `pow(2, 53) - 1`. `BigInt` позволяет пойти дальше.

Тем не менее, нужно добавить `n` в конце числа. `n` означает, что это `BigInt`.

```js
let oldMax = Number.MAX_SAFE_INTEGER; // 9007199254740991
++oldMax; // 9007199254740992
++oldMax; // 9007199254740992 <- такое же значение

let newMax = 9007199254740992n;
++newMax; // 9007199254740993n
++newMax; // 9007199254740994n

const a = 9007199254740991n; // 9007199254740991n
const b = BigInt(9007199254740991n); // 9007199254740991n
a === b; // true

typeof 10; // "number";
typeof 10n; // "bigint";
```

<br/><br/>


### globalThis <a name="globalthis"></a>

В JavaScript всегда есть один большой объект контекста, который содержит всё. Традиционно в браузерах это `window`. Но если попытаешься получить к нему доступ в Node, то получишь ошибку. В Node нет глобального объекта `window`; вместо этого есть объект `global`. С другой стороны, в WebWorkers нет доступа к `window`, но вместо этого есть `self`.

ES2020 приносит `globalThis`, который всегда ссылается на глобальный объект, независимо от того, где мы выполняем свой код:

```js
// Прежде, решение было таким:

const getGlobal = function () {
  if (typeof self !== undefined) {
    return self;
  }
  if (typeof window !== undefined) {
    return window;
  }
  if (typeof global !== undefined) {
    return global;
  }
  throw new Error("unable to locate global object");
};

const globals = getGlobal();

// Сейчас есть `globalThis`
globalThis === window; // true
```

<br/><br/>


### Оператор опциональной последовательности (Optional chaining) <a name="optional_chaining"></a>

Ещё не официально [MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

Новый оператор опциональной последовательности призван сделать код короче, при работе со вложенными объектами и проверкой на `undefined`.

```js
const car = null;
const color = car && car.color;

const car = {}
const colorName = car && car.color && car.color.name;

const car = {};
const color = car?.color;
const colorName = car?.color?.name;
```

[Более подробно здесь](https://frontend-stuff.com/blog/javascript-optional-chaining/)

<br/><br/>


### Module namespace exports <a name="namespace_exports"></a>

В JavaScript модулях уже можно было использовать следующий синтаксис:

```js
import * as utils from "./utils.mjs";
```

Тем не менее до сих пор, не было никакого синтаксиса экспорта:

```js
export * as utils from "./utils.mjs";
```

Он эквивалентен следующему:

```js
import * as utils from "./utils.mjs";
export { utils };
```

<br/><br/>


### Проверка на null (Nullish coalescing) <a name="nullish_coalescing"></a>

**Nullish coalescing** - добавляет возможность действительно проверять **нулевые** (nullish) значения вместо **ложных** (falsey).

В JavaScript многие значения **ложные** `falsey`. Например: пустые строки, число 0, `undefined`, `null`, `false`, `NaN` и т. Д.

Тем не менее, во многих случаях нам нужно проверить, является ли переменная **нулевой** то есть - `undefined` или `null`; например, когда переменная может иметь пустую строку или даже значение `false`.

В этом случае мы можем использовать новый оператор `??`

```js
const initialValue = 0;

// Старый способ
const myVar1 = initialValue || 10; // 10

// Новый способ
const myVar2 = initialValue ?? 10; // 0
```

Ниже можем увидеть, как оператор ИЛИ `||` всегда возвращает **истинное** значение, тогда как нулевой оператор `??` возвращает **не нулевое** значение.

```js
false ?? "truthy value"; // => false
undefined ?? "truthy value"; // => "truthy value"
null ?? "truthy value"; // => "truthy value"
NaN ?? "truthy value"; // => NaN

false || "truthy value"; // => "truthy value"
undefined || "truthy value"; // => "truthy value"
null || "truthy value"; // => "truthy value"
NaN || "truthy value"; // => "truthy value"
```

<br/><br/>


### Ожидание всех промисов (Promise.allSettled) <a name="promise_allsettled "></a>

Promise.all выполнится успешно (resolves) только тогда, когда все переданные промисы были выполнены успешно. И выполнялся с ошибкой (rejects), если хотя бы один из промисов был отклонен, в то время как другие ещё могли быть в статусе ожидания (pending).

Новый `allSettled` ведет себя иначе. Он выполняется всякий раз, когда все промисы заканчиваются, то есть выполнились успешно или выполнились с ошибкой. Он возвращает массив, который содержит как статус промиса, так и значение (или ошибку).

Таким образом, `allSettled` никогда не отклоняется. Он либо в состоянии ожидания, либо выполнился успешно.

```js
const promiseArray = [
  Promise.resolve(200),
  Promise.reject(""),
  Promise.reject(new Error("Error")),
];

Promise.allSettled(promiseArray).then((result) => {
  console.log("All Promises Settled", result);
});

// All Promises Settled
// [
//   {status: "fulfilled", value: 200},
//   {status: "rejected", reason: ""},
//   {status: "rejected", reason: Error: Error at <anonymous>:4:18}
// ]
```

<br/><br/>


### String.matchAll <a name="string_matchall"></a>

`matchAll` - это новый метод, добавленный к прототипу `String`, который связан с регулярными выражениями. Он возвращает итератор, который в свою очередь возвращает все совпадающие группы одну за другой.

```js
const str = "abc";
const regexp = /[a-c]/g;
const iterator = str.matchAll(regexp);

for (result of iterator) {
  console.log(result);
}
// ["a", index: 0, input: "abc", groups: undefined]
// ["b", index: 1, input: "abc", groups: undefined]
// ["c", index: 2, input: "abc", groups: undefined]
```

Или

```js
const str = "#JavaScript is full of #surprises.";
const regexp = /(#\w+)/g;
const iterator = str.matchAll(regexp);

for (result of iterator) {
  console.log(result);
}
// ["#JavaScript", "#JavaScript", index: 0, input: "#JavaScript is full of #surprises.", groups: undefined]
// ["#surprises", "#surprises", index: 23, input: "#JavaScript is full of #surprises.", groups: undefined]
```

<br/><br/>


### Порядок выполнения for-in (for-in mechanics) <a name="for_in_mechanics"></a>

Спецификация ECMA не указывала, в каком порядке `for (x in y)` должно выполняться. Несмотря на то, что браузеры реализовали согласованный порядок самостоятельно, это официально стандартизировано в ES2020.
