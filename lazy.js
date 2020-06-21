export const lazy =(_=>{
  class Lazy{
    static #EMPTY = Symbol();
    #f;
    #v = Lazy.#EMPTY;

    constructor(f){
      this.#f = f;
    }

    [by.getValue](target, k){
      if(this.#v === Lazy.#EMPTY) this.#v = this.#f(target);
      return this.#v;
    }
    [by.setValue](target, k, v){throw "read only";}
  }
  return f=>new Lazy(f);
})();
