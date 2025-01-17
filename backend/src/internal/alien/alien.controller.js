import { getAlienByAlCode, getAlienCodeList, getAlienList, saveAlienDetail, syncData, searchAliens } from "./alien.service.js"

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
    console.log('Starting sync data...');
    await syncData();
    console.log('Sync completed successfully');
    res.status(200).json({ message: 'Sync completed' });
  } catch (error) {
    console.error('Sync data error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    res.status(500).json({
      error: 'Sync failed',
      details: error.message
    });
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
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized - User not found' })
    }
    const userId = req.user.id;
    const result = await saveAlienDetail(req.body, userId);
    res.status(200).send({
      result,
    })
  } catch (error) {
    console.error('Save alien detail error: ', error);
    res.status(500).send()
  }
}


export const searchAliensHandler = async (req, res) => {
  try {
    const { hn, alcode, name } = req.body;
    const aliens = await searchAliens({ hn, alcode, name });
    res.status(200).json(aliens);
  } catch (error) {
    console.error('Search aliens error:', error);
    res.status(500).send();
  }
};