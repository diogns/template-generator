const { getNames } = require("../helpers");

const appModuleGenerator = (entities) => {
  let importEntities = '';
  let importEntitiesModule = '';
  entities.map((entity) => {
    const names = getNames(entity);
    importEntities += `import { ${names.uperFL}Module } from '@modules/${names.fileName}/infrastructure/nestjs/module';\n`;
    importEntitiesModule += `${names.uperFL}Module,\n`;
  })

  const content = `
    import { Module } from '@nestjs/common';
    import { ConfigModule } from '@nestjs/config';
    import { HttpModule } from '@nestjs/axios';
    
    import { AppService } from './app.service';
    ${importEntities}
    
    @Module({
      imports: [
        ${importEntitiesModule}
        HttpModule,
        ConfigModule.forRoot(),
      ],
      controllers: [],
      providers: [AppService],
    })
    export class AppModule {}
    
    `;
  return content;
};

module.exports = { appModuleGenerator };
