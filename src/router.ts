import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/admin/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ './views/LoginView.vue')
  },
  {
    path: '/admin',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ './views/HomeView.vue')
  },
  {
    path: '/admin/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ './views/UserView.vue')
  },
  {
    path: '/admin/task',
    name: 'Task',
    component: () => import(/* webpackChunkName: "task" */ './views/TaskView.vue')
  },
  {
    path: '/admin/store',
    name: 'Store',
    component: () => import(/* webpackChunkName: "store" */ './views/StoreView.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
