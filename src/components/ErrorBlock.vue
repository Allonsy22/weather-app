<template>
  <div class="error-container">
    <v-alert
      v-for="(error, index) in errors"
      :key="index"
      border="left"
      color="red"
      outlined
      text
      type="error"
    >
      {{error}}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'ErrorBlock',
  props: {
    errors: Array
  }
}
</script>

<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
</style>
