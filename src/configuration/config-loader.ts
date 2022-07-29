import { GlobalConfig } from './contracts/global.config';
import { Environment } from './contracts/env.config';
import { plainToInstance } from 'class-transformer';

/**
 * Loads the configuration from the environment variables
 * @returns GlobalConfig
 */
export const configLoader = (
  externalConfig?: Record<string, any>,
): GlobalConfig => {
  let env = externalConfig;

  if (!externalConfig) {
    env = process.env;
  }

  const configurations: GlobalConfig = {
    application: {
      environment: env.NODE_ENV as Environment,
      version: env.APP_VERSION,
      name: env.APP_NAME,
      listenPort: parseInt(env.APP_PORT, 10) || 22200,
    },
    database: {
      host: env.DB_HOST,
      port: 3306,
      name: env.APP_NAME,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
    },
  };

  return plainToInstance(GlobalConfig, configurations);
};
