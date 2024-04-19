const { getNames } = require("../helpers");

const appModuleGenerator = (entities) => {
  let importsEntities = '';
  let importsEntitiesModule = '';
  entities.map((entity) => {
    const names = getNames(entity);
    importsEntities += `import { ${names.uperFL}Module } from '@modules/${names.name}/infrastructure/nestjs/module';\n`;
    importsEntitiesModule += `${names.uperFL}Module,\n`;
  })

  const content = `
    import { Module } from '@nestjs/common';
    import { ConfigModule } from '@nestjs/config';
    import { HttpModule } from '@nestjs/axios';
    
    import { AppService } from './app.service';
    ${importsEntities}
    
    @Module({
      imports: [
        ${importsEntitiesModule}
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
