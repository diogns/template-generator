const fs = require('fs');

const getNames = (entity) => {
  const name = entity.name;
  let nameUper = name.toUpperCase();
  const uperFL = name.charAt(0).toUpperCase() + name.slice(1);
  const plural = `${name}s`
  const pluralUperFL = `${uperFL}s`;

  let fileName = name;
  if (/[A-Z]/.test(name)) {
    fileName = '';
    nameUper = '';
    for (let i = 0; i < name.length; i++) {
      if (name[i] === name[i].toUpperCase()) {
        fileName += '-' + name[i].toLowerCase();
        nameUper += '_' + name[i].toUpperCase();

      } else {
        fileName += name[i];
        nameUper += name[i].toUpperCase();
      }
    }
  }

  return {
    name,
    nameUper,
    uperFL,
    pluralUperFL,
    plural,
    fileName,
  }
}

const createResource = (obj, path) => {
  try {
    const type = obj.type;
    if (type == 'dir') {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
    } else {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, obj.content);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

const build = (structure, path = './') => {
  for (let i = 0; i < structure.length; i++) {

    const obj = structure[i];
    const name = obj.name;
    const seeds = obj.seeds;
    let rootPath = `${path}/${name}`

    createResource(obj, rootPath)
    build(seeds, rootPath)
  }
}

fileAndFolderObject = { type: '', name: '', content: '', seeds: [] }

const crud = [
  {
    name:'create',
    action: 'Add',
    actionUper: 'ADD',
    actionInGerund: 'adding',
    expression: 'adding new',
  },
  {
    name:'read',
    action: 'Get',
    actionUper: 'GET',
    actionInGerund: 'getting',
    expression: 'getting a',
  },
  {
    name:'update',
    action: 'Update',
    actionUper: 'UPDATE',
    actionInGerund: 'updating',
    expression: 'updating a',
  },
  {
    name:'delete',
    action: 'Remove',
    actionUper: 'REMOVE',
    actionInGerund: 'removing a',
    expression: 'removing a',
  },
];

module.exports = { getNames, build, fileAndFolderObject, crud };
