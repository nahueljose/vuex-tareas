<template>
  <div>
    <div>
      <h2>{{title}}</h2>
      <ul class="lista-tareas" v-if="tareas.length > 0">
        <li
          v-bind:class="{ completed: tarea.completed }"
          v-for="tarea in tareas"
          @click="$emit('click-tarea', tarea.id)"
          :key="tarea.id"
        >
          {{ tarea.label }}
        </li>
      </ul>
      <div v-else>
        <p class="sin-taras">No hay tareas! :D</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListaTareas",
  props: {
    tareas: Array,
    title: String
  }
};
</script>

<style scoped>
li {
  cursor: pointer;
}
li:hover {
  color: blue;
}
.completed {
  text-decoration: line-through;
  opacity: 0.5;
}

.sin-taras {
  color: #999;
}
</style>
