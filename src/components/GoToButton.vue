<template>
  <v-btn
    v-if="isGoToButton"
    text
    fixed
    right
    bottom
    small
    color="teal accent-4"
    @click="$vuetify.goTo(target, options)"
  >
    <v-icon size="30">mdi-arrow-up-bold-circle</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'GoToButton',

  data: () => ({
    target: 0,
    options: {
      duration: 300,
      offset: 0,
      easing: 'easeInOutCubic'
    },
    windowTopOffset: 0
  }),

  mounted () {
    window.addEventListener('scroll', this.onScrollHandler)
  },

  unmounted () {
    window.removeEventListener('scroll', this.onScrollHandler)
  },

  methods: {
    onScrollHandler () {
      this.windowTopOffset = window.top.scrollY
    }
  },

  computed: {
    isGoToButton () {
      return this.windowTopOffset > 100
    }
  }

}
</script>

<style scoped>

</style>
