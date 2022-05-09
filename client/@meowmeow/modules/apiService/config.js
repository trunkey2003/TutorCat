import axios from 'axios';

export const Axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/`,
  headers: {
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});
