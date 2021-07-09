<template>
  <div class="overlay">
    <div class="overlay-inner">
      Page not found
      <v-btn
        to="/"
        small
        text
        class="ml-2"
      >
        <v-icon size="35">mdi-home-outline</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage'

}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(94, 82, 255, 1) 100%);
}

.overlay-inner {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
