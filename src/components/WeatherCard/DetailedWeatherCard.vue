<template>
  <div class="detailed-card-container">
    <v-card
      class="mx-auto d-flex flex-column"
      outlined
      max-width="600"
      :loading="loading"
      :disabled="loading"
    >
      <div class="d-flex flex-column justify-space-between flex-sm-row">
        <v-card
          :width="$vuetify.breakpoint.xs ? '100%' : '40%'"
          height="200"
          class="background"
        >
          <div class="temperature">
            {{weather.temp}}
            <v-icon size="15">mdi-temperature-celsius</v-icon>
            <p class="caption ma-0">{{currentDay}}</p>
          </div>
          <div class="icon">
            <v-img
              :src="img"
              height="100"
              width="100"
            ></v-img>
          </div>
          <div class="description">
            <p class="ma-0">{{name}}</p>
            <p class="caption">{{weather.description}}</p>
          </div>
        </v-card>

        <v-card
          :width="$vuetify.breakpoint.xs ? '100%' : '60%'"
          height="200"
        >
          <div class="details-container">
            <p class="information">
              Humidity: {{weather.humidity}}<v-icon>mdi-water-percent</v-icon>
            </p>
            <p class="information">
              Wind speed: {{weather.windSpeed}} m/s<v-icon>mdi-windsock</v-icon>
            </p>
            <p class="information">
              Pressure: {{weather.pressure}}<v-icon>mdi-speedometer</v-icon>
            </p>
            <p class="information">
              Sunrise at {{weather.sunrise}}<v-icon>mdi-weather-sunset-up</v-icon>
            </p>
            <p class="information">
              Sunset at {{weather.sunset}}<v-icon>mdi-weather-sunset-down</v-icon>
            </p>
          </div>
          <div class="last-updated-date">
            Last updated: {{lastUpdatedDate}}
          </div>
          <v-btn
            text
            color="teal accent-4"
            class="button"
            small
            right
            @click="updateWeather"
          >
            <v-icon size="20">mdi-cached</v-icon>
          </v-btn>
        </v-card>
      </div>
      <v-card
        height="150"
        :disabled="loading"
      >
        <TemperatureBlock :dailyTemp="dailyTemp"/>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import TemperatureBlock from '@/components/TemperatureBlock'
import { mapGetters } from 'vuex'

export default {
  name: 'DetailedWeatherCard',
  components: {
    TemperatureBlock
  },
  props: {
    id: Number,
    name: String,
    country: String,
    coords: Object,
    weather: Object,
    lastUpdatedDate: String,
    currentDay: String,
    disabled: Boolean,
    dailyTemp: Array
  },

  computed: {
    ...mapGetters(['loading']),
    img () {
      return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`
    }
  },

  methods: {
    updateWeather () {
      this.$store.dispatch('updateWeatherData', this.id)
        .then(() => {
          this.$store.dispatch('getDailyTemperature', this.coords)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.detailed-card-container {
  width: 90%;
  text-align: center;
}

.temperature {
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px 10px 0 0;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.icon {
  position: absolute;
  top: 0;
  left: 0;
}

.description {
  position: absolute;
  bottom: 30px;
  width: 100%;
  text-align: center;
  text-transform: capitalize;
}

.details-container {
  width: 100%;
  height: 50%;
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.information {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  margin: 0;
}

.last-updated-date {
  position: absolute;
  bottom: 0;
  margin: 10px;
  font-size: 10px;
}

.button {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 7px;
}

.background {
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(171, 166, 255, 1) 100%);
}
</style>
