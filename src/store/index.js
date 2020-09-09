import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    error: null,
    tareas: []
  },
  actions: {
    /**
     * Action para cargar tareas de la API
     */
    OBTENER_TAREAS: (context) => {
      /** Ponmos el loading en TRUE */
      context.commit("ON_LOADING", true);

      /** Llamamos a la api para obtener las tareas */
      Axios.get("https://run.mocky.io/v3/0c5bd316-7302-4381-8fe1-22ffdbcf62c7?mocky-delay=2000ms")

      /** En caso de exito, llamamos al action para guardar */
      .then(response => {
        context.dispatch("OBTENER_TAREAS_SUCCESS", response.data);
      })

      /** En caso de error, mostramos el error */
      .catch(error => {
        context.dispatch("OBTENER_TAREAS_ERROR", error);
      });
    },
    OBTENER_TAREAS_SUCCESS: (context, data) => {
      context.commit("ON_LOADING", false);
      context.commit("ON_OBTENER_TAREAS", data);
    },
    OBTENER_TAREAS_ERROR: (context, error) => {
      context.commit("ON_ERROR", error);
      context.commit("ON_LOADING", false);
    },

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
     * Cambiar estado de loading
     */
    ON_LOADING: (state, payload) => {
      Vue.set(state, "loading", payload);
    },
    /**
     * Guardar un error
     */
    ON_ERROR: (state, error) => {
      Vue.set(state, "error", error);
    },
    /**
     * Mutation para obtener tareas de la API
     */
    ON_OBTENER_TAREAS: (state, payload) => {
      Vue.set(state, "tareas", payload);
    },
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
