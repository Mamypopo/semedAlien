import { createAlien, getAlienByCode, getAllAliens } from '../model/alienModel.js';

export const createAlienHandler = async (req, res) => {
    try {
        console.log('Request body:', req.body);

        const {
            reqcode,
            alcode,
            altype,
            alprefix,
            alprefixen,
            alnameen,
            alsnameen,
            alnameth,
            alsnameth,
            nickname,
            email,
            bloodtype,
            religion,
            phone1,
            phone2,
            address,
            district,
            subdistrict,
            province,
            postalcode,
            note,
            albdate,
            algender,
            alnation,
            alposid,
            empname,
            wkaddress,
            btname,
        } = req.body;

        const formattedDate = albdate ? new Date(albdate.split('-').reverse().join('-')) : null;

        const alien = await createAlien({
            reqcode,
            alcode,
            altype,
            alprefix,
            alprefixen,
            alnameen,
            alsnameen,
            alnameth,
            alsnameth,
            nickname,
            email,
            bloodtype,
            religion,
            phone1,
            phone2,
            address,
            district,
            subdistrict,
            province,
            postalcode,
            note,
            albdate: formattedDate,
            algender,
            alnation,
            alposid,
            empname,
            wkaddress,
            btname,
        });

        res.status(201).json({
            statuscode: '1',
            statusdesc: 'บันทึกข้อมูลสำเร็จ',
            data: alien,
        });
    } catch (error) {
        console.error('Error in createAlienHandler:', error);

        res.status(500).json({
            statuscode: '0',
            statusdesc: error.message,
        });
    }
};




export const getAlienHandler = async (req, res) => {
    try {
        const { alcode } = req.params;
        const alien = await getAlienByCode(alcode);

        if (!alien) {
            return res.status(404).json({
                statuscode: "0",
                statusdesc: "ไม่พบข้อมูลคนต่างด้าว"
            });
        }

        res.json({
            statuscode: "1",
            statusdesc: "",
            alienlist: [alien]
        });
    } catch (error) {
        res.status(500).json({
            statuscode: "0",
            statusdesc: error.message
        });
    }
};

export const getAllAliensHandler = async (_req, res) => {
    try {
        const aliens = await getAllAliens();
        res.json({
            statuscode: "1",
            statusdesc: "",
            alienlist: aliens
        });
    } catch (error) {
        res.status(500).json({
            statuscode: "0",
            statusdesc: error.message
        });
    }
};