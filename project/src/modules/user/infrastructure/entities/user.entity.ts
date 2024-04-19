
    import {
        PrimaryGeneratedColumn,
        
        BaseEntity,
        Column,
        Entity,
        OneToMany,
        
        
      } from 'typeorm';

    import { PositionEntity } from '@modules/position/infrastructure/entities/position.entity';
      @Entity({ name: 'user' })
      export class UserEntity extends BaseEntity {
    
      @PrimaryGeneratedColumn('increment')
      id!: number;

      @Column({ type: 'varchar', length: 100 })
      username!: string;

    @Column({ type: 'varchar', length: 100 })
      name!: string;

    
    @OneToMany(
      () => PositionEntity,
      (position) => position.user,
      { eager: true },
    )
    positions!: PositionEntity[];
    
      }
    
      