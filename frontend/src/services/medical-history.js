import api from './api';

export const medicalHistoryService = {
    getByAlcode: (alcode) => {
        return api.get(`/internal/medical-histories/${alcode}`);
    },

    getByHN(hn) {
        return api.get(`/internal/medical-histories/hn/${hn}`);
    },

    save: (data) => {
        return api.post('/internal/medical-histories', data);
    }
};