<template>
  <div>
    <div v-if="tareas.length > 0">
      <h1>Hay {{ tareas.length }} tareas:</h1>
      <ul class="lista-tareas">
        <li
          v-bind:class="{ completed: tarea.completed }"
          v-for="tarea in tareas"
          @click="$emit('click-tarea', tarea.id)"
          :key="tarea.id"
        >
          {{ tarea.label }}
        </li>
      </ul>
    </div>
    <div v-else>
      <h1>No hay tareas! :D</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListaTareas",
  props: {
    tareas: Array
  }
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
