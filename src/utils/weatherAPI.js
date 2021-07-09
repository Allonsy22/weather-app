import axios from 'axios'

const API_KEY = 'e3d09b11c7256024c30a61a94a0c8533'

const getData = (query) => {
  return new Promise((resolve, reject) => {
    axios.get(query)
      .then(data => {
        // timeout for artificial delay
        setTimeout(() => {
          resolve(data)
        }, 1000)
      })
      .catch(error => reject(error))
  })
}

class WeatherAPI {
  constructor () {
    this.url = 'https://api.openweathermap.org/data/2.5/weather?'
  }

  getByName (name) {
    const query = `${this.url}q=${name}&appid=${API_KEY}`
    return getData(query)
  }

  getById (id) {
    const query = `${this.url}id=${id}&appid=${API_KEY}`
    return getData(query)
  }

  getTemperature (coords) {
    const { lon, lat } = coords
    const query = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts,daily&appid=${API_KEY}`
    return getData(query)
  }
}

const weatherAPI = new WeatherAPI()

export default weatherAPI
