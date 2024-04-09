const { getNames } = require('../../helpers');

const removeCommandGenerator = (entity) => {
  const names = getNames(entity)

  let content = `
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';

import { ${names.uperFL}NotFoundException } from '@modules/${names.fileName}/domain/exceptions/${names.fileName}.exception';
import { ${names.uperFL}CommandsRepository } from '@modules/${names.fileName}/domain/repositories/${names.fileName}.repository';
import { ${names.uperFL}CommandsImplement } from '@modules/${names.fileName}/infrastructure/repositories/${names.fileName}.repository';
import { Mod${names.uperFL}ResponseDTO } from '@modules/${names.fileName}/interfaces/http/v1/dtos/mod-${names.fileName}.response';

export class Remove${names.uperFL}Command {
  constructor(readonly id: number) {}
}

@CommandHandler(Remove${names.uperFL}Command)
export class Remove${names.uperFL}Handler
  implements ICommandHandler<Remove${names.uperFL}Command, Mod${names.uperFL}ResponseDTO>
{
  constructor(
    @Inject(${names.uperFL}CommandsImplement)
    private readonly ${names.name}Repository: ${names.uperFL}CommandsRepository,
    private readonly logger: Logger,
  ) {}

  async execute(
    command: Remove${names.uperFL}Command,
  ): Promise<Mod${names.uperFL}ResponseDTO> {
    const result = await this.${names.name}Repository.remove${names.uperFL}(command.id);
    if (result.isErr()) {
      this.logger.warn(result.error, 'Remove${names.uperFL}Handler.execute');
      throw new InternalServerErrorException(
        result.error.message,
        result.error.code,
      );
    }

    const data = result.value;
    if (!data) throw new ${names.uperFL}NotFoundException();

    return new Mod${names.uperFL}ResponseDTO(result.value);
  }
}
  `;


  return content;
}

module.exports = { removeCommandGenerator };
