import { createReqCode, deleteReqcode, getReqCodeList } from "./reqcode.service.js";

/**
 * 
 * @param { import('express').Request } req 
 * @param { import('express').Response } res 
 * @param { import('express').NextFunction } next
 */
export const getReqCodeListHandler = async (req, res, next) => {
  try {
    const list = await getReqCodeList();

    res.status(200).send({
      list,
    });
  } catch (error) {
    console.error('Get reqcode list error: ', error);
    res.status(500).send();
  }
}

/**
 * 
 * @param { import('express').Request } req 
 * @param { import('express').Response } res 
 * @param { import('express').NextFunction } next
 */
export const createReqCodeHandler = async (req, res, next) => {
  try {
    const result = await createReqCode(req.body.reqcode);
    res.status(200).send({
      result,
    })
  } catch (error) {
    console.error('Create reqcode error: ', error);
    res.status(500).send();
  }
}

/**
 * 
 * @param { import('express').Request } req 
 * @param { import('express').Response } res 
 * @param { import('express').NextFunction } next
 */
export const deleteReqCodeHandler = async (req, res, next) => {
  try {
    await deleteReqcode(req.body.id);
    res.status(200).send()
  } catch (error) {
    if (error?.code === 'P2025') {
      res.status(400).send({
        message: 'req code id not found in database.',
      });
      return;
    }
    res.status(500).send();
  }
}