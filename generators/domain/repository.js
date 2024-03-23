const { getNames, crud } = require('../helpers');

const repositoryGenerator = (entity) => {
    const names = getNames(entity)
    let content = '';

    // header
    let importsHeaders = '';
    crud.map((method) => {
        const action = method.action;
        const type = method.type;
        const name = method.name;
        let actionImport = '';
        if (type == 'command') {
          actionImport = `${action}${names.uperFL}DatabaseException,
        `
        }
        if (type == 'query') {
          if (name == 'get') {
            actionImport = `${action}${names.uperFL}ByIdDatabaseException,
            `
          }
          if (name == 'list') {
            actionImport = `${action}${names.uperFL}sDatabaseException,
            `
          }
        }
        importsHeaders = importsHeaders.concat(actionImport);
    })
    const header = `
    import { Result } from 'neverthrow';
    
    import {
        ${importsHeaders}
      } from '../../infrastructure/exceptions/${names.fileName}.exception';      
    
      import { ${names.uperFL}Entity } from '../entities/${names.fileName}';
      `
    content = content.concat(header);

    // body
    const typesResultAndInterfaces = `
    export type List${names.uperFL}sResult = Result<
      ${names.uperFL}Entity[] | null,
      List${names.uperFL}sDatabaseException
    >;

    export type Get${names.uperFL}ByIdResult = Result<
      ${names.uperFL}Entity | null,
      Get${names.uperFL}ByIdDatabaseException
    >;

    export interface ${names.uperFL}QueriesRepository {
      list${names.uperFL}s: () => Promise<List${names.uperFL}sResult>;
      get${names.uperFL}ById: (id: number) => Promise<Get${names.uperFL}ByIdResult>;
    }

    export type Add${names.uperFL}Result = Result<
      boolean | null,
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
    `
    content = content.concat(typesResultAndInterfaces);
    // footer
   
    return content;
}

module.exports = { repositoryGenerator };
