const { getNames } = require('../helpers');

const appServiceGenerator = (entities) => {
  let importEntities = '';
  let importEntitiesClass = '';
  entities.map((entity) => {
    const names = getNames(entity);
    importEntities += `import { ${names.uperFL}Entity } from '@modules/${names.fileName}/infrastructure/entities/${names.fileName}.entity';
    `;
    importEntitiesClass += `${names.uperFL}Entity,\n`;
  })


  const content = `
  import { Injectable } from '@nestjs/common';
  import { DbManager } from '@helpers/DbManager';
  
  ${importEntities}
  
  type DBType = 'mysql' | 'oracle' | 'postgres';
  type ManagerDatasource = 'manager' | 'dataSource';
  
  export const entities = [
    ${importEntitiesClass}
  ];
  
  @Injectable()
  export class AppService {
    static instanceDB: Record<DBType, Record<ManagerDatasource, any>> = {
      postgres: { manager: null, dataSource: null },
      mysql: { manager: null, dataSource: null },
      oracle: { manager: null, dataSource: null },
    };
  
    async onModuleInit() {
      AppService.instanceDB.mysql = await DbManager.instance(entities);
    }
  
    async onModuleDestroy() {
      if (AppService.instanceDB.mysql)
        await AppService.instanceDB.mysql.dataSource.destroy();
      if (AppService.instanceDB.oracle)
        await AppService.instanceDB.oracle.dataSource.destroy();
      if (AppService.instanceDB.postgres)
        await AppService.instanceDB.postgres.dataSource.destroy();
    }
  }
    `;
  return content;
};

module.exports = { appServiceGenerator };
