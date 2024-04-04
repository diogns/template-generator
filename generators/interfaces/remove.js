const { getNames } = require('../../helpers');

const removeCommandGenerator = (entity) => {
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
  import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
  import { ${names.uperFL}CommandsRepository } from '@${names.fileName}/domain/repositories/${names.fileName}.repository';
  import { ${names.uperFL}CommandsImplement } from '@${names.fileName}/infrastructure/repositories/${names.fileName}.repository';
  import { List${names.uperFL}sResponseDTO } from '@${names.fileName}/interfaces/http/v1/list-${names.fileName}s/dto/list-${names.fileName}s.response';
  import { Remove${names.uperFL}ResponseDTO } from '@${names.fileName}/interfaces/http/v1/remove-${names.fileName}/dto/remove-${names.fileName}.response';
  
  export class Remove${names.uperFL}Command {
    constructor(readonly id: number) {}
  }
  
  @CommandHandler(Remove${names.uperFL}Command)
  export class Remove${names.uperFL}Handler
    implements ICommandHandler<Remove${names.uperFL}Command, Remove${names.uperFL}ResponseDTO>
  {
    constructor(
      @Inject(${names.uperFL}CommandsImplement)
      private readonly ${names.name}Repository: ${names.uperFL}CommandsRepository,
      private readonly logger: Logger,
    ) {}
  
    async execute(command: Remove${names.uperFL}Command): Promise<Remove${names.uperFL}ResponseDTO> {
      const result = await this.${names.name}Repository.remove${names.uperFL}(command.id);
      if (result.isErr()) {
        this.logger.warn(result.error, 'Remove${names.uperFL}Handler.execute');
        throw new InternalServerErrorException(
          result.error.message,
          result.error.code,
        );
      }
  
      const data = result.value;
  
      return new Remove${names.uperFL}ResponseDTO(
        true,
        new List${names.uperFL}sResponseDTO(
          ${response}
        ),
      );
    }
  }  
  `


  return content;
}

module.exports = { removeCommandGenerator };
