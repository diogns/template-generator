
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
  import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
  import { UserEntity } from '@modules/user/domain/entities/user.entity';
  import { UserCommandsRepository } from '@modules/user/domain/repositories/user.repository';
  import { UserCommandsImplement } from '@modules/user/infrastructure/repositories/user.repository';
  import { ModUserResponseDTO } from '@modules/user/interfaces/http/v1/dtos/mod-user.response';
  import { UserResponseDTO } from '@modules/user/interfaces/http/v1/dtos/user.response';
  

  export class AddUserCommand {
    constructor(
      readonly username: string,
    readonly name: string,
    
      
    ) {}
  }

  @CommandHandler(AddUserCommand)
  export class AddUserHandler
    implements ICommandHandler<AddUserCommand, ModUserResponseDTO>
  {
    constructor(
      @Inject(UserCommandsImplement)
      private readonly userRepository: UserCommandsRepository,
      private readonly logger: Logger,
    ) {}

    async execute(command: AddUserCommand): Promise<ModUserResponseDTO> {
      const userEntity = new UserEntity(
        command.username,
    command.name,
    
        null,
      
        
      );
      const result = await this.userRepository.addUser(userEntity);
      if (result.isErr()) {
        this.logger.warn(result.error, 'AddUserHandler.execute');
        throw new InternalServerErrorException(
          result.error.message,
          result.error.code,
        );
      }

      const data = result.value;

      
  
      return new ModUserResponseDTO(
        true,
        new UserResponseDTO(
          data.id,
      
          data.username,
    data.name,
    
          
        ),
      );
    }
  }
  