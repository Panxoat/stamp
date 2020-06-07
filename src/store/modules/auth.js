import axios from 'axios'
import { router } from '../../router/index.js'

const state = {
    name: null,
    isLogin: false,
}

const getters = {
    
}

const mutations = {
    login(state, token) {
        localStorage.setItem('token', token)
        state.isLogin = true
    },
    getUserInfo(state, payload) {
        state.userInfo = payload
        console.log("state", state.userInfo)
    },
    logout(state) {
        state.token = null
    }
}

const actions = {
    login({commit}, {auth_id, auth_pw}) {
        return axios.post('/auth/signin',
        {
          auth_id : auth_id,
          auth_pw : auth_pw
        })
          .then((response) => {
            commit('login', response.data.token)
            axios.defaults.headers.common['Authorization'] = `${response.data.token}`
            router.push({name: "reserve"})
        })
    },
    getMemberInfo({commit}) {
        let getToken = localStorage.getItem('token')
        axios.get('/auth/info', {
            headers:{
                token : getToken
            }
        }).then((response) => {
            // let userInfo = {
            //     user_name : response.data.name,
            //     user_grade : response.data.grade
            // }
            // console.log(userInfo)
            commit('login', getToken)
            commit('getUserInfo', response.data.name)
        }).catch((e) => {
            console.log(e)
        })
    },
    logout({commit}) {
        commit('logout')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}