<template>
  <div class="main-page-container">
    <SearchBox />
    <WeatherCardList />
    <WeatherCardDialog />
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox'
import WeatherCardList from '@/components/WeatherCard/WeatherCardList'
import WeatherCardDialog from '@/components/Dialog/WeatherCardDialog'
import { mapGetters } from 'vuex'

export default {
  name: 'MainPage',

  components: {
    SearchBox,
    WeatherCardList,
    WeatherCardDialog
  },

  created () {
    this.getGeoLocation()
  },

  computed: {
    ...mapGetters([
      'citiesList',
      'currentWeather'
    ]),
    isCityInList () {
      return this.citiesList.some(city => {
        return city.id === this.currentWeather.id
      })
    }
  },

  methods: {
    getGeoLocation () {
      navigator.geolocation.getCurrentPosition(
        position => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
          this.$store.dispatch('getWeatherByLocation', coords)
          if (!this.isCityInList) this.$store.dispatch('openCardDialog')
        },
        error => {
          console.log(error.message)
        }
      )
    }
  }

}
</script>

<style scoped>
.main-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(94, 82, 255, 1) 100%);
}
</style>
