<template>
    <div>
        <div  class="p-4 border  text-left mb-4 max-w-[400px] rounded-xl  " :class="getBg">
        <h1 class=" xl:text-[24px] xs:text-[18px] font-bold mx-auto text-center">
          {{ item?.title }}
        </h1>
        <div class=" mt-2 xl:text-[14px] xs:text-[12px]  whitespace-normal break-words bg-[#fff] rounded-xl border-[#f6f6f6] h-full p-4 max-w[90%] whitespace-normal">
          <p>{{ item?.desc }}</p>
        </div>
        <div class=" flex mt-2 w-full justify-between items-center">
          <p class=" text-[#0a1464] font-bold">
            Status
          </p>
          <select class=" border rounded-md p-2" @change="handleChange(item,$event)"  :value="item.status"  >
            <option value="Todo">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props:{
        item:{
            type:Object,
            default:()=>{},
            required:false
        }
    },
    computed:{
      getBg(){
        if(this?.item?.status ==='In Progress') return 'bg-[#e6e6fa]'
        if(this?.item?.status ==='Done') return 'bg-[#00ff00]'
        return 'bg-[#F7F2F2]'
      }
    },
    data() {
      return {
        title: '',
        description: '',
        status: 'To Do',
      };
    },
    methods: {
     handleChange(item,event){
      console.log(item,event?.target.value)
      this.$store.dispatch('tasks/updateTaskStatus',{task:item,newStatus:event?.target.value})
     }
    },
  };
  </script>
  