
  import { InfrastructureException } from '@core/infrastructure/exception';
import { InfrastructureExceptionCode } from './infrastructure.exception';

export class GetUserByIdDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(GetUserByIdDatabaseException.getMessage());
    this.code =
      InfrastructureExceptionCode.GetUserByIdDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when getting a user';
  }
}

export class ListUsersDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(ListUsersDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.ListUsersDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when listing users';
  }
}

export class AddUserDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(AddUserDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.AddUserDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when adding new user';
  }
}

export class UpdateUserDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(UpdateUserDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.UpdateUserDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when updating a user';
  }
}

export class RemoveUserDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(RemoveUserDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.RemoveUserDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when removing a user';
  }
}

  