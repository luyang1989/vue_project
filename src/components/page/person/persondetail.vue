<template>
 <div>
   <ul class="conent">
       <li v-for="(v,i) in personlist" :key="i">
           <div>{{i}}</div>
           <div>{{v}}</div>
       </li>
   </ul>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         personlist: [],
     }
   },
   components: {

   },
    created(){
     this.info()
  },
  methods:{
      info(){
         var id  =  this.$route.query.id || 0
        this.$http({
            url:"/userPerson/person/getPersonDetail", 
            method: "post",
            params:{
                id:id
            },
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
              this.personlist = res.data.result;
          }) 
      }
  }
 }
</script>

<style scoped>
.conent{
    width: 50%;
    background: white;
    margin: 0 auto;
    text-align: center;
}
.conent li{
    display: flex;
    align-content: center;
    border-bottom: 1px solid #eee;
}
.conent li div{
    width: 50%;
    height: 50px;
    line-height: 50px;
}
.conent li div:nth-child(1){
    border-right: 1px solid #eee;
}
</style>
