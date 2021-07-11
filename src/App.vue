<template>
  <v-app>
    <zoom-transition>
      <router-view/>
    </zoom-transition>
    <GoToButton />
  </v-app>
</template>

<script>
import ZoomTransition from '@/components/ZoomTransition'
import GoToButton from '@/components/GoToButton'

export default {
  name: 'App',

  components: {
    ZoomTransition,
    GoToButton
  }
}
</script>
