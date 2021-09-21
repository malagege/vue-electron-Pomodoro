<template>
  <IconSettings />
</template>

<script>
import {defineComponent, ref} from 'vue';
import IconSettings from '~icons/ri/settings-4-fill';


export default defineComponent({
  name: 'HelloWorld',
  components:{
    IconSettings,
  },
  setup() {
    const count = ref(0);
  
    return {count};
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>
