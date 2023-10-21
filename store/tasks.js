// store/tasks.js

export const state = () => ({
    tasks: [{id:'1'}],
    status:''
  });
  
  export const mutations = {
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTask(state, updatedTask) {
      const taskIndex = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        const newState = [...state.tasks]
        newState[taskIndex] = updatedTask;
        state.tasks=[...newState]
      }
    },
    deleteTask(state, taskToDelete) {
      state.tasks = state.tasks.filter((task) => task.id !== taskToDelete.id);
    },
  };
  
  export const actions = {
    getTasks({commit},){

    },
    createTask({ commit }, task) {
      commit('addTask', task);
    },
    updateTaskStatus({ commit, state }, { task, newStatus }) {
      const updatedTask = { ...task, status: newStatus };
      commit('updateTask', updatedTask);
    },
    deleteTask({ commit }, task) {
      commit('deleteTask', task);
    },
  };

  export default{
    namespaced:true,
    actions,
    mutations,
    state
  }
  