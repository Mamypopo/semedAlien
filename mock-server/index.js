const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// ข้อมูลจำลองตามรูปแบบ API รัฐบาล
const mockGovData = {
    'NL-66-000000': {  // reqcode
        statuscode: 1,  // Number ตาม spec
        statusdesc: "ดึงข้อมูลสำเร็จ",
        empname: "บริษัท ทดสอบ จำกัด",
        wkaddress: "123/456 ซ.ทดสอบ คลองเตย กรุงเทพ 10110",
        reqcode: "NL-66-000000",
        btname: "BT04 กิจการก่อสร้าง",
        alienlist: [
            {
                alcode: "2466000000001",  // 13 หลัก ตาม spec
                altype: "1",              // 1=ขึ้นทะเบียนคนต่างด้าว, 2=ลูกจ้างต่างด้าว
                alprefix: "นาย",            // 1=นาย/MR, 2=นางสาว/MISS, 3=นาง/MRS
                alprefixen: "MR",         // Optional
                alnameen: "JOHN",         // ชื่อภาษาอังกฤษ
                alsnameen: "DOE",         // สกุลภาษาอังกฤษ (Optional)
                alstdate: "31-12-2019",   // วันที่เริ่มต้น DD-MM-YYYY
                algender: "1",            // 1=ชาย, 2=หญิง
                alnation: "LAO",
                alposid: "L3-12345"
            },
            {
                alcode: "2466000000002",  // 13 หลัก ตาม spec
                altype: "1",              // 1=ขึ้นทะเบียนคนต่างด้าว, 2=ลูกจ้างต่างด้าว
                alprefix: "นาย",            // 1=นาย/MR, 2=นางสาว/MISS, 3=นาง/MRS
                alprefixen: "MR",         // Optional
                alnameen: "XXX",         // ชื่อภาษาอังกฤษ
                alsnameen: "XXX",         // สกุลภาษาอังกฤษ (Optional)
                alstdate: "31-12-2019",   // วันที่เริ่มต้น DD-MM-YYYY
                algender: "1",            // 1=ชาย, 2=หญิง
                alnation: "LAO",
                alposid: "L3-12345"
            }
        ]
    }
}

app.get('/api/aliens', (req, res) => {
    const { reqcode, alcode, token } = req.query;  // รับพารามิเตอร์ตาม spec

    if (!reqcode || !alcode || !token) {
        return res.json({
            statuscode: 0,
            statusdesc: "กรุณาระบุพารามิเตอร์ให้ครบถ้วน"
        });
    }

    const data = mockGovData[reqcode];

    if (data && data.alienlist.some(alien => alien.alcode === alcode)) {
        return res.json(data);
    }

    return res.json({
        statuscode: 0,
        statusdesc: "ไม่พบข้อมูล"
    });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Mock server is running on http://localhost:${PORT}`);
});