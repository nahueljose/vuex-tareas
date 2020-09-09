<template>
  <div class="contenedor">
    <div v-if="error">
      {{error}}
    </div>
    <div v-else>
      <div v-if="loading">
        Cargando tareas...
      </div>
      <div v-else>
        <h1>Mis Tareas</h1>
        <nueva-tarea @on-agregar="agregarTarea" />
        <lista-tareas @click-tarea="alternarTarea" :tareas="todasLasTareas" />
        <lista-tareas @click-tarea="alternarTarea" :tareas="tareasSinCompletar" />
        <lista-tareas @click-tarea="alternarTarea" :tareas="tareasCompletadas" />
      </div>
    </div>
  </div>
</template>

<script>
import store from "./store"
import NuevaTarea from "./components/NuevaTarea";
import ListaTareas from "./components/ListaTareas";

export default {
  name: "App",
  components: {
    NuevaTarea,
    ListaTareas
  },
  methods: {
    agregarTarea(label) {
      /**
       * Disparar el action para agregar tarea
       */
      store.dispatch("AGREGAR_TAREA", label);
    },
    alternarTarea(idTarea) {
      /**
       * Disparar action para alternar tarea
       */
      store.dispatch("ALTERNAR_TAREA", idTarea);
    }
  },
  computed: {
    loading(){
      return store.state.loading;
    },
    error(){
      return store.state.error;
    },
    todasLasTareas() {
      return store.state.tareas;
    },
    tareasSinCompletar() {
      return this.todasLasTareas.filter(tarea => {
        return !tarea.completed;
      });
    },
    tareasCompletadas() {
      return this.todasLasTareas.filter(tarea => {
        return tarea.completed;
      });
    }
  },
  beforeMount() {
    store.dispatch("OBTENER_TAREAS");
  }
};
</script>

<style scoped>
h1 {
  color: blue;
}
.contenedor {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
