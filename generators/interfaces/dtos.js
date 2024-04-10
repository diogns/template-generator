const { getNames } = require('../helpers');

const modDtosGenerator = (entity) => {
  const names = getNames(entity)
  let content = `
  import { ApiProperty } from '@nestjs/swagger';
  import { IsBoolean } from 'class-validator';
  import { ${names.uperFL}ResponseDTO } from './${names.fileName}.response';
  
  export class Mod${names.uperFL}ResponseDTO {
    @IsBoolean()
    @ApiProperty({ description: 'indicator of successfully operation' })
    success: boolean;
  
    @ApiProperty({ description: 'new ${names.name} data' })
    ${names.name}?: ${names.uperFL}ResponseDTO;
  
    constructor(success: boolean, ${names.name}?: ${names.uperFL}ResponseDTO) {
      this.success = success;
      this.${names.name} = ${names.name};
    }
  }  
  `
  return content;
}

const requestDtosGenerator = (entity) => {
  const names = getNames(entity)

  const manyToOne = entity.manyToOne;
  const attributes = entity.attributes;

  let relations = '';
  let addRelation = '';

  if (manyToOne.length > 0) {
    manyToOne.map((item) => {
      const itemNames = getNames({ name: item.value })
      addRelation = `
      @ApiProperty({ type: 'number', required: false, example: 1 })
      @IsOptional()
      @IsNumber()
      ${itemNames.name}Id?: number;
      `
      relations = relations.concat(addRelation);
    });
  }

  let addAtributesPart = '';
  attributes.map((attribute) => {
    const name = attribute.name;
    const attributeType = attribute.type;
    const unique = attribute.unique;
    let type = '';
    let attributeItem = '';

    if (attributeType == 'varchar') {
      type = 'string'
    }
    if (attributeType == 'float' || attributeType == 'int') {
      type = 'number'
    }

    if (unique) {
      const indexPart = '@Index({ unique: true })';
      attributeItem = attributeItem.concat(indexPart);
    }

    let columnPart = '';
    if (attributeType == 'varchar') {
      columnPart = `@Column({ type: 'varchar', length: 100 })
      `;
    } else {
      columnPart = `@Column({ type: '${attributeType}' })
      `;
    }
    attributeItem = attributeItem.concat(columnPart);

    const itemPart = `${name}!: ${type};

    `;
    attributeItem = attributeItem.concat(itemPart);
    content = content.concat(attributeItem);
  })

  let content = `
  import { ApiProperty } from '@nestjs/swagger';
  import {
    IsNumber,
    IsNotEmpty,
    IsString,
    MinLength,
    IsOptional,
  } from 'class-validator';
  
  export class ${names.uperFL}RequestDTO {
    @ApiProperty({ type: 'number', required: false, example: 1 })
    @IsOptional()
    @IsNumber()
    id?: number;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty({ type: 'string', required: true, example: 'flag' })
    flag!: string;
  
    @ApiProperty({ type: 'number', required: true, example: 25 })
    @IsNumber()
    type!: number;
  
    ${relations}
  }   
  `
  return content;
}

const responseDtosGenerator = (entity) => {
  const names = getNames(entity)
  const attributes = entity.attributes;
  let response = '';
  attributes.map((attribute) => {
    const attributeName = attribute.name;
    let attributeItemResponse = `data.${attributeName},
    `;
    response = response.concat(attributeItemResponse);
  });
  let content = `
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
  import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
  import { ${names.uperFL}CommandsRepository } from '@${names.fileName}/domain/repositories/${names.fileName}.repository';
  import { ${names.uperFL}CommandsImplement } from '@${names.fileName}/infrastructure/repositories/${names.fileName}.repository';
  import { List${names.uperFL}sResponseDTO } from '@${names.fileName}/interfaces/http/v1/list-${names.fileName}s/dto/list-${names.fileName}s.response';
  import { Remove${names.uperFL}ResponseDTO } from '@${names.fileName}/interfaces/http/v1/remove-${names.fileName}/dto/remove-${names.fileName}.response';
  
  export class Remove${names.uperFL}Command {
    constructor(readonly id: number) {}
  }
  
  @CommandHandler(Remove${names.uperFL}Command)
  export class Remove${names.uperFL}Handler
    implements ICommandHandler<Remove${names.uperFL}Command, Remove${names.uperFL}ResponseDTO>
  {
    constructor(
      @Inject(${names.uperFL}CommandsImplement)
      private readonly ${names.name}Repository: ${names.uperFL}CommandsRepository,
      private readonly logger: Logger,
    ) {}
  
    async execute(command: Remove${names.uperFL}Command): Promise<Remove${names.uperFL}ResponseDTO> {
      const result = await this.${names.name}Repository.remove${names.uperFL}(command.id);
      if (result.isErr()) {
        this.logger.warn(result.error, 'Remove${names.uperFL}Handler.execute');
        throw new InternalServerErrorException(
          result.error.message,
          result.error.code,
        );
      }
  
      const data = result.value;
  
      return new Remove${names.uperFL}ResponseDTO(
        true,
        new List${names.uperFL}sResponseDTO(
          ${response}
        ),
      );
    }
  }  
  `


  return content;
}

module.exports = { modDtosGenerator, requestDtosGenerator,  responseDtosGenerator };
