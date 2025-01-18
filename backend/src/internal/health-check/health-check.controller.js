import { updateHealthCheck } from './health-check.service.js'

export const updateHealthCheckHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await updateHealthCheck(id, data);

        res.json({
            status: 'success',
            data: result
        });
    } catch (error) {
        console.error('Update health check error:', error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};



