import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Lol from '../views/Lol.vue'
import Rox from '../views/Rox.vue'
import store from '../store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '/lol',
        component:Lol
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '/rox',
        component:Rox
      }
    
    ],
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/notas',
    name: 'notas',
   
    component: () => import(/* webpackChunkName: "about" */ '../views/Notas.vue'),
    beforeEnter: (to, from, next) => {
      if(store.state.token===''){
        next({name:'login'})
      }else{
        next();
      }
    }
  },
   {
    path: '/login',
    name: 'login',
   
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
