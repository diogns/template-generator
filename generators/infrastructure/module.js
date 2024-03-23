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
    import { ${names.uperFL}CommandsImplement } from '../repositories/${names.fileName}.repository';
    import { Add${names.uperFL}Handler } from '../../application/commands/add-${names.fileName}';
    import { Get${names.uperFL}Handler } from '../../application/commands/get-${names.fileName}';
    import { Update${names.uperFL}Handler } from '../../application/commands/update-${names.fileName}';
    import { Remove${names.uperFL}Handler } from '../../application/commands/remove-${names.fileName}';
    import { Add${names.uperFL}Controller } from '../../interfaces/http/v1/add-${names.fileName}/add-${names.fileName}.controller';
    import { Get${names.uperFL}Controller } from '../../interfaces/http/v1/get-${names.fileName}/get-${names.fileName}.controller';
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
      Add${names.uperFL}Controller,
      Get${names.uperFL}Controller,
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
      Add${names.uperFL}Handler,
      Get${names.uperFL}Handler,
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
