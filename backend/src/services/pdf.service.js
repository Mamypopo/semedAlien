import PDFDocument from 'pdfkit';
import { pdfConfig } from '../config/pdf.config.js';

export const generateMedicalCertificate = async (data) => {
    const { medicalHistory, certificateInfo } = data;
    console.log(medicalHistory)
    const doc = new PDFDocument({
        size: 'A4',
        margin: 50, // ขอบกระดาษ
    });

    // ตั้งค่า Font
    doc.registerFont('THSarabunNew', pdfConfig.fonts.THSarabunNew);
    doc.font('THSarabunNew');

    // ------------------ ส่วนหัวกระดาษ ------------------
    doc.image(pdfConfig.images.logo, 50, 30, { width: 70 }) // โลโก้ด้านบนซ้าย
        .fontSize(18)
        .text('ใบรับรองแพทย์', 0, 30, { align: 'center' })
        .fontSize(14)
        .text('ตรวจสุขภาพคนต่างด้าว/แรงงานต่างด้าว', { align: 'center' })
        .moveDown()
        .fontSize(12)
        .text(`วันที่: ........เดือน........พ.ศ...............`, { align: 'right' });

    // ------------------ 1. ข้อมูลส่วนตัว ------------------
    doc.moveDown(1)
    doc.fontSize(12)
        .text(`1) ชื่อ-สกุล: ${medicalHistory.ForeignWorkers.alprefix_th || '-'}${medicalHistory.ForeignWorkers.alname_th || '-'} ${medicalHistory.ForeignWorkers.alsname_th || '-'} (ภาษาอังกฤษ: ${medicalHistory.ForeignWorkers.alprefixen || '-'}${medicalHistory.ForeignWorkers.alname_en || '-'} ${medicalHistory.ForeignWorkers.alsname_en || '-'})`)
        .text(`   เลข Passport: ${medicalHistory.ForeignWorkers.alcode || '-'} | HN: ${medicalHistory.ForeignWorkers.hn || '-'}`)
        .text(`   วันเดือนปีเกิด: ${new Date(medicalHistory.ForeignWorkers.albdate).toLocaleDateString('th-TH') || '-'} | สัญชาติ: ${medicalHistory.ForeignWorkers.alnation || '-'}`)
        .text(`   เลือดกรุ๊ป: ${medicalHistory.ForeignWorkers.blood_group.trim() || '-'}`)
        .text(`2) ที่อยู่ปัจจุบัน: ${medicalHistory.ForeignWorkers.address || '-'} ตำบล: ${medicalHistory.ForeignWorkers.subdistrict || '-'} อำเภอ: ${medicalHistory.ForeignWorkers.district || '-'} จังหวัด: ${medicalHistory.ForeignWorkers.province || '-'} รหัสไปรษณีย์: ${medicalHistory.ForeignWorkers.postal_code || '-'}`)
        .text(`   โทร: ${medicalHistory.ForeignWorkers.phone_number || '-'} | อีเมล: ${medicalHistory.ForeignWorkers.email || '-'}`)
        .moveDown();
    // ------------------ 2. ข้อมูลนายจ้าง/สถานประกอบการ ------------------
    doc.fontSize(14)
        .text('2. ข้อมูลนายจ้าง/สถานประกอบการ', { underline: true })
        .fontSize(12)
        .text(`ชื่อ-สกุล (นายจ้าง): ______________________  สถานประกอบการ: ______________________`)
        .text(`ที่อยู่: _________________________________________  อำเภอ/เขต: ______________________  จังหวัด: ______________________`)
        .moveDown(1);

    // ------------------ 3. ข้อมูลแพทย์ผู้ตรวจ ------------------
    doc.fontSize(14)
        .text('3. ข้อมูลแพทย์ผู้ตรวจ', { underline: true })
        .fontSize(12)
        .text(`ชื่อแพทย์/ใบประกอบโรคศิลป์: ______________________  เลขที่ใบประกอบโรคศิลป์: ______________________`)
        .text(`สถานพยาบาลที่ออกใบรับรอง: ______________________  ที่อยู่: ______________________`)
        .moveDown(1);

    // ------------------ ผลการตรวจสุขภาพ ------------------
    doc.fontSize(14)
        .text('ผลการตรวจสุขภาพ', { underline: true })
        .fontSize(12)
        .text(`ส่วนสูง: ........... ซม.  น้ำหนัก: ........... กก.  สีผิว: ...........  ความดันโลหิต: ...........  ชีพจร: ........... ครั้ง/นาที`)
        .text(`สภาพร่างกายโดยทั่วไป: ...................................................................................................................`)
        .text(`ผลการตรวจวัณโรค: □ ปกติ  □ ผิดปกติ/ให้การรักษา  □ ระยะติดต่อ/อาการเป็นที่น่ารังเกียจ`)
        .text(`ผลการตรวจโรคเรื้อน: □ ปกติ  □ ผิดปกติ/ให้การรักษา  □ ระยะติดต่อ/อาการเป็นที่น่ารังเกียจ`)
        .text(`ผลการตรวจโรคเท้าช้าง: □ ปกติ  □ ผิดปกติ/ให้การรักษา  □ อาการเป็นที่น่ารังเกียจ`)
        .text(`ผลการตรวจโรคซิฟิลิส: □ ปกติ  □ ผิดปกติ/ให้การรักษา  □ พบสารเสพติด`)
        .text(`ผลการตรวจโรคพิษสุราเรื้อรัง: □ ปกติ  □ เกิดอาการ`)
        .moveDown(1);

    // ------------------ สรุปผลการตรวจ ------------------
    doc.fontSize(14)
        .text('สรุปผลการตรวจ', { underline: true })
        .fontSize(12)
        .text(`1) สุขภาพสมบูรณ์ดี`)
        .text(`2) ผ่านการตรวจสุขภาพ แต่ต้องให้การรักษา ความดูแล ติดตามอย่างต่อเนื่อง`)
        .text(`3) ไม่ผ่านการตรวจสุขภาพ เนื่องจาก: ..........................................................`)
        .moveDown(1);

    // ------------------ หมายเหตุ ------------------
    doc.fontSize(10)
        .text('(หมายเหตุ: ใบรับรองแพทย์นี้มีอายุ 60 วัน)', 50, doc.y, { align: 'left' })
        .moveDown(2);

    // ------------------ ลายเซ็นแพทย์ ------------------
    doc.text('ลงชื่อ ..............................................', 350, doc.y)
        .text('(_________________________)', 350, doc.y + 15)
        .text(`เลขที่ใบอนุญาต: ${certificateInfo.doctorLicense}`, 350, doc.y + 30);

    return doc;
};
