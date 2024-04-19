
  import { ApiProperty } from '@nestjs/swagger';
  import {
    IsNumber,
    IsNotEmpty,
    IsString,
    MinLength,
    IsOptional,
  } from 'class-validator';
  
  export class PositionRequestDTO {
    
    @ApiProperty({ type: 'number', required: false, example: 1 })
    @IsOptional()
    @IsNumber()
    id?: number;
    
      @IsNotEmpty()
      @IsString()
      @MinLength(3)
      @ApiProperty({ type: 'string', required: true, example: 'flag' })
      flag!: string;
      
      @ApiProperty({ type: 'number', required: true, example: '2' })
      @IsOptional()
      @IsNumber()
      type!: number;
      
      @ApiProperty({ type: 'number', required: false, example: 1 })
      @IsOptional()
      @IsNumber()
      userId?: number;
      
  }
  