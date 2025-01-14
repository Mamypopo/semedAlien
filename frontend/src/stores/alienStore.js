import { defineStore } from 'pinia'
import axios from 'axios'

const MOCK_URL = 'http://localhost:8000/api'  // สำหรับ mock server (API รัฐบาล)
const API_URL = 'http://localhost:3000/api'   // สำหรับ backend server ของเรา

export const useAlienStore = defineStore('alien', {
    state: () => ({
        aliens: [],
        currentAlien: null,
        companyInfo: null,
        loading: false,
        error: null
    }),

    actions: {
        async searchByAlcode({ reqcode, alcode, token }) {
            try {
                const response = await axios.get(`${MOCK_URL}/aliens`, {
                    params: {
                        reqcode,
                        alcode,
                        token
                    }
                });

                if (response.data.statuscode === 1) {
                    const { empname, wkaddress, reqcode: resReqcode, btname, alienlist } = response.data;


                    const foundAlien = alienlist.find(a => a.alcode === alcode);
                    if (!foundAlien) {
                        throw new Error('ไม่พบข้อมูลคนต่างด้าว');
                    }

                    this.companyInfo = {
                        empname,
                        wkaddress,
                        reqcode: resReqcode,
                        btname
                    };


                    return {
                        alien: foundAlien,
                        company: this.companyInfo
                    };
                }
                throw new Error(response.data.statusdesc || 'ไม่พบข้อมูล');
            } catch (error) {
                if (error.response) {

                    throw new Error(error.response.data.statusdesc || 'เกิดข้อผิดพลาดในการค้นหา');
                }

                throw new Error(error.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
            }
        },

        async fetchAliens() {
            try {
                this.loading = true
                const response = await axios.get(`${API_URL}/aliens/aliens`)
                if (response.data.statuscode === '1') {
                    this.aliens = response.data.alienlist || []
                }
            } catch (error) {
                console.error('Error fetching aliens:', error)
                this.error = error.message
            } finally {
                this.loading = false
            }
        },


        async createAlien(alienData) {
            try {
                console.log('Creating alien with data:', alienData);

                const requestData = {
                    ...alienData,  // เก็บข้อมูลทั้งหมดไว้
                    albdate: alienData.alstdate,  // แปลง alstdate เป็น albdate
                    // ต้องแน่ใจว่ามีข้อมูลเหล่านี้
                    alnameth: alienData.alnameth,
                    alsnameth: alienData.alsnameth,
                    // แปลงค่า null/empty string
                    phone2: alienData.phone2 || null,
                    email: alienData.email || null,
                    note: alienData.note || null
                };

                const response = await axios.post(`${API_URL}/aliens/create-aliens`, requestData);

                if (response.data && response.data.success) {
                    return response.data;
                } else if (response.data && response.data.message) {
                    throw new Error(response.data.message);
                } else if (response.data && response.data.error) {
                    throw new Error(response.data.error);
                }


                throw new Error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
            } catch (error) {
                console.error('Create alien error:', error);

                if (error.response) {
                    const errorMessage =
                        error.response.data?.message ||
                        error.response.data?.error ||
                        error.response.data?.statusdesc ||
                        'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์';
                    throw new Error(errorMessage);
                }

                throw new Error(error.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
            }
        }
    }
})