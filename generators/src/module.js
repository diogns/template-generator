const { domainGenerator } = require('../domain/domain');
const { infrastructureGenerator } = require('../infrastructure/infrastructure');
const { applicationGenerator } = require('../application/application');
const moduleGenerator = (ffobject, entities) => {
  console.log('module!')
  let ffobjectSeeds = ffobject.seeds;
  ffobjectSeeds.map((seed) => {
    let seedName = seed.name;

    // domain
    if (seedName == 'domain') {
      domainGenerator(seed, entities)
    }

    // infrastructure
    if (seedName == 'infrastructure') {
      infrastructureGenerator(seed, entities)
    }

    // application
    if (seedName == 'application') {
      applicationGenerator(seed, entities)
    }

    // interface
    if (seedName == 'interfaces') {
      applicationGenerator(seed, entities)
    }
  })
}

module.exports = { moduleGenerator };
