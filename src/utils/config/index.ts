import envVars from './config';
export const config = {
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URI,
  logs: {
    level: envVars.LOG_LEVEL,
  },
  api: {
    prefix: envVars.API_PREFIX,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
  },
};
