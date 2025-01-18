import prisma from "../../config/database.js";

export const getMedicalHistoryByAlcode = async (alcode) => {
    return await prisma.medicalHistories.findMany({
        where: {
            alcode,

        },
        include: {
            ForeignWorkers: {
                select: {
                    hn: true,
                    alcode: true,
                    alname_en: true,
                    alname_th: true,
                    alsname_th: true,
                    alsname_en: true,
                    createdOn: true,
                }
            },
        },
        orderBy: {
            createdOn: 'desc'
        }
    });
};

export const getMedicalHistoryByHN = async (hn) => {
    return await prisma.medicalHistories.findMany({
        where: {
            ForeignWorkers: {
                hn: hn,
                isDelete: false
            },
        },
        include: {
            ForeignWorkers: {
                select: {
                    hn: true,
                    alcode: true,
                    alname_en: true,
                    alname_th: true,
                    alsname_th: true,
                    alsname_en: true,
                    createdOn: true,
                }
            },
        },
        orderBy: {
            createdOn: 'desc'
        }

    });
};

export const saveMedicalHistory = async (data) => {
    const worker = await prisma.foreignWorkers.findFirst({
        where: {
            alcode: data.alcode,
            isDelete: false
        }
    });

    if (!worker) {
        throw new Error('ไม่พบข้อมูลแรงงานต่างด้าว');
    }

    return await prisma.medicalHistories.create({
        data: {
            alcode: data.alcode,
            height: data.height,
            weight: data.weight,
            skin_color: data.skin_color,
            systolic_bp: data.systolic_bp,
            diastolic_bp: data.diastolic_bp,
            pulse_rate: data.pulse_rate,
            doctor_assessment_status: 'PENDING',
            createdOn: new Date(),
            updatedOn: new Date()
        }
    });
};


export const saveDoctorAssessment = async (id, data) => {
    return await prisma.medicalHistories.update({
        where: {
            id: id
        },
        data: {
            doctor_assessment_status: 'COMPLETED',
            doctor_health: data.health,
            doctor_diagnosis: data.diagnosis,
            doctor_mental_health: data.mental_health,
            doctor_tuberculosis: data.tuberculosis,
            doctor_leprosy: data.leprosy,
            doctor_elephantiasis: data.elephantiasis,
            doctor_syphilis: data.syphilis,
            doctor_drug_addicted: data.drug_addicted,
            doctor_alcoholism: data.alcoholism,
            doctor_pregnancy: data.pregnancy,
            doctor_other_exam: data.other_exam,
            updatedBy: data.user_id,
            updatedOn: new Date()
        },
        include: {
            ForeignWorkers: {
                select: {
                    hn: true,
                    alcode: true,
                    alname_en: true,
                    alsname_en: true,
                    alname_th: true,
                    alsname_th: true,
                }
            }
        }
    });
};

export const getMedicalHistory = async (id) => {
    return await prisma.medicalHistories.findUnique({
        where: {
            id: id
        },
        include: {
            ForeignWorkers: {
                select: {
                    hn: true,
                    alcode: true,
                    alname_en: true,
                    alsname_en: true,
                    alname_th: true,
                    alsname_th: true,
                    algender: true
                }
            }
        }
    });
};

export const getLatestMedicalHistory = async (params) => {
    const { hn, alcode } = params;

    const medicalHistory = await prisma.medicalHistories.findFirst({
        where: {
            ForeignWorkers: {
                ...(hn ? { hn } : {}),
                ...(alcode ? { alcode } : {}),
                isDelete: false
            },
            isDelete: false
        },
        include: {
            ForeignWorkers: {
                select: {
                    hn: true,
                    alcode: true,
                    alname_en: true,
                    alname_th: true,
                    alsname_th: true,
                    alsname_en: true,
                    algender: true
                }
            }
        },
        orderBy: {
            createdOn: 'desc'
        }
    });

    if (medicalHistory) {
        const healthCheck = await prisma.healthChecks.findFirst({
            where: {
                alcode: medicalHistory.alcode,
                isDelete: false
            },
            orderBy: {
                createdOn: 'desc'
            }
        });

        return {
            medicalHistory,
            healthCheck
        };
    }

    return null;
};