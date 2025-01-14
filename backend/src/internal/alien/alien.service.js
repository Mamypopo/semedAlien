import prisma from "../../config/database.js";
import { getAlienListFromService, updateHealthCheckResult } from "../../doe-api/doe-api.service.js";

export const getAlienList = async () => {
  const list = await prisma.foreignWorkers.findMany({
    include: {
      Employers: true,
    },
    where: {
      isDelete: false,
    }
  });

  return list.map((item) => {
    const employer = {
      ...item.Employers,
    };
    delete item.Employers;

    return {
      ...item,
      employer,
    }
  });
}

export const getAlienCodeList = async () => {
  const codes = await prisma.foreignWorkers.findMany({
    select: {
      alcode: true,
    },
    where: {
      isDelete: false
    }
  })

  return codes;
}

export const getAlienByAlCode = async (alcode) => {
  const alien = await prisma.foreignWorkers.findFirst({
    include: {
      Employers: true,
      HealthChecks: true,
    },
    where: {
      alcode,
      isDelete: false,
    }
  });

  if (alien) {
    return {
      ...alien,
      healthCheck: {
        ...alien.HealthChecks,
      },
      employer: {
        ...alien.Employers,
      }
    };
  }

  // get data from external api;
  // const apiResponse = await getAlienListFromService({
  //   reqcode,
  // });

  // let employer = await prisma.employers.findFirst({
  //   select: {
  //     id: true,
  //     empname: true,
  //     btname: true,
  //     wkaddress: true,
  //   },
  //   where: {
  //     empname: apiResponse.empname,
  //   }
  // });

  // if (!employer) {
  //   employer = await prisma.employers.create({
  //     data: {
  //       empname: apiResponse.empname,
  //       btname: apiResponse.btname,
  //       wkaddress: apiResponse.btname,
  //     }
  //   })
  // }


  // const createResult = await prisma.foreignWorkers.create({
  //   data: {
  //     employer_id: employer.id,
  //     alcode: apiResponse.alientlist[0].alcode,
  //     altype: apiResponse.alientlist[0].altype,
  //     alprefix: apiResponse.alientlist[0].alprefix,
  //     alprefixen: apiResponse.alientlist[0].alprefixen,
  //     alname_en: apiResponse.alientlist[0].alnameen,
  //     alsname_en: apiResponse.alientlist[0].alsnameen,
  //     algender: apiResponse.alientlist[0].algender,
  //     alnation: apiResponse.alientlist[0].alnation,
  //     alposid: apiResponse.alientlist[0].alposid,
  //     createdOn: new Date(),
  //   }
  // });

  // return {
  //   ...createResult,
  //   employer: {
  //     ...employer,
  //   }
  // };
}

export const saveAlienDetail = async (data) => {
  const result = await prisma.foreignWorkers.update({
    data: {
      altype: data.altype,
      alprefix: data.alprefix,
      alprefixen: data.alprefixen,
      alname_en: data.alname_en,
      alsname_en: data.alsname_en,
      alprefix_th: data.alprefix_th,
      alname_th: data.alname_th,
      alsname_th: data.alsname_th,
      albdate: data.albdate,
      algender: data.algender,
      alnation: data.alnation,
      alposid: data.alposid,
      blood_group: data.blood_group,
      nickname: data.nickname,
      religion: data.religion,
      phone_number: data.phone_number,
      email: data.email,
      address: data.address,
      subdistrict: data.subdistrict,
      district: data.district,
      province: data.province,
      postal_code: data.postal_code,
      remark: data.remark,
    },
    where: {
      alcode: data.alcode,
      isDelete: false,
    }
  });

  if (data.healthCheck.id) {
    await prisma.healthChecks.update({
      data: {
        alchkhos: data.healthCheck.alchkhos,
        alchkstatus: data.healthCheck.alchkstatus,
        alchkdate: new Date(data.healthCheck.alchkdate),
        alchkprovid: data.healthCheck.alchkprovid,
        licenseno: data.healthCheck.licenseno,
        chkname: data.healthCheck.chkname,
        chkposition: data.healthCheck.chkposition,
        alchkdesc: data.healthCheck.alchkdesc,
        alchkdoc: data.healthCheck.alchkdoc,
        updatedOn: new Date(),
      },
      where: {
        alcode: data.alcode,
      }
    })
  } else {
    await prisma.healthChecks.create({
      data: {
        alcode: data.alcode,
        alchkhos: data.healthCheck.alchkhos,
        alchkstatus: data.healthCheck.alchkstatus,
        alchkdate: new Date(data.healthCheck.alchkdate),
        alchkprovid: data.healthCheck.alchkprovid,
        licenseno: data.healthCheck.licenseno,
        chkname: data.healthCheck.chkname,
        chkposition: data.healthCheck.chkposition,
        alchkdesc: data.healthCheck.alchkdesc,
        alchkdoc: data.healthCheck.alchkdoc,
        createdOn: new Date(),
      }
    })
  }

  // comment ไว้สำหรับรอ api ของจริง
  // await updateHealthCheckResult({
  //   alcode: data.alcode,
  //   alchkhos: data.healthCheck.alchkhos,
  //   alchkstatus: data.healthCheck.alchkstatus,
  //   alchkdate: data.healthCheck.alchkdate,
  //   alchkprovid: data.healthCheck.alchkprovid,
  //   licenseno: data.healthCheck.licenseno,
  //   chkname: data.healthCheck.chkname,
  //   chkposition: data.healthCheck.chkposition,
  //   alchkdesc: data.healthCheck.alchkdesc,
  //   alchkdoc: data.healthCheck.alchkdoc,
  // })

  return result;
}

export const syncData = async (reqcode) => {
  const apiResponse = await getAlienListFromService({
    reqcode,
  });

  const existsAliens = await prisma.foreignWorkers.findMany({
    select: {
      alcode: true,
    },
    where: {
      isDelete: false
    }
  });

  const existingAlcodes = new Set(existsAliens.map((item) => item.alcode));

  const alienlist = apiResponse?.alienlist || [];
  const newAliens = alienlist.filter((alien) => !existingAlcodes.has(alien.alcode));

  const alienToDelete = existsAliens.filter((item) =>
    alienlist.some((alien) => alien.alcode === item.alcode)
  );

  let employer = await prisma.employers.findFirst({
    select: { id: true },
    where: {
      empname: apiResponse.empname,
    }
  });

  if (!employer) {
    employer = await prisma.employers.create({
      data: {
        empname: apiResponse.empname,
        btname: apiResponse.btname,
        wkaddress: apiResponse.wkaddress,
      }
    })
  }

  if (newAliens.length > 0) {
    await prisma.foreignWorkers.createMany({
      data: newAliens.map((item) => (
        {
          employer_id: employer.id,
          alcode: item.alcode,
          altype: item.altype,
          alprefix: item.alprefix,
          alprefixen: item.alprefixen,
          alname_en: item.alnameen,
          alsname_en: item.alsnameen,
          algender: item.algender,
          alnation: item.alnation,
          alposid: item.alposid,
          createdOn: new Date(),
        }))
    })
  }


  if (alienToDelete.length > 0) {
    await prisma.foreignWorkers.update({
      data: {
        isDelete: true,
        updatedOn: new Date(),
      },
      where: {
        alcode: {
          in: alienToDelete.map((item) => item.alcode)
        }
      }
    })
  }


}
