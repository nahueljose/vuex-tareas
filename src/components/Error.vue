<template>
  <div class="error-container" v-if="error">
    {{ error }}
  </div>
</template>


<script>
export default {
  name: "Error",
  props: {
    error: String
  }
}
</script>

<style scoped>
.error-container {
  font-size: 2em;
  color: red;
  text-align: center;
  margin: 10em auto;
}
</style>