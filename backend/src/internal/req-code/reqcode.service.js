import prisma from "../../config/database.js"

export const getReqCodeList = async () => {
  const result = await prisma.apiRequests.findMany({
    where: {
      isDelete: false,
    }
  })

  return result;
};

export const createReqCode = async (reqcode) => {
  const result = await prisma.apiRequests.create({
    data: {
      reqcode,
      createdOn: new Date(),
    }
  });

  return result;
}

export const deleteReqcode = async (id) => {
  const result = await prisma.apiRequests.update({
    data: {
      isDelete: true,
    },
    where: {
      id,
      isDelete: false,
    }
  })
}