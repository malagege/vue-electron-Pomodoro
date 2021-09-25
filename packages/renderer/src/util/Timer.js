export default class Timer {
    constructor(i, everytimeHandle, successHandle, vuedata) {
      this.stime = i;
      this.everytimeHandle = everytimeHandle;
      this.successHandle = successHandle;
      this.vuedata = vuedata;
      vuedata.i = i;
      vuedata.stime = i;
      this.start();
    }
    test() {
      console.log(this.i);
    }
    start() {
      if( this.timerId ) return false;
      this.timerId = setInterval(() => {
        this.i -= 1;
        console.log('Timer i:' + this.i);
        if (this.i <= 0) {
          this.stop();
          this.successHandle(this);
        }else{
          this.everytimeHandle(this);
        }
      }, 1000);
    }
    stop() {
      if(this.timerId){
        clearInterval(this.timerId);
        this.timerId = null;
      }

    }

    get i(){
      return this.vuedata.i;
    }

    set i(i){
      this.vuedata.i = i;
    }
  }