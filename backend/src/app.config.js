const checkEnvVariable = (key) => {
  if (process.env[key]) {
    return process.env[key];
  }

  throw new Error(`Environment variable ${key} not found`);
}

const appConfig = {
  appPort: checkEnvVariable('APP_PORT'),
  apiToken: checkEnvVariable('API_TOKEN')
};

export default appConfig;