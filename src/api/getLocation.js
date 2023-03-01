import { LOCATION_BASE_URL } from './API';
const getLocation = async (value, token) => {
  try {
    const res = await fetch(`${LOCATION_BASE_URL}&access_token=${token}&location=${value}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('something went wrong', error);
  }
};

export default getLocation;