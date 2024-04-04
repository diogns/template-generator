const { getNames } = require('../helpers');

const addDocsGenerator = (entity) => {
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

  export function Add${names.uperFL}ByIdDoc(): MethodDecorator {
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

const addDtosGenerator = (entity) => {
  const names = getNames(entity)
  const attributes = entity.attributes;
  let response = '';
  attributes.map((attribute) => {
    const attributeName = attribute.name;
    let attributeItemResponse = `data.${attributeName},
    `;
    response = response.concat(attributeItemResponse);
  });
  const requestContent = `

  `
  const responseContent = `
  import { ApiProperty } from '@nestjs/swagger';
  import { IsBoolean } from 'class-validator';
  import { List${names.uperFL}sResponseDTO } from '../../list-users/dto/list-users.response';
  
  export class Add${names.uperFL}ResponseDTO {
    @IsBoolean()
    @ApiProperty({ description: 'indicator of successfully operation' })
    success: boolean;
  
    @ApiProperty({ description: 'new user data' })
    user: List${names.uperFL}sResponseDTO;
  
    constructor(success: boolean, user: List${names.uperFL}sResponseDTO) {
      this.success = success;
      this.user = user;
    }
  }
  
  `

  return { requestContent, responseContent };
}

const addControllerGenerator = (entity) => {
  const names = getNames(entity)
  const attributes = entity.attributes;
  let command = '';
  attributes.map((attribute) => {
    const attributeName = attribute.name;
    let attributeItemCommand = `${names.name}.${attributeName},
    `;
    command = command.concat(attributeItemCommand);
  });
  let content = `
  import { Body, Controller, Post, Version } from '@nestjs/common';
  import { CommandBus } from '@nestjs/cqrs';
  import {
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiCreatedResponse,
    ApiTags,
  } from '@nestjs/swagger';
  import { ResponseDescription } from '../response-description';
  import { GeneralResponse } from '../../general.response';
  import { Add${names.uperFL}Command } from '@${names.fileName}/application/commands/add-${names.name}';
  import { Add${names.uperFL}ResponseDTO } from './dto/add-${names.name}.response';
  import { Add${names.uperFL}RequestDTO } from './dto/add-${names.name}.request';
  import { Add${names.uperFL}Doc } from './docs/get-${names.fileName}.docs';

  @ApiTags('${names.uperFL}')
  @Controller('${names.name}')
  export class Add${names.uperFL}Controller {
    constructor(readonly commandBus: CommandBus) {}
  
    @Version('1')
    @Post()
    @Add${names.uperFL}Doc()
    // @Authentication()
    async add${names.uperFL}(@Body() ${names.name}: Add${names.uperFL}RequestDTO) {
      const query = new Add${names.uperFL}Command(
        ${command}
      );
      return this.commandBus.execute(query);
    }
  }  
  `
  return content;
}

module.exports = { addControllerGenerator, addDtosGenerator, addDocsGenerator };
