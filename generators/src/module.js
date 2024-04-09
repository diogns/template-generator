const moduleJsonObject = require('../../module.json');
const { fileAndFolderObject, getNames } = require('../helpers');

const { domainGenerator } = require('../domain/domain');
const { infrastructureGenerator } = require('../infrastructure/infrastructure');
const { applicationGenerator } = require('../application/application');
const { interfacesGenerator } = require('../interfaces/interfaces');

const moduleGenerator = (ffobject, entities) => {
  let ffobjectSeeds = ffobject.seeds;
  const entitiesByName = {};

  entities.map((entity) => {
    const names = getNames(entity)
    const newFfobject = JSON.parse(JSON.stringify(fileAndFolderObject));
    newFfobject.type = 'dir';
    newFfobject.name = names.name;
    newFfobject.seeds = JSON.parse(JSON.stringify(moduleJsonObject));
    ffobjectSeeds.push(newFfobject);
    if (!entitiesByName.hasOwnProperty(names.name)) {
      entitiesByName[names.name] = entity;
    }
  });


  ffobjectSeeds.map((seed) => {
    const seedModule = seed.seeds;
    const seedName = seed.name;
    
    seedModule.map((child) => {
      const childName = child.name;

      // application
      if (childName == 'application') {
        applicationGenerator(child, entitiesByName[seedName], entitiesByName)
      }

      // domain
      if (childName == 'domain') {
        domainGenerator(child, entitiesByName[seedName])
      }

      // infrastructure
      if (childName == 'infrastructure') {
        infrastructureGenerator(child, entitiesByName[seedName])
      }
      
      // interface
      if (childName == 'interfaces') {
        interfacesGenerator(child, entitiesByName[seedName])
      }
    });
    
  });

}

module.exports = { moduleGenerator };
