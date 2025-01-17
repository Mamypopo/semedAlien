import api from './api'

export const authService = {
  getMe() {
    return api.get('/auth/me')
  },

  login(loginData) {
    return api.post('/auth/login', loginData)
  },

  register(userData) {
    return api.post('/auth/register', userData)
  }
}