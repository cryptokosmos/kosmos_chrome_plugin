import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function guard (to, from, next) {
  if (store.state.user.role == 1) {
    // or however you store your logged in state
    next(); // allow to enter route
  } else {
    next('/'); // go to 'homepage';
  }


}

const routes = [
  {
    path: '/',
    //name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/layouts/MasterPage.vue'),
    children: [
      { path: '', component: () => import('@/views/Home.vue') },
      { path: 'about', component: () => import('@/views/About.vue') },
      { path: 'filter-data', component: () => import('@/views/FilterSensitiveData.vue') },
      { path: 'get-started', component: () => import('@/views/GetStarted.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
