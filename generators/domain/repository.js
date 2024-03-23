const { getNames, crud } = require('../helpers');

const repositoryGenerator = (entity) => {
    const names = getNames(entity)
    let content = '';

    // header
    let importsHeaders = '';
    crud.map((method) => {
        const action = method.action;        
        const actionImport = `${action}${names.uperFL}DatabaseException,
        `
        importsHeaders = importsHeaders.concat(actionImport);
    })
    const header = `
    import { Result } from 'neverthrow';
    
    import {
        ${importsHeaders}
      } from '../../infrastructure/exceptions/$Ge{names.fileName}.exception';      
    
      import { ${names.uperFL}Entity } from '../../domain/entities/${names.fileName}.entity';
      `
    content = content.concat(header);

    // body
    const typesResultAndInterfaces = `
    export type Add${names.uperFL}Result = Result<
      boolean | null,
      Add${names.uperFL}DatabaseException
    >;
    export type Get${names.uperFL}Result = Result<
      ${names.uperFL}Entity | null,
      Get${names.uperFL}DatabaseException
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
      get${names.uperFL}: (id: number) => Promise<Get${names.uperFL}Result>;
      update${names.uperFL}: (${names.name}: ${names.uperFL}Entity) => Promise<Update${names.uperFL}Result>;
      remove${names.uperFL}: (id: number) => Promise<Remove${names.uperFL}Result>;
    }
    `
    content = content.concat(typesResultAndInterfaces);
    // footer
   
    return content;
}

module.exports = { repositoryGenerator };
