import PDFDocument from 'pdfkit';
import { pdfConfig } from '../config/pdf.config.js';

export const generateMedicalCertificate = async (data) => {
    const { medicalHistory, certificateInfo } = data;
    console.log(medicalHistory)
    console.log(certificateInfo)
    const doc = new PDFDocument({
        size: 'A4',
        margin: 30, // ขอบกระดาษ
    });

    // ตั้งค่า Font
    doc.registerFont('THSarabunNew', pdfConfig.fonts.THSarabunNew);
    doc.font('THSarabunNew');


    // ------------------ ส่วนหัวกระดาษ ------------------
    doc.image(pdfConfig.images.logo, 250, 30, { width: 100 })
        .fontSize(18)
        .text('ใบรับรองแพทย์', 40, 90, { align: 'center' })
        .fontSize(14)
        .text('ตรวจสุขภาพคนต่างด้าว/แรงงานต่างด้าว', { align: 'center' })
        .moveDown()
        .fontSize(12)
        .text(`วันที่: ${new Date().toLocaleDateString('th-TH')}`, { align: 'right' });

    // ------------------ 1. ข้อมูลส่วนตัว ------------------
    doc.moveDown(1)

    doc.fontSize(14)
        .text('1.รายละเอียด/ประวัติส่วนตัวของผู้รับการตรวจสุขภาพ',)
        .fontSize(12)
        .text(`1) ชื่อ-สกุล ${medicalHistory.ForeignWorkers.alprefix_th || '-'}${medicalHistory.ForeignWorkers.alname_th || '-'} ${medicalHistory.ForeignWorkers.alsname_th || '-'} `)
        .text(`1) ชื่อ-สกุล (ภาษาอังกฤษ: ${medicalHistory.ForeignWorkers.alprefixen || '-'}${medicalHistory.ForeignWorkers.alname_en || '-'} ${medicalHistory.ForeignWorkers.alsname_en || '-'})`)
        .text(`   เลขประจำตัวบุคคล ${medicalHistory.ForeignWorkers.alcode || '-'} | HN: ${medicalHistory.ForeignWorkers.hn || '-'}`)
        .text(`   เลข Passport ................................................................................`)
        .text(`   วันเดือนปีเกิด ${new Date(medicalHistory.ForeignWorkers.albdate).toLocaleDateString('th-TH') || '-'}  สัญชาติ ${medicalHistory.ForeignWorkers.alnation || '-'} อาชีพ  ${medicalHistory.ForeignWorkers.alposid || '-'}`)
        .text(`2) ที่อยู่ปัจจุบัน ${medicalHistory.ForeignWorkers.address || '-'} ตรอก....................... ซอย..................... ถนน....................... ตำบล/แขวง ${medicalHistory.ForeignWorkers.subdistrict || '-'} `)
        .text(`      อำเภอ/เขต ${medicalHistory.ForeignWorkers.district || '-'} จังหวัด ${medicalHistory.ForeignWorkers.province || '-'} รหัสไปรษณีย์ ${medicalHistory.ForeignWorkers.postal_code || '-'}   โทร.............................`)
        .text(`โทรมือถือ ${medicalHistory.ForeignWorkers.phone_number || '-'}`)
        .moveDown();

    // ------------------ 2. ข้อมูลนายจ้าง/สถานประกอบการ ------------------
    doc.fontSize(14)
        .text('2.ข้อมูลนายจ้าง/สถานประกอบการ')
        .fontSize(12)
        .text(`ชื่อ-สกุล (นายจ้าง)....................................... สถานประกอบการ: ${medicalHistory.ForeignWorkers.Employers?.empname || '-'}`)
        .text(`อยู่บ้านเลขที่ ${medicalHistory.ForeignWorkers.Employers?.wkaddress || '-'}`)
        .moveDown(1);

    // ------------------ 3. ข้อมูลแพทย์ผู้ตรวจ ------------------
    doc.fontSize(14)
        .text('3.ข้อมูลแพทย์ผู้ตรวจ')
        .fontSize(12)
        .text(` นายแพทย์/แพทย์หญิง ${certificateInfo.doctorName || '-'}`)
        .text(` ใบอนุญาตประกอบวิชาชีพเวชกรรมเลขที่ ${certificateInfo.doctorLicense || '-'} สถานพยาบาลชื่อ ${certificateInfo.hospitalName || '-'}`)
        .text(` ที่อยู่ เลขที่ 111 ซอยรังสิต-นครนายก42 ถนนรังสิต-นครนายก ตำบลประชาธิปัตย์ อำเภอธัญบุรี จังหวัดปทุมธานี 12130 `)
        .moveDown(1);

    // ------------------ ผลการตรวจสุขภาพ ------------------
    doc.fontSize(14)
        .text('ผลการตรวจสุขภาพ', { align: 'center' })
        .fontSize(12)
        .text(`ส่วนสูง: ${medicalHistory.height || '-'} ซม.  น้ำหนัก: ${medicalHistory.weight || '-'} กก.  ความดันโลหิต: ${medicalHistory.bp || '-'}  ชีพจร: ${medicalHistory.pr || '-'} ครั้ง/นาที`)
        .text(`สภาพร่างกายจิตใจทั่วไป: ...................................................................................................................`)
        .text(`ผลการตรวจวัณโรค: □ ปกติ  □ ผิดปกติ/ให้การรักษา  □ ระยะติดต่อ/อาการเป็นที่น่ารังเกียจ`)
        .text(`ผลการตรวจโรคเรื้อน: □ ปกติ  □ ผิดปกติ/ให้การรักษา  □ ระยะติดต่อ/อาการเป็นที่น่ารังเกียจ`)
        .text(`ผลการตรวจโรคเท้าช้าง: □ ปกติ  □ ผิดปกติ/ให้การรักษา  □ อาการเป็นที่น่ารังเกียจ`)
        .text(`ผลการตรวจโรคซิฟิลิส: □ ปกติ  □ ผิดปกติ/ให้การรักษา  □ พบสารเสพติด`)
        .text(`ผลการตรวจโรคพิษสุราเรื้อรัง: □ ปกติ  □ เกิดอาการ`)
        .text(`ผลการตรวจการตั้งครรภ์  : □ ไม่ตั้งครรภ์  □ ตั้งครรภ์  `)
        .text(`ผลการตรวจอื่นๆ(ถ้ามี)................................................................................................................................................... `)
        .moveDown(1);

    // ------------------ สรุปผลการตรวจ ------------------
    doc.fontSize(14)
        .text('สรุปผลการตรวจ', { align: 'center' })
        .fontSize(12)
        .text(`1) □ สุขภาพสมบูรณ์ดี`)
        .text(`2) □ ผ่านการตรวจสุขภาพ แต่ต้องให้การรักษา ความดูแล ติดตามอย่างต่อเนื่อง`)
        .text(` □ วัณโรค  □ โรคเรือน  □ โรคเท้าช้าง □ โรคซิฟิลิส`)

        .text(`3) □ ไม่ผ่านการตรวจสุขภาพ เนื่องจาก`)
        .text(`3.1 ร่างกายทุพพลภาพจนไม่สามารถประกอบการหาเลี้ยงชีพได้/จิตฟั่นเฟือน ไม่สมประกอบ`)
        .text(`3.2 เป็นโรคไม่อนุญาตให้ทำงาน และไม่ให้การประกันสุขภาพ(ตามประกาศกระทรวงสาธารณสุข)`)
        .moveDown(1);


    // ------------------ ลายเซ็นแพทย์ ------------------
    doc.moveDown(2)
        .fontSize(14)
        .text(`แพทย์ผู้ตรวจ`, { align: 'center' })
        .text('(..............................................) ประทับตรา', 350, doc.y)
        .text(`(${certificateInfo.doctorName || '-'})`, 350, doc.y + 20)
        .text('(หมายเหตุ  ใบรับรองแพทย์ฉบับนี้มีอายุ 60 วัน นับแต่วันที่ตรวจร่างกาย  ยกเว้น กรณีใช้สำหรับการประกันสุขภาพมีอายุ 1 ปี)', 50, doc.y, { align: 'left' })




    return doc;
};
