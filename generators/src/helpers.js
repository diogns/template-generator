const { fileAndFolderObject, getNames } = require('../helpers');

const dbManagerContent = `import { DataSource } from 'typeorm';
import type { EntityManager } from 'typeorm';

import { AppService } from 'src/app.service';
import { Parameters } from './Parameters';
import type { Instance } from './Types';

type IDBConfig = {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  logging: boolean;
  poolSize: number;
  migrationsTableName?: string;
  migrations?: string[];
  migrationsRun?: boolean;
};

export class DbManager {
  static async instance(entities: any[]): Promise<Instance> {
    const config = await this.getDbConfig();
    const dataSource = await this.getDataSource(config, entities)
      .initialize()
      .catch(DbManager.failToConnectToDatabase);

    return {
      manager: (dataSource as DataSource).manager,
      dataSource: dataSource,
    };
  }

  static getDataSource(config: IDBConfig, entities: any[]) {
    return new DataSource({
      type: 'mysql',
      ...config,
      entities,
    });
  }

  static async getDbConfig(): Promise<IDBConfig> {
    return {
      ...Parameters.localAuroraConfig,
      ...Parameters.defaultAuroraConfig,
    };
  }

  private static failToConnectToDatabase(error: Error) {
    console.error('Fail to connect to database', error);
    process.exit(1);
  }
}

export abstract class DbEntityManager {
  get mysqlManager(): EntityManager {
    return AppService.instanceDB.mysql.manager;
  }

  get oracleManager(): EntityManager {
    return AppService.instanceDB.oracle.manager;
  }
}
`;

const parametersContent = `
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
      ? \`/\${this.environment}/botbinancecore\`
      : '';
  }

  static get package() {
    return appPackage;
  }
}
`;

const typesContent = `import type { DataSource, EntityManager } from 'typeorm';

export type Instance = {
  manager: EntityManager;
  dataSource: DataSource | void;
};
`;

const helpersGenerator = (ffobject) => {

  const newFfobjectDbManager= JSON.parse(JSON.stringify(fileAndFolderObject));
  newFfobjectDbManager.type = 'file';
  newFfobjectDbManager.name = 'DbManager.ts';
  newFfobjectDbManager.content = dbManagerContent;

  const newFfobjectParameters= JSON.parse(JSON.stringify(fileAndFolderObject));
  newFfobjectParameters.type = 'file';
  newFfobjectParameters.name = 'Parameters.ts';
  newFfobjectParameters.content = parametersContent;

  const newFfobjectTypes= JSON.parse(JSON.stringify(fileAndFolderObject));
  newFfobjectTypes.type = 'file';
  newFfobjectTypes.name = 'Types.ts';
  newFfobjectTypes.content = typesContent;
  
  ffobject.seeds.push(...[newFfobjectDbManager, newFfobjectParameters, newFfobjectTypes]);

};

module.exports = { helpersGenerator };
