import prisma from "../config/database.js";

export const getDailyHealthCheck = async (searchdate, datapage) => {
  const resultlist = await prisma.healthChecks.findMany({
    skip: (Number(datapage) - 1) * 100,
    take: 100,
    select: {
      alcode: true,
      alchkhos: true,
      alchkstatus: true,
      alchkprovid: true,
      alchkprovid: true,
      licenseno: true,
      chkname: true,
      chkposition: true,
      alchkdesc: true,
      alchkdoc: true,
    },
    where: {
      alchkdate: new Date(searchdate.split('-').reverse().join('-')),
      isDelete: false,
    }
  });

  const count = await prisma.healthChecks.count({
    where: {
      isDelete: false,
    }
  });

  const totalpage = Math.ceil(count / 100);

  return {
    datapage,
    totalpage: totalpage.toString(),
    totalrecord: count.toString(),
    resultlist,
    
  }
}