import axios from "axios";
import appConfig from "../app.config.js";

const instance = axios.create();
//ใช้แบบ  instance axios และไปใช้ในpath
// const instance = axios.create({
//   baseURL : 'https;//......./'
// });

export const getAlienListFromService = async ({
  alcode = "",
  reqcode = "",
}) => {
  try {
    const url = "your_url_here"; // Replace with the actual URL endpoint 
    const params = {
      token: appConfig.apiToken,
    };

    if (alcode) {
      params.alcode = alcode;
    }
    if (reqcode) {
      params.reqcode = reqcode;
    }

    const { data } = await instance.get(url, {
      params,
    });

    // const { data } = await instance.get('/alien', {
    //   params,
    // });

    return data;
  } catch (error) {
    console.error("Error fetching alien list:", error);
    throw error;
  }
};

export const updateHealthCheckResult = async (data) => {
  try {
    await instance.post("url", {
      token: appConfig.apiToken,
      alcode: data.alcode,
      alchkhos: data.alchkhos,
      alchkstatus: data.alchkstatus,
      alchkdate: data.alchkdate,
      alchkprovid: data.alchkprovid,
      licenseno: data.licenseno,
      chkname: data.chkname,
      chkposition: data.chkposition,
      alchkdesc: data.alchkdesc,
      alchkdoc: data.alchkdoc,
    });
  } catch (error) {
    console.error("update healthcheck error: ", error);
    throw error;
  }
};
