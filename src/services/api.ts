import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-money-smqa.onrender.com/',
})
