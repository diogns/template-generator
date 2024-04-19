
  import { ApiProperty } from '@nestjs/swagger';
  import { IsString, IsNumber } from 'class-validator';
  
      import type { UserResponseDTO } from '@modules/user/interfaces/http/v1/dtos/user.response';
  
  
  export class PositionResponseDTO {
    
    @ApiProperty({ type: 'number', example: 1 })
    id: number;
    
      @IsString()
      @ApiProperty({ type: 'string', example: 'flag' })
      flag: string;
      
      @IsNumber()
      @ApiProperty({ type: 'number', example: 2 })
      type: number;
      
      user?: UserResponseDTO;

    constructor(
      id: number,
    flag: string,
      type: number,
      
      user?: UserResponseDTO,
    ) {
      this.id = id;
    this.flag = flag;
      this.type = type;
      
      this.user = user;
    }
  }
  