
    import {
        PrimaryGeneratedColumn,
        
        BaseEntity,
        Column,
        Entity,
        
        ManyToOne,
        JoinColumn,
      } from 'typeorm';

    import { UserEntity } from '@modules/user/infrastructure/entities/user.entity';
      @Entity({ name: 'position' })
      export class PositionEntity extends BaseEntity {
    
      @PrimaryGeneratedColumn('increment')
      id!: number;

      @Column({ type: 'varchar', length: 100 })
      flag!: string;

    @Column({ type: 'int' })
      type!: number;

    
    @ManyToOne(() => UserEntity, ( user) => user.positions)
    @JoinColumn({ name: 'userId' })
    user!: UserEntity;
    
      }
    
      