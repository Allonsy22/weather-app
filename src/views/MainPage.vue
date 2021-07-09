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
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(94, 82, 255, 1) 100%);
}
</style>
