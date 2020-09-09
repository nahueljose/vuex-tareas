<template>
  <div class="contenedor">
    <!-- Componente que muestra el error si existe -->
    <error v-if="error" :error="error" />

    <!-- Componente que muestra estado de "cargando" si existe -->
    <loading v-if="loading" />

    <!-- Mostramos nuestra app solo si NO hay error y NO estamos cargando -->
    <div v-if="!loading && !error">
      <h1>Mis Tareas</h1>
      <nueva-tarea @on-agregar="agregarTarea" />
      <lista-tareas @click-tarea="alternarTarea" :tareas="todasLasTareas" title="Todas las tareas" />
      <lista-tareas @click-tarea="alternarTarea" :tareas="tareasSinCompletar" title="Tareas sin completar" />
      <lista-tareas @click-tarea="alternarTarea" :tareas="tareasCompletadas" title="Tareas ya completadas" />
    </div>
  </div>
</template>

<script>
import store from "./store"
import NuevaTarea from "./components/NuevaTarea";
import ListaTareas from "./components/ListaTareas";
import Error from "./components/Error";
import Loading from "./components/Loading";

export default {
  name: "App",
  components: {
    NuevaTarea,
    ListaTareas,
    Error,
    Loading
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
      /** Obtenemos el estado de loading del state */
      return store.state.loading;
    },
    error(){
      /** Obtenemos el error (si existe) del state */
      return store.state.error;
    },
    todasLasTareas() {
      /** Obtenemos todas las tareas del state */
      return store.state.tareas;
    },
    tareasSinCompletar() {
      /**
       * Generamos una propiedad nueva que tenga SOLO
       * las tareas completadas
       */
      return this.todasLasTareas.filter(tarea => {
        return !tarea.completed;
      });
    },
    tareasCompletadas() {
      /**
       * Generamos una propiedad nueva que tenga SOLO
       * las tareas SIN completar
       */
      return this.todasLasTareas.filter(tarea => {
        return tarea.completed;
      });
    }
  },
  beforeMount() {
    /**
     * Antes que monte este componente, llamamos al action
     * para traer las tareas de la API
     */
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
