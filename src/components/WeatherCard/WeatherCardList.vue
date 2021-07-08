<template>
  <div v-if="currentWeather">
    <transition-group
      name="list-complete"
      :class="cardListContainerStyle"
    >
      <div
        class="list-complete-item"
        v-for="city in citiesList"
        :key="city.id">
          <SimpleWeatherCard
          :id="city.id"
          :name="city.name"
          :country="city.country"
          :weather="city.weather"
          :lastUpdatedDate="city.lastUpdatedDate"
          :currentDay="city.currentDay"
          :disabled="loading"
          inList />
      </div>
    </transition-group>
  </div>
</template>

<script>
import SimpleWeatherCard from '@/components/WeatherCard/SimpleWeatherCard'
import { mapGetters } from 'vuex'

export default {
  name: 'WeatherCardList',

  components: {
    SimpleWeatherCard
  },

  computed: {
    ...mapGetters([
      'currentWeather',
      'citiesList',
      'loading'
    ]),
    cardListContainerStyle () {
      if (this.$vuetify.breakpoint.width < 500) return 'card-list-container-mobile'
      return 'card-list-container-desktop'
    }
  }

}
</script>

<style scoped>
.card-list-container-desktop {
  width: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.card-list-container-mobile {
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
