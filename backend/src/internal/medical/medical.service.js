import prisma from '../../config/database.js'

export const getMedicalRecordById = async (id) => {
    const recordId = parseInt(id)
    const medicalHistory = await prisma.medicalHistories.findUnique({
        where: { id: recordId },
        include: {
            ForeignWorkers: true
        }
    })

    if (!medicalHistory) {
        throw new Error('Medical history record not found')
    }

    // ดึงข้อมูลล่าสุดจาก healthChecks
    const healthCheck = await prisma.healthChecks.findFirst({
        where: {
            alcode: medicalHistory.alcode,
            isDelete: false
        },
        orderBy: {
            createdOn: 'desc'
        }
    })

    // รวมข้อมูลจากทั้ง 2 ตาราง
    return {
        medicalHistory,
        healthCheck,
        // ข้อมูลเพิ่มเติมที่ต้องใช้ในการสร้าง PDF
        certificateInfo: {
            hospitalName: 'โรงพยาบาลซีเมดลีฟวิ่งแคร์',
            examDate: healthCheck?.alchkdate || new Date(),
            doctorName: healthCheck?.chkname || '',
            doctorLicense: healthCheck?.licenseno || '',
            doctorPosition: healthCheck?.chkposition || '',
        }
    }
}