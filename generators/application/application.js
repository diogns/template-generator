// const { entityGenerator } = require('./entity');
const { commandGenerator } = require('./command');
// const { repositoryGenerator } = require('./repository');
// const { moduleGenerator } = require('./module');

const { getNames, crud } = require('../helpers');

const applicationGenerator = (ffobject, entities) => {
  console.log('Building application!')

  let ffobjectSeeds = ffobject.seeds;
  ffobjectSeeds.map((seed) => {
    let seedName = seed.name;

    // commands
    if (seedName == 'commands') {
      entities.map((entity) => {
        const names = getNames(entity)
        const newFfobject = { type: '', name: '', content: '', seeds: [] };
        newFfobject.type = 'dir';
        newFfobject.name = names.fileName;

        crud.map((method) => {
          const methodName = method.name;
          const newFfobjectCommand = { type: '', name: '', content: '', seeds: [] };
          newFfobjectCommand.type = 'file';
          newFfobjectCommand.name = `${methodName}-${names.fileName}.command.ts`;
          newFfobjectCommand.content = commandGenerator(entity, method);
          newFfobject.seeds.push(newFfobjectCommand)
        });

        seed.seeds.push(newFfobject)
      });
    }
  });

  console.log('application Finished!')
}

module.exports = { applicationGenerator };
