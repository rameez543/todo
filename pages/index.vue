
<template>
  <div class="mx-auto p-8 ">

   <div class=" flex justify-end">
    <button v-if="!user?.email" class=" bg-[#ebacac] p-4 w-[200px] rounded-xl shadow-md" @click="signInWithGoogle">Sign in with Google
    </button>
    
      <img :src="user?.logo" class=" rounded-[50%] h-[64px] w-[64px] object-contain" v-else/>

  </div> 
    <div class="flex w-full items-center justify-center">
      <select class=" border rounded-md p-2"  v-model="status"  required>
        <option value="All">All</option>
        <option value="Todo">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button @click="handleClick(true)" class=" shadow-md w-[120px] rounded-md bg-[#e5f7ff] p-3 ml-5 cursor-pointer">
        Create
      </button>
    </div>
    <div class=" relative" >
      <TaskForm v-if="showTaskForm" class="z-20 absolute top-8 left-0"/>
    </div>
    
  <div class="md:flex xs:block  p-6 ">
    <div v-for="category in categories" :key="category" class="md:w-1/3 xs:w-full mx-2">
      <h2 class="text-xl py-2 font-semibold">{{ category }}</h2>
      <Task :item="item" v-for="item in filteredItems(category)" :key="item.id" />
    </div>
  </div>
 
  </div>

</template>


<script>
import Task from '../components/Task.vue';
import TaskForm from '../components/TaskForm.vue';
import {mapState} from 'vuex';

export default {
    name: 'IndexPage',
    components: { Task, TaskForm },
    data() {
    return {
      showTaskForm:false,
      status:'All',
    };
  },
  computed: {
    ...mapState({
      tasks:state=>state?.tasks?.tasks,
      user:state=>state?.tasks?.user
    }),
    categories() {
      return ['Todo','In Progress','Done'];
    },
    itemsToShow(){
    if(this.status==='All') return  this.tasks
     return  this.tasks?.filter(arr=>arr?.status===this.status)
    }
  },
  async mounted(){
    
    this.$nuxt.$on('close-taskForm',()=>{
      this.showTaskForm = false
    })
    console.log('tasks',this.tasks)
  },
  methods: {
    filteredItems(category) {
      return this.itemsToShow?.filter((item) =>{
        return item.status === category
      } );
    },
    handleClick(val){
      if(!this.user?.email) return alert('Please Signin to Create Task')
      this.showTaskForm = val
    },
    async signInWithGoogle() {
      try {
        
        await this.$store.dispatch('tasks/loginUser')
        await  this.$store.dispatch('tasks/getTasks')
      } catch (error) {
        console.error('Google Sign-In error:', error);
      }
    },
  },
}
</script>
