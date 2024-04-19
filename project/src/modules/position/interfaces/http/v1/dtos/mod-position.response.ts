
  import { ApiProperty } from '@nestjs/swagger';
  import { IsBoolean } from 'class-validator';
  import { PositionResponseDTO } from './position.response';
  
  export class ModPositionResponseDTO {
    @IsBoolean()
    @ApiProperty({ description: 'indicator of successfully operation' })
    success: boolean;
  
    @ApiProperty({ description: 'new position data' })
    position?: PositionResponseDTO;
  
    constructor(success: boolean, position?: PositionResponseDTO) {
      this.success = success;
      this.position = position;
    }
  }  
  