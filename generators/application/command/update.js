const { getNames } = require('../../helpers');

const updateCommandGenerator = (entity) => {
  const names = getNames(entity)
  const attributes = entity.attributes;
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
    let attributeItemResponse = `data.${attributeName},
    `;

    constructor = constructor.concat(attributeItemConstructor);
    command = command.concat(attributeItemCommand);
    response = response.concat(attributeItemResponse);
  });
  let content = `
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
  import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
  import { ${names.uperFL}Entity } from '@module/domain/entities/${names.fileName}.entity';
  import { ${names.uperFL}CommandsRepository } from '@module/domain/repositories/${names.fileName}';
  import { ${names.uperFL}CommandsImplement } from '@module/infrastructure/repositories/${names.fileName}';
  import { List${names.uperFL}sResponseDTO } from '@module/interfaces/http/v1/list-${names.fileName}s/dto/list-${names.fileName}s.response';
  import { Update${names.uperFL}ResponseDTO } from '@module/interfaces/http/v1/update-${names.fileName}/dto/update-${names.fileName}.response';  

  export class Update${names.uperFL}Command {
    constructor(
      ${constructor}
    ) {}
  } 

  @CommandHandler(Update${names.uperFL}Command)
  export class Update${names.uperFL}Handler
    implements ICommandHandler<Update${names.uperFL}Command, Update${names.uperFL}ResponseDTO>
  {
    constructor(
      @Inject(${names.uperFL}CommandsImplement)
      private readonly ${names.name}Repository: ${names.uperFL}CommandsRepository,
      private readonly logger: Logger,
    ) {}  

    async execute(command: Update${names.uperFL}Command): Promise<Update${names.uperFL}ResponseDTO> {
      const ${names.name}Entity = new ${names.uperFL}Entity(
        ${command}
      );
      const result = await this.${names.name}Repository.update${names.uperFL}(${names.name}Entity);
      if (result.isErr()) {
        this.logger.warn(result.error, 'Update${names.uperFL}Handler.execute');
        throw new InternalServerErrorException(
          result.error.message,
          result.error.code,
        );
      } 

      const data = result.value;  

      return new Update${names.uperFL}ResponseDTO(
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

module.exports = { updateCommandGenerator };
