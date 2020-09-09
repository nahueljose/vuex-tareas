<template>
  <div class="contenedor">
    <h1>Mis Tareas</h1>
    <nueva-tarea @on-agregar="agregarTarea" />
    <lista-tareas @click-tarea="alternarTarea" :tareas="todasLasTareas" />
    <lista-tareas @click-tarea="alternarTarea" :tareas="tareasSinCompletar" />
    <lista-tareas @click-tarea="alternarTarea" :tareas="tareasCompletadas" />
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
