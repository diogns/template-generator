const { getNames } = require('../helpers');

const entityGenerator = (entity) => {
    const attributes = entity.attributes;
    const names = getNames(entity)
    const hasDefaultIndex = entity.hasDefaultIndex;
    let content = '';

    // headers
    let hasExcludeImport = false
    attributes.map((attribute) => attribute.exclude ? hasExcludeImport = true : null)

    const ExcluceImport = hasExcludeImport ? `import { Exclude } from 'class-transformer';` : '';
    const header = `
    import { ApiProperty } from '@nestjs/swagger';
    ${ExcluceImport}
  
    export class ${names.uperFL} {
    `
    content = content.concat(header);

    // body
    let bodyHeader = '';
    if (hasDefaultIndex) {
        bodyHeader += `
      @ApiProperty({ type: 'number', example: 1 })
      readonly id!: number;
      `
    }
    content = content.concat(bodyHeader);

    attributes.map((attribute) => {
        const name = attribute.name;
        const example = attribute.example;
        const attributeType = attribute.type;
        const exclude = attribute.exclude;
        const format = attribute.format;
        const notNull = attribute.notNull;
        let type = '';

        if (attributeType == 'varchar') {
            type = 'string'
        }
        if (attributeType == 'float' || attributeType == 'int') {
            type = 'number'
        }

        let attributeItem = '';
        const notNullExpresion = notNull ? '!' : '?';

        // type: datetime 
        if (format == 'date-time') {
            let decorator = `
        @ApiProperty({
          type: 'string',
          format: 'date-time',
          example: '${example}',
        })
        `
            if (exclude) {
                decorator = `@Exclude({ toPlainOnly: true })`
            }
            attributeItem = `
        ${decorator}
        readonly ${name}${notNullExpresion}: Date;
        `
            // other types
        } else {

            let decorator = `
        @ApiProperty({ type: '${type}', example: '${example}' })
        `
            if (exclude) {
                decorator = `@Exclude({ toPlainOnly: true })`
            }

            attributeItem = `
        ${decorator}
        readonly ${name}${notNullExpresion}: ${type};    
        `
        }
        content = content.concat(attributeItem);
    })

    // footer
    const footer = `
    }
  
    `
    content = content.concat(footer);
    return content;
}

module.exports = { entityGenerator };
