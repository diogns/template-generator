const { getNames } = require('../helpers');

const infrastructureExceptionGenerator = (entity) => {
  const names = getNames(entity)
  let content = `
  export enum InfrastructureExceptionCode {
    // ${names.uperFL}s
    Add${names.uperFL}DatabaseExceptionCode = 'ADD_${names.nameUper}_DATABASE_EXCEPTION',
    Update${names.uperFL}DatabaseExceptionCode = 'UPDATE_${names.nameUper}_DATABASE_EXCEPTION',
    Remove${names.uperFL}DatabaseExceptionCode = 'REMOVE_${names.nameUper}_DATABASE_EXCEPTION',
    Get${names.uperFL}ByIdDatabaseExceptionCode = 'GET_${names.nameUper}_BY_ID_DATABASE_EXCEPTION',
    List${names.uperFL}sDatabaseExceptionCode = 'LIST_${names.nameUper}S_DATABASE_EXCEPTION',
  }
  `;

  return content;
}


const exceptionGenerator = (entity) => {
  const names = getNames(entity)

  let content = `
  import { InfrastructureException } from '@core/infrastructure/exception';
import { InfrastructureExceptionCode } from './infrastructure.exception';

export class Get${names.uperFL}ByIdDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(Get${names.uperFL}ByIdDatabaseException.getMessage());
    this.code =
      InfrastructureExceptionCode.Get${names.uperFL}ByIdDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when getting a ${names.name}';
  }
}

export class List${names.uperFL}sDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(List${names.uperFL}sDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.List${names.uperFL}sDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when listing ${names.name}s';
  }
}

export class Add${names.uperFL}DatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(Add${names.uperFL}DatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.Add${names.uperFL}DatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when adding new ${names.name}';
  }
}

export class Update${names.uperFL}DatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(Update${names.uperFL}DatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.Update${names.uperFL}DatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when updating a ${names.name}';
  }
}

export class Remove${names.uperFL}DatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(Remove${names.uperFL}DatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.Remove${names.uperFL}DatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when removing a ${names.name}';
  }
}

  `;

  return content;
}

module.exports = { exceptionGenerator, infrastructureExceptionGenerator };
