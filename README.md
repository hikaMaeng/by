# by
make delegated properties in JavaScript Class like by of kotlin 

step1. make delegator with by.getValue, by.setValue
```js
class TestDelegate{
  [by.getValue](target, k){return target.map.get(k) ?? `no ${k}`;}
  [by.setValue](target, k, v){target.map.set(k, v);}
}
```

step2. declare delegated properties using static
```js
class Test{

  //declare delegated properties with class name
  static name = TestDelegate;
  static company = TestDelegate;
  static other = TestDelegate;
  
  map = new Map;
}
```

step3. by.set
```js
by.set(Test);
```

step4. use properties
```js
const test = new Test;
test.name = "hika";
test.company = "bsidesoft";
 
console.log(test.name); //hika
console.log(test.company); //bsidesoft
console.log(test.other); //no other
```

related posting(korean)
<a href="https://www.bsidesoft.com/8312" target="_blank">[js] 코틀린 delegated Property 흉내내기</a>

## advanced usage

using delegate instance
```js
class TestDelegate{
  [by.getValue](target, k){return target.map.get(k) ?? `no ${k}`;}
  [by.setValue](target, k, v){target.map.set(k, v);}
}

class Test{
  static company = new TestDelegate; //<-----instance!
  map = new Map;
}
by.set(Test);
```

using standard delegate

### lazy
```js
class Test{

static sum = lazy(({data})=>data.reduce((acc,v)=>acc + v));

  data;

  constructor(...arg){
    this.data = [...arg];
  }
}
by.set(Test);
const test = new Test(1, 2, 3, 4, 5);
console.log(test.sum); //15
console.log(test.sum); //15
```
when get first, call initializer and memoization.
just like <a href="https://kotlinlang.org/docs/reference/delegated-properties.html#lazy" target="_blank">https://kotlinlang.org/docs/reference/delegated-properties.html#lazy</a>

### observe
```js
class Test{
  static name = observe('', (target, k, oldV, newV)=>console.log(oldV, 'to', newV));
}
by.set(Test);

const test = new Test;
test.name = 'hika'; // '' to 'hika'
test.name = 'maeng'; // 'hika' to 'maeng'
```
when called setter, nofity changes to observer function
just like <a href="https://kotlinlang.org/docs/reference/delegated-properties.html#observable" target="_blank">https://kotlinlang.org/docs/reference/delegated-properties.html#observable</a>

