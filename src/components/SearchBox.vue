<template>
  <div class="search-box-container">
    <v-autocomplete
      ref="city"
      v-model="city"
      :rules="[() => !!city || 'This field is required']"
      :items="cities"
      append-icon="mdi-magnify"
      label="City"
      placeholder="Select..."
      required
      color="white"
      @input="getWeather"
      @keydown.enter="getWeather"
    ></v-autocomplete>
  </div>
</template>

<script>
import worldCities from '@/assets/world-cities.json'

export default {
  name: 'SearchBox',

  data: () => ({
    citiesData: Array.from(worldCities),
    city: null
  }),

  computed: {
    cities () {
      return this.citiesData.map(data => data.name)
    }
  },

  methods: {
    getWeather () {
      if (!this.city) return
      this.$store.dispatch('openCardDialog')
      this.$store.dispatch('getWeatherByName', this.city.toLowerCase())
    }
  }

}
</script>

<style scoped>
.search-box-container {
  width: 300px;
  margin-top: 25px;
}
</style>
