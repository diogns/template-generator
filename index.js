
const fs = require('fs');
var rimraf = require("rimraf");

const projectStructure = require('./projectStructure.json');
const data = require('./data.json');
const { build } = require('./generators/helpers');
const { srcGenerator } = require('./generators/src/src');



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