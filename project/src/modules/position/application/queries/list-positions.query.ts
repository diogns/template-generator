
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
  import type { IQueryHandler } from '@nestjs/cqrs';
  import { QueryHandler } from '@nestjs/cqrs';
  import { PositionQueriesRepository } from '@modules/position/domain/repositories/position.repository';
  import { PositionQueriesImplement } from '@modules/position/infrastructure/repositories/position.repository';
  import { PositionResponseDTO } from '@modules/position/interfaces/http/v1/dtos/position.response';
  import { UserResponseDTO } from '@modules/user/interfaces/http/v1/dtos/user.response';
      
  
  export class ListPositionsQuery {}
  
  @QueryHandler(ListPositionsQuery)
  export class ListPositionsHandler
    implements IQueryHandler<ListPositionsQuery, PositionResponseDTO[]>
  {
    constructor(
      @Inject(PositionQueriesImplement)
      private readonly positionQuery: PositionQueriesRepository,
      private readonly logger: Logger,
    ) {}
  
    async execute(): Promise<PositionResponseDTO[]> {
      const result = await this.positionQuery.listPositions();
      if (result.isErr()) {
        this.logger.warn(result.error, 'ListPositionsHandler.execute');
        throw new InternalServerErrorException(
          result.error.message,
          result.error.code,
        );
      }
  
      const data = result.value;
  
      return data.map((item) => {
        
      let user = null;
      if (data.user) {
        user = new UserResponseDTO(
          item.user.id,
          item.user.username,
        item.user.name,
        
        );
      }
      
  
        return new PositionResponseDTO(
          item.id,
      
          item.flag,
    item.type,
    
          user,
      
        );
      });
    }
  }  
  