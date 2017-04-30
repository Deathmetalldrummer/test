# Формы

### **Состояние модели**

Применение директивы **ngModel** не только устанавливает привязку данных, но и позволяет отслеживать состояние элемента ввода. Для установки состояния Angular применяет к элементам ввода специальные классы CSS:
* Если элемент ввода еще не получал фокус, то устанавливается класс **ng-untouched**. Если же поле ввода уже получало фокус, то к нему применяется класс **ng-touched**. При этом получение фокуса не обязательно должно сопровождаться изменением значения в этом поле.
* Если первоначальное значение в поле ввода было изменено, то устанавливается класс **ng-dirty**. Если же значение не изменялось с момента загрузки страницы, то к элементу ввода применяется класс **ng-pristine**
* Если значение в поле ввода корректно, то применяется класс **ng-valid**. Если же значение некорректно, то применяется класс **ng-invalid**

Например, при запуске веб-страницы для элемента ввода:
```html
<input name='title' [(ngModel)]='title' />
```
Будет генерироваться следующая разметка html:
```html
<input class='ng-untouched ng-pristine ng-valid' name='title' ng-reflect-name='title' />
```

---
<br />
---
---
  
---
  
  
  
  
  
  
---

### **Валидация**
#### **Валидация**
##### **Валидация**

Angular 2 мы можем использовать валидацию HTML5
* **required**: требует обязательного ввода значения
* **pattern**: задает регулярное выражение, которому должны соответствовать вводимые данные

```html
<input type="text" name="name" value="" required pattern="[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}" />
```

<br />

**Валидация email в Angular 4**

Так как валидация email является довольно распространенной задачей, то начиная с версии Angular 4 был добавлен специальный валидатор в виде атрибута `email`:
```html
<input type='email' email />
```

<br />

### Template-Driven

* Директива **ngModel**:
```html
<input type='text' name=”id” #inputModel='ngModel' [(ngModel)]='id' />
<span>{{inputModel.model}}</span>
<span>{{inputModel.valid}}</span>
<button (click)='f(inputModel)'>ok</button>
```
`#inputModel` шаблонная переменная, является обьектом ngModel (переменной присваивается обьект ngModel или имеет тип этого объекта). Можно передать в функцию в качестве параметра, если присутствует `[(ngModel)]='id'` , `[ngModel]='id'`.
<br />
<br />
Некоторые свойства **ngModel**:
```typescript
NgModel {
    name: // значение атрибута name
    model: // данные которые попадают в модель [(ngModel)]
    value: // значение формы или аналогично model
    valid: // валидация boolean (true)
    invalid: // валидация boolean (false)
    untouched:    
}
```
https://metanit.com/web/angular2/5.2.php


* Директива **ngForm**:
* Директива **ngSubmit**:


<br />

### Data-Driven

При подходе Data-Driven для формы создается набор объектов **FormGroup** и **FormControl**.
<br />
Нужно импортировать модуль **ReactiveFormsModule** из **'@angular/forms'** в главном файле модуля.
<br />
Также импортировать в файл компонента **FormGroup** ,  **FormControl** , **FormArray** и **FormBuilder** из **'@angular/forms'**

* **FormGroup** - Сама форма и ее подсекции
```html
<form [formGroup]='myForm'>
</form>
```
```typescript
myForm : FormGroup = new FormGroup();
```

* **FormControl** - Отдельные элементы ввода
```html
<form [formGroup]='myForm'>
    <input type='text' name='myInput' formControlName='myInput' />
</form>
```
```typescript
myForm : FormGroup = new FormGroup({
    'myInput': new FormControl()
});
```

* **FormArray** - Массив, хранит набор объектов FormControl.
```html
<form [formGroup]='myForm'>
    <div formArrayName='arrayCheck'>
        <div *ngFor="let check of myForm.controls['arrayCheck'].controls; let i = index">
            <input type='checkbox' name='myCheck' formControlName='{{i}}' />
        </div>
    </div>
</form>
```
```typescript
myForm : FormGroup = new FormGroup({
    "arrayCheck": new FormArray([
        new FormControl(),
        new FormControl()
    ])
});
```

* **FormBuilder** - Альтернативный подход к созданию форм
<br />
FormBuilder передается в качестве сервиса в конструктор. С помощью метода group() создается объект FormGroup. Каждый элемент передается в форму в виде обычного массива значений
```typescript
myForm : FormGroup;
    constructor(private formBuilder: FormBuilder) {
        this.myForm = formBuilder.group({
            "myInput": ["email@ecorp.com", [Validators.required, Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}")]],
            "arrayCheck": formBuilder.array([
                [true, Validators.required]
            ])
        });
    }
```


<br />
<br />
<br />

```html
<form [formGroup]='myForm'>
    <input type='text' name='myInput' formControlName='myInput' />
    <div formArrayName='arrayCheck'>
        <div *ngFor="let check of myForm.controls['arrayCheck'].controls; let i = index">
            <input type='checkbox' name='myCheck' formControlName='{{i}}' />
        </div>
    </div>
</form>
```
```typescript
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

myForm : FormGroup = new FormGroup({
    'myInput': new FormControl('Значение по умолчанию', ['набор','валидаторов']),
    "arrayCheck": new FormArray([
        new FormControl('Значение по умолчанию', ['набор валидаторов']),
        new FormControl(true, Validators.required)
    ])
});

// FormBuilder:
myForm : FormGroup;
constructor(private formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
        "myInput": ["email@ecorp.com", [Validators.required, Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}")]],
        "arrayCheck": formBuilder.array([
            [true, Validators.required]
        ])
    });
}
```
