const { getNames } = require('../helpers');

const repositoryGenerator = (entity) => {
  const names = getNames(entity)
  let content = '';

  // headers
  let imports = `
    import { Inject, Logger, Injectable } from '@nestjs/common';
    import { err, ok } from 'neverthrow';
    import { DatabaseManager } from '../../core/infrastructure/database-manager';

    import { ${names.uperFL}Entity } from '../../domain/entities/${names.fileName}.entity';
    import {
      Get${names.uperFL}ByIdResult,
      List${names.uperFL}sResult,
      Add${names.uperFL}Result,
      Update${names.uperFL}Result,
      Remove${names.uperFL}Result,
      ${names.uperFL}CommandsRepository,
      ${names.uperFL}QueriesRepository,
    } from '../../domain/repositories/${names.fileName}.repository';
    import {
      Get${names.uperFL}ByIdDatabaseException,
      List${names.uperFL}sDatabaseException,
      Add${names.uperFL}DatabaseException,
      Update${names.uperFL}DatabaseException,
      Remove${names.uperFL}DatabaseException,
    } from '../exceptions/${names.fileName}.exception';
  `;
  content = content.concat(imports);

  // body
  const queryImplements = `
  export class ${names.uperFL}QueriesImplement 
    extends DatabaseManager  
    implements ${names.uperFL}QueriesRepository 
  {
    
    @Inject()
    private readonly logger: Logger;
      
    async get${names.uperFL}ById(id: number): Promise<Get${names.uperFL}ByIdResult> {
      try {

        return ok('ok' as any);
      } catch (error) {
        this.logger.error(error, '${names.uperFL}QueriesImplement.get${names.uperFL}ById');
        return err(new Get${names.uperFL}ByIdDatabaseException());
      }
    }

    async list${names.uperFL}s(): Promise<List${names.uperFL}sResult> {
      try {

        return ok('ok' as any);
      } catch (error) {
        this.logger.error(error, '${names.uperFL}QueriesImplement.list${names.uperFL}s');
        return err(new List${names.uperFL}sDatabaseException());
      }
    }
  }  
  `
  content = content.concat(queryImplements);

  const commandImplements = `
  @Injectable()
  export class ${names.uperFL}CommandsImplement 
    extends DatabaseManager  
    implements ${names.uperFL}CommandsRepository 
  {
    
    @Inject()
    private readonly logger: Logger;
  
    async add${names.uperFL}(${names.name}: ${names.uperFL}Entity): Promise<Add${names.uperFL}Result> {
      try {

        return ok('ok' as any);
      } catch (error) {
        this.logger.error(error, '${names.uperFL}CommandsImplement.add${names.uperFL}');
        return err(new Add${names.uperFL}DatabaseException());
      }
    }
  
    async update${names.uperFL}(${names.name}: ${names.uperFL}Entity): Promise<Update${names.uperFL}Result> {
      try {

        return ok(true);
      } catch (error) {
        this.logger.error(error, '${names.uperFL}CommandsImplement.update${names.uperFL}');
        return err(new Update${names.uperFL}DatabaseException());
      }
    }
  
    async remove${names.uperFL}(id: number): Promise<Remove${names.uperFL}Result> {
      try {

        return ok(true);
      } catch (error) {
        this.logger.error(error, '${names.uperFL}CommandsImplement.remove${names.uperFL}');
        return err(new Remove${names.uperFL}DatabaseException());
      }
    }
  }  
  `
  content = content.concat(commandImplements);


  // footer

  //content = content.concat(footer);
  return content;
}

module.exports = { repositoryGenerator };
