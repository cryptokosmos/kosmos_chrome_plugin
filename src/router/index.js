import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
      { path: 'filter-data', component: () => import('@/views/FilterSensitiveData.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
