const projectStructure = require('./projectStructure.json');
const data = require('./data.json');
const { domainGenerator } = require('./generators/domain/domain');
const { infrastructureGenerator } = require('./generators/infrastructure/infrastructure');
const { build } = require('./generators/helpers');
const fs = require('fs');
var rimraf = require("rimraf");

const moduleGenerator = (module, data, projectStructure) => {
  console.log('module!')
  let moduleSeeds = module.seeds;
  moduleSeeds.map((seed) => {
    let seedName = seed.name;

    // domain
    if (seedName == 'domain') {
      domainGenerator(seed, data)
    }

    // infrastructure
    if (seedName == 'infrastructure') {
      infrastructureGenerator(seed, data)
    }
  })
}

const srcGenerator = (src, data, projectStructure) => {
  let srcSeeds = src.seeds;
  srcSeeds.map((seed) => {
    let seedName = seed.name;
    let seedType = seed.type;

    if (seedType == 'file') {
      if (seedName == 'main.ts' || seedName == 'migrationsDataSource.ts') {
        const content = fs.readFileSync(`./generators/module/assets/${seedName}`, 'utf8');
        seed.content = content;
      }
    }

    // module
    if (seedName == 'module') {
      moduleGenerator(seed, data)
    }

  })
}

const main = () => {
  const projectStructureSeeds = projectStructure[0].seeds;
  projectStructureSeeds.map((seed) => {
    let seedName = seed.name;
    let seedType = seed.type;

    // ./src
    if (seedType == 'file') {
      const content = fs.readFileSync(`./generators/src/assets/${seedName}`, 'utf8');
      seed.content = content;
    }
    if (seedName == 'src') {
      srcGenerator(seed, data, projectStructure)
    }
  })

  rimraf.sync("./project");
  build(projectStructure);
}
main()