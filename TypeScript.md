# TypeScript

Установка:

	npm install -g typescript

С помощью параметра `–target` или его сокращенной версии `–t` можно задать версию стандарта JavaScript,   "ES3", "ES5" или "ES6".(Из консоли)


### tsconfig.json

файл настроек TypeScript

свойство compilerOptions" настраивает параметры компиляции
```JSON
{
   "compileOnSave": true,
   "compilerOptions": {
       "target": "ES5",
       "removeComments": true,
       "outFile": "./index.js"
   },
   "files": ["index.ts"]
}
```
Если секция "files" не указана в файле tsconfig.json, то компилятор по умолчанию включает все файлы TypeScript (файлы с расширением .ts и .tsx), которые находятся в каталоге и подкаталогах проекта. Если же указана секция "files", то используются только файлы из этой секции.

```JSON
"exclude":[
    "wwwroot",
    "node_modules"
]
```
При этом следует учитывать, что если в файле одновременно будут заданы обе секции files и exclude, то секция exclude будет игнорироваться.





## Типы данных и переменные
### Объявление переменных и констант
### Типы данных
TypeScript является строго типизированным языком, и каждая переменная и константа в нем имеет определенный тип. При этом в отличие от javascript мы не можем динамически изменить ранее указанный тип переменной.
В TypeScript имеются следующие базовые типы:

- **Boolean**: логическое значение true или false
- **Number**: числовое значение
- **String**: строки
- **Array**: массивы
- **Tuple**: кортежи
- **Enum**: перечисления
- **Any**: произвольный тип
- **Null** и **undefined**: соответствуют значениям **null** и - **undefined** в javascript
- **Void**: отсутствие конкретного типа

Для установки типа применяется знак двоеточия. Примеры создания переменных:

```typescript
let x: number = 10;
let hello: string = "hello world";
let isValid: boolean = true;
```

Если же переменная определяется без значения, и только впоследствии при работе программы ей присваивается значение, тогда считается, что она имеет тип any:
```typescript
let x;  // тип any
x = 10;
```



### Boolean (Логический)
Тип Boolean представляет логическое значение true или false:
```typescript
let isAlive: boolean = false;
 ```


### Number (Числовой)
Тип Number представляет числа, причем в дополнение к десятичной и шестнадцатиричной записи чисел TypeScript поддерживает также записи чисел в двоичной и восьмеричной системе, которые были добавлены в стандарт ECMAScript 2015:
```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```


