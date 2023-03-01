import { LOGIN_BASE_URL } from './API.js';

const USER_NAME = 'private_yu';
const PASS_WORD = 'IdK4G8z7b4';

export default async function getAuth() {
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