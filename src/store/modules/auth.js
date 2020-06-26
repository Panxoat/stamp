import axios from 'axios'
import { router } from '../../router/index.js'

const state = {
    userInfo: null,
    token: localStorage.getItem('token')
}

const getters = {
    
}

const mutations = {
    login(state, token) {
        localStorage.setItem('token', token)
        state.token = token
    },
    getUserInfo(state, payload) {
        state.userInfo = payload
        
    },
    logout(state) {
        state.token = null
        localStorage.removeItem('token')
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
            let userInfo = {
                user_name : response.data.name,
                user_grade : response.data.grade
            }

            commit('login', getToken)
            commit('getUserInfo', userInfo)

        }).catch((e) => {
        })
    },
    logout({commit}) {
        commit('logout')
        router.push({name: "main"})
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}