<template>
    <div class="container">
        <form @submit.prevent="login" >
            <input type="email" required placeholder="email" class="form-control my-2" v-model="usuario.email">
             <input type="password" placeholder="password" class="form-control" v-model="usuario.password">
             <button type="submit" class="btn-block btn-info my-2">Login</button>
        </form>    
        <dir v-if="mensaje != ''">
            <p>{{mensaje}}</p>
        </dir>
     </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name:'login',
    data(){
        return{
            usuario:{
                email:'user3@user.com',
                password:'123123'
            },
            mensaje:''
        }
    },
    methods:{
        ...mapActions(['guardarUsuario']),
        login(){
           this.axios.post('/login-usuario',this.usuario).then(res=>{
               console.log(res.data);
           
               const token=res.data.token
                this.guardarUsuario(token)
               this.mensaje='';
               
           })
        }
    }
}
</script>