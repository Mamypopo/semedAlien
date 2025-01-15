// API calls สำหรับ reqcode
import api from './api'

export const reqCodeService = {
    // ดึงรายการ request codes
    getList() {
        return api.get('/internal/reqcode/GetReqCodeList')
    },
    
    // สร้าง request code ใหม่
    create(reqcode) {
        return api.post('/internal/reqcode/CreateReqCode', { reqcode })
    },
  
    // ลบ request code
    delete(id) {
        return api.post('/internal/reqcode/DeleteReqCode', { id })
    }
  }