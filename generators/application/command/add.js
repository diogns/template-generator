const { getNames } = require('../../helpers');

const addCommandGenerator = (entity) => {
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
  import { ${names.uperFL}Entity } from '../../../domain/entities/${names.fileName}.entity';
  import { ${names.uperFL}CommandsRepository } from '../../../domain/repositories/${names.fileName}';
  import { ${names.uperFL}CommandsImplement } from '../../../infrastructure/repositories/${names.fileName}';
  import { Add${names.uperFL}ResponseDTO } from '../../../interfaces/http/v1/add-${names.fileName}/dto/add-${names.fileName}.response';
  import { List${names.uperFL}sResponseDTO } from '../../../interfaces/http/v1/list-${names.fileName}s/dto/list-${names.fileName}s.response';

  export class Add${names.uperFL}Command {
    constructor(
      ${constructor}
    ) {}
  }

  @CommandHandler(Add${names.uperFL}Command)
  export class Add${names.uperFL}Handler
    implements ICommandHandler<Add${names.uperFL}Command, Add${names.uperFL}ResponseDTO>
  {
    constructor(
      @Inject(${names.uperFL}CommandsImplement)
      private readonly ${names.name}Repository: ${names.uperFL}CommandsRepository,
      private readonly logger: Logger,
    ) {}

    async execute(command: Add${names.uperFL}Command): Promise<Add${names.uperFL}ResponseDTO> {
      const ${names.name}Entity = new ${names.uperFL}Entity(
        ${command}
      );
      const result = await this.${names.name}Repository.add${names.uperFL}(${names.name}Entity);
      if (result.isErr()) {
        this.logger.warn(result.error, 'Add${names.uperFL}Handler.execute');
        throw new InternalServerErrorException(
          result.error.message,
          result.error.code,
        );
      }

      const data = result.value;

      return new Add${names.uperFL}ResponseDTO(
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

module.exports = { addCommandGenerator };
