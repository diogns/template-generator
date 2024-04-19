const appServiceGenerator = () => {
  const content = `
  import { Injectable } from '@nestjs/common';
  import { DbManager } from '@helpers/DbManager';
  
  import { UserEntity } from '@modules/user/infrastructure/entities/user.entity';
  import { PositionEntity } from '@modules/position/infrastructure/entities/position.entity';
  
  type DBType = 'mysql' | 'oracle' | 'postgres';
  type ManagerDatasource = 'manager' | 'dataSource';
  
  export const entities = [UserEntity, PositionEntity];
  
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
