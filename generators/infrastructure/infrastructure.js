const { entityGenerator } = require('./entity');
const { exceptionGenerator, infrastructureExceptionGenerator } = require('./exception');
const { repositoryGenerator } = require('./repository');
const { moduleGenerator } = require('./module');

const { fileAndFolderObject } = require('../helpers');
const { getNames } = require('../helpers');

const infrastructureGenerator = (ffobject, entity) => {
  let ffobjectSeeds = ffobject.seeds;
  ffobjectSeeds.map((seed) => {
    let seedName = seed.name;
    // entities
    if (seedName == 'entities') {
      const names = getNames(entity)
      const newFfobject = JSON.parse(JSON.stringify(fileAndFolderObject));
      newFfobject.type = 'file';
      newFfobject.name = `${names.fileName}.entity.ts`;
      newFfobject.content = entityGenerator(entity);
      seed.seeds.push(newFfobject)
    }

    // exceptions
    if (seedName == 'exceptions') {
      const newFfobject = JSON.parse(JSON.stringify(fileAndFolderObject));
      newFfobject.type = 'file';
      newFfobject.name = 'infrastructure.exception.ts';
      newFfobject.content = infrastructureExceptionGenerator(entity)
      seed.seeds.push(newFfobject)

      const names = getNames(entity)
      const newFfobjectEntity = JSON.parse(JSON.stringify(fileAndFolderObject));
      newFfobjectEntity.type = 'file';
      newFfobjectEntity.name = `${names.fileName}.exception.ts`;
      newFfobjectEntity.content = exceptionGenerator(entity);
      seed.seeds.push(newFfobjectEntity)
    }

    // repositories
    if (seedName == 'repositories') {
      const names = getNames(entity)
      const newFfobject = JSON.parse(JSON.stringify(fileAndFolderObject));
      newFfobject.type = 'file';
      newFfobject.name = `${names.fileName}.repository.ts`;
      newFfobject.content = repositoryGenerator(entity);
      seed.seeds.push(newFfobject)
    }

    if (seedName == 'nestjs') {
      const newFfobject = JSON.parse(JSON.stringify(fileAndFolderObject));
      newFfobject.type = 'file';
      newFfobject.name = 'module.ts';
      newFfobject.content = moduleGenerator(entity);
      seed.seeds.push(newFfobject)
    }
  });
}

module.exports = { infrastructureGenerator };
