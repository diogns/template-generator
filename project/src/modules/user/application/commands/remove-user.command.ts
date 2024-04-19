
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';

import { UserNotFoundException } from '@modules/user/domain/exceptions/user.exception';
import { UserCommandsRepository } from '@modules/user/domain/repositories/user.repository';
import { UserCommandsImplement } from '@modules/user/infrastructure/repositories/user.repository';
import { ModUserResponseDTO } from '@modules/user/interfaces/http/v1/dtos/mod-user.response';

export class RemoveUserCommand {
  constructor(readonly id: number) {}
}

@CommandHandler(RemoveUserCommand)
export class RemoveUserHandler
  implements ICommandHandler<RemoveUserCommand, ModUserResponseDTO>
{
  constructor(
    @Inject(UserCommandsImplement)
    private readonly userRepository: UserCommandsRepository,
    private readonly logger: Logger,
  ) {}

  async execute(
    command: RemoveUserCommand,
  ): Promise<ModUserResponseDTO> {
    const result = await this.userRepository.removeUser(command.id);
    if (result.isErr()) {
      this.logger.warn(result.error, 'RemoveUserHandler.execute');
      throw new InternalServerErrorException(
        result.error.message,
        result.error.code,
      );
    }

    const data = result.value;
    if (!data) throw new UserNotFoundException();

    return new ModUserResponseDTO(result.value);
  }
}
  