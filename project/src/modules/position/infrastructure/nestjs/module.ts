
  import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  PositionCommandsImplement,
  PositionQueriesImplement,
} from '../repositories/position.repository';
import { GetPositionByIdHandler } from '@modules/position/application/queries/get-position-by-id.query';
import { ListPositionsHandler } from '@modules/position/application/queries/list-positions.query';
import { AddPositionHandler } from '@modules/position/application/commands/add-position.command';
import { UpdatePositionHandler } from '@modules/position/application/commands/update-position.command';
import { RemovePositionHandler } from '@modules/position/application/commands/remove-position.command';
import { PositionController } from '@modules/position/interfaces/http/v1/position.controller';

const controllers = [PositionController];

const infrastructure = [PositionQueriesImplement, PositionCommandsImplement];

const domain = [];

const application = [
  GetPositionByIdHandler,
  ListPositionsHandler,
  AddPositionHandler,
  UpdatePositionHandler,
  RemovePositionHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [...controllers],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class PositionModule {}
  