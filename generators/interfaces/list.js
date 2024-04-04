const { getNames } = require('../../helpers');

const listQueryGenerator = (entity) => {
  const names = getNames(entity)
  const attributes = entity.attributes;
  let response = '';
  attributes.map((attribute) => {
    const attributeName = attribute.name;
    let attributeItemResponse = `item.${attributeName},
    `;
    response = response.concat(attributeItemResponse);
  });
  let content = `
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
  import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
  import { ${names.uperFL}QueriesRepository } from '@${names.fileName}/domain/repositories/${names.fileName}.repository';
  import { ${names.uperFL}QueriesImplement } from '@${names.fileName}/infrastructure/repositories/${names.fileName}.repository';
  import { List${names.uperFL}sResponseDTO } from '@${names.fileName}/interfaces/http/v1/list-${names.fileName}s/dto/list-${names.fileName}s.response';
  
  export class List${names.uperFL}sQuery {
    constructor() {}
  }
  
  @QueryHandler(List${names.uperFL}sQuery)
  export class List${names.uperFL}sHandler
    implements IQueryHandler<List${names.uperFL}sQuery, List${names.uperFL}sResponseDTO[]>
  {
    constructor(
      @Inject(${names.uperFL}QueriesImplement)
      private readonly ${names.fileName}Query: ${names.uperFL}QueriesRepository,
      private readonly logger: Logger,
    ) {}
  
    async execute(): Promise<List${names.uperFL}sResponseDTO[]> {
      const result = await this.${names.fileName}Query.list${names.uperFL}s();
      if (result.isErr()) {
        this.logger.warn(result.error, 'List${names.uperFL}sHandler.execute');
        throw new InternalServerErrorException(
          result.error.message,
          result.error.code,
        );
      }
  
      const data = result.value;
  
      return data.map(
        (item) =>
          new List${names.uperFL}sResponseDTO(
            ${response}
          ),
      );
    }
  }  
  `


  return content;
}

module.exports = { listQueryGenerator };
