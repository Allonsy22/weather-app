<template>
  <div
    class="overlay"
    v-if="currentWeather"
  >
    <div class="overlay-inner">
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
    <v-btn
      to="/"
      absolute
      top
      left
      text
      small
    >
      <v-icon size="35">mdi-home-outline</v-icon>
    </v-btn>
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
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(94, 82, 255, 1) 100%);
}

.overlay-inner {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
