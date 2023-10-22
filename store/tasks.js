// store/tasks.js
import firebase from "~/firebase";
const firestore = firebase.firestore();
export const state = () => ({
  tasks: [],
  user: null,
});

export const mutations = {
  async addTask(state, task) {
    // const userEmail = state?.user?.email
    // const userTasksCollection = firestore.collection('users').doc(userEmail).collection('tasks');
    // userTasksCollection.add(task)
    // .then((docRef) => {
    //     console.log(`Task added with ID: ${docRef.id}`);
    // })
    // .catch((error) => {
    //     console.error('Error adding task: ', error);
    // });
      state.tasks = [...task];
  },
  updateTask(state, updatedTask) {
    const taskIndex = state.tasks.findIndex(
      (task) => task.id === updatedTask.id
    );
    if (taskIndex !== -1) {
      const newState = [...state.tasks];
      newState[taskIndex] = updatedTask;
      state.tasks = [...newState];
    }
  },
  deleteTask(state, taskToDelete) {
    state.tasks = state.tasks.filter((task) => task.id !== taskToDelete.id);
  },
  setUser(state, user) {
    console.log("setuser", user);
    state.user = { ...user };
  },
};

export const actions = {
  getTasks({ commit,state }) {
    const userEmail = state?.user?.email
    const userTasksCollection = firestore
      .collection("users")
      .doc(userEmail)
      .collection("tasks");
    userTasksCollection
      .get()
      .then((querySnapshot) => {
        const tasks = [];
        querySnapshot.forEach((doc) => {
          tasks.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log("Tasks for the user:", tasks);
        commit('addTask',tasks)
      })
      .catch((error) => {
        console.error("Error getting tasks: ", error);
      });
  },
 async createTask({ commit, state,dispatch }, task) {
    const userEmail = state?.user?.email;
    console.log("userema", userEmail);
    try{
        const userTasksCollection = firestore.collection("users").doc(userEmail).collection("tasks");
        await userTasksCollection.add(task)
        // commit("addTask", task);
       await  dispatch('getTasks')
    }
    catch(err){
        console.log('err',err)
    }
  },
  async updateTaskStatus({ commit, state,dispatch }, { task, newStatus }) {
    const updatedTask = { ...task, status: newStatus };
    // commit("updateTask", updatedTask);
    const userEmail = state?.user?.email;
    const userTaskDocument = firestore.collection('users').doc(userEmail).collection('tasks').doc(`${task?.id}`)
    await userTaskDocument.update(updatedTask)
    dispatch('getTasks')
    console.log('usert',userTaskDocument)
  },
  async deleteTask({ commit,state,dispatch }, taskId) {
    try{
        const userEmail = state?.user?.email; // Get the user's email
        // const taskId =  task?.id; 
        console.log('taskid',taskId)
        const userTaskDocument = firestore.collection('users').doc(userEmail).collection('tasks').doc(taskId);
        await userTaskDocument.delete()
        await dispatch('getTasks')
    }
    catch(err){
        console.log('deleterr',err)
    }
  
  },
  async loginUser({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const resp = await firebase.auth().signInWithPopup(provider);
      console.log("resp", resp);
      commit("setUser", {
        email: resp?.user.email,
        logo: resp?.user?.photoURL,
      });
      // User is now signed in with Google.
    } catch (error) {
      console.error("Google Sign-In error:", error);
    }
  },
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
};
