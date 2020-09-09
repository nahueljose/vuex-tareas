import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tareas: []
  },
  actions: {
    /**
     * Action para agregar tarea
     */
    AGREGAR_TAREA: (context, label) => {
      const tarea = {
        id: Math.random(),
        label: label,
        completed: false
      };

      context.commit("ON_AGREGAR_TAREA", tarea);
    },
    /**
     * Action para alternar tarea
     */
    ALTERNAR_TAREA: (context, idTarea) => {
      context.commit("ON_ALTERNAR_TAREA", idTarea);
    }
  },
  mutations: {
    /**
     * Mutation para guardar una tarea
     */
    ON_AGREGAR_TAREA: (state, payload) => {
      const tareas = state.tareas;
      tareas.push(payload);
      Vue.set(state, "tareas", tareas);
    },
    /**
     * Mutation para alternar una tarea
     */
    ON_ALTERNAR_TAREA: (state, idTarea) => {
      const tareas = state.tareas;
      tareas.forEach(tarea => {
        if (tarea.id === idTarea) {
          tarea.completed = !tarea.completed;
        }
      });

      Vue.set(state, "tareas", tareas);
    }
  }
})
