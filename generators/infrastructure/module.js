const { getNames } = require('../helpers');

const moduleGenerator = (entities) => {  
  let content = '';

  // headers
  let imports = `
  import { Logger, Module } from '@nestjs/common';
  import { CqrsModule } from '@nestjs/cqrs';

  `;
  content = content.concat(imports);

  entities.map((entity) => {
    const names = getNames(entity)
    const importForEntity = `
    import { ${names.uperFL}CommandsImplement, ${names.uperFL}QueriesImplement } from '../repositories/${names.fileName}.repository';
    import { Get${names.uperFL}ByIdHandler } from '../../application/queries/get-${names.fileName}-by-id';
    import { List${names.uperFL}sHandler } from '../../application/queries/list-${names.fileName}s';
    import { Add${names.uperFL}Handler } from '../../application/commands/add-${names.fileName}';
    import { Update${names.uperFL}Handler } from '../../application/commands/update-${names.fileName}';
    import { Remove${names.uperFL}Handler } from '../../application/commands/remove-${names.fileName}';
    import { Get${names.uperFL}ByIdController } from '../../interfaces/http/v1/get-${names.fileName}/get-${names.fileName}-by-id.controller';
    import { List${names.uperFL}sController } from '../../interfaces/http/v1/get-${names.fileName}/list-${names.fileName}s.controller';
    import { Add${names.uperFL}Controller } from '../../interfaces/http/v1/add-${names.fileName}/add-${names.fileName}.controller';
    import { Update${names.uperFL}Controller } from '../../interfaces/http/v1/update-${names.fileName}/update-${names.fileName}.controller';
    import { Remove${names.uperFL}Controller } from '../../interfaces/http/v1/remove-${names.fileName}/remove-${names.fileName}.controller';
    `
    content = content.concat(importForEntity);
  })


  // body
  let controllerBegin = `
  const controllers = [`
  content = content.concat(controllerBegin);
  entities.map((entity) => {
    const names = getNames(entity)
    const controllers = `
      Get${names.uperFL}ByIdController,
      List${names.uperFL}sController,
      Add${names.uperFL}Controller,
      Update${names.uperFL}Controller,
      Remove${names.uperFL}Controller,`
    content = content.concat(controllers);
  })
  const controllerEnding = `
  ];
  `
  content = content.concat(controllerEnding);

  let infrastructureBegin = `
  const infrastructure = [`
  content = content.concat(infrastructureBegin);
  entities.map((entity) => {
    const names = getNames(entity)
    const queries = `
    ${names.uperFL}QueriesImplement,
    ${names.uperFL}CommandsImplement,`
    content = content.concat(queries);
  })
  const infrastructureEnding = `
  ];
  `
  content = content.concat(infrastructureEnding);

  const domainArray = `
  const domain = [];
  `
  content = content.concat(domainArray);
  let applicationBegin = `
  const application = [`
  content = content.concat(applicationBegin);
  entities.map((entity) => {
    const names = getNames(entity)
    const applications = `
      Get${names.uperFL}ByIdHandler,
      List${names.uperFL}sHandler,
      Add${names.uperFL}Handler,
      Update${names.uperFL}Handler,
      Remove${names.uperFL}Handler,`
    content = content.concat(applications);
  })
  const applicationEnding = `
  ];
  `
  content = content.concat(applicationEnding);

  // footer
  const footer = `
  @Module({
    imports: [CqrsModule],
    controllers: [...controllers],
    providers: [Logger, ...infrastructure, ...application, ...domain],
  })
  export class UserModule {}

  `
  content = content.concat(footer);

  return content;
}

module.exports = { moduleGenerator };
