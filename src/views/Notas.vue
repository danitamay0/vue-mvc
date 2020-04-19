<template>
<div class="container">
    <h2>Notas</h2>
    <div class="alert  alert-dismissible "  v-bind:class="{ 'alert-success': alerta.isOk, 'alert-danger':alerta.isErr }" role="alert">
  <strong>{{alerta.mensaje}}</strong> revisa tus notas
  <button type="button" class="close"  >
    <span aria-hidden="true">&times;</span>
  </button>


</div>

<form @submit.prevent="editarNota" class='mb-3' v-if="editar"> 
    <h2>Editar Nota</h2>
    <div class="form-group">
        <input class="form-control" v-model="editNota.nombre" type="text" placeholder="Name">
    </div>
    <div class="form-group">
        <input class="form-control mb-2" v-model="editNota.descripcion" type="text" placeholder="Description">
    </div>
    
     <button class="btn btn-warning  mx-3 ">Edit Note</button>
     <button class="btn btn-info " @click="editar=false">Cancelar</button>
</form>

<form @submit.prevent="agregarNota" v-if="!editar" > 
    <h2>Agregar Nota</h2>
    <div class="form-group">
        <input class="form-control" v-model="nota.nombre" type="text" placeholder="Name">
    </div>
    <div class="form-group">
        <input class="form-control mb-2" v-model="nota.descripcion" type="text" placeholder="Description">
    </div>
    
     <button class="btn btn-success w-100 mb-3 ">Add Note</button>
</form>
   <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
   
    <tr v-for="(nota,index) in notas" :key="index">
      <th scope="row">{{nota._id}}</th>
      <td>{{nota.nombre}}</td>
      <td>{{nota.descripcion}}</td>
      <td><button @click="eliminarNota(nota._id,index)" class="btn mx-2  btn-danger">Eliminar</button>
      <button @click="activarEdicion(nota._id,index)" class="btn  btn-warning">Edit</button></td>
     
    </tr>
  </tbody>
</table>
    
</div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name:'notas',
    data(){
        return{
            notas:'',
            nota:{
                nombre:'',
                descripcion:''
            },
            alerta:{
                mensaje:'',
                isOk:'',
                isDelete:'',
                isErr:''
            },
            editNota:'',
            editIndex:'',
            editar:false
        }
    },
    methods:{
        listar (){
            const config={
                headers:{
                    token:this.token
                }
            };
            this.axios.get('/all',config).then((result)=>{
                console.log(result.data);
                this.notas=result.data
                
        }).catch(err=>{
            console.log(err.response, err.name);
            
        })
        },
         showAlert(){
            
             
              $('.alert').delay(2000).show("fast", "easing");
               
             setTimeout(function(){
              
              
                $('.alert').hide(1000);
               
            },4000);
            
       
        },
        agregarNota(){
            console.log(this.nota);
              const config={
                headers:{
                    token:this.token
                }
            };
            this.axios.post('/crear',this.nota,config).then((res)=>{
                this.notas.push(res.data)
                this.alerta.mensaje='nota agregada!';
                this.alerta.isOk=true;
                  this.alerta.isDelete=false,
                this.alerta.isErr=false
                this.showAlert();
            })
            .catch((e)=>{
                if(e.response.data.error.errors.nombre.message){
                    console.log('error',e.response.data.error.errors.nombre.message);
                    this.alerta.mensaje=e.response.data.error.errors.nombre.message;
                }
          
               this.alerta.isErr=true;
                 this.alerta.isOk=false;
                  this.alerta.isDelete=false,
                this.showAlert();
                console.log(e.response);
                
            })
            
        },
        eliminarNota(id,index){
            this.axios.delete(`/delete/${id}`).then((res)=>{
                console.log('nota eliminada');
                 this.alerta.mensaje='nota eliminada!';
                this.alerta.isOk=false;
                this.alerta.isErr=true;
                this.notas.splice(index,1);
                this.showAlert();
            }).catch((e)=>{
                console.log(e.response);
                
            })
        },
        activarEdicion(id,index){
            this.editar=true;            
            this.editNota=Object.assign({},this.notas[index]);
            this.editIndex=index;
            
        },
        editarNota(){
           
            const id=this.editNota._id
    console.log(this.editIndex);
    
            this.axios.put(`/update/${id}`,this.editNota).then(res=>{
                console.log(res.data);
               this.notas[this.editIndex]=res.data.notaDB;
                this.alerta.isOk=true;
                this.showAlert();
                this.editar=false;
            })
           
        }

    
    },
    computed:{
        ...mapState(['token'])
    }
    ,
    created(){
      this.listar();
     
    },
    mounted(){
  $('.alert').alert().hide();
     $('.close').click(()=>{
                   $('.alert').hide(1000);

                 });
    }

}
</script>