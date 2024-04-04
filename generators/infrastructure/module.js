const { getNames } = require('../helpers');

const moduleGenerator = (entity) => {
  let content = '';

  // headers
  let imports = `
  import { Logger, Module } from '@nestjs/common';
  import { CqrsModule } from '@nestjs/cqrs';

  `;
  content = content.concat(imports);

  const names = getNames(entity)
  const importForEntity = `
    import { ${names.uperFL}CommandsImplement, ${names.uperFL}QueriesImplement } from '../repositories/${names.fileName}.repository';
    import { Get${names.uperFL}ByIdHandler } from '@${names.fileName}/application/queries/get-${names.fileName}-by-id.query';
    import { List${names.uperFL}sHandler } from '@${names.fileName}/application/queries/list-${names.fileName}s.query';
    import { Add${names.uperFL}Handler } from '@${names.fileName}/application/commands/add-${names.fileName}.command';
    import { Update${names.uperFL}Handler } from '@${names.fileName}/application/commands/update-${names.fileName}.command';
    import { Remove${names.uperFL}Handler } from '@${names.fileName}/application/commands/remove-${names.fileName}.command';
    import { Get${names.uperFL}ByIdController } from '@${names.fileName}/interfaces/http/v1/get-${names.fileName}/get-${names.fileName}-by-id.controller';
    import { List${names.uperFL}sController } from '@${names.fileName}/interfaces/http/v1/get-${names.fileName}/list-${names.fileName}s.controller';
    import { Add${names.uperFL}Controller } from '@${names.fileName}/interfaces/http/v1/add-${names.fileName}/add-${names.fileName}.controller';
    import { Update${names.uperFL}Controller } from '@${names.fileName}/interfaces/http/v1/update-${names.fileName}/update-${names.fileName}.controller';
    import { Remove${names.uperFL}Controller } from '@${names.fileName}/interfaces/http/v1/remove-${names.fileName}/remove-${names.fileName}.controller';
    `
  content = content.concat(importForEntity);



  // body
  let controllerBegin = `
  const controllers = [`
  content = content.concat(controllerBegin);
  const controllers = `
      Get${names.uperFL}ByIdController,
      List${names.uperFL}sController,
      Add${names.uperFL}Controller,
      Update${names.uperFL}Controller,
      Remove${names.uperFL}Controller,`
  content = content.concat(controllers);

  const controllerEnding = `
  ];
  `
  content = content.concat(controllerEnding);

  let infrastructureBegin = `
  const infrastructure = [`
  content = content.concat(infrastructureBegin);
  const queries = `
    ${names.uperFL}QueriesImplement,
    ${names.uperFL}CommandsImplement,`
  content = content.concat(queries);

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
    const applications = `
      Get${names.uperFL}ByIdHandler,
      List${names.uperFL}sHandler,
      Add${names.uperFL}Handler,
      Update${names.uperFL}Handler,
      Remove${names.uperFL}Handler,`
    content = content.concat(applications);
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
  export class ${names.uperFL}Module {}

  `
  content = content.concat(footer);

  return content;
}

module.exports = { moduleGenerator };
