export class by{
  static getValue = Symbol();
  static setValue = Symbol();
  static set(cls){
    Object.entries(cls).forEach(([k, dele])=>{
      let delegate, test;
      if(typeof dele == 'function'){
        delegate = new dele;
        test = dele.prototype;
      }else delegate = test = dele;
      if(typeof test[by.getValue] != 'function' ||
         typeof test[by.setValue] != 'function') return;
      delete cls[k];
      Object.defineProperty(cls.prototype, k, {
        get(){return delegate[by.getValue](this, k);},
        set(v){delegate[by.setValue](this, k, v);}
      });
    });
  }
}
