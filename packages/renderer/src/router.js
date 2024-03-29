import {createRouter, createWebHashHistory} from 'vue-router';
import Pomodoro from '/@/components/Pomodoro.vue';
import NotifyWindow from '/@/components/NotifyWindow.vue';

const routes = [
  {path: '/', name: 'Pomodoro', component: Pomodoro},
  {path: '/notifyWindow', name: 'NotifyWindow', component: NotifyWindow},
  {path: '/about', name: 'About', component: () => import('/@/components/About.vue')}, // Lazy load route component
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
