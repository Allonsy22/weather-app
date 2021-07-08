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
import WeatherCardDialog from '@/components/WeatherCard/WeatherCardDialog'

export default {
  name: 'MainPage',

  components: {
    SearchBox,
    WeatherCardList,
    WeatherCardDialog
  }

}
</script>

<style scoped>
.main-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
