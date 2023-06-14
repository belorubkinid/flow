import axios from 'axios';

export const axiosWithConfig = axios.create({
  baseURL:`${process.env.REACT_APP_SERVER_URL}`
})
