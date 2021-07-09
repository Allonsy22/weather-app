<template>
  <v-app>
    <zoom-transition>
      <router-view/>
    </zoom-transition>
  </v-app>
</template>

<script>
import ZoomTransition from '@/components/ZoomTransition'

export default {
  name: 'App',

  components: {
    ZoomTransition
  }

}
</script>
