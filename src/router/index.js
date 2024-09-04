import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from "@/views/Manage";
import tempChart from "@/components/tempChart";
import tempTable from "@/components/tempTable";
import tempState from "@/components/tempState";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Manage,
    redirect: '/temp',
    children:[
      {path:'temp',component:tempState},
      {path:'temptable',component:tempTable},
      {path:'tempchart',component:tempChart}
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
