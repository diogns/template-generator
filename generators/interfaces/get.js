const { getNames } = require('../helpers');

const getDocsGenerator = (entity) => {
  const names = getNames(entity)
  let content = `
  import { applyDecorators } from '@nestjs/common';
  import { GenericError } from '@auna/common';
  import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiGatewayTimeoutResponse,
    ApiHeader,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
  import { GetAppointmentsHistoryResultDTO } from '../dto/get-appointments-history.result.dto';
  import { ResponseDescription } from '../../../../../../module/interfaces/helpers/response.description';
 import { StandardResponseDto } from '../../../common/dto/response-standard.dto';

  export function Get${names.uperFL}ByIdDoc(): MethodDecorator {
    return applyDecorators(
      ApiTags('${names.uperFL}/v1'),
      ApiOperation({
        summary: 'Book appointment slot in Core system. Asynchronous process.',
      }),
      ApiResponse({
        status: 200,
        type: GetAppointmentsHistoryResultDTO,
        description: ResponseDescription.APPOINTMENTS_HISTORY_FOUND,
      }),
      ApiBadRequestResponse({
        type: GenericError,
        description: ResponseDescription.BAD_REQUEST,
      }),
      ApiNotFoundResponse({
        type: GenericError,
      }),
      ApiInternalServerErrorResponse({
        type: GenericError,
        description: ResponseDescription.INTERNAL_SERVER_ERROR,
      }),
      ApiGatewayTimeoutResponse({
        type: GenericError,
        description: ResponseDescription.API_GATEWAY_TIMEOUT,
      }),
      // ApiHeader({
      //   name: 'Authorization',
      //   description: 'Authorization bearer token',
      //   example: 'Bearer eySFDERWfsdGDFSGXZxCvsdwecfsdG=',
      // }),
    );
  }
  `


  return content;
}

const getDtosGenerator = (entity) => {
  const names = getNames(entity)
  const attributes = entity.attributes;
  let response = '';
  attributes.map((attribute) => {
    const attributeName = attribute.name;
    let attributeItemResponse = `data.${attributeName},
    `;
    response = response.concat(attributeItemResponse);
  });
  let content = `
  import { Controller, Get, Param, Version } from '@nestjs/common';
  import { QueryBus } from '@nestjs/cqrs';
  import {
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
  } from '@nestjs/swagger';
  import { ResponseDescription } from '../response-description';
  import { GeneralResponse } from '../../general.response';
  import { List@${names.Ufl}/sResponseDTO } from '../list-users/dto/list-users.response';
  import { Get@${names.Ufl}/ByCodeQuery } from '@user/application/queries/get-user-by-code';
  
  @ApiTags('@${names.Ufl}/')
  @Controller('user')
  export class Get@${names.Ufl}/ByCodeController {
    constructor(readonly queryBus: QueryBus) {}
  
    @Version('1')
    @Get(':user_code')
    @ApiOkResponse({
      description: ResponseDescription.OK,
      type: List@${names.Ufl}/sResponseDTO,
    })
    @ApiNotFoundResponse({
      description: ResponseDescription.NOT_FOUND,
      type: GeneralResponse,
    })
    @ApiInternalServerErrorResponse({
      description: ResponseDescription.INTERNAL_SERVER_ERROR,
      type: GeneralResponse,
    })
    @ApiParam({
      name: 'user_code',
      required: true,
      type: Number,
      description: '@${names.Ufl}/ code',
    })
    async get@${names.Ufl}/ById(@Param('id') id: number) {
      const query = new Get@${names.Ufl}/ByIdQuery(id);
      return this.queryBus.execute(query);
    }
  }
  
  `


  return content;
}

const getControllerGenerator = (entity) => {
  const names = getNames(entity)

  let content = `
  import { Controller, Get, Param, Version } from '@nestjs/common';
  import { QueryBus } from '@nestjs/cqrs';
  import {
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
  } from '@nestjs/swagger';
  import { ResponseDescription } from '../response-description';
  import { GeneralResponse } from '../../general.response';
  import { List${names.uperFL}sResponseDTO } from '../list-${names.fileName}s/dto/list-${names.fileName}s.response';
  import { Get${names.uperFL}ByIdQuery } from '@${names.fileName}/application/queries/get-${names.fileName}-by-id.query';
  import { Get${names.uperFL}ByIdDoc } from './docs/get-${names.fileName}-by-id.docs';

  @ApiTags('${names.uperFL}')
  @Controller('${names.name}')
  export class Get${names.uperFL}ByIdController {
    constructor(readonly queryBus: QueryBus) {}
  
    @Version('1')
    @Get('')
    @Get${names.uperFL}ByIdDoc()
    // @Authentication()
    async get${names.uperFL}ById(@Param('id') id: number) {
      const query = new Get${names.uperFL}ByIdQuery(id);
      return this.queryBus.execute(query);
    }
  }
  `
  return content;
}

module.exports = { getControllerGenerator, getDtosGenerator, getDocsGenerator };
