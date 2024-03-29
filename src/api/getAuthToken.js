import { LOGIN_BASE_URL } from './API.js';

const USER_NAME = 'private_y';
const PASS_WORD = 'Cswz48rDL8';

export default async function getAuthToken() {
  let headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(USER_NAME + ":" + PASS_WORD));
  try {
    const res = await fetch(`${LOGIN_BASE_URL}`, {
      method: 'GET', headers: headers
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('something went wrong', err);
  }
};