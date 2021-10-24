<template>
  <div @click="close">
    {{ $route.query.notifyText }}
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        document.body.style.background = 'gray';
        let close = ()=> window.close();
        return {close};
    },
});
</script>

<style scoped>
div{
    -webkit-app-region: no-drag;
    height: 100vh;
    width: 100vw;
}
</style>