<template>
  <div id="title-bar">
    <div id="title">
      Pomodoro
    </div>
    <div id="title-bar-btns">
      <div
        id="min-btn"
        class="btn"
        @click="minimize"
      >
        <IconWindowMinimize />
      </div>
      <!-- <div class="btn" id="max-btn" @click="maximize">
             <IconWindowMaximize></IconWindowMaximize>
           </div> -->
      <div
        id="close-btn"
        class="btn"
        @click="close"
      >
        <IconClose />
      </div>
    </div>
  </div>
  <Setting
    :settings="settings"
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
// import IconWindowMaximize from '~icons/uil/window-maximize'
import IconClose from '~icons/majesticons/close';
import IconWindowMinimize from '~icons/zmdi/window-minimize';
import Setting from '/@/components/Setting.vue';
import {useElectron as electron} from '/@/use/electron';
  // const { ipcRenderer } = window.electron
export default defineComponent({
  name: 'App',
  components: {
    // AppNavigation,
    TheBackground,
    // IconWindowMaximize,
    IconClose,
    IconWindowMinimize,
    Setting,
  },
  data(){
    return {
      h: 100,
      settings:{
        stime: 1500,
        ttime: 300,
        autotime: 100,
        windowAlwaysOnTop: this.getWindowAlwaysOnTop(),
        startword: 'Work',
        takeword: 'Drink a water',
      },
    };
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
  },
  mounted(){
    // console.log(' xxx', this.getWindowAlwaysOnTop())
    // this.settings= 
  },
  methods:{
    maximize() {
      this.fullscreen = true;
      electron.maximize();
    },
    unmaximize() {
      this.fullscreen = false;
      electron.unmaximize();
    },
    minimize() {
      electron.minimize();
    },
    close() {
      electron.close();
    },
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

      Object.assign(this.settings,settings);
    },
  },
});
(function () {
const NOTIFICATION_TITLE = 'Title';
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.';
const CLICK_MESSAGE = 'Notification clicked';

new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
  .onclick = () => console.log(CLICK_MESSAGE);
})();
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
