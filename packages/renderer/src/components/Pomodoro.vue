<template>
  <Setting
    :settings="settings"
    :sec="timer?.i"
    @update:settings="updateSettings"
  />
  <div style="position: relative;">
    <TheBackground :h="h" />
  </div>
</template>

<script>
import {defineComponent} from 'vue';
// import AppNavigation from '/@/components/AppNavigation.vue'
import TheBackground from '/@/components/TheBackground.vue';
import Setting from '/@/components/Setting.vue';
import {useElectron } from '/@/use/electron';
import Timer from '/@/util/Timer.js';
let electron = useElectron();

  // const { ipcRenderer } = window.electron
export default defineComponent({
  name: 'Pomodoro',
  components: {
    // AppNavigation,
    TheBackground,
    Setting,
  },
  data(){
    return {
      mode: 'work',//work,break
      // h: 40,
      timer:{i:0},
      settings:{
        activeButton: 'stop', //play,stop
        stime: 1500,
        ttime: 300,
        autotime: 60,
        windowAlwaysOnTop: this.getWindowAlwaysOnTop(),
        startword: 'Work', 
        takeword: 'Drink a water',
      },
    };
  },
  computed:{
    h(){
      if(this.mode === 'work'){
        return (this.timer.stime - this.timer.i) / this.timer.stime * 100;
      }else{
        return this.timer.i / this.timer.stime * 100;
      }
    },
  },
  watch:{
    'settings.windowAlwaysOnTop'(newvalue,oldvalue){
      console.log('watch settings.windowAlwaysOnTop',newvalue,oldvalue);
      console.log(this);
      if(newvalue){
        this.enableWindowAlwaysOnTop();
      }else{
        this.diseableWindowAlwaysOnTop();
      }
    }, 
    'settings.activeButton'(newvalue,oldvalue){
      console.log('watch settings.activeButton',newvalue,oldvalue);
      if(newvalue === oldvalue){
        return false;
      }
      // clearInterval(this.autoStartId);
    },
    mode(){
      let {time,everytimeHandle,finishHandle} = this.getModeAndHandle();
      let timer = new Timer(time ,everytimeHandle ,finishHandle, this.timer);
      // this.timer = Object.assign({}, this.timer, {...timer})
      console.log('timer', timer);
    },
  },
  mounted(){
      console.log('this.getModeAndHandle()',this.getModeAndHandle());
      let {time,everytimeHandle,finishHandle} = this.getModeAndHandle();
      console.log('this',this);
      let timer = new Timer(time ,everytimeHandle ,finishHandle, this.timer);
      console.log('timer', timer);

  },
  methods:{
    enableWindowAlwaysOnTop(){
      electron.enableWindowAlwaysOnTop();
    },
    diseableWindowAlwaysOnTop(){
      electron.diseableWindowAlwaysOnTop();
    },
    getWindowAlwaysOnTop(){
      return electron.getWindowAlwaysOnTop();
    },
    updateSettings(settings){
      console.log('updateSettings', settings);
      let triggerPlayStopBtn = settings.activeButton;
      if( triggerPlayStopBtn){
        clearInterval(this.autoStartId);
        if( triggerPlayStopBtn === 'play'){
          console.log('triggerPlayStopBtn openBreakAutostartTimer');
          this.openAutostartTimer();
        }else{
          clearInterval(this.autoStartId);
        }
      }
      Object.assign(this.settings,settings);
    },
    getWindowDesktopIdle(){
      console.log(electron.getWindowDesktopIdle());
      return electron.getWindowDesktopIdle();
    },
    getModeAndHandle(){
      if(this.mode === 'work'){
        return {
          time: this.settings.stime,
          everytimeHandle: this.workEverytimeHandle,
          finishHandle: this.workFinishHandle,
        };
      }else{
        return {
          time: this.settings.ttime,
          everytimeHandle: this.breakEverytimeHandle,
          finishHandle: this.breakeFinishHandle,
        };
      }
    },
    workEverytimeHandle(timer){
      console.log('workEverytimeHandle');
      if( this.settings.activeButton === 'play' ){
        timer.i++;
      }
    },
    workFinishHandle(){
      console.log('workFinishHandle finished');
      this.mode = 'break';
      this.settings.activeButton = 'play';
      this.openAutostartTimer();
    },
    breakEverytimeHandle(timer){
      console.log('breakEverytimeHandle');
      if( this.settings.activeButton === 'play' ){
        timer.i++;
      }
      //todo
    },
    breakeFinishHandle(){
      console.log('breakeFinishHandle finished');
      this.mode = 'work';
      this.settings.activeButton = 'play';
      this.openAutostartTimer();
      let msg = this.settings.startword;
      this.AlertNotification(msg);
    },
    openAutostartTimer(){
      if(this.mode === 'work'){
        this.openWorkAutostartTimer();
      }else{
        let msg = this.settings.takeword;
        this.AlertNotification(msg);
        this.openBreakAutostartTimer();
      }
    },
    openWorkAutostartTimer(){
      console.log('openWorkAutostartTimer');
      let autotime = this.settings.autotime;
      let timerid = setInterval(() => {
        console.log('openWorkAutostartTimersetInterval');
        let time = this.getWindowDesktopIdle();
        if( time < autotime ){
          this.settings.activeButton = 'stop';
          clearInterval(timerid);
        }
      }, autotime*1000);
      this.autoStartId = timerid;
    },
    openBreakAutostartTimer(){
      console.log('openBreakAutostartTimer');
      let autotime = this.settings.autotime;
      let timerid = setInterval(() => {
        console.log('openBreakAutostartTimersetInterval');
        let time = this.getWindowDesktopIdle();
        if( time > autotime ){
          this.settings.activeButton = 'stop';
          clearInterval(timerid);
        }else{
          let msg = this.settings.takeword;
          this.AlertNotification(msg);
        }
      }, autotime*1000);
      this.autoStartId = timerid;
    },
    AlertNotification(msg){
      const NOTIFICATION_TITLE = 'Promodoro';
      const NOTIFICATION_BODY = msg;

      new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
        .onclick = () => electron.windowShow();
    },
  },
});

</script>

<style>

body{
  -webkit-app-region: drag;
  background: rgba(0, 0, 0, 0.1);
  padding: 0px;
  margin: 0px;
  overflow:hidden;
  /* border: 1px solid black; */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 0px;
  -webkit-app-region: drag;
  height: 100vh;
}

a,button{
  /* border: 1px solid black; */
  -webkit-app-region: no-drag;
  transform: scale(.85);
}

#title-bar {
  -webkit-app-region: drag;
  height: 30px; 
  background-color: rgb(50, 51, 50);
  padding: none;
  margin: 0px; 
}



#title {
  position: fixed;
  top: 3px;
  left: 6px; 
  color: gray;
  line-height: 24px;
}



#title-bar-btns {
  -webkit-app-region: no-drag;
  position: fixed;
  top: 0px;
  right: 6px;
}

#title-bar-btns .button{
    background: transparent;
}
.btn{
  display: inline-block;
  line-height: 40px;
  height: 30px;
  width: 30px;
  color: rgb(216, 216, 216);
}

.btn:hover{
  background: gray;
}
</style>
