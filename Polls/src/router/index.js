import { createRouter, createWebHistory } from 'vue-router';
import PollsHome from '../views/PollsHome.vue';
import PollVote from '../views/PollVote.vue';
import PollResult from '../views/PollResults.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: PollsHome,
  },
  {
    path: '/vote/:id',
    name: 'PollVote',
    component: PollVote,
  },
  {
    path: '/result/:id',
    name: 'PollResult',
    component: PollResult,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
