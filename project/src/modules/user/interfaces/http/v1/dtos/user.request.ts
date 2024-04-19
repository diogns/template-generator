
  import { ApiProperty } from '@nestjs/swagger';
  import {
    IsNumber,
    IsNotEmpty,
    IsString,
    MinLength,
    IsOptional,
  } from 'class-validator';
  
  export class UserRequestDTO {
    
    @ApiProperty({ type: 'number', required: false, example: 1 })
    @IsOptional()
    @IsNumber()
    id?: number;
    
      @IsNotEmpty()
      @IsString()
      @MinLength(3)
      @ApiProperty({ type: 'string', required: true, example: 'rmorales' })
      username!: string;
      
      @IsNotEmpty()
      @IsString()
      @MinLength(3)
      @ApiProperty({ type: 'string', required: true, example: 'Raúl Morales' })
      name!: string;
      
  }
  