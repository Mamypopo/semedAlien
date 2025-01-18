import prisma from "../../config/database.js";

export const updateHealthCheck = async (id, data) => {
    try {
        const existingHealthCheck = await prisma.healthChecks.findUnique({
            where: { id: parseInt(id) }
        })

        if (!existingHealthCheck) {
            throw new Error('ไม่พบข้อมูลที่ต้องการอัพเดท')
        }

        return await prisma.healthChecks.update({
            where: {
                id: parseInt(id)
            },
            data: {
                licenseno: data.licenseno,
                chkname: data.chkname,
                chkposition: data.chkposition,
                alchkdesc: data.alchkdesc,
                alchkstatus: data.alchkstatus,
                alchkdate: new Date(),
                updatedBy: data.updatedBy,
                updatedOn: new Date()
            }
        })

    } catch (error) {
        console.error('Update health check error:', error)
        throw error
    }
}


