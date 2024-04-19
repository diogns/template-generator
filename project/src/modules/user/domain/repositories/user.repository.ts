
  import type { Result } from 'neverthrow';

  import type {
    GetUserByIdDatabaseException,
    ListUsersDatabaseException,
    AddUserDatabaseException,
    UpdateUserDatabaseException,
    RemoveUserDatabaseException,
  } from '../../infrastructure/exceptions/user.exception';
  
  import type { UserEntity } from '../entities/user.entity';
  
  export type ListUsersResult = Result<
    UserEntity[] | null,
    ListUsersDatabaseException
  >;
  
  export type GetUserByIdResult = Result<
    UserEntity | null,
    GetUserByIdDatabaseException
  >;
  
  export interface UserQueriesRepository {
    getUserById: (id: number) => Promise<GetUserByIdResult>;
    listUsers: () => Promise<ListUsersResult>;
  }
  
  export type AddUserResult = Result<
    UserEntity | null,
    AddUserDatabaseException
  >;
  export type UpdateUserResult = Result<
    boolean | null,
    UpdateUserDatabaseException
  >;
  export type RemoveUserResult = Result<
    boolean | null,
    RemoveUserDatabaseException
  >;
  
  export interface UserCommandsRepository {
    addUser: (user: UserEntity) => Promise<AddUserResult>;
    updateUser: (user: UserEntity) => Promise<UpdateUserResult>;
    removeUser: (id: number) => Promise<RemoveUserResult>;
  }
  