
const rimraf = require("rimraf");

const projectStructure = require('./data/projectStructure.json');
const entities = require('./data/entities.json');
const options = require('./data/options.json');

const { build, lintAndExecute } = require('./generators/helpers');
const { srcGenerator } = require('./generators/src/src');
const { projectGenerator } = require('./generators/project/project');

const main = async () => {
  const projectStructureSeeds = projectStructure[0].seeds;
  projectStructureSeeds.map((seed) => {
    let seedName = seed.name;
    
    if (seedName == 'src') {
      srcGenerator(seed, entities, options)
    } else {
      projectGenerator(seed, options)
    }
  })

  rimraf.sync("./project");
  build(projectStructure);

  await lintAndExecute('npm run lint')
}
main()