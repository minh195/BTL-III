import apisauce from 'apisauce'
import { head } from 'ramda'

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
const create2 = (baseURL = `http://ghuntur.com`) => {
  const api2 = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // 10 second timeout...
    timeout: 10000
  })
  const getMess = (data) => api2.get(
    `/simsim.php?lc=en&deviceId=&bad0=&txt=`,
    {
      lc: 'en',
      txt: data
    })
  return {
    getMess
  }
}

// let's return back our create method as the default.
export default {
  create,
  create2
}
