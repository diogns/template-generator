
  import type { Result } from 'neverthrow';

  import type {
    GetPositionByIdDatabaseException,
    ListPositionsDatabaseException,
    AddPositionDatabaseException,
    UpdatePositionDatabaseException,
    RemovePositionDatabaseException,
  } from '../../infrastructure/exceptions/position.exception';
  
  import type { PositionEntity } from '../entities/position.entity';
  
  export type ListPositionsResult = Result<
    PositionEntity[] | null,
    ListPositionsDatabaseException
  >;
  
  export type GetPositionByIdResult = Result<
    PositionEntity | null,
    GetPositionByIdDatabaseException
  >;
  
  export interface PositionQueriesRepository {
    getPositionById: (id: number) => Promise<GetPositionByIdResult>;
    listPositions: () => Promise<ListPositionsResult>;
  }
  
  export type AddPositionResult = Result<
    PositionEntity | null,
    AddPositionDatabaseException
  >;
  export type UpdatePositionResult = Result<
    boolean | null,
    UpdatePositionDatabaseException
  >;
  export type RemovePositionResult = Result<
    boolean | null,
    RemovePositionDatabaseException
  >;
  
  export interface PositionCommandsRepository {
    addPosition: (position: PositionEntity) => Promise<AddPositionResult>;
    updatePosition: (position: PositionEntity) => Promise<UpdatePositionResult>;
    removePosition: (id: number) => Promise<RemovePositionResult>;
  }
  