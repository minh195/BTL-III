import apisauce from 'apisauce'

const create = (baseURL = 'https://5dcd7cd3d795470014e4d1cd.mockapi.io/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 10000
  })
  const getUser = (data) => api.get('users')
  const getDevice = (data) => api.get(`products?search=${data}`)
  const getLocation = (data) => api.get(`products`)
  const getHistory = () => api.get('historys?sortBy=date_time&order=asc')
  const getDoctor = (data) => api.get('doctors')
  const getUserByDoctor = (data) => api.get(`users?search=${data}`)
  const getUserByID = (data) => api.get(`doctors?search=${data}`)
  return {
    api,
    getUser,
    getDevice,
    getHistory,
    getLocation,
    getDoctor,
    getUserByDoctor,
    getUserByID
  }
}

//get chat
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
// get device, 192.168.1.86 : IPV4
// const create3 = (baseURL = `http:192.168.1.86:3001`) => {
//   const api3 = apisauce.create({
//     // base URL is read from the "constructor"
//     baseURL,
//     // here are some default headers
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     // 10 second timeout...
//     timeout: 10000
//   })
//   const getDevice = () => api3.get(`/list_all_device`)
//   return {
//     getDevice
//   }
// }
// let's return back our create method as the default.
export default {
  create,
  create2,
  // create3
}
