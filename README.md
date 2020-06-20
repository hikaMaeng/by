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
