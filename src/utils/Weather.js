import { fitData } from '@/utils'

export default class Weather {
  constructor (rawData) {
    this.weatherData = fitData(rawData)
  }

  setData (rawData) {
    this.weatherData = fitData(rawData)
  }

  getData () {
    return this.weatherData
  }
}
