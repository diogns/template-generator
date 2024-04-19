
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';

import { PositionNotFoundException } from '@modules/position/domain/exceptions/position.exception';
import { PositionEntity } from '@modules/position/domain/entities/position.entity';
import { PositionCommandsRepository } from '@modules/position/domain/repositories/position.repository';
import { PositionCommandsImplement } from '@modules/position/infrastructure/repositories/position.repository';
import { ModPositionResponseDTO } from '@modules/position/interfaces/http/v1/dtos/mod-position.response';

export class UpdatePositionCommand {
  constructor(
    readonly flag: string,
    readonly type: number,
    
    readonly id?: number,
      
    readonly userId?: number,
      
  ) {}
}

@CommandHandler(UpdatePositionCommand)
export class UpdatePositionHandler
  implements ICommandHandler<UpdatePositionCommand, ModPositionResponseDTO>
{
  constructor(
    @Inject(PositionCommandsImplement)
    private readonly positionRepository: PositionCommandsRepository,
    private readonly logger: Logger,
  ) {}

  async execute(
    command: UpdatePositionCommand,
  ): Promise<ModPositionResponseDTO> {
    const positionEntity = new PositionEntity(
      command.flag,
    command.type,
    
      command.id,
      
      null,
      command.userId,
      
    );
    const result = await this.positionRepository.updatePosition(positionEntity);
    if (result.isErr()) {
      this.logger.warn(result.error, 'UpdatePositionHandler.execute');
      throw new InternalServerErrorException(
        result.error.message,
        result.error.code,
      );
    }

    const data = result.value;
    if (!data) throw new PositionNotFoundException();

    return new ModPositionResponseDTO(true);
  }
}

  