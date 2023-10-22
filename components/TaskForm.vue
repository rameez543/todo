<template>
    <div class=" flex w-full items-center justify-center z-20">
        <div  class="p-4 border w-full text-left mb-4 max-w-[800px] rounded-xl  bg-[#F7F2F2]" style="box-shadow: 9px 5px 7px 4px rgba(0, 0, 0, 0.5);">
        <div @click="handleClose" class="flex w-full text-[24px] font-bold cursor-pointer justify-end ">X</div>
        <p class=" py-4">Title</p>
        <input placeholder="Enter Task Title" v-model="title" class=" xl:text-[24px] xs:text-[18px] w-full font-bold mx-auto text-center" />
        <!-- <div class=" mt-2 xl:text-[14px] xs:text-[12px]  whitespace-normal break-words bg-[#fff] rounded-xl border-[#f6f6f6] h-full p-4 max-w[90%] whitespace-normal"> -->
        <p class="py-4">Description</p>
          <textarea placeholder="Add Task Description" v-model="desc" class="break-words h-[200px] w-full h-full bg-[#fff] border"></textarea>
        <!-- </div> -->
        <div class=" flex mt-2 w-full justify-center items-center">
          <p class=" text-[#0a1464] mr-4 font-bold">
            Status
          </p>
          <select class=" border rounded-md p-2"  v-model="status"  >
            <option value="All">All</option>
            <option value="Todo">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div class=" flex flex-col w-full justify-center items-center mt-4">
            <button @click="createTask" class=" w-[240px] shadow-md shadow-inner rounded-md bg-[#1e81fb] p-3 ml-5 cursor-pointer">
                Create Task
            </button>
            <p  :class="!error?'opacity-0':'opacity-100'" class="mt-4  text-[#bb6162]">
                {{ error || 'error' }} 
            </p>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            title:'',
            desc:'',
            status:'Todo',
            error:''
        }
    },
    methods:{
        createTask(){
            if(this.title && this.desc){
                this.error = ''
                const payload = {
                    // id:Date.now(),
                    title:this.title,
                    status:this.status,
                    desc:this.desc
                }
                this.$store.dispatch('tasks/createTask',payload)
                this.handleClose()
            }
            else{
                if(!this.title) this.error = "Title can't be empty"
                if(!this.desc) this.error = "description can't be empty"
            }
        },
        handleClose(){
            this.$nuxt.$emit('close-taskForm')
        }
    }
}
</script>