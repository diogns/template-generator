const { fileAndFolderObject } = require('../helpers');
const { getNames } = require('../helpers');

const interfacesGenerator = (ffobject, entities) => {
  console.log('Building Interfaces!')
  /*
  let ffobjectSeeds = ffobject.seeds;
  ffobjectSeeds.map((seed) => {
    let seedName = seed.name;

    // entities
    if (seedName == 'entities') {
      entities.map((entity) => {
        const names = getNames(entity)
        const newFfobject = { ...fileAndFolderObject }
        newFfobject.type = 'file';
        newFfobject.name = `${names.fileName}.entity.ts`;
        newFfobject.content = entityGenerator(entity);
        seed.seeds.push(newFfobject)
      })
    }

    // exceptions
    if (seedName == 'exceptions') {
      const newFfobject = { ...fileAndFolderObject }
      newFfobject.type = 'file';
      newFfobject.name = 'infrastructure.exception.ts';
      newFfobject.content = infrastructureExceptionGenerator(entities)
      seed.seeds.push(newFfobject)

      entities.map((entity) => {
        const names = getNames(entity)
        const newFfobject = { ...fileAndFolderObject }
        newFfobject.type = 'file';
        newFfobject.name = `${names.fileName}.exception.ts`;
        newFfobject.content = exceptionGenerator(entity);
        seed.seeds.push(newFfobject)
      })
    }

    // repositories
    if (seedName == 'repositories') {
      entities.map((entity) => {
        const names = getNames(entity)
        const newFfobject = { ...fileAndFolderObject }
        newFfobject.type = 'file';
        newFfobject.name = `${names.fileName}.repository.ts`;
        newFfobject.content = repositoryGenerator(entity);
        seed.seeds.push(newFfobject)
      })
    }

    if (seedName == 'nestjs') {
      const newFfobject = { ...fileAndFolderObject }
      newFfobject.type = 'file';
      newFfobject.name = 'module.ts';
      newFfobject.content = moduleGenerator(entities);
      seed.seeds.push(newFfobject)
    }
  });
  */
  console.log('Interfaces Finished!')
}

module.exports = { interfacesGenerator };
