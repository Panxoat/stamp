import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '../components/register.vue'
import login from '../components/login.vue'
import main from '../components/main.vue'
import reserve from '../components/reserve.vue'
import Notice from '../components/Notice.vue'
import store from '../store'

Vue.use(VueRouter)

const isAuthenticated = (to, from, next) => {
  console.log("router", store.state.isLogin)
  if(store.state.isLogin === false) {
    alert("로그인 X")
    next('/login')
  } else {
    alert("로그인 O")
    next()
  }
}

const onlyAuthenticated = (to, from, next) => {
  if(store.state.isLogin === true) {
    // alert("이미 로그인을 함")
    next('/reserve')
  } else {
    // alert("로그인 안함")
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
    component: register
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    beforeEnter: onlyAuthenticated
  },
  {
    path: '/notice',
    name: 'Notice',
    component: Notice
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
