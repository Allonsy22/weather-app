<template>
  <div class="text-center"
    v-if="currentWeather"
  >
    <v-dialog
      v-model="cardDialog"
      width="300"
    >
      <v-card
        :loading="loading"
        :disabled="loading"
      >
        <v-card-title class="text-h6 grey lighten-2 justify-space-between">
          Add to my list
          <v-switch
            class="ml-2"
            v-model="addToList"
          ></v-switch>
        </v-card-title>

        <v-card-text v-if="!loading">
          <SimpleWeatherCard
            :id="currentWeather.id"
            :name="currentWeather.name"
            :country="currentWeather.country"
            :weather="currentWeather.weather"
            :lastUpdatedDate="currentWeather.lastUpdatedDate"
            :currentDay="currentWeather.currentDay"
          />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="warning"
            text
            @click="closeDialog"
          >
            CANCEL
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="submit"
          >
            GOT IT
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SimpleWeatherCard from '@/components/WeatherCard/SimpleWeatherCard'
import { mapGetters } from 'vuex'

export default {
  name: 'WeatherCardDialog',

  components: {
    SimpleWeatherCard
  },

  data: () => ({
    addToList: false
  }),

  computed: {
    ...mapGetters([
      'currentWeather',
      'cardDialog',
      'loading'
    ])
  },

  methods: {
    closeDialog () {
      this.$store.dispatch('closeCardDialog')
      this.addToList = false
    },
    submit () {
      if (!this.addToList) {
        this.closeDialog()
        return
      }
      this.$store.dispatch('addCityToList')
      this.closeDialog()
    }
  }

}
</script>

<style scoped>

</style>
