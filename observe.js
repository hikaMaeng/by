export const observe =(_=>{
  class Observer{
    #value;
    #observer;
    constructor(value, observer){
      this.#value = value;
      this.#observer = observer;
    }
    [by.getValue](target, k){
      return this.#value;
    }
    [by.setValue](target, k, v){
      const old = this.#value;
      this.#value = v;
      this.#observer(target, k, old, v);
    }
  }
  return (value, observer)=>new Observer(value, observer);
})();
