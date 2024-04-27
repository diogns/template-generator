const { getNames } = require('../../helpers');

const listQueryGenerator = (entity, entitiesByName) => {
  const names = getNames(entity)
  const attributes = entity.attributes;
  const manyToOne = entity.manyToOne;
  const hasDefaultIndex = entity.hasDefaultIndex;

  let constructor = '';
  let command = '';
  let response = '';
  attributes.map((attribute) => {
    const attributeName = attribute.name;
    const attributeType = attribute.type;
    let type = '';

    if (attributeType == 'varchar') {
      type = 'string'
    }
    if (attributeType == 'float' || attributeType == 'int') {
      type = 'number'
    }

    let attributeItemConstructor = `readonly ${attributeName}: ${type},
    `;
    let attributeItemCommand = `command.${attributeName},
    `;
    let attributeItemResponse = `item.${attributeName},
    `;

    constructor = constructor.concat(attributeItemConstructor);
    command = command.concat(attributeItemCommand);
    response = response.concat(attributeItemResponse);
  });

  let relations = '';
  let commandIdsConstructor = '';
  let commandIdsEntity = '';
  let responsesDTOEntityRelated = '';
  let responsesEntity = '';
  if (manyToOne.length > 0) {
    manyToOne.map((item) => {
      const itemNames = getNames({ name: item.value })
      const addRelation = `import { ${itemNames.uperFL}ResponseDTO } from '@modules/${itemNames.fileName}/interfaces/http/v1/dtos/${itemNames.fileName}.response';
      `;
      const idConstructor = `readonly ${itemNames.name}Id?: number,
      `;
      const idCommand = `null,
      command.${itemNames.name}Id,
      `;

      
      const entityRelated = entitiesByName[itemNames.name];

      const attributesEntityRelated = entityRelated.attributes;
      const hasDefaultIndexEntityRelated = entityRelated.hasDefaultIndex;

      let idEntityRelated = '';
      if (hasDefaultIndexEntityRelated) {
        idEntityRelated = `item.${itemNames.name}.id,`;
      }

      let responseEntityRelated = '';
      attributesEntityRelated.map((attribute) => {
        const attributeName = attribute.name;
        let attributeItemResponse = `item.${itemNames.name}.${attributeName},
        `;
        responseEntityRelated = responseEntityRelated.concat(attributeItemResponse);
      });

      const responseDTOEntityRelated = `
      let ${itemNames.name} = null;
      if (item.${itemNames.name}) {
        ${itemNames.name} = new ${itemNames.uperFL}ResponseDTO(
          ${idEntityRelated}
          ${responseEntityRelated}
        );
      }
      `;



      const responseEntity = `${itemNames.name},
      `;

      relations = relations.concat(addRelation);
      commandIdsConstructor = commandIdsConstructor.concat(idConstructor);
      commandIdsEntity = commandIdsEntity.concat(idCommand);
      responsesDTOEntityRelated = responsesDTOEntityRelated.concat(responseDTOEntityRelated);
      responsesEntity = responsesEntity.concat(responseEntity);

    });
  }

  let IndexCommand = '';
  let responseIndexCommand = '';
  if (hasDefaultIndex) {
    const idParam = `null,
      `;

    const idResponse = `item.id,
      `;

    IndexCommand = IndexCommand.concat(idParam);
    responseIndexCommand = responseIndexCommand.concat(idResponse);
  }
  
  let content = `
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
  import type { IQueryHandler } from '@nestjs/cqrs';
  import { QueryHandler } from '@nestjs/cqrs';
  import { ${names.uperFL}QueriesRepository } from '@modules/${names.fileName}/domain/repositories/${names.fileName}.repository';
  import { ${names.uperFL}QueriesImplement } from '@modules/${names.fileName}/infrastructure/repositories/${names.fileName}.repository';
  import { ${names.uperFL}ResponseDTO } from '@modules/${names.fileName}/interfaces/http/v1/dtos/${names.fileName}.response';
  ${relations}
  
  export class List${names.uperFL}sQuery {}
  
  @QueryHandler(List${names.uperFL}sQuery)
  export class List${names.uperFL}sHandler
    implements IQueryHandler<List${names.uperFL}sQuery, ${names.uperFL}ResponseDTO[]>
  {
    constructor(
      @Inject(${names.uperFL}QueriesImplement)
      private readonly ${names.name}Query: ${names.uperFL}QueriesRepository,
      private readonly logger: Logger,
    ) {}
  
    async execute(): Promise<${names.uperFL}ResponseDTO[]> {
      const result = await this.${names.name}Query.list${names.uperFL}s();
      if (result.isErr()) {
        this.logger.warn(result.error, 'List${names.uperFL}sHandler.execute');
        throw new InternalServerErrorException(
          result.error.message,
          result.error.code,
        );
      }
  
      const data = result.value;
  
      return data.map((item) => {
        ${responsesDTOEntityRelated}
  
        return new ${names.uperFL}ResponseDTO(
          ${responseIndexCommand}
          ${response}
          ${responsesEntity}
        );
      });
    }
  }  
  `


  return content;
}

module.exports = { listQueryGenerator };
