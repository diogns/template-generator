
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { PositionNotFoundException } from '@modules/position/domain/exceptions/position.exception';
import { PositionQueriesRepository } from '@modules/position/domain/repositories/position.repository';
import { PositionQueriesImplement } from '@modules/position/infrastructure/repositories/position.repository';
import { PositionResponseDTO } from '@modules/position/interfaces/http/v1/dtos/position.response';
import { UserResponseDTO } from '@modules/user/interfaces/http/v1/dtos/user.response';
      

export class GetPositionByIdQuery {
  constructor(readonly id: number) {}
}

@QueryHandler(GetPositionByIdQuery)
export class GetPositionByIdHandler
  implements IQueryHandler<GetPositionByIdQuery, PositionResponseDTO>
{
  constructor(
    @Inject(PositionQueriesImplement)
    private readonly positionQuery: PositionQueriesRepository,
    private readonly logger: Logger,
  ) {}

  async execute(query: GetPositionByIdQuery): Promise<PositionResponseDTO> {
    const result = await this.positionQuery.getPositionById(query.id);
    if (result.isErr()) {
      this.logger.warn(result.error, 'GetPositionByIdHandler.execute');
      throw new InternalServerErrorException(
        result.error.message,
        result.error.code,
      );
    }

    const data = result.value;
    if (!data) throw new PositionNotFoundException();

    
      let user = null;
      if (data.user) {
        user = new UserResponseDTO(
          data.user.id,
          data.user.username,
        data.user.name,
        
        );
      }
      

    return new PositionResponseDTO(
      data.id,
      
      data.flag,
    data.type,
    
      user,
      
    );
  }
}
  
  