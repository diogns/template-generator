const { getNames } = require('../helpers');

const controllerGenerator = (entity) => {
  const names = getNames(entity);
  const manyToOne = entity.manyToOne;
  const attributes = entity.attributes;

  let relations = '';
  let addRelation = '';

  if (manyToOne.length > 0) {
    manyToOne.map((item) => {
      const itemNames = getNames({ name: item.value })
      addRelation = `${names.name}.${itemNames.name}Id,
      `
      relations = relations.concat(addRelation);
    });
  }

  let addAtributesPart = '';
  attributes.map((attribute) => {
    const name = attribute.name;
    addAtributesPart = addAtributesPart.concat(`${names.name}.${name},
    `);
  })

  let content = `
  import {
    Body,
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Version,
  } from '@nestjs/common';
  import { CommandBus, QueryBus } from '@nestjs/cqrs';
  
  import { Get${names.uperFL}ByIdQuery } from '@modules/${names.fileName}/application/queries/get-${names.fileName}-by-id.query';
  import { List${names.uperFL}sQuery } from '@modules/${names.fileName}/application/queries/list-${names.fileName}s.query';
  import { Add${names.uperFL}Command } from '@modules/${names.fileName}/application/commands/add-${names.fileName}.command';
  import { Update${names.uperFL}Command } from '@modules/${names.fileName}/application/commands/update-${names.fileName}.command';
  import { Remove${names.uperFL}Command } from '@modules/${names.fileName}/application/commands/remove-${names.fileName}.command';
  
  import { idParamDto } from '@core/interfaces/dtos/id-param.request';
  import { ${names.uperFL}RequestDTO } from './dtos/${names.fileName}.request';
  
  import {
    Add${names.uperFL}Doc,
    Get${names.uperFL}ByIdDoc,
    List${names.uperFL}sDoc,
    Update${names.uperFL}Doc,
    Remove${names.uperFL}Doc,
  } from './docs/${names.fileName}.docs';
  
  @Controller('${names.fileName}')
  export class ${names.uperFL}Controller {
    constructor(
      readonly commandBus: CommandBus,
      readonly queryBus: QueryBus,
    ) {}
    @Version('1')
    @Get('/:id')
    @Get${names.uperFL}ByIdDoc()
    // @Authentication()
    async get${names.uperFL}ById(@Param() { id }: idParamDto) {
      const query = new Get${names.uperFL}ByIdQuery(id);
      return this.queryBus.execute(query);
    }
  
    @Version('1')
    @Get()
    @List${names.uperFL}sDoc()
    // @Authentication()
    async list${names.uperFL}s() {
      const query = new List${names.uperFL}sQuery();
      return this.queryBus.execute(query);
    }
  
    @Version('1')
    @Post()
    @Add${names.uperFL}Doc()
    // @Authentication()
    async add${names.uperFL}(@Body() ${names.name}: ${names.uperFL}RequestDTO) {
      const query = new Add${names.uperFL}Command(
        ${addAtributesPart}
        ${relations}
      );
      return this.commandBus.execute(query);
    }
  
    @Version('1')
    @Put('/:id')
    @Update${names.uperFL}Doc()
    // @Authentication()
    async update${names.uperFL}(
      @Param() { id }: idParamDto,
      @Body() ${names.name}: ${names.uperFL}RequestDTO,
    ) {
      const query = new Update${names.uperFL}Command(
        id,
        ${addAtributesPart}
        ${relations}
      );
      return this.commandBus.execute(query);
    }
  
    @Version('1')
    @Delete('/:id')
    @Remove${names.uperFL}Doc()
    // @Authentication()
    async remove${names.uperFL}(@Param() { id }: idParamDto) {
      const query = new Remove${names.uperFL}Command(id);
      return this.commandBus.execute(query);
    }
  }
  
  `
  return content;
}

module.exports = { controllerGenerator };
