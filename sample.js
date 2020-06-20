//make Delegator
class TestDelegate{
  [by.getValue](target, k){return target.map.get(k) ?? `no ${k}`;}
  [by.setValue](target, k, v){target.map.set(k, v);}
}

//concreate class
class Test{

  //declare delegate properties 
  static name = TestDelegate;
  static company = TestDelegate;
  static other = TestDelegate;
  
  map = new Map;
}

//bind
by.set(Test);
 
const test = new Test;
test.name = "hika";
test.company = "bsidesoft";
 
console.log(test.name, test.company, test.other);
//hika
//bsidesoft
//no other
