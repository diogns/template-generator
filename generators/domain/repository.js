const { getNames, crud } = require('../helpers');

const repositoryGenerator = (entity) => {
  const names = getNames(entity)
  let content = `
  import type { Result } from 'neverthrow';

  import type {
    Get${names.uperFL}ByIdDatabaseException,
    List${names.uperFL}sDatabaseException,
    Add${names.uperFL}DatabaseException,
    Update${names.uperFL}DatabaseException,
    Remove${names.uperFL}DatabaseException,
  } from '../../infrastructure/exceptions/${names.fileName}.exception';
  
  import type { ${names.uperFL}Entity } from '../entities/${names.fileName}.entity';
  
  export type List${names.uperFL}sResult = Result<
    ${names.uperFL}Entity[] | null,
    List${names.uperFL}sDatabaseException
  >;
  
  export type Get${names.uperFL}ByIdResult = Result<
    ${names.uperFL}Entity | null,
    Get${names.uperFL}ByIdDatabaseException
  >;
  
  export interface ${names.uperFL}QueriesRepository {
    get${names.uperFL}ById: (id: number) => Promise<Get${names.uperFL}ByIdResult>;
    list${names.uperFL}s: () => Promise<List${names.uperFL}sResult>;
  }
  
  export type Add${names.uperFL}Result = Result<
    ${names.uperFL}Entity | null,
    Add${names.uperFL}DatabaseException
  >;
  export type Update${names.uperFL}Result = Result<
    boolean | null,
    Update${names.uperFL}DatabaseException
  >;
  export type Remove${names.uperFL}Result = Result<
    boolean | null,
    Remove${names.uperFL}DatabaseException
  >;
  
  export interface ${names.uperFL}CommandsRepository {
    add${names.uperFL}: (${names.name}: ${names.uperFL}Entity) => Promise<Add${names.uperFL}Result>;
    update${names.uperFL}: (${names.name}: ${names.uperFL}Entity) => Promise<Update${names.uperFL}Result>;
    remove${names.uperFL}: (id: number) => Promise<Remove${names.uperFL}Result>;
  }
  `;


  return content;
}

module.exports = { repositoryGenerator };
