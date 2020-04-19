<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/notas" v-if="isLoggedIn">Notas</router-link> |
      <a @click="cerrarSesion"   v-if="isLoggedIn">Cerrar Sesion</a> |
      <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  name:'app',
  methods:{
    ...mapActions(['cerrarSesion','sesionActiva'])
  },
  computed:{
    ...mapGetters(['isLoggedIn'])
  },
  created(){
    this.sesionActiva();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
