import api from './api';

export const medicalHistoryService = {
    getByAlcode: (alcode) => {
        return api.get(`/internal/medical-histories/${alcode}`);
    },

    getByHN(hn) {
        return api.get(`/internal/medical-histories/hn/${hn}`);
    },

    saveDoctorAssessment: (id, data) => {
        return api.put(`/internal/medical-histories/medical-history/${id}/doctor-assessment`, data)
    },

    takeHistory: (data) => {
        return api.post('/internal/medical-histories/take-history', data)
    },

    getLatest: (params) => {
        const { hn, alcode } = params;
        if (hn) {
            return api.get(`/internal/medical-histories/latest/hn/${hn}`);
        } else {
            return api.get(`/internal/medical-histories/latest/alcode/${alcode}`);
        }
    },
};