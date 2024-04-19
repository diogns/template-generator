
  import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  UserCommandsImplement,
  UserQueriesImplement,
} from '../repositories/user.repository';
import { GetUserByIdHandler } from '@modules/user/application/queries/get-user-by-id.query';
import { ListUsersHandler } from '@modules/user/application/queries/list-users.query';
import { AddUserHandler } from '@modules/user/application/commands/add-user.command';
import { UpdateUserHandler } from '@modules/user/application/commands/update-user.command';
import { RemoveUserHandler } from '@modules/user/application/commands/remove-user.command';
import { UserController } from '@modules/user/interfaces/http/v1/user.controller';

const controllers = [UserController];

const infrastructure = [UserQueriesImplement, UserCommandsImplement];

const domain = [];

const application = [
  GetUserByIdHandler,
  ListUsersHandler,
  AddUserHandler,
  UpdateUserHandler,
  RemoveUserHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [...controllers],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class UserModule {}
  