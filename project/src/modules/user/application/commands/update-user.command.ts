
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';

import { UserNotFoundException } from '@modules/user/domain/exceptions/user.exception';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserCommandsRepository } from '@modules/user/domain/repositories/user.repository';
import { UserCommandsImplement } from '@modules/user/infrastructure/repositories/user.repository';
import { ModUserResponseDTO } from '@modules/user/interfaces/http/v1/dtos/mod-user.response';

export class UpdateUserCommand {
  constructor(
    readonly username: string,
    readonly name: string,
    
    readonly id?: number,
      
    
  ) {}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  implements ICommandHandler<UpdateUserCommand, ModUserResponseDTO>
{
  constructor(
    @Inject(UserCommandsImplement)
    private readonly userRepository: UserCommandsRepository,
    private readonly logger: Logger,
  ) {}

  async execute(
    command: UpdateUserCommand,
  ): Promise<ModUserResponseDTO> {
    const userEntity = new UserEntity(
      command.username,
    command.name,
    
      command.id,
      
      
    );
    const result = await this.userRepository.updateUser(userEntity);
    if (result.isErr()) {
      this.logger.warn(result.error, 'UpdateUserHandler.execute');
      throw new InternalServerErrorException(
        result.error.message,
        result.error.code,
      );
    }

    const data = result.value;
    if (!data) throw new UserNotFoundException();

    return new ModUserResponseDTO(true);
  }
}

  