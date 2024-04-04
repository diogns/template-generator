const { entityGenerator } = require('./entity');
const { repositoryGenerator } = require('./repository');
const { exceptionGenerator } = require('./exception');

const { fileAndFolderObject, getNames } = require('../helpers');

const domainGenerator = (ffobject, entity) => {
  let ffobjectSeeds = ffobject.seeds;
  const names = getNames(entity)

  ffobjectSeeds.map((seed) => {
    let seedName = seed.name;

    // entities
    if (seedName == 'entities') {
      const newFfobject = JSON.parse(JSON.stringify(fileAndFolderObject));
      newFfobject.type = 'file';
      newFfobject.name = `${names.fileName}.entity.ts`;
      newFfobject.content = entityGenerator(entity);
      seed.seeds.push(newFfobject)
    }

    // repositories
    if (seedName == 'repositories') {
      const newFfobject = JSON.parse(JSON.stringify(fileAndFolderObject));
      newFfobject.type = 'file';
      newFfobject.name = `${names.fileName}.repository.ts`;
      newFfobject.content = repositoryGenerator(entity);
      seed.seeds.push(newFfobject)
    }

    // exception
    if (seedName == 'exceptions') {
      const newFfobject = JSON.parse(JSON.stringify(fileAndFolderObject));
      newFfobject.type = 'file';
      newFfobject.name = `${names.fileName}.exception.ts`;
      newFfobject.content = exceptionGenerator(entity);
      seed.seeds.push(newFfobject)
    }
  })
}

module.exports = { domainGenerator };
