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
  let classValidatorImport = "";
  let attributeTypes = [];

  if (hasDefaultIndex) {
    const indexPart = `
    @ApiProperty({ type: 'number', required: false, example: 1 })
    @IsOptional()
    @IsNumber()
    id?: number;
    `;
    atributesPart = atributesPart.concat(indexPart);
    if (attributeTypes.includes("number") == false) {
      attributeTypes.push("number");
      classValidatorImport = classValidatorImport.concat(`IsNumber,
      `);
    }
    if (attributeTypes.includes("optional") == false) {
      attributeTypes.push("optional");
      classValidatorImport = classValidatorImport.concat(`IsOptional,
      `);
    }
  }

  attributes.map((attribute) => {
    const name = attribute.name;
    const attributeType = attribute.type;
    const notNull = attribute.notNull;
    const example = attribute.example;
    const minLength = attribute.minLength;

    let attributeItem = "";
    let notNullPart = "";
    let requiredPart = "false";
    let optionalPart = "false";

    if (notNull) {
      notNullPart = "!";
      requiredPart = "true";
      optionalPart = "@IsNotEmpty()";
      if (attributeTypes.includes("notEmpty") == false) {
        attributeTypes.push("notEmpty");
        classValidatorImport = classValidatorImport.concat(`IsNotEmpty,
        `);
      }
    } else {
      notNullPart = "?";
      optionalPart = "@IsOptional()";
      if (attributeTypes.includes("optional") == false) {
        attributeTypes.push("optional");
        classValidatorImport = classValidatorImport.concat(`IsOptional,
        `);
      }
    }

    if (attributeType == "varchar") {

      let minLenghtPart = "";
      if (minLength) {
        minLenghtPart = `@MinLength(${minLength})
        `;
        if (attributeTypes.includes("minLength") == false) {
          attributeTypes.push("minLength");
          classValidatorImport = classValidatorImport.concat(`MinLength,
          `);
        }
      }

      attributeItem = `
      ${optionalPart}
      @IsString()
      ${minLenghtPart}
      @ApiProperty({ type: 'string', required: ${requiredPart}, example: '${example}' })
      ${name}${notNullPart}: string;
      `;
      
      if (attributeTypes.includes("string") == false) {
        attributeTypes.push("string");
        classValidatorImport = classValidatorImport.concat(`IsString,
        `);
      }
    }
    if (attributeType == "float" || attributeType == "int") {
      attributeItem = `
      @IsNumber()
      ${optionalPart}
      @ApiProperty({ type: 'number', required: ${requiredPart}, example: '${example}' })
      ${name}${notNullPart}: number;
      `;

      if (attributeTypes.includes("number") == false) {
        attributeTypes.push("number");
        classValidatorImport = classValidatorImport.concat(`IsNumber,
        `);
      }
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
    ${classValidatorImport}
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
  let classValidatorImport = "";
  let attributeTypes = [];

  if (hasDefaultIndex) {
    const indexPart = `
    @IsNumber()
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

    if (attributeTypes.includes("number") == false) {
      attributeTypes.push("number");
      classValidatorImport = classValidatorImport.concat(`IsNumber,
      `);
    }
  }

  attributes.map((attribute) => {
    const name = attribute.name;
    const attributeType = attribute.type;
    const example = attribute.example;

    let attributeItem = "";
    let arg = "";
    let setting = "";

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

      if (attributeTypes.includes("string") == false) {
        attributeTypes.push("string");
        classValidatorImport = classValidatorImport.concat(`IsString,
        `);
      }
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

      if (attributeTypes.includes("number") == false) {
        attributeTypes.push("number");
        classValidatorImport = classValidatorImport.concat(`IsNumber,
        `);
      }
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
  import { 
    ${classValidatorImport}
  } from 'class-validator';
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
