import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Index,
  } from 'typeorm';
  import { PositionSettingEntity } from './position-setting.entity';
  import { PositionEntity } from './position.entity';
  
  @Entity({ name: 'account' })
  export class AccountEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;
  
    @Index({ unique: true })
    @Column({ type: 'varchar', length: 100 })
    username!: string;
  
    @Column({ type: 'varchar', length: 100 })
    name!: string;
  
    @OneToMany(
      () => PositionSettingEntity,
      (positionSetting) => positionSetting.account,
      { eager: true },
    )
    positionsSettings!: PositionSettingEntity[];
  
    @OneToMany(() => PositionEntity, (position) => position.account, {
      eager: true,
    })
    positions!: PositionEntity[];
  }
  