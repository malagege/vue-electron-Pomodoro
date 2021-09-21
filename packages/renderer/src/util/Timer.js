export class Timer {
    constructor(i) {
      this.i = i;
      this.stime = i;
      this.start();
    }
    test() {
      console.log(this.i);
    }
    start() {
      if(! this.timerId ) return false;
      this.timerId = setInterval(() => {
        this.i -= 1;
        console.log('Timer i:' + this.i);
        if (this.i <= 0) {
          this.stop();
        }
      }, 1000);
    }
    stop() {
      if(this.timerId){
        clearInterval(this.timerId);
        this.timerId = null;
      }

    }
  }