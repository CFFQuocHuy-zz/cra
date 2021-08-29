import axiosFetch from 'utils/api'

const baseURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`

const api = {
  login: `${baseURL}/login`,
}

export default class Auth {
  static login(body) {
    return axiosFetch.post(api.login, body)
  }
}
