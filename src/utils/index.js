const days = ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday']

const fitData = (rawData) => {
  const { today, date, time } = getCurrentDate()
  const lastUpdatedDate = `${date} ${time}`
  const currentDay = days[today.getDay()]
  return {
    id: rawData.id,
    coords: rawData.coord,
    name: rawData.name,
    country: rawData.sys.country,
    lastUpdatedDate,
    currentDay,
    weather: {
      main: rawData.weather[0].main,
      description: rawData.weather[0].description,
      icon: rawData.weather[0].icon,
      temp: kelvinToCelsius(rawData.main.temp),
      pressure: rawData.main.pressure,
      humidity: rawData.main.humidity,
      windSpeed: rawData.wind.speed,
      sunrise: secondsToTime(rawData.sys.sunrise),
      sunset: secondsToTime(rawData.sys.sunset)
    }
  }
}

const fitTemperature = (rawData) => {
  // temperature for 24 hours, request returns a temperature for 48 hours
  const dailyTemp = rawData.hourly
    .map(item => {
      return {
        dt: secondsToTime(item.dt),
        temp: kelvinToCelsius(item.temp)
      }
    })
    .splice(0, 24)
  return dailyTemp
}

const kelvinToCelsius = (kelvinTemp) => {
  return Math.round(kelvinTemp - 273.15)
}

const getCurrentDate = () => {
  const today = new Date()
  const date = today.toISOString().slice(0, 10)
  const time = `${today.getHours()}:${today.getMinutes()}`
  return {
    today,
    date,
    time
  }
}

const secondsToTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 5)
}

export {
  fitData,
  kelvinToCelsius,
  fitTemperature
}
