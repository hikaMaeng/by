export class by{
  static getValue = Symbol();
  static setValue = Symbol();
  static set(cls){
    Object.entries(cls).forEach(([k, dele])=>{
      if(typeof dele != 'function' ||
         typeof dele.prototype[by.getValue] != 'function' ||
         typeof dele.prototype[by.setValue] != 'function') return;
      delete cls[k];
      const delegate = new dele;
      Object.defineProperty(cls.prototype, k, {
        get(){return delegate[by.getValue](this, k);},
        set(v){delegate[by.setValue](this, k, v);}
      });
    });
  }
}
