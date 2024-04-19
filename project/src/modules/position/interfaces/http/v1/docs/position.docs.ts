
  import { applyDecorators } from '@nestjs/common';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  
  import { ModPositionResponseDTO } from '../dtos/mod-position.response';
  import { PositionResponseDTO } from '../dtos/position.response';
  import { CommonResponses } from '@core/interfaces/docs/common';
  import { ResponseDescription } from '@core/interfaces/docs/constants';
  
  export function GetPositionByIdDoc(): MethodDecorator {
    return applyDecorators(
      ApiTags('v1/position'),
      ApiOperation({
        summary: 'Get a position by id',
      }),
      ApiResponse({
        status: 200,
        type: PositionResponseDTO,
        description: ResponseDescription.GET_ITEM,
      }),
  
      CommonResponses(),
    );
  }
  
  export function ListPositionsDoc(): MethodDecorator {
    return applyDecorators(
      ApiTags('v1/position'),
      ApiOperation({
        summary: 'Get a list of positions',
      }),
      ApiResponse({
        status: 200,
        type: [PositionResponseDTO],
        description: ResponseDescription.LIST_ITEMS,
      }),
  
      CommonResponses(),
    );
  }
  
  export function AddPositionDoc(): MethodDecorator {
    return applyDecorators(
      ApiTags('v1/position'),
      ApiOperation({
        summary: 'Add new position',
      }),
      ApiResponse({
        status: 200,
        type: ModPositionResponseDTO,
        description: ResponseDescription.POST_ITEM,
      }),
  
      CommonResponses(),
    );
  }
  
  export function UpdatePositionDoc(): MethodDecorator {
    return applyDecorators(
      ApiTags('v1/position'),
      ApiOperation({
        summary: 'Update a position',
      }),
      ApiResponse({
        status: 200,
        // type: UpdatePositionResponseDTO,
        description: ResponseDescription.UPDATE_ITEM,
      }),
  
      CommonResponses(),
    );
  }
  
  export function RemovePositionDoc(): MethodDecorator {
    return applyDecorators(
      ApiTags('v1/position'),
      ApiOperation({
        summary: 'Remove a position by id',
      }),
      ApiResponse({
        status: 200,
        type: ModPositionResponseDTO,
        description: ResponseDescription.DELETE_ITEM,
      }),
  
      CommonResponses(),
    );
  }
  
  