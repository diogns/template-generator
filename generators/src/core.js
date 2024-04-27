const { fileAndFolderObject, getNames } = require('../helpers');

const dtosIdParamContent = `import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsPositive, IsNumber } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export class idParamDto {
  @ApiProperty({
    name: 'id',
    example: '1',
    type: 'number',
  })
  @Transform(({ value }) => {
    if (value && isNaN(parseInt(value))) {
      throw new BadRequestException('coreId must be a valid id');
    }
    const id = value ? parseInt(value) : undefined;
    return id;
  })
  @IsNumber()
  @IsPositive()
  id!: number;
}
`;

const docsCommonContent = `import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import {
  ApiBadRequestResponse,
  ApiGatewayTimeoutResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiHeader,
} from '@nestjs/swagger';

import { ResponseDescription } from './constants';

class GenericErrorBadRequest {
  @ApiProperty({ type: 'number', required: true, example: 400 })
  statusCode: number;
  @ApiProperty({ type: 'varchar', required: true, example: '' })
  message: string;
  @ApiProperty({ type: 'varchar', required: true, example: 'Bad Request' })
  error: string;
}

class GenericErrorNotFoundResponse {
  @ApiProperty({ type: 'number', required: true, example: 404 })
  statusCode: number;
  @ApiProperty({
    type: 'varchar',
    required: true,
    example: 'Item was not found in database',
  })
  message: string;
  @ApiProperty({ type: 'varchar', required: true, example: 'Not Found' })
  error: string;
}

class GenericInternalServerErrorResponse {
  @ApiProperty({ type: 'number', required: true, example: 500 })
  statusCode: number;
  @ApiProperty({ type: 'varchar', required: true, example: '' })
  message: string;
  @ApiProperty({
    type: 'varchar',
    required: true,
    example: 'Internal server error',
  })
  error: string;
}

class GenericTimeoutResponse {
  @ApiProperty({ type: 'number', required: true, example: 504 })
  statusCode: number;
  @ApiProperty({ type: 'varchar', required: true, example: 'Gateway Timeout' })
  message: string;
  @ApiProperty({ type: 'varchar', required: true, example: '' })
  error: string;
}

export function CommonResponses() {
  return applyDecorators(
    ApiBadRequestResponse({
      type: GenericErrorBadRequest,
      description: ResponseDescription.BAD_REQUEST,
    }),
    ApiNotFoundResponse({
      type: GenericErrorNotFoundResponse,
      description: ResponseDescription.NOT_FOUND,
    }),
    ApiInternalServerErrorResponse({
      type: GenericInternalServerErrorResponse,
      description: ResponseDescription.INTERNAL_SERVER_ERROR,
    }),
    ApiGatewayTimeoutResponse({
      type: GenericTimeoutResponse,
      description: ResponseDescription.API_GATEWAY_TIMEOUT,
    }),
    ApiHeader({
      name: 'Authorization',
      description: 'Authorization bearer token',
      example: 'Bearer eySFDERWfsdGDFSGXZxCvsdwecfsdG=',
    }),
  );
}
`;

const docsConstantsContent = `export enum ResponseDescription {
  GET_ITEM = 'Get Item OK.',
  LIST_ITEMS = 'List Items OK.',
  POST_ITEM = 'Add Item OK.',
  DELETE_ITEM = 'Delete Item OK.',
  UPDATE_ITEM = 'Update Item OK.',
  NOT_FOUND = 'Item not found.',
  BAD_REQUEST = 'Malformed request.',
  API_GATEWAY_TIMEOUT = 'Operation timeout.',
  INTERNAL_SERVER_ERROR = 'Internal server error.',
}
`;

const coreGenerator = (ffobject) => {
  // infrastructure
  const newFfobjectInfraConstants = JSON.parse(JSON.stringify(fileAndFolderObject));
  newFfobjectInfraConstants.type = 'file';
  newFfobjectInfraConstants.name = 'constants.ts';
  newFfobjectInfraConstants.content = `
  export enum InfrastructureDefaultExceptionCode {
    // General
    Default = 'DEFAULT_INFRA_EXCEPTION',
  }
  `;

  const newFfobjectInfraException = JSON.parse(JSON.stringify(fileAndFolderObject));
  newFfobjectInfraException.type = 'file';
  newFfobjectInfraException.name = 'exception.ts';
  newFfobjectInfraException.content = `
  import { InfrastructureDefaultExceptionCode } from './constants';

  export abstract class InfrastructureException extends Error {
    code: string;
  
    constructor(message?: string) {
      super(message);
      this.code = InfrastructureDefaultExceptionCode.Default;
    }
  }  
  `;

  const newFfobjectInfra = JSON.parse(JSON.stringify(fileAndFolderObject));
  newFfobjectInfra.type = 'dir';
  newFfobjectInfra.name = 'infrastructure';
  newFfobjectInfra.seeds.push(...[newFfobjectInfraConstants, newFfobjectInfraException]);
  ffobject.seeds.push(newFfobjectInfra);

  // interfaces
  const docsCommon = JSON.parse(JSON.stringify(fileAndFolderObject));
  docsCommon.type = 'file';
  docsCommon.name = 'common.ts';
  docsCommon.content = docsCommonContent;

  const docsConstants = JSON.parse(JSON.stringify(fileAndFolderObject));
  docsConstants.type = 'file';
  docsConstants.name = 'constants.ts';
  docsConstants.content = docsConstantsContent;

  const newFfobjectInterfacesDocs= JSON.parse(JSON.stringify(fileAndFolderObject));
  newFfobjectInterfacesDocs.type = 'dir';
  newFfobjectInterfacesDocs.name = 'docs';
  newFfobjectInterfacesDocs.seeds.push(...[docsCommon, docsConstants]);

  const dtosIdParam= JSON.parse(JSON.stringify(fileAndFolderObject));
  dtosIdParam.type = 'file';
  dtosIdParam.name = 'id-param.request.ts';
  dtosIdParam.content = dtosIdParamContent;

  const newFfobjectInterfacesDtos = JSON.parse(JSON.stringify(fileAndFolderObject));
  newFfobjectInterfacesDtos.type = 'dir';
  newFfobjectInterfacesDtos.name = 'dtos';
  newFfobjectInterfacesDtos.seeds.push(dtosIdParam);
  
  
  const newFfobjectInterfaces = JSON.parse(JSON.stringify(fileAndFolderObject));
  newFfobjectInterfaces.type = 'dir';
  newFfobjectInterfaces.name = 'interfaces';
  newFfobjectInterfaces.seeds.push(...[newFfobjectInterfacesDtos, newFfobjectInterfacesDocs]);
  ffobject.seeds.push(newFfobjectInterfaces);

};

module.exports = { coreGenerator };
