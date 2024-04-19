
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { UserNotFoundException } from '@modules/user/domain/exceptions/user.exception';
import { UserQueriesRepository } from '@modules/user/domain/repositories/user.repository';
import { UserQueriesImplement } from '@modules/user/infrastructure/repositories/user.repository';
import { UserResponseDTO } from '@modules/user/interfaces/http/v1/dtos/user.response';


export class GetUserByIdQuery {
  constructor(readonly id: number) {}
}

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler
  implements IQueryHandler<GetUserByIdQuery, UserResponseDTO>
{
  constructor(
    @Inject(UserQueriesImplement)
    private readonly userQuery: UserQueriesRepository,
    private readonly logger: Logger,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<UserResponseDTO> {
    const result = await this.userQuery.getUserById(query.id);
    if (result.isErr()) {
      this.logger.warn(result.error, 'GetUserByIdHandler.execute');
      throw new InternalServerErrorException(
        result.error.message,
        result.error.code,
      );
    }

    const data = result.value;
    if (!data) throw new UserNotFoundException();

    

    return new UserResponseDTO(
      data.id,
      
      data.username,
    data.name,
    
      
    );
  }
}
  
  