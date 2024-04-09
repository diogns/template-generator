const { getNames } = require('../../helpers');

const updateCommandGenerator = (entity) => {
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
    let attributeItemResponse = `data.${attributeName},
    `;

    constructor = constructor.concat(attributeItemConstructor);
    command = command.concat(attributeItemCommand);
    response = response.concat(attributeItemResponse);
  });

  let relations = '';
  let commandIdsConstructor = '';
  let commandIdsEntity = '';
  let responsesDTO = '';
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

      const responseDTO = `
      let ${itemNames.name} = null;
      if (data.${itemNames.name}) {
        user = new ${itemNames.uperFL}ResponseDTO(
          data.user.id,
          data.user.username,
          data.user.name,
        );
      }
      `;

      const responseEntity = `${itemNames.name},
      `;

      relations = relations.concat(addRelation);
      commandIdsConstructor = commandIdsConstructor.concat(idConstructor);
      commandIdsEntity = commandIdsEntity.concat(idCommand);
      responsesDTO = responsesDTO.concat(responseDTO);
      responsesEntity = responsesEntity.concat(responseEntity);

    });
  }

  let idConstructor = '';
  let IndexCommand = '';
  let responseIndexCommand = '';
  if (hasDefaultIndex) {
    const defaultIdConstructor = `readonly id?: number,
      `;

    const idParam = `command.id,
      `;

    const idResponse = `data.id,
      `;

      idConstructor = idConstructor.concat(defaultIdConstructor);
    IndexCommand = IndexCommand.concat(idParam);
    responseIndexCommand = responseIndexCommand.concat(idResponse);
  }

  let content = `
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';

import { ${names.uperFL}NotFoundException } from '@modules/${names.fileName}/domain/exceptions/${names.fileName}.exception';
import { ${names.uperFL}Entity } from '@modules/${names.fileName}/domain/entities/${names.fileName}.entity';
import { ${names.uperFL}CommandsRepository } from '@modules/${names.fileName}/domain/repositories/${names.fileName}.repository';
import { ${names.uperFL}CommandsImplement } from '@modules/${names.fileName}/infrastructure/repositories/${names.fileName}.repository';
import { Mod${names.uperFL}ResponseDTO } from '@modules/${names.fileName}/interfaces/http/v1/dtos/mod-${names.fileName}.response';

export class Update${names.uperFL}Command {
  constructor(
    ${constructor}
    ${idConstructor}
    ${commandIdsConstructor}
  ) {}
}

@CommandHandler(Update${names.uperFL}Command)
export class Update${names.uperFL}Handler
  implements ICommandHandler<Update${names.uperFL}Command, Mod${names.uperFL}ResponseDTO>
{
  constructor(
    @Inject(${names.uperFL}CommandsImplement)
    private readonly ${names.name}Repository: ${names.uperFL}CommandsRepository,
    private readonly logger: Logger,
  ) {}

  async execute(
    command: Update${names.uperFL}Command,
  ): Promise<Mod${names.uperFL}ResponseDTO> {
    const ${names.name}Entity = new ${names.uperFL}Entity(
      ${command}
      ${IndexCommand}
      ${commandIdsEntity}
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
    if (!data) throw new ${names.uperFL}NotFoundException();

    return new Mod${names.uperFL}ResponseDTO(true);
  }
}

  `


  return content;
}

module.exports = { updateCommandGenerator };
