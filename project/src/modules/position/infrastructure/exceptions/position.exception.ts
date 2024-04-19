
  import { InfrastructureException } from '@core/infrastructure/exception';
import { InfrastructureExceptionCode } from './infrastructure.exception';

export class GetPositionByIdDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(GetPositionByIdDatabaseException.getMessage());
    this.code =
      InfrastructureExceptionCode.GetPositionByIdDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when getting a position';
  }
}

export class ListPositionsDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(ListPositionsDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.ListPositionsDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when listing positions';
  }
}

export class AddPositionDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(AddPositionDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.AddPositionDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when adding new position';
  }
}

export class UpdatePositionDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(UpdatePositionDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.UpdatePositionDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when updating a position';
  }
}

export class RemovePositionDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(RemovePositionDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.RemovePositionDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when removing a position';
  }
}

  