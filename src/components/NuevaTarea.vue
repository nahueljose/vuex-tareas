<template>
  <div class="nueva-tarea">
    <input v-model="label" type="text" />
    <button @click="onClick">Agregar tarea!</button>
  </div>
</template>

<script>
export default {
  name: "NuevaTarea",
  data: function() {
    return {
      label: ""
    };
  },
  props: {
    labelTarea: String
  },
  methods: {
    onClick() {
      if (this.label.trim() !== "") {
        this.$emit("on-agregar", this.label.trim());
        this.label = "";
      }
    }
  }
};
</script>

<style scoped></style>
