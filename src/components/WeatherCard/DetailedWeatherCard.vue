<template>
  <div class="detailed-card-container">
    <v-card
      class="mx-auto d-flex flex-column"
      outlined
      max-width="600"
    >
      <div class="d-flex justify-space-between">
        <v-card
          width="30%"
          class="ma-1"
        >
          <v-card-title>{{name}}</v-card-title>
          <div>
            <span>{{currentDay}}</span>
            <v-img :src="img"></v-img>
            <span>{{weather.description}} {{weather.temp}}</span>
          </div>
        </v-card>

        <v-card
          width="70%"
          class="ma-1"
        >
          <v-card-title>{{name}}</v-card-title>
          <div>
            <div class="information">{{weather.temp}}<v-icon>mdi-temperature-celsius</v-icon></div>
            <div class="information">{{weather.humidity}}<v-icon>mdi-water-percent</v-icon></div>
            <div class="information">{{weather.windSpeed}} m/s<v-icon>mdi-windsock</v-icon></div>
            <div class="information">{{weather.pressure}}<v-icon>mdi-speedometer</v-icon></div>
            <div class="information">{{weather.sunrise}}<v-icon>mdi-weather-sunset-up</v-icon></div>
            <div class="information">{{weather.sunset}}<v-icon>mdi-weather-sunset-down</v-icon></div>
          </div>
        </v-card>
      </div>
      <div class="temperature-container">
        <v-sheet color="green">
          <v-sparkline
            :value="dailyTemp"
            color="rgba(255, 255, 255, .7)"
            height="70"
            padding="12"
            stroke-linecap="round"
            label-size="5"
            smooth="0"
            line-width="1.2"
          >
            <template v-slot:label="item">
              {{ item.value }}
            </template>
          </v-sparkline>
        </v-sheet>
      </div>
      {{dailyTemp}}
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'DetailedWeatherCard',

  props: {
    id: Number,
    name: String,
    country: String,
    weather: Object,
    lastUpdatedDate: String,
    currentDay: String,
    disabled: Boolean,
    dailyTemp: Array
  },

  computed: {
    img () {
      return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`
    }
  }
}
</script>

<style scoped>
.detailed-card-container {
  width: 90%;
}

</style>
