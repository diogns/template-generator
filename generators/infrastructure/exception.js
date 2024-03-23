const { getNames, crud } = require('../helpers');

const exceptionGenerator = (entity) => {
  const names = getNames(entity)
  let content = '';

  // headers
  const header = `
    import {
        InfrastructureException,
        InfrastructureExceptionCode,
      } from './infrastructure.exception';
    `
  content = content.concat(header);

  // body
  crud.map((method) => {
    const action = method.action;
    const type = method.type;
    const name = method.name;
    const expression = method.expression;
    let classAndConstructor = '';
    let when = '';
    if (type == 'command') {
      classAndConstructor = `${action}${names.uperFL}`;
      when = `${expression} ${names.name}`;
    }
    if (type == 'query') {
      if (name == 'get') {
        classAndConstructor = `${action}${names.uperFL}ById`;
        when = `${expression} ${names.name}`;
      }
      if (name == 'list') {
        classAndConstructor = `${action}${names.uperFL}s`;
        when = `${expression} ${names.name}s`;
      }
    }

    const exceptionItem = `
    export class ${classAndConstructor}DatabaseException extends InfrastructureException {
      code: string;
      constructor() {
        super(${classAndConstructor}DatabaseException.getMessage());
        this.code = InfrastructureExceptionCode.${classAndConstructor}DatabaseExceptionCode;
      }
      static getMessage(): string {
        return 'There was an error in the database when ${when}';
      }
    }
    `
    content = content.concat(exceptionItem);
  })
  return content;
}

const infrastructureExceptionGenerator = (entities) => {
  let content = '';

  // headers
  const header = `
  export enum InfrastructureExceptionCode {
    // General
    Default = 'DEFAULT_INFRA_EXCEPTION',
    
  `
  content = content.concat(header);

  // body
  entities.map((entity) => {
    const names = getNames(entity)

    let entitBody = `
    
    // ${names.pluralUperFL}`
    crud.map((method) => {
      const action = method.action;
      const type = method.type;
      const name = method.name;
      const actionUper = method.actionUper;
      let actionDefinition = '';

      if (type == 'command') {
        actionDefinition = `
        ${action}${names.uperFL}DatabaseExceptionCode = '${actionUper}_${names.nameUper}_DATABASE_EXCEPTION',`
      }
      if (type == 'query') {
        if (name == 'get') {
          actionDefinition = `
          ${action}${names.uperFL}ByIdDatabaseExceptionCode = '${actionUper}_${names.nameUper}_BY_ID_DATABASE_EXCEPTION',`
        }
        if (name == 'list') {
          actionDefinition = `
          ${action}${names.uperFL}sDatabaseExceptionCode = '${actionUper}_${names.nameUper}S_DATABASE_EXCEPTION',`
        }
      }

      entitBody = entitBody.concat(actionDefinition);
    })
    content = content.concat(entitBody);

  })

  // footer
  const footer = `
  }
  
  export abstract class InfrastructureException extends Error {
    code: string;
  
    constructor(message?: string) {
      super(message);
      this.code = InfrastructureExceptionCode.Default;
    }
  }
  `
  content = content.concat(footer);

  return content;
}

module.exports = { exceptionGenerator, infrastructureExceptionGenerator };
