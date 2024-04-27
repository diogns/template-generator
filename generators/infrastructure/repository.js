const { getNames } = require('../helpers');

const repositoryGenerator = (entity) => {
  const names = getNames(entity);
  const manyToOne = entity.manyToOne;
  const attributes = entity.attributes;

  let importReference = '';
  let relations = '';
  let addRelationMod = '';

  if (manyToOne.length > 0) {
    manyToOne.map((item) => {
      const itemNames = getNames({ name: item.value })
      const importEntity = `import { ${itemNames.uperFL}Entity as ${itemNames.uperFL}Esquema } from '@modules/${itemNames.fileName}/infrastructure/entities/${itemNames.fileName}.entity';
      `
      const addRelation = `
      if (${names.name}.${itemNames.name}Id) {
        const ${itemNames.name} = new ${itemNames.uperFL}Esquema();
        item.id = ${names.name}.${itemNames.name}Id;
        item.${itemNames.name} = ${itemNames.name};
      }
      `
      importReference = importReference.concat(importEntity);
      relations = relations.concat(`${itemNames.name}: true,`);
      addRelationMod = addRelationMod.concat(addRelation);
    });
  }

  let addAtributesPart = '';
  attributes.map((attribute) => {
    const name = attribute.name;
    addAtributesPart = addAtributesPart.concat(`item.${name} = ${names.name}.${name};
    `);
  })

  let content = `
import { Inject, Logger, Injectable } from '@nestjs/common';
import { err, ok } from 'neverthrow';

import { DbEntityManager } from '@helpers/DbManager';
import type { ${names.uperFL}Entity } from '../../domain/entities/${names.fileName}.entity';
import type {
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
import { ${names.uperFL}Entity as ${names.uperFL}Esquema } from '../entities/${names.fileName}.entity';
${importReference}

export class ${names.uperFL}QueriesImplement
  extends DbEntityManager
  implements ${names.uperFL}QueriesRepository
{
  @Inject()
  private readonly logger: Logger;

  async get${names.uperFL}ById(id: number): Promise<Get${names.uperFL}ByIdResult> {
    try {
      const item = await this.mysqlManager
        .getRepository(${names.uperFL}Esquema)
        .findOne({
          where: {
            id: id,
          },
          relations: {
            ${relations}
          },
        });
      return ok(item);
    } catch (error) {
      this.logger.error(error, '${names.uperFL}QueriesImplement.get${names.uperFL}ById');
      return err(new Get${names.uperFL}ByIdDatabaseException());
    }
  }

  async list${names.uperFL}s(): Promise<List${names.uperFL}sResult> {
    try {
      const list: ${names.uperFL}Entity[] = await this.mysqlManager
        .getRepository(${names.uperFL}Esquema)
        .find({
          relations: {
            ${relations}
          },
        });
      return ok(list);
    } catch (error) {
      this.logger.error(error, '${names.uperFL}QueriesImplement.list${names.uperFL}s');
      return err(new List${names.uperFL}sDatabaseException());
    }
  }
}

@Injectable()
export class ${names.uperFL}CommandsImplement
  extends DbEntityManager
  implements ${names.uperFL}CommandsRepository
{
  @Inject()
  private readonly logger: Logger;

  async add${names.uperFL}(${names.name}: ${names.uperFL}Entity): Promise<Add${names.uperFL}Result> {
    try {
      const item = new ${names.uperFL}Esquema();
      ${addAtributesPart}
      ${addRelationMod}
      const data = await this.mysqlManager
        .getRepository(${names.uperFL}Esquema)
        .save(item);

      return ok(data);
    } catch (error) {
      this.logger.error(error, '${names.uperFL}CommandsImplement.add${names.uperFL}');
      return err(new Add${names.uperFL}DatabaseException());
    }
  }

  async update${names.uperFL}(
    ${names.name}: ${names.uperFL}Entity,
  ): Promise<Update${names.uperFL}Result> {
    try {
      const item = new ${names.uperFL}Esquema();
      ${addAtributesPart}
      ${addRelationMod}
      const result = await this.mysqlManager
        .getRepository(${names.uperFL}Esquema)
        .update(${names.name}.id, item);

      if (result.affected == 0) {
        return ok(false);
      }
      return ok(true);
    } catch (error) {
      this.logger.error(error, '${names.uperFL}CommandsImplement.update${names.uperFL}');
      return err(new Update${names.uperFL}DatabaseException());
    }
  }

  async remove${names.uperFL}(id: number): Promise<Remove${names.uperFL}Result> {
    try {
      const result = await this.mysqlManager
        .getRepository(${names.uperFL}Esquema)
        .delete(id);

      if (result.affected == 0) {
        return ok(false);
      }

      return ok(true);
    } catch (error) {
      this.logger.error(error, '${names.uperFL}CommandsImplement.remove${names.uperFL}');
      return err(new Remove${names.uperFL}DatabaseException());
    }
  }
}  
  `
  return content;
}

module.exports = { repositoryGenerator };
