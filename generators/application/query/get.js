const { getNames } = require('../../helpers');

const getQueryGenerator = (entity) => {
  const names = getNames(entity)
  const attributes = entity.attributes;
  let response = '';
  attributes.map((attribute) => {
    const attributeName = attribute.name;
    let attributeItemResponse = `data.${attributeName},
    `;
    response = response.concat(attributeItemResponse);
  });
  let content = `
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
  import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
  import { ${names.uperFL}NotFoundException } from '@${names.fileName}/domain/exceptions/${names.fileName}.exception';
  import { ${names.uperFL}QueriesRepository } from '@${names.fileName}/domain/repositories/${names.fileName}.repository';
  import { ${names.uperFL}QueriesImplement } from '@${names.fileName}/infrastructure/repositories/${names.fileName}.repository';
  import { List${names.uperFL}sResponseDTO } from '@${names.fileName}/interfaces/http/v1/list-${names.fileName}s/dto/list-${names.fileName}s.response';
  
  export class Get${names.uperFL}ByIdQuery {
    constructor(readonly id: number) {}
  }
  
  @QueryHandler(Get${names.uperFL}ByIdQuery)
  export class Get${names.uperFL}ByIdHandler
    implements IQueryHandler<Get${names.uperFL}ByIdQuery, List${names.uperFL}sResponseDTO>
  {
    constructor(
      @Inject(${names.uperFL}QueriesImplement)
      private readonly ${names.name}Query: ${names.uperFL}QueriesRepository,
      private readonly logger: Logger,
    ) {}
  
    async execute(query: Get${names.uperFL}ByIdQuery): Promise<List${names.uperFL}sResponseDTO> {
      const result = await this.${names.name}Query.get${names.uperFL}ById(query.id);
      if (result.isErr()) {
        this.logger.warn(result.error, 'Get${names.uperFL}ByIdHandler.execute');
        throw new InternalServerErrorException(
          result.error.message,
          result.error.code,
        );
      }
  
      const data = result.value;
      if (!data) throw new ${names.uperFL}NotFoundException();
  
      return new List${names.uperFL}sResponseDTO(
        ${response}
      );
    }
  }
  
  
  `


  return content;
}

module.exports = { getQueryGenerator };
