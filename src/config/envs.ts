import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  OPENAI_API_KEY: string;
}

const envVarsSchema = joi
  .object({
    OPENAI_API_KEY: joi.string().required(),
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
};
