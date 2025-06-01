import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  OPENAI_API_KEY: string;
  MONGO_INITDB_ROOT_USERNAME: string;
  MONGO_INITDB_ROOT_PASSWORD: string;
  MONGO_INITDB_DATABASE: string;
  MONGO_URI: string;
}

const envVarsSchema = joi
  .object({
    OPENAI_API_KEY: joi.string().required(),
    MONGO_INITDB_ROOT_USERNAME: joi.string().required(),
    MONGO_INITDB_ROOT_PASSWORD: joi.string().required(),
    MONGO_INITDB_DATABASE: joi.string().required(),
    MONGO_URI: joi.string().required(),
  })
  .unknown(true);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars = value as EnvVars;

export const envConfigVars = {
  openAIApiKey: envVars.OPENAI_API_KEY,
  mongoUri: envVars.MONGO_URI,
  mongoInitdbRootUsername: envVars.MONGO_INITDB_ROOT_USERNAME,
  mongoInitdbRootPassword: envVars.MONGO_INITDB_ROOT_PASSWORD,
  mongoInitdbDatabase: envVars.MONGO_INITDB_DATABASE,
};
