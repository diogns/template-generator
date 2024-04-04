const fs = require('fs');

const { moduleGenerator } = require('./module');

const srcGenerator = (ffobject, entities) => {
  let ffobjectSeeds = ffobject.seeds;
  ffobjectSeeds.map((seed) => {
    let seedName = seed.name;
    let seedType = seed.type;

    if (seedType == 'file') {
      if (seedName == 'main.ts' || seedName == 'migrationsDataSource.ts') {
        const content = fs.readFileSync(`./generators/module/assets/${seedName}`, 'utf8');
        seed.content = content;
      }
    }

    // module
    if (seedName == 'modules') {
      moduleGenerator(seed, entities)
    }
  })
}

module.exports = { srcGenerator };
