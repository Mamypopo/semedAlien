import { getAlienByAlCode, getAlienCodeList, getAlienList, saveAlienDetail, syncData } from "./alien.service.js"

/**
 * 
 * @param { import('express').Request } req 
 * @param { import('express').Response } res 
 * @param { import('express').NextFunction } next
 */
export const getAlienListHandler = async (req, res, next) => {
  try {
    const list = await getAlienList();
    res.status(200).send({
      list,
    })
  } catch (error) {
    console.error('Get alien list error: ', error);
    res.status(500).send();
  }
}

/**
 * 
 * @param { import('express').Request } req 
 * @param { import('express').Response } res 
 * @param { import('express').NextFunction } next
 */
export const getAlienByCodeHandler = async (req, res, next) => {
  try {
    const alien = await getAlienByAlCode(req.body.alcode);

    res.status(200).send({
      alien,
    });
  } catch (error) {
    console.error('Get alient list error: ', error);
    res.status(500).send()
  }
}

/**
 * 
 * @param { import('express').Request } req 
 * @param { import('express').Response } res 
 * @param { import('express').NextFunction } next
 */
export const getAlienCodeListHandler = async (req, res, next) => {
  try {
    const list = await getAlienCodeList();

    res.status(200).send({
      list,
    });
  } catch (error) {
    console.error('Get alien code list error: ', error);
    res.status(500).send()
  }
}

/**
 * 
 * @param { import('express').Request } req 
 * @param { import('express').Response } res 
 * @param { import('express').NextFunction } next
 */
export const syncDataHandler = async (req, res, next) => {
  try {
    await syncData();
    res.status(200).send();
  } catch (error) {
    console.error('Sync data error: ', error);
    res.status(500).send()
  }
}

/**
 * 
 * @param { import('express').Request } req 
 * @param { import('express').Response } res 
 * @param { import('express').NextFunction } next
 */
export const saveAlienDetailHandler = async (req, res, next) => {
  try {
    const result = await saveAlienDetail(req.body);
    res.status(200).send({
      result,
    })
  } catch (error) {
    console.error('Save alien detail error: ', error);
    res.status(500).send()
  }
}

