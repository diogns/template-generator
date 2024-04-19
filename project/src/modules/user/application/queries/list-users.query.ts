
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
  import type { IQueryHandler } from '@nestjs/cqrs';
  import { QueryHandler } from '@nestjs/cqrs';
  import { UserQueriesRepository } from '@modules/user/domain/repositories/user.repository';
  import { UserQueriesImplement } from '@modules/user/infrastructure/repositories/user.repository';
  import { UserResponseDTO } from '@modules/user/interfaces/http/v1/dtos/user.response';
  
  
  export class ListUsersQuery {}
  
  @QueryHandler(ListUsersQuery)
  export class ListUsersHandler
    implements IQueryHandler<ListUsersQuery, UserResponseDTO[]>
  {
    constructor(
      @Inject(UserQueriesImplement)
      private readonly userQuery: UserQueriesRepository,
      private readonly logger: Logger,
    ) {}
  
    async execute(): Promise<UserResponseDTO[]> {
      const result = await this.userQuery.listUsers();
      if (result.isErr()) {
        this.logger.warn(result.error, 'ListUsersHandler.execute');
        throw new InternalServerErrorException(
          result.error.message,
          result.error.code,
        );
      }
  
      const data = result.value;
  
      return data.map((item) => {
        
  
        return new UserResponseDTO(
          item.id,
      
          item.username,
    item.name,
    
          
        );
      });
    }
  }  
  