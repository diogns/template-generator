import type { UserEntity } from '@modules/user/domain/entities/user.entity';
      export class PositionEntity {
      readonly id?: number;
      readonly flag!: string;
    readonly type!: number;
    
      readonly user?: UserEntity;
      readonly userId?: number;
      
  constructor(
  flag: string,
    type: number,
    id?: number,
      user?: UserEntity,
      userId?: number,
      ) {
  this.flag = flag;
    this.type = type;
    this.id = id;
      this.user = user;
      this.userId = userId;
      }
    }
    