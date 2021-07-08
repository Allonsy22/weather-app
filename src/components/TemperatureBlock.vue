<template>
  <div class="temperature-container">
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
    <div class="d-flex flex-row">
      <div
        class="hour-block"
        v-for="hour in time"
        :key="hour"
      >
        {{hour}}
      </div>
    </div>
  </div>
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
      return this.dailyTemp.map(item => item.temp)
    },
    time () {
      return this.dailyTemp.map(item => item.dt)
    }
  }
}
</script>

<style scoped>
.temperature-container {
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
