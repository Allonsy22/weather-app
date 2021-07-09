<template>
  <div class="main-container" v-if="currentWeather">
    <DetailedWeatherCard
      :id="currentWeather.id"
      :name="currentWeather.name"
      :country="currentWeather.country"
      :coords="currentWeather.coords"
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
