
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';

import { PositionNotFoundException } from '@modules/position/domain/exceptions/position.exception';
import { PositionCommandsRepository } from '@modules/position/domain/repositories/position.repository';
import { PositionCommandsImplement } from '@modules/position/infrastructure/repositories/position.repository';
import { ModPositionResponseDTO } from '@modules/position/interfaces/http/v1/dtos/mod-position.response';

export class RemovePositionCommand {
  constructor(readonly id: number) {}
}

@CommandHandler(RemovePositionCommand)
export class RemovePositionHandler
  implements ICommandHandler<RemovePositionCommand, ModPositionResponseDTO>
{
  constructor(
    @Inject(PositionCommandsImplement)
    private readonly positionRepository: PositionCommandsRepository,
    private readonly logger: Logger,
  ) {}

  async execute(
    command: RemovePositionCommand,
  ): Promise<ModPositionResponseDTO> {
    const result = await this.positionRepository.removePosition(command.id);
    if (result.isErr()) {
      this.logger.warn(result.error, 'RemovePositionHandler.execute');
      throw new InternalServerErrorException(
        result.error.message,
        result.error.code,
      );
    }

    const data = result.value;
    if (!data) throw new PositionNotFoundException();

    return new ModPositionResponseDTO(result.value);
  }
}
  