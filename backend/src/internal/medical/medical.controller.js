import { generateMedicalCertificate } from '../../services/pdf.service.js'
import { getMedicalRecordById } from './medical.service.js'

export const getMedicalCertificateHandler = async (req, res) => {
    try {
        const medicalRecord = await getMedicalRecordById(req.params.id)
        const doc = await generateMedicalCertificate(medicalRecord)

        const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
        const fileName = `${medicalRecord.medicalHistory.ForeignWorkers.alname_th}_${medicalRecord.medicalHistory.ForeignWorkers.hn}_${today}.pdf`
        const encodedFileName = encodeURIComponent(fileName)

        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', `attachment; filename="${encodedFileName}"`)

        doc.pipe(res)
        doc.end()
    } catch (error) {
        console.error('Generate PDF Error:', error)
        res.status(500).json({ message: 'Error generating PDF' })
    }
}

