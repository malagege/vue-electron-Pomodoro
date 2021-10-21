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
<style scoped>

</style>