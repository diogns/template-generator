const { getNames } = require('../helpers');

const docsGenerator = (entity) => {
  const names = getNames(entity)

  let content = `
  import { applyDecorators } from '@nestjs/common';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  
  import { Mod${names.uperFL}ResponseDTO } from '../dtos/mod-${names.fileName}.response';
  import { ${names.uperFL}ResponseDTO } from '../dtos/${names.fileName}.response';
  import { CommonResponses } from '@core/interfaces/docs/common';
  import { ResponseDescription } from '@core/interfaces/docs/constants';
  
  export function Get${names.uperFL}ByIdDoc(): MethodDecorator {
    return applyDecorators(
      ApiTags('v1/${names.fileName}'),
      ApiOperation({
        summary: 'Get a ${names.name} by id',
      }),
      ApiResponse({
        status: 200,
        type: ${names.uperFL}ResponseDTO,
        description: ResponseDescription.GET_ITEM,
      }),
  
      CommonResponses(),
    );
  }
  
  export function List${names.uperFL}sDoc(): MethodDecorator {
    return applyDecorators(
      ApiTags('v1/${names.fileName}'),
      ApiOperation({
        summary: 'Get a list of ${names.name}s',
      }),
      ApiResponse({
        status: 200,
        type: [${names.uperFL}ResponseDTO],
        description: ResponseDescription.LIST_ITEMS,
      }),
  
      CommonResponses(),
    );
  }
  
  export function Add${names.uperFL}Doc(): MethodDecorator {
    return applyDecorators(
      ApiTags('v1/${names.fileName}'),
      ApiOperation({
        summary: 'Add new ${names.name}',
      }),
      ApiResponse({
        status: 200,
        type: Mod${names.uperFL}ResponseDTO,
        description: ResponseDescription.POST_ITEM,
      }),
  
      CommonResponses(),
    );
  }
  
  export function Update${names.uperFL}Doc(): MethodDecorator {
    return applyDecorators(
      ApiTags('v1/${names.fileName}'),
      ApiOperation({
        summary: 'Update a ${names.name}',
      }),
      ApiResponse({
        status: 200,
        // type: Update${names.uperFL}ResponseDTO,
        description: ResponseDescription.UPDATE_ITEM,
      }),
  
      CommonResponses(),
    );
  }
  
  export function Remove${names.uperFL}Doc(): MethodDecorator {
    return applyDecorators(
      ApiTags('v1/${names.fileName}'),
      ApiOperation({
        summary: 'Remove a ${names.name} by id',
      }),
      ApiResponse({
        status: 200,
        type: Mod${names.uperFL}ResponseDTO,
        description: ResponseDescription.DELETE_ITEM,
      }),
  
      CommonResponses(),
    );
  }
  
  `
  return content;
}

module.exports = { docsGenerator };
