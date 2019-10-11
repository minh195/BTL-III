import apisauce from 'apisauce'
import { head } from 'ramda'
import AsyncStorage from '@react-native-community/async-storage'

const create = (baseURL = 'https://api.bonbon24h.com.vn') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 10000
  })
  const getUser = (data) => api.post('/api/v2/passengers/login', {
    phone_number: data.emailData.email,
    password: data.passwordData.password,
    device_token: '1',
    device_os: '1',
    checkVersion: '1'
  })
  const getFriend = () => api.get('/api/v2/passengers/drivers')
  return {
    getUser,
    getFriend,
    api
  }
}

// let's return back our create method as the default.
export default {
  create
}
