<template>
  <div class="main-container" v-if="currentWeather">
    <DetailedWeatherCard
      :id="currentWeather.id"
      :name="currentWeather.name"
      :country="currentWeather.country"
      :weather="currentWeather.weather"
      :lastUpdatedDate="currentWeather.lastUpdatedDate"
      :currentDay="currentWeather.currentDay"
      :dailyTemp="dailyTemp"
    />
  </div>
</template>

<script>
import DetailedWeatherCard from '@/components/WeatherCard/DetailedWeatherCard'
import { mapGetters } from 'vuex'

export default {
  name: 'DetailPage',

  components: {
    DetailedWeatherCard
  },

  computed: {
    ...mapGetters(['currentWeather', 'dailyTemp'])
  },

  methods: {
    // test () {
    //   this.$store.dispatch('getDailyTemperature', this.currentWeather.coords)
    // }
  }

}
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