### String (Строка)
String представляет строки. Как и в JavaScript, в TypeScript строки можно заключать в двойные, либо в ординарные кавычки:
```typescript
let firstName: string = "Tom";
let lastName = 'Johns';
```
TypeScript поддерживает такую функциональность, как шаблоны строк ( **\`** ),в строку можно встраивать разные выражения с помощью синтаксиса ${ expr }:
```typescript
let firstName: string = "Tom";
let age: number = 28;
let info: string = `Имя ${firstName}    Возраст: ${age}`;
console.log(info);  // Имя Tom    Возраст: 28
```
### Array (Массивы)
Массивы определяются с помощью выражения [] и также являются строго типизированными. То есть если изначально массив содержит строки, то в будущем он сможет работать только со строками.
```typescript
let list: number[] = [10, 20, 30];
let colors: string[] = ["red", "green", "blue"];
console.log(list[0]);
console.log(colors[1]);
```
Альтернативный способ определения массивов представляет применение типа Array<>:
```typescript
let names: Array<string> = ["Tom", "Bob", "Alice"];
console.log(names[1]);  // Bob
```
### Tuple (Кортежи)
Кортежи (Tuples) также, как и массивы, представляют набор элементов, для которых уже заранее известен тип. Например:
```typescript
// определение кортежа - кортеж состоит из двух элементов - строки и числа
let userInfo: [string, number];
// инициализация кортежа
userInfo = ["Tom", 28];
// Неправильная инициализация - переданные значения не соответствуют типам по позиции
//userInfo = [28, "Tom"]; // Ошибка

// использование кортежа
console.log(userInfo[1]); // 28
userInfo[1] = 37;
```
### Enum (Перечисления)
```typescript
enum Season { Winter, Spring, Summer, Autumn };
let current: Season = Season.Summer;
console.log(current);
current = Season.Autumn; // изменение значения
```

### Any (Произвольный)
Any описывает данные, тип которых может быть неизвестен на момент написания приложения.
```typescript
let someVar: any = "hello";
console.log(someVar);   // сейчас someVar - это string
someVar = 20;
console.log(someVar);   // сейчас someVar - это number
```
Так как здесь применяется тип any, то данный код скомпилируется без ошибок, несмотря на смену строкового значения на числовое. И также мы можем объявлять массивы данного типа:
```typescript
var someArray: any[] = [ 24, "Tom", false];
```
### Null и undefined
Как и в JavaScript, в TypeScript есть специальные типы undefined и null, которые принимают соответствующие значения undefined и null.
В этом плане null и undefined выступают как подтипы других типов и полезны преимущественно в каких-то операциях, где неизвестен результат - то ли это будет число или строка, то ли это будет null. В этом случае, чтобы избежать возможной ошибки, мы можем проверить значение на undefined или null, собственно как и в javascript.
### Void
### Комплексные объекты
Кроме простых переменных, как и в javascript, можно создавать сложные объекты:
```typescript
let person = {name:"Tom", age:23};
console.log(person.name);
console.log(person["age"]);

person = { name: "Alice" }; //ошибка
```
Компилятор после первой строки предполагает, что объект person будет иметь два свойства name и age. Должно быть соответствие по названиям, количеству и типу свойств.






## Работа с типами данных
### Объединения
Объединения или union не являются собственно типом данных, но они позволяют определить переменную, которая может хранить значение двух или более типов.
Чтобы определить все типы, которые должно представлять перечисление, все эти типы разделяются прямой чертой: **string[] `|` string**.
```typescript
let names : string[] | string;
names = "Tom";
console.log(names); // Tom
names = ["Alice", "Bob"];
console.log(names[1]);  // Bob
names = 6; //ошибка
```

### Проверка типа
С помощью оператора **typeof** мы можем проверить тип переменной.


### Псевдонимы типов

TypeScript позволяет определять псевдонимы типов с помощью ключевого слова type.
```typescript
type stringOrNumberType = number | string;
let sum: stringOrNumberType = 36.6;
if (typeof sum === "number") {
    console.log(sum / 6);
}
```

### Type assertion!
Type assertion представляет модель преобразования значения переменной к определенному типу. Обычно в некоторых ситуациях одна переменная может представлять какой-то широкий тип, например, any, который по факту допускает значения различных типов. Однако при этом нам надо использовать переменную как значение строго определенного типа. И в этом случае мы можем привести к этому типу.

Есть две формы приведения. Первая форма заключается в использовании угловых скобок:

```typescript
let someAnyValue: any = "hello world!";
let strLength: number = (<string>someAnyValue).length;
console.log(strLength); // 12

let someUnionValue: string | number = "hello work";
strLength = (<string>someUnionValue).length;
console.log(strLength); // 10
```

Вторая форма заключается в применении оператора as:
```typescript
let someAnyValue: any = "hello world!";
let strLength: number = (someAnyValue as string).length;
console.log(strLength); // 12

let someUnionValue: string | number = "hello work";
strLength = (someUnionValue as string).length;
console.log(strLength); // 10
```



## Функции
### Определение функции
TypeScript также определяет функцию с помощью ключевого слова function, но при этом добавляет дополнительные возможности по работе с функциями. В частности, теперь мы можем определить тип передаваемых параметров и тип возвращаемого значения.Если функция ничего не возвращает, то указывается тип **void**. Типичное определение функции в TypeScript:

```typescript
// определение функции
function add(a: number, b: number): number {
    return a + b;
}
// вызов функции
let result1 = add(1, 2);
console.log(result1);

let add2 = function (a: number, b: number) : number {
    return a + b;
}
let result2 = add2(1, 2);

let result3 = add2('1', '2');
console.log(result2); // Ошибка
```


### Необязательные параметры и параметры по умолчанию
В typescript при вызове в функцию должно передаваться ровно столько значений, сколько в ней определено параметров.

Чтобы иметь возможность передавать различное число значений в функцию, в TS некоторые параметры можно объявить как необязательные. Необязательные параметры должны быть помечены вопросительным знаком `?`. Причем необязательные параметры должны идти после обязательных:
```typescript
function getName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

var result = getName("Иван", "Кузнецов");
console.log(result); // Иван Кузнецов
var result2 = getName("Вася");
console.log(result2); // Вася
```


Во втором случае, когда в функцию передается только имя, второй используемый параметр будет иметь неопределенное значение или "undefined". Поэтому с помощью условной конструкции проверяется наличие значения для этого параметра.


Особым типом необязательных параметров являются параметры по умолчанию. Если для данных параметров не передано значение, то они используют некоторое значение по умолчанию:

```typescript
function getName(firstName: string, lastName: string="Иванов") {

    return firstName + " " + lastName;
}

var result = getName("Иван", "Кузнецов");
console.log(result); // Иван Кузнецов
var result2 = getName("Вася");
console.log(result2); // Вася Иванов
```

Но выше речь шла только о единичных необязательных параметрах. Если же необходимо, чтобы функция принимала набор однотипных параметров, то используется знак многоточия, после которого идет массив:

```typescript
function addNumbers(firstNumber: number, ...numberArray: number[]): number {

    var result = firstNumber;
    for (var i = 0; i < numberArray.length; i++) {
        result+= numberArray[i];
    }
    return result;
}

var result1 = addNumbers(3, 7, 8);
console.log(result1); // 18

var result2 = addNumbers(3, 7, 8, 9, 4);
console.log(result2); // 31
```
### Перегрузка функций
TypeScript поддерживает возможность перегрузки функций, то есть мы можем определить несколько версий функции, которые будут иметь одно и то же имя, но разные типы параметров или разное количество параметров или разные возвращаемые типы результатов. Для перегрузки вначале опеределяем все версии функции, которые не будут иметь никакой логики. А потом определяем версию функции с общей сигнатурой, которая подходит под все ранее определенные варианты. И в этой общей версии уже определяем конкретную логику функции.

Например, нам надо объединить два значения, но если они представляют строки, то просто их конкатенировать, а если числа - то сложить. Тогда мы могли бы использовать следующую функцию:

```typescript
function add(x: string, y: string): string;
function add(x: number, y: number): number;
function add(x: any, y: any): any {
    return x + y;
}

var result1 = add(5, 4);
console.log(result1);   // 9
var result2 = add("5", "4");
console.log(result2);   // 54
var result3 = add(true, false);
console.log(result3); // ошибка
```

Первая версия функции add принимает две строки и возвращает строку, вторая версия принимает два числа и возвращает число. Общей для них будет функция, которая принимает параметры типа any и возвращает результат также типа any.

При создании общего определения функции для параметров и возвращаемых значений может использоваться общий тип any, но можно также использовать объединения. Так как первая версия функции принимает параметр типа string, а вторая - типа number, то в качестве общего для них типа может выступать как тип any, так и объединение string|number.




## Тип функции и лямбда-выражения!
### Тип функции
Мы можем определить переменную как функцию некоторого типа. Например:
```typescript
let operation: (x: number, y: number) => number;
operation = function(x: number, y: number): number {
    return x + y;
};
console.log(operation(10, 20)); // 30
operation = function (x: number, y: number): number {
    return x * y;
};
console.log(operation(10, 20)); // 200
```

Здесь определена переменная operation, которая имеет тип (x: number, y: number) => number;, то есть фактически представляет некоторую функцию, которая принимает два параметра типа number и возвращает значение также типа number.

Причем мы можем динамически изменять целевую функцию, главное, чтобы ее тип соответствовал типу переменной.


### Функции обратного вызова
Тип функции можно использовать как тип переменной, но он также может применяться для определения типа параметра другой функции:

```typescript
function mathOp(x: number, y: number, operation: (a: number, b: number) => number): number{

    let result = operation(x, y);
    return result;
}
let operationFunc: (x: number, y: number) => number;
operationFunc = function (a: number, b: number): number {
    return a + b;
}
console.log(mathOp(10, 20, operationFunc)); // 30

operationFunc = function (a: number, b: number): number {
    return a * b;
}
console.log(mathOp(10, 20, operationFunc)); // 200
```

Здесь в функции mathOp третий парметр как раз представляет функцию, которая принимает два параметра типа number и возвращает число. Фактически тем самым мы можем передавать функции обратного вызова, например, при генерации событий, когда в ответ на некоторое действие срабатывает другая функция.


### Лямбды
Для определения функций в TypeScript можно использовать лямбда-выражения. Лямбда-выражения представляют выражения типа (параметры) => тело функции. Например:

```typescript
let sum = (x: number, y: number) => x + y;

let result = sum(15, 35); // 50
console.log(result);
```

Если тело функции представляет множество выражений, а не просто одно выражение, как в примере выше, тогда можно опять же заключить все выражения в фигурные скобки:

```typescript
let sum = (x: number, y: number) => {
    x *= 2;
    return x + y;
};

let result = sum(15, 35); // 65
console.log(result);
```

Лямбда-выражения можно передавать в функцию за место параметра, который представляет собой функцию:

```typescript
function mathOp(x: number, y: number, operation: (a: number, b: number) => number): number{

    let result = operation(x, y);
    return result;
}
console.log(mathOp(10, 20, (x,y)=>x+y)); // 30
console.log(mathOp(10, 20, (x, y) => x * y)); // 200
```
