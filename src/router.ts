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
    component: () => import(/* webpackChunkName: "home" */ './views/HomeView.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import(/* webpackChunkName: "index" */ './views/IndexView.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ './views/UserView.vue')
      },
      {
        path: 'task',
        name: 'Task',
        component: () => import(/* webpackChunkName: "task" */ './views/TaskView.vue')
      },
      {
        path: 'store',
        name: 'Store',
        component: () => import(/* webpackChunkName: "store" */ './views/StoreView.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
