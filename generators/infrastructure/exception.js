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
    const expression = method.expression;

    const exceptionItem = `
    export class ${action}${names.uperFL}DatabaseException extends InfrastructureException {
      code: string;
      constructor() {
        super(${action}${names.uperFL}DatabaseException.getMessage());
        this.code = InfrastructureExceptionCode.${action}${names.uperFL}DatabaseExceptionCode;
      }
      static getMessage(): string {
        return 'There was an error in the database when ${expression} ${names.name}';
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
      const actionUper = method.actionUper;

      const actionDefinition = `
      ${action}${names.uperFL}DatabaseExceptionCode = '${actionUper}_${names.nameUper}_DATABASE_EXCEPTION',`
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
