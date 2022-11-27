<template>
   <div class="pagination_section">
            <a href="#" @click="prev">Previous</a>
               <a href="">{{this.pagenumber}}</a> 
            <a href="#" @click="next">Next >></a>
        </div>
</template>

<script>
export default{
     name:"pagination",
     components:{

     },
     data(){
       return{
         pagenumber:1
       }
     },
     methods:{
      next(){
         this.pagenumber = this.pagenumber + 1;    
      },
      prev(){
         this.pagenumber = this.pagenumber - 1;

           }
     }
}
</script>

<style>
  /* pagination position styling */
  .pagination_section {
    position: relative;
    text-align: center;
  }
 
  /* pagination styling */
  .pagination_section a {
    color: black;
    padding: 10px 18px;
    text-decoration: none;
  }
 
  /* pagination hover effect on non-active */
  .pagination_section a:hover:not(.active) {
    background-color: #031F3B;
    color: white;
  }
 
  /* pagination hover effect on active*/
 
  a:nth-child(2) {
    background-color: green;
    color: white;
  }
 
  a:nth-child(1) {
    font-weight: bold;
  }
 
  a:nth-child(7) {
    font-weight: bold;
  }
</style>