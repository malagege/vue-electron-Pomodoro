<template>
  <div id="title-bar">
    <div id="title">
      Pomodoro
    </div>
    <div id="title-bar-btns">
      <div
        v-if="$route.fullPath==='/'"
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
  <router-view />
</template>
<script>
import {defineComponent} from 'vue';
// import IconWindowMaximize from '~icons/uil/window-maximize'
import IconClose from '~icons/majesticons/close';
import IconWindowMinimize from '~icons/zmdi/window-minimize';
import {useElectron } from '/@/use/electron';
let electron = useElectron();

export default defineComponent({
    name: 'App',
    components:{
        // IconWindowMaximize,
        IconClose,
        IconWindowMinimize,
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
            window.close();
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


a,button{
  /* border: 1px solid black; */
  -webkit-app-region: no-drag;
  transform: scale(.85);
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