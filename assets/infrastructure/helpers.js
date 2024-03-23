
const oneToManyLine = (one, many) => `
@OneToMany(
    () => ${v}Entity,
    (${a}) => ${a}.${c},
    { eager: true },
  )
  ${a}s!: ${b}Entity[];
`

const manyToOne = () => `
@OneToMany(
    () => ${v}Entity,
    (${a}) => ${a}.${c},
    { eager: true },
  )
  ${a}s!: ${b}Entity[];
`

const types = (attribute, names) => {

  const type = attribute.type;
  const unique = attribute.unique;
  const value = attribute.value;

  let typeFormat = '';
  let uniqueFormat = '';

  if (type == 'varchar') {
    typeFormat = `@Column({ type: varchar, length: 100 })`;
  }
  if (type == 'float') {
    typeFormat = `@Column({ type: 'float' })`;
  }
  if (type == 'int') {
    typeFormat = `@Column({ type: 'int' })`;
  }

  if (unique) {
    uniqueFormat = `@Index({ unique: true })`;
  }

  return `
    ${uniqueFormat}
    ${typeFormat}
    ${value}!: ${type};
    `
}