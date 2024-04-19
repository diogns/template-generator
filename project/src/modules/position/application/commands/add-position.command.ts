
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
  import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
  import { PositionEntity } from '@modules/position/domain/entities/position.entity';
  import { PositionCommandsRepository } from '@modules/position/domain/repositories/position.repository';
  import { PositionCommandsImplement } from '@modules/position/infrastructure/repositories/position.repository';
  import { ModPositionResponseDTO } from '@modules/position/interfaces/http/v1/dtos/mod-position.response';
  import { PositionResponseDTO } from '@modules/position/interfaces/http/v1/dtos/position.response';
  import { UserResponseDTO } from '@modules/user/interfaces/http/v1/dtos/user.response';
      

  export class AddPositionCommand {
    constructor(
      readonly flag: string,
    readonly type: number,
    
      readonly userId?: number,
      
    ) {}
  }

  @CommandHandler(AddPositionCommand)
  export class AddPositionHandler
    implements ICommandHandler<AddPositionCommand, ModPositionResponseDTO>
  {
    constructor(
      @Inject(PositionCommandsImplement)
      private readonly positionRepository: PositionCommandsRepository,
      private readonly logger: Logger,
    ) {}

    async execute(command: AddPositionCommand): Promise<ModPositionResponseDTO> {
      const positionEntity = new PositionEntity(
        command.flag,
    command.type,
    
        null,
      
        null,
      command.userId,
      
      );
      const result = await this.positionRepository.addPosition(positionEntity);
      if (result.isErr()) {
        this.logger.warn(result.error, 'AddPositionHandler.execute');
        throw new InternalServerErrorException(
          result.error.message,
          result.error.code,
        );
      }

      const data = result.value;

      
      let user = null;
      if (data.user) {
        user = new UserResponseDTO(
          data.user.id,
          data.user.username,
        data.user.name,
        
        );
      }
      
  
      return new ModPositionResponseDTO(
        true,
        new PositionResponseDTO(
          data.id,
      
          data.flag,
    data.type,
    
          user,
      
        ),
      );
    }
  }
  