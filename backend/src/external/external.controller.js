import appConfig from "../app.config.js";
import { getDailyHealthCheck } from "./external.service.js"

function isValidDateDDMMYYYY(dateString) {
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  if (!regex.test(dateString)) {
    return false;
  }

  const [day, month, year] = dateString.split('-').map(Number);

  if (year < 1000 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  const date = new Date(`${year}-${month}-${day}`);
  return date.getDate() === day && date.getMonth() + 1 === month && date.getFullYear() === year;
}

/**
 * 
 * @param { import('express').Request } req 
 * @param { import('express').Response } res 
 * @param { import('express').NextFunction } next
 */
export const getDailyHealthCheckHandler = async (req, res, next) => {
  try {
    if (!req.query.token || req.query.token !== appConfig.apiToken) {
      res.status(200).send({
        statuscode: 400,
        statusdesc: 'invalid token.'
      });
      return;
    }

    if (!req.query.searchdate || !isValidDateDDMMYYYY(req.query.searchdate)) {
      res.status(200).send({
        statuscode: 400,
        statusdesc: 'invalid searchdate param.'
      });
      return;
    }

    if (!req.query.datapage || isNaN(Number(req.query.datapage)) || Number(req.query.datapage) <= 0) {
      res.status(200).send({
        statuscode: 400,
        statusdesc: 'invalid datapage param.',
      });
      return;
    }

    const result = await getDailyHealthCheck(req.query.searchdate, req.query.datapage);

    res.status(200).send({
      statuscode: 200,
      statusdesc: '',
      ...result,
    });
  } catch (error) {
    console.error('Get daily health check: ', error);

    res.status(200).send({
      statuscode: 500,
      statusdesc: '',
      datapage: req.query.datapage,
      totalpage: '0',
      totalrecord: '0',
      resultlist: [],
    })
  }
}