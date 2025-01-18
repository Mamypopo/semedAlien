import { getMedicalHistoryByAlcode, saveMedicalHistory, getMedicalHistoryByHN, saveDoctorAssessment, getMedicalHistory, getLatestMedicalHistory } from "./medical-history.service.js";

export const getMedicalHistoryHandler = async (req, res) => {
    try {
        let histories;
        if (req.params.hn) {
            histories = await getMedicalHistoryByHN(req.params.hn);
        } else {
            histories = await getMedicalHistoryByAlcode(req.params.alcode);
        }
        res.status(200).json({ histories });
    } catch (error) {
        console.error('Get medical history error:', error);
        res.status(500).json({
            error: error.message || 'ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง'
        });
    }
};

export const saveMedicalHistoryHandler = async (req, res) => {
    try {
        const result = await saveMedicalHistory(req.body);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Save medical history error:', error);
        res.status(500).send();
    }
};

export const saveDoctorAssessmentHandler = async (req, res) => {
    try {
        const data = {
            ...req.body,
            user_id: req.user.id
        }
        const result = await saveDoctorAssessment(parseInt(req.params.id), data);
        res.status(200).json({
            message: 'บันทึกการประเมินสำเร็จ',
            result
        });
    } catch (error) {
        console.error('Save doctor assessment error:', error);
        res.status(500).json({
            error: error.message || 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง'
        });
    }
};

export const getDoctorAssessmentHandler = async (req, res) => {
    try {
        const result = await getMedicalHistory(parseInt(req.params.id));
        if (!result) {
            return res.status(404).json({
                error: 'ไม่พบข้อมูลการประเมิน'
            });
        }

        res.status(200).json({ result });
    } catch (error) {
        console.error('Get doctor assessment error:', error);
        res.status(500).json({
            error: error.message || 'ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่อีกครั้ง'
        });
    }
};

export const getLatestMedicalHistoryHandler = async (req, res) => {
    try {
        const { hn, alcode } = req.params;
        let history;

        if (hn) {
            history = await getLatestMedicalHistory({ hn });
        } else if (alcode) {
            history = await getLatestMedicalHistory({ alcode });
        } else {
            return res.status(400).json({
                status: 'error',
                message: 'กรุณาระบุ HN หรือ Alien Code'
            });
        }

        res.json({
            status: 'success',
            data: history
        });
    } catch (error) {
        console.error('Get latest medical history error:', error);
        res.status(500).json({
            status: 'error',
            message: error.message || 'ไม่สามารถดึงข้อมูลได้'
        });
    }
};