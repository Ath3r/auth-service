import Joi from 'joi';
import * as dotenv from 'dotenv';

dotenv.config();

if (!dotenv.config().parsed) {
  throw new Error(`Couldn't find.env file `);
}

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().default('development'),
    PORT: Joi.number().default(3000),
    MONGO_URI: Joi.string().required().description('Mongo DB host url'),
    LOG_LEVEL: Joi.string().default('silly'),
    API_PREFIX: Joi.string().default('/api/v1'),
    JWT_SECRET: Joi.string().required().description('JWT Secret'),
    JWT_EXPIRES_IN: Joi.string().default('1d'),
  })
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default envVars;
