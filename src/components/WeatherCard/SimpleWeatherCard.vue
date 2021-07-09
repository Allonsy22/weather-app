<template>
  <v-card
    v-if="id"
    class="mx-auto mt-2 mb-2"
    width="200"
    height="200"
    max-width="200"
    elevation="5"
    outlined
    :loading="loading"
    :disabled="disabled"
  >
    <v-card-text
      class="pa-2 pointer"
      @click="reveal = true"
    >
      <div class="delete-button">
        <v-btn
          v-if="inList"
          x-small
          text
          class="pa-0"
          @click="removeCity"
        >
          <v-icon color="red lighten-2">mdi-close</v-icon>
        </v-btn>
      </div>
      <p class="text-h8 text--primary ma-0">
        {{name}},{{country}}
      </p>
      <p class="ma-0">
        {{currentDay}}
      </p>
      <div class="weather-info-container">
        <div class="icon-container text-center">
          <v-img
            :src="img"
            width="70"
            height="70"
          ></v-img>
          <p class="ma-0">{{weather.main}}</p>
        </div>
        <p>{{weather.temp}}<v-icon>mdi-temperature-celsius</v-icon></p>
      </div>
    </v-card-text>
    <v-card-actions v-if="inList">
      <v-btn
        text
        color="teal accent-4"
        small
        @click="navigateToDetails"
      >
        More
      </v-btn>

      <v-btn
        text
        color="teal accent-4"
        small
        @click="updateWeather"
      >
        <v-icon size="20">mdi-cached</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%;"
        @click="reveal = false"
      >
        <v-card-text class="pa-2">
          <p class="text-h6 text--primary ma-0 text-capitalize">
            {{weather.description}}
          </p>
          <div class="details-container">
            <div class="information">{{weather.temp}}<v-icon>mdi-temperature-celsius</v-icon></div>
            <div class="information">{{weather.humidity}}<v-icon>mdi-water-percent</v-icon></div>
            <div class="information">{{weather.windSpeed}} m/s<v-icon>mdi-windsock</v-icon></div>
            <div class="information">{{weather.pressure}}<v-icon>mdi-speedometer</v-icon></div>
            <div class="information">{{weather.sunrise}}<v-icon>mdi-weather-sunset-up</v-icon></div>
            <div class="information">{{weather.sunset}}<v-icon>mdi-weather-sunset-down</v-icon></div>
          </div>
        </v-card-text>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'SimpleWeatherCard',

  props: {
    id: Number,
    name: String,
    country: String,
    coords: Object,
    weather: Object,
    lastUpdatedDate: String,
    currentDay: String,
    disabled: Boolean,
    inList: Boolean
  },

  data: () => ({
    reveal: false,
    loading: false
  }),

  computed: {
    img () {
      return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`
    }
  },

  methods: {
    removeCity () {
      this.$store.dispatch('removeCityFromList', this.id)
    },
    updateWeather () {
      this.loading = true
      this.$store.dispatch('updateWeatherData', this.id)
        .then(() => {
          this.$store.dispatch('getDailyTemperature', this.coords)
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    navigateToDetails () {
      this.$router.push({ name: 'Details', params: { id: this.id } })
    }
  }

}
</script>

<style scoped>
.weather-info-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.pointer {
  cursor: pointer;
}

.details-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.information {
  width: 50%;
  margin: 5px 0 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-button {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
