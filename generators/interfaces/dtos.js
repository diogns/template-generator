const { getNames } = require("../helpers");

const modDtosGenerator = (entity) => {
  const names = getNames(entity);
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
  `;
  return content;
};

const requestDtosGenerator = (entity) => {
  const names = getNames(entity);

  const manyToOne = entity.manyToOne;
  const attributes = entity.attributes;
  const hasDefaultIndex = entity.hasDefaultIndex;

  let atributesPart = "";

  if (hasDefaultIndex) {
    const indexPart = `
    @ApiProperty({ type: 'number', required: false, example: 1 })
    @IsOptional()
    @IsNumber()
    id?: number;
    `;
    atributesPart = atributesPart.concat(indexPart);
  }

  attributes.map((attribute) => {
    const name = attribute.name;
    const attributeType = attribute.type;
    const notNull = attribute.notNull;
    const example = attribute.example;

    let attributeItem = "";
    let notNullPart = "";
    let requiredPart = "false";
    let optionalPart = "false";

    if (notNull) {
      notNullPart = "!";
      requiredPart = "true";
      optionalPart = "@IsNotEmpty()";
    } else {
      notNullPart = "?";
      optionalPart = "@IsOptional()";
    }

    if (attributeType == "varchar") {
      attributeItem = `
      ${optionalPart}
      @IsString()
      @MinLength(3)
      @ApiProperty({ type: 'string', required: ${requiredPart}, example: '${example}' })
      ${name}${notNullPart}: string;
      `;
    }
    if (attributeType == "float" || attributeType == "int") {
      attributeItem = `
      @ApiProperty({ type: 'number', required: ${requiredPart}, example: '${example}' })
      @IsOptional()
      @IsNumber()
      ${name}${notNullPart}: number;
      `;
    }

    atributesPart = atributesPart.concat(attributeItem);
  });

  if (manyToOne.length > 0) {
    manyToOne.map((item) => {
      const itemNames = getNames({ name: item.value });
      const addRelation = `
      @ApiProperty({ type: 'number', required: false, example: 1 })
      @IsOptional()
      @IsNumber()
      ${itemNames.name}Id?: number;
      `;
      atributesPart = atributesPart.concat(addRelation);
    });
  }

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
    ${atributesPart}
  }
  `;
  return content;
};

const responseDtosGenerator = (entity) => {
  const names = getNames(entity);

  const manyToOne = entity.manyToOne;
  const attributes = entity.attributes;
  const hasDefaultIndex = entity.hasDefaultIndex;

  let atributesPart = "";
  let constructorArgs = "";
  let constructorSetting = "";
  if (hasDefaultIndex) {
    const indexPart = `
    @ApiProperty({ type: 'number', example: 1 })
    id: number;
    `;
    const arg = `id: number,
    `;
    const setting = `this.id = id;
    `;

    atributesPart = atributesPart.concat(indexPart);
    constructorArgs = constructorArgs.concat(arg);
    constructorSetting = constructorSetting.concat(setting);
  }

  attributes.map((attribute) => {
    const name = attribute.name;
    const attributeType = attribute.type;
    const example = attribute.example;

    let attributeItem = "";
    let arg = '';
    let setting = '';


    if (attributeType == "varchar") {
      attributeItem = `
      @IsString()
      @ApiProperty({ type: 'string', example: '${example}' })
      ${name}: string;
      `;
      arg = `${name}: string,
      `;
      setting = `this.${name} = ${name};
      `;
    }
    if (attributeType == "float" || attributeType == "int") {
      attributeItem = `
      @IsNumber()
      @ApiProperty({ type: 'number', example: ${example} })
      ${name}: number;
      `;
      arg = `${name}: number,
      `;
      setting = `this.${name} = ${name};
      `;
    }


    atributesPart = atributesPart.concat(attributeItem);
    constructorArgs = constructorArgs.concat(arg);
    constructorSetting = constructorSetting.concat(setting);
  });

  let importRelation = "";

  if (manyToOne.length > 0) {
    manyToOne.map((item) => {
      const itemNames = getNames({ name: item.value });
      const relation = `
      import type { ${itemNames.uperFL}ResponseDTO } from '@modules/${itemNames.fileName}/interfaces/http/v1/dtos/${itemNames.fileName}.response';`;

      const attribute = `
      ${itemNames.name}?: ${itemNames.uperFL}ResponseDTO;`;

      const arg = `
      ${itemNames.name}?: ${itemNames.uperFL}ResponseDTO,`;

      const constructorRelation = `
      this.${itemNames.name} = ${itemNames.name};`;

      importRelation = importRelation.concat(relation);
      atributesPart = atributesPart.concat(attribute);
      constructorArgs = constructorArgs.concat(arg);
      constructorSetting = constructorSetting.concat(constructorRelation);
    });
  }

  let content = `
  import { ApiProperty } from '@nestjs/swagger';
  import { IsString, IsNumber } from 'class-validator';
  ${importRelation}
  
  
  export class ${names.uperFL}ResponseDTO {
    ${atributesPart}

    constructor(
      ${constructorArgs}
    ) {
      ${constructorSetting}
    }
  }
  `;

  return content;
};

module.exports = {
  modDtosGenerator,
  requestDtosGenerator,
  responseDtosGenerator,
};
