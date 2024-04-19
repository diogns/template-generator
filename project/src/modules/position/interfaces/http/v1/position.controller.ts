
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
  
  import { GetPositionByIdQuery } from '@modules/position/application/queries/get-position-by-id.query';
  import { ListPositionsQuery } from '@modules/position/application/queries/list-positions.query';
  import { AddPositionCommand } from '@modules/position/application/commands/add-position.command';
  import { UpdatePositionCommand } from '@modules/position/application/commands/update-position.command';
  import { RemovePositionCommand } from '@modules/position/application/commands/remove-position.command';
  
  import { idParamDto } from '@core/interfaces/dtos/id-param.request';
  import { PositionRequestDTO } from './dtos/position.request';
  
  import {
    AddPositionDoc,
    GetPositionByIdDoc,
    ListPositionsDoc,
    UpdatePositionDoc,
    RemovePositionDoc,
  } from './docs/position.docs';
  
  @Controller('position')
  export class PositionController {
    constructor(
      readonly commandBus: CommandBus,
      readonly queryBus: QueryBus,
    ) {}
    @Version('1')
    @Get('/:id')
    @GetPositionByIdDoc()
    // @Authentication()
    async getPositionById(@Param() { id }: idParamDto) {
      const query = new GetPositionByIdQuery(id);
      return this.queryBus.execute(query);
    }
  
    @Version('1')
    @Get()
    @ListPositionsDoc()
    // @Authentication()
    async listPositions() {
      const query = new ListPositionsQuery();
      return this.queryBus.execute(query);
    }
  
    @Version('1')
    @Post()
    @AddPositionDoc()
    // @Authentication()
    async addPosition(@Body() position: PositionRequestDTO) {
      const query = new AddPositionCommand(
        position.flag,
    position.type,
    
        position.userId,
      
      );
      return this.commandBus.execute(query);
    }
  
    @Version('1')
    @Put('/:id')
    @UpdatePositionDoc()
    // @Authentication()
    async updatePosition(
      @Param() { id }: idParamDto,
      @Body() position: PositionRequestDTO,
    ) {
      const query = new UpdatePositionCommand(
        position.flag,
    position.type,
    
        id,
        position.userId,
      
      );
      return this.commandBus.execute(query);
    }
  
    @Version('1')
    @Delete('/:id')
    @RemovePositionDoc()
    // @Authentication()
    async removePosition(@Param() { id }: idParamDto) {
      const query = new RemovePositionCommand(id);
      return this.commandBus.execute(query);
    }
  }
  
  