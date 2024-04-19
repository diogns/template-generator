import { applyDecorators } from '@nestjs/common';
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
