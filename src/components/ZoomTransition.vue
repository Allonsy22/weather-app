<template>
  <transition
    :name="transitionName"
    :mode="transitionMode"
    :enter-active-class="transitionEnterActiveClass"
    @beforeLeave="beforeLeave"
    @enter="enter"
    @afterEnter="afterEnter"
  >
    <slot/>
  </transition>
</template>

<script>
const DEFAULT_TRANSITION_MODE = 'out-in'

export default {
  name: 'ZoomTransition',

  data: () => ({
    prevHeight: 0,
    transitionName: '',
    transitionMode: DEFAULT_TRANSITION_MODE,
    transitionEnterActiveClass: 'zoom-enter-active'
  }),

  created () {
    this.$router.beforeEach((to, from, next) => {
      const transitionName = to.meta.transitionName || from.meta.transitionName

      if (to.meta.transitionName === 'zoom') {
        this.transitionMode = 'in-out'
        document.body.style.overflow = 'hidden'
      }

      if (from.meta.transitionName === 'zoom') {
        this.transitionMode = DEFAULT_TRANSITION_MODE
        document.body.style.overflow = null
      }

      this.transitionName = transitionName

      next()
    })
  },
  methods: {
    beforeLeave (element) {
      this.prevHeight = getComputedStyle(element).height
    },
    enter (element) {
      const { height } = getComputedStyle(element)

      element.style.height = this.prevHeight

      setTimeout(() => {
        element.style.height = height
      })
    },
    afterEnter (element) {
      element.style.height = 'auto'
    }
  }

}
</script>

<style scoped>
.zoom-enter-active,
.zoom-leave-active {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: zoom;
}

.zoom-leave-active {
  animation-direction: reverse;
}

@keyframes zoom {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  100% {
    opacity: 1;
  }
}
</style>
