const days = ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday']

const fitData = (rawData) => {
  const { today, date, time } = getCurrentDate()
  const lastUpdatedDate = `${date} ${time}`
  const currentDay = days[today.getDay()]
  return {
    id: rawData.id,
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
  kelvinToCelsius
}
