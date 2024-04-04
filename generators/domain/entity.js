const { getNames } = require('../helpers');

const entityGenerator = (entity) => {
  const attributes = entity.attributes;
  const names = getNames(entity)
  const hasDefaultIndex = entity.hasDefaultIndex;
  const manyToOne = entity.manyToOne;
  let content = '';

  // headers
  let header = '';
  let relations = '';
  if (manyToOne.length > 0) {
    manyToOne.map((item) => {
      const itemNames = getNames({ name: item.value })
      const importEntity = `import type { ${itemNames.uperFL}Entity } from '@modules/${itemNames.fileName}/domain/entities/${itemNames.fileName}.entity';
      `
      header = header.concat(importEntity);
    });
  }
  content = content.concat(header);

  // body
  let bodyHeader = `export class ${names.uperFL}Entity {`;
  content = content.concat(bodyHeader);
  if (hasDefaultIndex) {
    const idParam = `
      readonly id?: number;
      `
    content = content.concat(idParam);
  }

  attributes.map((attribute) => {
    const name = attribute.name;
    const attributeType = attribute.type;
    const notNull = attribute.notNull;
    let type = '';

    if (attributeType == 'varchar') {
      type = 'string'
    }
    if (attributeType == 'float' || attributeType == 'int') {
      type = 'number'
    }
    const notNullExpresion = notNull ? '!' : '?';
    let attributeItem = `readonly ${name}${notNullExpresion}: ${type};
    `;
    content = content.concat(attributeItem);
  });

  if (manyToOne.length > 0) {
    manyToOne.map((item) => {
      const itemNames = getNames({ name: item.value })
      let attributeItem = `
      readonly ${itemNames.name}?: ${itemNames.uperFL}Entity;
      readonly ${itemNames.name}Id?: number;
      `;
      content = content.concat(attributeItem);
    });
  }
  const constructorPart = `
  constructor(
  `;
  content = content.concat(constructorPart);

  attributes.map((attribute) => {
    const name = attribute.name;
    const attributeType = attribute.type;
    const notNull = attribute.notNull;
    let type = '';

    if (attributeType == 'varchar') {
      type = 'string'
    }
    if (attributeType == 'float' || attributeType == 'int') {
      type = 'number'
    }
    let attributeItem = `${name}: ${type},
    `;
    content = content.concat(attributeItem);
  });
  if (hasDefaultIndex) {
    const idParam = `id?: number,`
    content = content.concat(idParam);
  }

  if (manyToOne.length > 0) {
    manyToOne.map((item) => {
      const itemNames = getNames({ name: item.value })
      let attributeItem = `
      ${itemNames.name}?: ${itemNames.uperFL}Entity,
      ${itemNames.name}Id?: number,
      `;
      content = content.concat(attributeItem);
    });
  }

  const endConstructorPart = `) {
  `;
  content = content.concat(endConstructorPart);

  attributes.map((attribute) => {
    const name = attribute.name;
    const attributeType = attribute.type;

    if (attributeType == 'varchar') {
      type = 'string'
    }
    if (attributeType == 'float' || attributeType == 'int') {
      type = 'number'
    }
    let attributeItem = `this.${name} = ${name};
    `;
    content = content.concat(attributeItem);
  });

  if (hasDefaultIndex) {
    const idParam = `this.id = id;`
    content = content.concat(idParam);
  }

  if (manyToOne.length > 0) {
    manyToOne.map((item) => {
      const itemNames = getNames({ name: item.value })
      let attributeItem = `
      this.${itemNames.name} = ${itemNames.name};
      this.${itemNames.name}Id = ${itemNames.name}Id;`;
      content = content.concat(attributeItem);
    });
  }

  // footer
  const footer = `
      }
    }
    `
  content = content.concat(footer);
  return content;
}

module.exports = { entityGenerator };
