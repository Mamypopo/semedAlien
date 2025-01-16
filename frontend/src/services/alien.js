import api from './api'

export const alienService = {
  getList() {
    return api.get('/internal/alien/GetAlienList')
  },

  getByCode(alcode) {
    return api.post('/internal/alien/GetAlienByCode', { alcode })
  },

  syncData() {
    return api.get('/internal/alien/SyncData')
  },

  saveDetail(data) {
    return api.post('/internal/alien/SaveAlienDetail', data)
  },

  search(params) {
    return api.post('/internal/alien/SearchAliens', params)
  }
} 