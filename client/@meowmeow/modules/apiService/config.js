import axios from 'axios';

export const httpClient = axios.create({
  baseURL: `https://hackathon2022webbe.herokuapp.com/api/`, //API_URL HERE
  headers: {
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});
