import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-money-1.onrender.com/',
})
