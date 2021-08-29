// -----------------------------------------------------------------------------
// This file contains an instance of axios with a custom config (axiosClient)
// and an axiosFetch singleton to make http requests (axiosFetch)
// -----------------------------------------------------------------------------

import axios from 'axios'
import { stringify } from 'qs'
import { get, STORAGE } from 'utils/storage'

/**
 * Create a new instance of axios with a custom config
 * use need to set(STORAGE.JWT)
 */
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

axiosClient.interceptors.request.use(
  function (config) {
    const token = get(STORAGE.JWT)
    if (typeof token !== 'undefined' && token) {
      config.headers['Authorization'] = 'Bearer ' + encodeURIComponent(token)
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
axiosClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

/**
 * Create a singleton for
 */
class AxiosFetch {
  get(uri, params = {}) {
    const queryString = stringify(params)
    const uriWithQuery = `${uri}&${queryString}`
    return axiosClient.get(uriWithQuery)
  }
  post(uri, body) {
    return axiosClient.post(uri, body)
  }
  put(uri, body) {
    return axiosClient.put(uri, body)
  }
  delete(uri, body) {
    return axiosClient.delete(uri, body)
  }
  patch(uri, body) {
    return axiosClient.patch(uri, body)
  }
}
const axiosFetch = new AxiosFetch()
export default axiosFetch
