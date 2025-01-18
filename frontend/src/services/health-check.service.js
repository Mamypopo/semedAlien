import api from './api'

export const healthCheckService = {
    updateHealthCheck: (id, data) => {
        return api.put(`/internal/health-checks/update/${id}`, data)
    },
} 