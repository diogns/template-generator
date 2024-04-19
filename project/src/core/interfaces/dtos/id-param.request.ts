import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsPositive, IsNumber } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export class idParamDto {
  @ApiProperty({
    name: 'id',
    example: '1',
    type: 'string',
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
