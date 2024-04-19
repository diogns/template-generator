
  import { ApiProperty } from '@nestjs/swagger';
  import { IsString, IsNumber } from 'class-validator';
  
  
  
  export class UserResponseDTO {
    
    @ApiProperty({ type: 'number', example: 1 })
    id: number;
    
      @IsString()
      @ApiProperty({ type: 'string', example: 'rmorales' })
      username: string;
      
      @IsString()
      @ApiProperty({ type: 'string', example: 'Raúl Morales' })
      name: string;
      

    constructor(
      id: number,
    username: string,
      name: string,
      
    ) {
      this.id = id;
    this.username = username;
      this.name = name;
      
    }
  }
  