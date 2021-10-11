5 основных веток:

0. **Devel** - В формате препроцессоров
0. **Markdown** - В формате .md (Главная ветка)
0. **gh-pages** - В html формате

0. **Devel_draft** - Черновик
0. **Markdown_draft** - Черновик

всё остальное - временное


[asd1111as222d](https://www.youtube.com/watch?v=K8bM6N7PFJM)

<h1>asdasd</h1>

<iframe src="./index.html" width="100%" height="300px"></iframe>


<iframe height="265" style="width: 100%;" scrolling="no" title="Horizontal Image Accordion jQuery" src="https://codepen.io/Ragnarok/embed/pRRmor?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/Ragnarok/pen/pRRmor'>Horizontal Image Accordion jQuery</a> by Ragnarok
  (<a href='https://codepen.io/Ragnarok'>@Ragnarok</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>



<details>
<summary>Spoiler</summary>
<p>

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
</p>
</details>
