
import { readFileSync } from 'fs';

const appPackage = JSON.parse(readFileSync('package.json', 'utf-8'));

export class Parameters {
  static get environment() {
    if (!process.env.ENVIRONMENT) {
      throw new Error('Missing environment variable');
    }
    return process.env.ENVIRONMENT;
  }

  static get defaultAuroraConfig() {
    return {
      migrationsTableName: 'projectMigrations',
      migrations: [
        'src/migrations/*.js',
        'dist/migrations/*.js', // defined for container builder
      ],
      migrationsRun: true,
      logging: process.env.DB_LOGGING === 'true',
      poolSize: parseInt(process.env.POOL_SIZE || '10'),
    };
  }

  static get localAuroraConfig() {
    if (
      !process.env.DB_HOST ||
      !process.env.DB_PORT ||
      !process.env.DB_NAME ||
      !process.env.DB_USER ||
      !process.env.DB_PASS
    ) {
      throw new Error('Missing local Aurora Config variables');
    }
    return {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
    };
  }

  static get port() {
    return parseInt(process.env.PORT || '3000');
  }

  static get urlServerSwagger() {
    return this.environment !== 'local'
      ? `/undefined/botbinancecore`
      : '';
  }

  static get package() {
    return appPackage;
  }
}
