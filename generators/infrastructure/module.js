const { getNames } = require('../helpers');

const moduleGenerator = (entity) => {
  const names = getNames(entity);

  let content = `
  import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  ${names.uperFL}CommandsImplement,
  ${names.uperFL}QueriesImplement,
} from '../repositories/${names.fileName}.repository';
import { Get${names.uperFL}ByIdHandler } from '@modules/${names.fileName}/application/queries/get-${names.fileName}-by-id.query';
import { List${names.uperFL}sHandler } from '@modules/${names.fileName}/application/queries/list-${names.fileName}s.query';
import { Add${names.uperFL}Handler } from '@modules/${names.fileName}/application/commands/add-${names.fileName}.command';
import { Update${names.uperFL}Handler } from '@modules/${names.fileName}/application/commands/update-${names.fileName}.command';
import { Remove${names.uperFL}Handler } from '@modules/${names.fileName}/application/commands/remove-${names.fileName}.command';
import { ${names.uperFL}Controller } from '@modules/${names.fileName}/interfaces/http/v1/${names.fileName}.controller';

const controllers = [${names.uperFL}Controller];

const infrastructure = [${names.uperFL}QueriesImplement, ${names.uperFL}CommandsImplement];

const domain = [];

const application = [
  Get${names.uperFL}ByIdHandler,
  List${names.uperFL}sHandler,
  Add${names.uperFL}Handler,
  Update${names.uperFL}Handler,
  Remove${names.uperFL}Handler,
];

@Module({
  imports: [CqrsModule],
  controllers: [...controllers],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class ${names.uperFL}Module {}
  `;


  return content;
}

module.exports = { moduleGenerator };
