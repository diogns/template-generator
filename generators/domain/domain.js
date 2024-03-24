const { entityGenerator } = require('./entity');
const { repositoryGenerator } = require('./repository');

const { fileAndFolderObject } = require('../helpers');
const { getNames } = require('../helpers');

const domainGenerator = (ffobject, data) => {
  console.log('Building Domain!')
  let ffobjectSeeds = ffobject.seeds;
  ffobjectSeeds.map((seed) => {
    let seedName = seed.name;

    // entities
    if (seedName == 'entities') {
      data.map((entity) => {
        const names = getNames(entity)
        const newFfobject = { ...fileAndFolderObject }
        newFfobject.type = 'file';
        newFfobject.name = `${names.fileName}.entity.ts`;
        newFfobject.content = entityGenerator(entity);
        seed.seeds.push(newFfobject)
      })
    }

    // repositories
    if (seedName == 'repositories') {
      data.map((entity) => {
        const names = getNames(entity)
        const newFfobject = { ...fileAndFolderObject }
        newFfobject.type = 'file';
        newFfobject.name = `${names.fileName}.repository.ts`;
        newFfobject.content = repositoryGenerator(entity);
        seed.seeds.push(newFfobject)
      })
    }
  })
  console.log('Domain Finished!')
}

module.exports = { domainGenerator };
