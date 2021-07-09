<template>
  <v-card class="temperature-container">
    <div class="d-flex flex-row">
      <div
        class="temperature-block"
        v-for="(temp, index) in temperature"
        :key="index"
        :style="temperatureBlockStyle(temp)"
      >
        {{temp}}
      </div>
    </div>
    <div class="d-flex flex-row mb-1">
      <div
        class="hour-block"
        v-for="hour in time"
        :key="hour"
      >
        {{hour}}
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'TemperatureBlock',
  props: {
    dailyTemp: Array
  },

  methods: {
    temperatureBlockStyle (temperature) {
      return `transform: translateY(-${temperature}px`
    }
  },

  computed: {
    temperature () {
      if (this.$vuetify.breakpoint.xs) {
        return this.dailyTemp
          .map(item => item.temp)
          .filter((item, index) => index % 2 === 0)
      }
      return this.dailyTemp.map(item => item.temp)
    },
    time () {
      if (this.$vuetify.breakpoint.xs) {
        return this.dailyTemp
          .map(item => item.dt)
          .filter((item, index) => index % 2 === 0)
      }
      return this.dailyTemp.map(item => item.dt)
    }
  }
}
</script>

<style scoped>
.temperature-container {
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.temperature-block {
  position: relative;
  width: 20px;
  height: 20px;
  border-bottom: 1px solid black;
  margin: 1px;
  text-align: center;
  font-size: 12px;
}

.hour-block {
  width: 20px;
  height: 45px;
  border-bottom: 1px solid black;
  margin: 1px;
  text-align: center;
  font-size: 11px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
</style>
