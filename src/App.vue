<template>
  <v-app>
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view/>
    </transition>
  </v-app>
</template>

<script>
export default {
  name: 'App'

}
</script>

<style scoped>
.body {
  margin: 0;
  padding: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
