import api from './api'

// PDF ใบรับรองแพทย์
export const downloadMedicalCertificate = async (id) => {
    try {
        const response = await api.get(`/internal/medical/certificate/${id}`, {
            responseType: 'blob'  // สำคัญ! ต้องระบุ responseType เป็น blob
        })
        return response.data
    } catch (error) {
        throw error
    }
}

// ค้นหาประวัติการตรวจ
export const searchMedicalHistory = async (params) => {
    try {
        const response = await api.get('/medical/search', {
            params: {
                hn: params.hn,
                alcode: params.alcode
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}