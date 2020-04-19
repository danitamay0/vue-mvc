import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'

import router from '@/router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuarioDB:'',
    token:''
  },
  mutations: {
    //llenar la informacion
    llenarDatos(state,payload){
      state.token=payload;
      if(payload===''){
        state.usuarioDB=''
      }else{
        state.usuarioDB=decode(payload);
        console.log(state.usuarioDB)

        router.push({name:'notas'})
      }
    }
  },
  actions: {
    guardarUsuario({commit},payload){
      localStorage.setItem('token',payload);
      commit('llenarDatos',payload);
    },
    cerrarSesion({commit}){
      localStorage.removeItem('token');
        commit('llenarDatos','');
        router.push({name:'login'})
    },
    sesionActiva({commit}){
      const token=localStorage.getItem('token');
      if(token){
        commit('llenarDatos',token);
      }
      else{
        commit('llenarDatos','');
      }
      
    }
  },
  modules: {
  },
  getters:{
    isLoggedIn(state){
      return !!state.token
    }
  }
})
