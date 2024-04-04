const { getNames } = require('../helpers');

const entityGenerator = (entity) => {
  const attributes = entity.attributes;
  const names = getNames(entity)
  const hasDefaultIndex = entity.hasDefaultIndex;
  const oneToMany = entity.oneToMany;
  const manyToOne = entity.manyToOne;
  let content = '';

  // headers
  let hasIndexImport = false
  attributes.map((attribute) => attribute.unique ? hasIndexImport = true : null)

  let importPrimaryGeneratedColumn = '';
  let importJoinColumn = '';
  let importOneToMany = '';
  let importManyToOne = '';
  let importIndex = '';

  if (hasDefaultIndex) {
    importPrimaryGeneratedColumn = 'PrimaryGeneratedColumn,';
  }
  if (oneToMany.length > 0) {
    importOneToMany = 'OneToMany,';
  }
  if (manyToOne.length > 0) {
    importManyToOne = 'ManyToOne,';
    importJoinColumn = 'JoinColumn,';
  }
  if (hasIndexImport) {
    importIndex = 'Index,';
  }
  const header = `
    import {
        ${importPrimaryGeneratedColumn}
        ${importIndex}
        BaseEntity,
        Column,
        Entity,
        ${importOneToMany}
        ${importManyToOne}
        ${importJoinColumn}
      } from 'typeorm';

    `
  content = content.concat(header);

  oneToMany.map((entity) => {
    const value = entity.value;
    const names = getNames({ name: value });
    const importEntity = `import { ${names.uperFL}Entity } from '@${names.fileName}/infrastructure/entities/${names.fileName}.entity';`;
    content = content.concat(importEntity);
  })
  manyToOne.map((entity) => {
    const value = entity.value;
    const names = getNames({ name: value });
    const importEntity = `import { ${names.uperFL}Entity } from '@${names.fileName}/infrastructure/entities/${names.fileName}.entity';`;
    content = content.concat(importEntity);
  })

  // body
  let bodyHeader = `
      @Entity({ name: '${names.name}' })
      export class ${names.uperFL}Entity extends BaseEntity {
    `
  content = content.concat(bodyHeader);

  if (hasDefaultIndex) {
    const primaryKeyPart = `
      @PrimaryGeneratedColumn('increment')
      id!: number;

      `
    content = content.concat(primaryKeyPart);
  }

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

  oneToMany.map((entityOtM) => {
    const nameOtM = entityOtM.value;
    const namesOtM = getNames({ name: nameOtM });

    const attributeItem = `
    @OneToMany(
      () => ${namesOtM.uperFL}Entity,
      (${namesOtM.name}) => ${namesOtM.name}.${names.name},
      { eager: true },
    )
    ${namesOtM.plural}!: ${namesOtM.uperFL}Entity[];
    `;

    content = content.concat(attributeItem);
  })

  manyToOne.map((entityMtO) => {
    const nameMtO = entityMtO.value;
    const namesMtO = getNames({ name: nameMtO });

    const attributeItem = `
    @ManyToOne(() => ${namesMtO.uperFL}Entity, ( ${namesMtO.name}) => ${namesMtO.name}.${names.plural})
    @JoinColumn({ name: '${namesMtO.name}Id' })
    ${namesMtO.name}!: ${namesMtO.uperFL}Entity;
    `;

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
