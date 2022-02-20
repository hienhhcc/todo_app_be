import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: Joi.number().default(8000),
    MONGO_USER: Joi.string().required().description('Mongodb user'),
    MONGO_PASSWORD: Joi.string().required().description('Mongodb password'),
    MONGO_DEFAULT_DATABASE: Joi.string()
      .required()
      .description('Mongodb default database'),
    JWT_SECRET: Joi.string().required().description('Jwt secret'),
    JWT_EXPIRATION_MINUTES: Joi.string()
      .required()
      .description('Jwt expiration minutes'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const {
  NODE_ENV: env,
  PORT: port,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DEFAULT_DATABASE,
  JWT_SECRET,
  JWT_EXPIRATION_MINUTES,
} = envVars;
