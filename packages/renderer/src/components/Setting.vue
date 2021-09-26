<template>
  <div class="bg-white d-grid">
    <span
      class="btn text-center"
      style="margin-right: auto;"
    >
      <span
        v-if="settings.activeButton === 'play'"
        @click="$emit('update:settings',{ activeButton: 'stop'})"
      >
        <IconPlayCircle />
      </span>
      <span
        v-else
        @click="$emit('update:settings',{ activeButton: 'play'})"
      >
        <IconStopCircle />
      </span>
    </span>
    <span class="text-center">{{ lessTime }}</span>
    <span
      class="btn text-center"
      style="margin-left: auto;"
      @click="toggleSetting"
    >
      <IconSettings />
    </span>
  </div>
  <div
    v-if="openSetting"
    class="bg-white"
  >
    <div class="padding-25">
      <span class="st__title">
        置頂:
      </span>
      <span>
        <input
          type="checkbox" 
          :checked="settings.windowAlwaysOnTop" 
          @change="$emit('update:settings',{ windowAlwaysOnTop: $event.target.checked})"
        >
      </span>
    </div>
    <div>
      <span class="st__title">
        番茄時間:
      </span>
      <span>
        <input
          type="number" 
          :value="settings.stime" 
          @input="$emit('update:settings',{ stime: $event.target.value})"
        >秒
      </span>
    </div>
    <div>
      <span class="st__title">
        休息時間:
      </span>
      <span>
        <input
          type="number" 
          :value="settings.ttime"
          @input="$emit('update:settings',{ ttime: $event.target.value})"
        >秒
      </span>
    </div>
    <div>
      <span class="st__title">
        自動啟動時間:
      </span>
      <span>
        <input
          type="number" 
          :value="settings.autotime"
          @input="$emit('update:settings',{ autotime: $event.target.value})"
        >秒
      </span>
    </div>
    <div>
      <span class="st__title">
        工作語句:
      </span>
      <span>
        <textarea 
          :value="settings.startword"
          @input="$emit('update:settings',{ startword: $event.target.value})"
        />
      </span>
    </div>
    <div>
      <span class="st__title">
        休息語句:
      </span>
      <span>
        <textarea 
          :value="settings.takeword"
          @input="$emit('update:settings',{ takeword: $event.target.value })"
        />
      </span>
    </div>
  </div>
</template>
<script>
import {defineComponent} from 'vue';
import IconSettings from '~icons/ri/settings-4-fill';
import IconPlayCircle from '~icons/ri/play-circle-fill';
import IconStopCircle from '~icons/ri/stop-circle-fill';

export default defineComponent({
    components:{
        IconSettings,
        IconPlayCircle,
        IconStopCircle,
    },
    props:{
        settings: Object,
        sec: Number,
        timer: Object,
    },
    data(){
        return {
            openSetting: false,
        };
    },
    computed:{
      lessTime(){
        let sec = this.sec;
        let minute = Math.floor( sec / 60);
        let second = sec % 60;
        return `${minute.toString().padStart(2,'0')}:${second.toString().padStart(2,'0')}`;
      },
    },
    methods:{
        toggleSetting(){
            this.openSetting = !this.openSetting;
        },
        updateSettingsPrompt(name){
            let value = prompt('調整語句').trim();

            if(value){
                this.$emit('update:settings',{ [name] : value });
            }
        },
    },
});
</script>
<style scoped>
*{
    box-sizing: border-box;
    line-height: 30px;
    text-align: initial;
}
input,textarea{
    -webkit-app-region: no-drag;
    line-height: initial;
}
input[type="number"]{
    width:90px;
}
.st__title{
    display: inline-block;
    max-width: 300px;
    min-width: 25%;
}
.text-center{
    text-align: center;
}
.d-grid{
    display: grid;
    padding: 3px 4px;
    grid-template-columns: 30px 1fr 30px;
}

.bg-white{
    background-color: rgb(50, 51, 50);
    width: 100vw;
    color: gray;
}

.btn{
    display: inline-block;
    border: 1px solid balck;
    -webkit-app-region: no-drag;
}
.btn:hover{
    background: gray;
}
</style>