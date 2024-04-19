
  import {
    Body,
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Version,
  } from '@nestjs/common';
  import { CommandBus, QueryBus } from '@nestjs/cqrs';
  
  import { GetUserByIdQuery } from '@modules/user/application/queries/get-user-by-id.query';
  import { ListUsersQuery } from '@modules/user/application/queries/list-users.query';
  import { AddUserCommand } from '@modules/user/application/commands/add-user.command';
  import { UpdateUserCommand } from '@modules/user/application/commands/update-user.command';
  import { RemoveUserCommand } from '@modules/user/application/commands/remove-user.command';
  
  import { idParamDto } from '@core/interfaces/dtos/id-param.request';
  import { UserRequestDTO } from './dtos/user.request';
  
  import {
    AddUserDoc,
    GetUserByIdDoc,
    ListUsersDoc,
    UpdateUserDoc,
    RemoveUserDoc,
  } from './docs/user.docs';
  
  @Controller('user')
  export class UserController {
    constructor(
      readonly commandBus: CommandBus,
      readonly queryBus: QueryBus,
    ) {}
    @Version('1')
    @Get('/:id')
    @GetUserByIdDoc()
    // @Authentication()
    async getUserById(@Param() { id }: idParamDto) {
      const query = new GetUserByIdQuery(id);
      return this.queryBus.execute(query);
    }
  
    @Version('1')
    @Get()
    @ListUsersDoc()
    // @Authentication()
    async listUsers() {
      const query = new ListUsersQuery();
      return this.queryBus.execute(query);
    }
  
    @Version('1')
    @Post()
    @AddUserDoc()
    // @Authentication()
    async addUser(@Body() user: UserRequestDTO) {
      const query = new AddUserCommand(
        user.username,
    user.name,
    
        
      );
      return this.commandBus.execute(query);
    }
  
    @Version('1')
    @Put('/:id')
    @UpdateUserDoc()
    // @Authentication()
    async updateUser(
      @Param() { id }: idParamDto,
      @Body() user: UserRequestDTO,
    ) {
      const query = new UpdateUserCommand(
        user.username,
    user.name,
    
        id,
        
      );
      return this.commandBus.execute(query);
    }
  
    @Version('1')
    @Delete('/:id')
    @RemoveUserDoc()
    // @Authentication()
    async removeUser(@Param() { id }: idParamDto) {
      const query = new RemoveUserCommand(id);
      return this.commandBus.execute(query);
    }
  }
  
  