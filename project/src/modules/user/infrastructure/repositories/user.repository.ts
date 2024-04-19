
import { Inject, Logger, Injectable } from '@nestjs/common';
import { err, ok } from 'neverthrow';

import { DbEntityManager } from '@helpers/DbManager';
import type { UserEntity } from '../../domain/entities/user.entity';
import type {
  GetUserByIdResult,
  ListUsersResult,
  AddUserResult,
  UpdateUserResult,
  RemoveUserResult,
  UserCommandsRepository,
  UserQueriesRepository,
} from '../../domain/repositories/user.repository';
import {
  GetUserByIdDatabaseException,
  ListUsersDatabaseException,
  AddUserDatabaseException,
  UpdateUserDatabaseException,
  RemoveUserDatabaseException,
} from '../exceptions/user.exception';
import { UserEntity as UserEsquema } from '../entities/user.entity';


export class UserQueriesImplement
  extends DbEntityManager
  implements UserQueriesRepository
{
  @Inject()
  private readonly logger: Logger;

  async getUserById(id: number): Promise<GetUserByIdResult> {
    try {
      const item = await this.mysqlManager
        .getRepository(UserEsquema)
        .findOne({
          where: {
            id: id,
          },
          relations: {
            
          },
        });
      return ok(item);
    } catch (error) {
      this.logger.error(error, 'UserQueriesImplement.getUserById');
      return err(new GetUserByIdDatabaseException());
    }
  }

  async listUsers(): Promise<ListUsersResult> {
    try {
      const list: UserEntity[] = await this.mysqlManager
        .getRepository(UserEsquema)
        .find({
          relations: {
            
          },
        });
      return ok(list);
    } catch (error) {
      this.logger.error(error, 'UserQueriesImplement.listUsers');
      return err(new ListUsersDatabaseException());
    }
  }
}

@Injectable()
export class UserCommandsImplement
  extends DbEntityManager
  implements UserCommandsRepository
{
  @Inject()
  private readonly logger: Logger;

  async addUser(user: UserEntity): Promise<AddUserResult> {
    try {
      const item = new UserEsquema();
      item.username = user.username;
    item.name = user.name;
    
      
      const data = await this.mysqlManager
        .getRepository(UserEsquema)
        .save(item);

      return ok(data);
    } catch (error) {
      this.logger.error(error, 'PmositionCommandsImplement.addUser');
      return err(new AddUserDatabaseException());
    }
  }

  async updateUser(
    user: UserEntity,
  ): Promise<UpdateUserResult> {
    try {
      const item = new UserEsquema();
      item.username = user.username;
    item.name = user.name;
    
      
      const result = await this.mysqlManager
        .getRepository(UserEsquema)
        .update(user.id, item);

      if (result.affected == 0) {
        return ok(false);
      }
      return ok(true);
    } catch (error) {
      this.logger.error(error, 'UserCommandsImplement.updateUser');
      return err(new UpdateUserDatabaseException());
    }
  }

  async removeUser(id: number): Promise<RemoveUserResult> {
    try {
      const result = await this.mysqlManager
        .getRepository(UserEsquema)
        .delete(id);

      if (result.affected == 0) {
        return ok(false);
      }

      return ok(true);
    } catch (error) {
      this.logger.error(error, 'UserCommandsImplement.removeUser');
      return err(new RemoveUserDatabaseException());
    }
  }
}  
  