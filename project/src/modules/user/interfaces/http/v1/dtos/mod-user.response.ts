
  import { ApiProperty } from '@nestjs/swagger';
  import { IsBoolean } from 'class-validator';
  import { UserResponseDTO } from './user.response';
  
  export class ModUserResponseDTO {
    @IsBoolean()
    @ApiProperty({ description: 'indicator of successfully operation' })
    success: boolean;
  
    @ApiProperty({ description: 'new user data' })
    user?: UserResponseDTO;
  
    constructor(success: boolean, user?: UserResponseDTO) {
      this.success = success;
      this.user = user;
    }
  }  
  