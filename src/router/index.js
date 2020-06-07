import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '../components/register.vue'
import login from '../components/login.vue'
import main from '../components/main.vue'
import reserve from '../components/reserve.vue'
import { store } from '../store'

Vue.use(VueRouter)

const isAuthenticated = (to, from, next) => {
  if(store.state.auth.token === null) {
    alert("로그인을 해주세요.")
    next('/login')
  } else {
    next()
  }
}

const onlyAuthenticated = (to, from, next) => {
  if(store.state.auth.token !=undefined) {
    alert("이미 로그인 되어있습니다.")
    next('/reserve')
  } else {
    next()
  }
}

const routes = [
  {
    path:'/',
    name: 'main',
    component: main
  },
  {
    path: '/reserve',
    name: 'reserve',
    component: reserve,
    beforeEnter: isAuthenticated
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    beforeEnter: onlyAuthenticated
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    beforeEnter: onlyAuthenticated
  },
  {
    path: '/about',
    name: 'About',
  }
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
