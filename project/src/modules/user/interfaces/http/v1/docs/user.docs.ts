
  import { applyDecorators } from '@nestjs/common';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  
  import { ModUserResponseDTO } from '../dtos/mod-user.response';
  import { UserResponseDTO } from '../dtos/user.response';
  import { CommonResponses } from '@core/interfaces/docs/common';
  import { ResponseDescription } from '@core/interfaces/docs/constants';
  
  export function GetUserByIdDoc(): MethodDecorator {
    return applyDecorators(
      ApiTags('v1/user'),
      ApiOperation({
        summary: 'Get a user by id',
      }),
      ApiResponse({
        status: 200,
        type: UserResponseDTO,
        description: ResponseDescription.GET_ITEM,
      }),
  
      CommonResponses(),
    );
  }
  
  export function ListUsersDoc(): MethodDecorator {
    return applyDecorators(
      ApiTags('v1/user'),
      ApiOperation({
        summary: 'Get a list of users',
      }),
      ApiResponse({
        status: 200,
        type: [UserResponseDTO],
        description: ResponseDescription.LIST_ITEMS,
      }),
  
      CommonResponses(),
    );
  }
  
  export function AddUserDoc(): MethodDecorator {
    return applyDecorators(
      ApiTags('v1/user'),
      ApiOperation({
        summary: 'Add new user',
      }),
      ApiResponse({
        status: 200,
        type: ModUserResponseDTO,
        description: ResponseDescription.POST_ITEM,
      }),
  
      CommonResponses(),
    );
  }
  
  export function UpdateUserDoc(): MethodDecorator {
    return applyDecorators(
      ApiTags('v1/user'),
      ApiOperation({
        summary: 'Update a user',
      }),
      ApiResponse({
        status: 200,
        // type: UpdateUserResponseDTO,
        description: ResponseDescription.UPDATE_ITEM,
      }),
  
      CommonResponses(),
    );
  }
  
  export function RemoveUserDoc(): MethodDecorator {
    return applyDecorators(
      ApiTags('v1/user'),
      ApiOperation({
        summary: 'Remove a user by id',
      }),
      ApiResponse({
        status: 200,
        type: ModUserResponseDTO,
        description: ResponseDescription.DELETE_ITEM,
      }),
  
      CommonResponses(),
    );
  }
  
  