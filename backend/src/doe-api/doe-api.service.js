import axios from "axios";
import appConfig from "../app.config.js";

const instance = axios.create({
  baseURL: 'https://test-workpermit2024.doe.go.th/dataapi' // set url ที่จะใช้เป็น base
});

export const getAlienListFromService = async ({
  alcode = "",
  reqcode = "",
}) => {
  try {

    const params = {
      token: appConfig.apiToken,
    };

    if (alcode) {
      params.alcode = alcode;
    }

    if (reqcode) {
      params.reqcode = reqcode;
    }

    const { data } = await instance.get('/alien', { // ใช้แค่ url ต่อจาก /dataapi
      params,
    });

    if (!data || !data.success) {
      throw new Error(data.message || "Unexpected error occurred while fetching data.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching alien list:", error);
    throw error;
  }
};

export const updateHealthCheckResult = async (data) => {
  try {
    await instance.post("/alienhealth/update", {
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
    if (!response.data || !response.data.success) {
      throw new Error(response.data.message || "Failed to update health check result.");
    }
    return response.data;
  } catch (error) {
    console.error("update healthcheck error: ", error);
    throw error;
  }
};