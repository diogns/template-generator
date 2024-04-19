
import { Inject, Logger, Injectable } from '@nestjs/common';
import { err, ok } from 'neverthrow';

import { DbEntityManager } from '@helpers/DbManager';
import type { PositionEntity } from '../../domain/entities/position.entity';
import type {
  GetPositionByIdResult,
  ListPositionsResult,
  AddPositionResult,
  UpdatePositionResult,
  RemovePositionResult,
  PositionCommandsRepository,
  PositionQueriesRepository,
} from '../../domain/repositories/position.repository';
import {
  GetPositionByIdDatabaseException,
  ListPositionsDatabaseException,
  AddPositionDatabaseException,
  UpdatePositionDatabaseException,
  RemovePositionDatabaseException,
} from '../exceptions/position.exception';
import { PositionEntity as PositionEsquema } from '../entities/position.entity';
import { UserEntity as UserEsquema } from '@modules/user/infrastructure/entities/user.entity';

export class PositionQueriesImplement
  extends DbEntityManager
  implements PositionQueriesRepository
{
  @Inject()
  private readonly logger: Logger;

  async getPositionById(id: number): Promise<GetPositionByIdResult> {
    try {
      const item = await this.mysqlManager
        .getRepository(PositionEsquema)
        .findOne({
          where: {
            id: id,
          },
          relations: {
            user: true,
          },
        });
      return ok(item);
    } catch (error) {
      this.logger.error(error, 'PositionQueriesImplement.getPositionById');
      return err(new GetPositionByIdDatabaseException());
    }
  }

  async listPositions(): Promise<ListPositionsResult> {
    try {
      const list: PositionEntity[] = await this.mysqlManager
        .getRepository(PositionEsquema)
        .find({
          relations: {
            user: true,
          },
        });
      return ok(list);
    } catch (error) {
      this.logger.error(error, 'PositionQueriesImplement.listPositions');
      return err(new ListPositionsDatabaseException());
    }
  }
}

@Injectable()
export class PositionCommandsImplement
  extends DbEntityManager
  implements PositionCommandsRepository
{
  @Inject()
  private readonly logger: Logger;

  async addPosition(position: PositionEntity): Promise<AddPositionResult> {
    try {
      const item = new PositionEsquema();
      item.flag = position.flag;
    item.type = position.type;
    
      
      if (position.userId) {
        const user = new UserEsquema();
        user.id = position.userId;
        item.user = user;
      }
      
      const data = await this.mysqlManager
        .getRepository(PositionEsquema)
        .save(item);

      return ok(data);
    } catch (error) {
      this.logger.error(error, 'PmositionCommandsImplement.addPosition');
      return err(new AddPositionDatabaseException());
    }
  }

  async updatePosition(
    position: PositionEntity,
  ): Promise<UpdatePositionResult> {
    try {
      const item = new PositionEsquema();
      item.flag = position.flag;
    item.type = position.type;
    
      
      if (position.userId) {
        const user = new UserEsquema();
        user.id = position.userId;
        item.user = user;
      }
      
      const result = await this.mysqlManager
        .getRepository(PositionEsquema)
        .update(position.id, item);

      if (result.affected == 0) {
        return ok(false);
      }
      return ok(true);
    } catch (error) {
      this.logger.error(error, 'PositionCommandsImplement.updatePosition');
      return err(new UpdatePositionDatabaseException());
    }
  }

  async removePosition(id: number): Promise<RemovePositionResult> {
    try {
      const result = await this.mysqlManager
        .getRepository(PositionEsquema)
        .delete(id);

      if (result.affected == 0) {
        return ok(false);
      }

      return ok(true);
    } catch (error) {
      this.logger.error(error, 'PositionCommandsImplement.removePosition');
      return err(new RemovePositionDatabaseException());
    }
  }
}  
  