import { WEATHER_DATA_URL } from './API';
import dayjs from 'dayjs';
const getWeatherData = async ({ location, timeRange, params, token }) => {
  try {
    // format paramters
    const time = [dayjs(timeRange[0]).format(), dayjs(timeRange[1]).format()].join('--');
    const parameters = params.join(',');
    // get weather data with temperature, humidity and weather parameters
    // PT1H means period of time is one hour
    const res = await fetch(`${WEATHER_DATA_URL}/${time}:PT1H/${parameters}/${location}/json?access_token=${token}&model=
mix`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('something went wrong', error);
  }
};

export default getWeatherData;