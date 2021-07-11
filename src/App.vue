<template>
  <v-app>
    <ErrorBlock
      v-if="errors.length"
      :errors="errors"/>
    <zoom-transition v-else>
      <router-view/>
    </zoom-transition>
    <GoToButton />
  </v-app>
</template>

<script>
import ZoomTransition from '@/components/ZoomTransition'
import GoToButton from '@/components/GoToButton'
import ErrorBlock from '@/components/ErrorBlock'
import { mapGetters } from 'vuex'

export default {
  name: 'App',

  components: {
    ZoomTransition,
    GoToButton,
    ErrorBlock
  },

  mounted () {
    this.$store.dispatch('clearErrorList')
  },

  computed: {
    ...mapGetters(['errors'])
  }
}
</script>
