const { addCommandGenerator } = require('./command/add');
const { removeCommandGenerator } = require('./command/remove');
const { updateCommandGenerator } = require('./command/update');
const { getQueryGenerator } = require('./query/get');
const { listQueryGenerator } = require('./query/list');


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
          const type = method.type;
          if (type == 'command') {
            const newFfobjectCommand = { type: '', name: '', content: '', seeds: [] };
            newFfobjectCommand.type = 'file';
            newFfobjectCommand.name = `${methodName}-${names.fileName}.command.ts`;
            if (methodName == 'add') {
              newFfobjectCommand.content = addCommandGenerator(entity);
            }
            if (methodName == 'remove') {
              newFfobjectCommand.content = removeCommandGenerator(entity);
            }
            if (methodName == 'update') {
              newFfobjectCommand.content = updateCommandGenerator(entity);
            }
            newFfobject.seeds.push(newFfobjectCommand);
          }
        });

        seed.seeds.push(newFfobject);
      });
    }

    if (seedName == 'queries') {
      entities.map((entity) => {
        const names = getNames(entity)
        const newFfobject = { type: '', name: '', content: '', seeds: [] };
        newFfobject.type = 'dir';
        newFfobject.name = names.fileName;

        crud.map((method) => {
          const methodName = method.name;
          const type = method.type;
          if (type == 'query') {
            const newFfobjectQuery = { type: '', name: '', content: '', seeds: [] };
            newFfobjectQuery.type = 'file';
            if (methodName == 'get') {
              newFfobjectQuery.name = `${methodName}-${names.fileName}-by-id.query.ts`;
              newFfobjectQuery.content = getQueryGenerator(entity);
            }
            if (methodName == 'list') {
              newFfobjectQuery.name = `${methodName}-${names.fileName}s.query.ts`;
              newFfobjectQuery.content = listQueryGenerator(entity);
            }
            newFfobject.seeds.push(newFfobjectQuery);
          }
        });

        seed.seeds.push(newFfobject);
      });
    }
  });

  console.log('application Finished!')
}

module.exports = { applicationGenerator };
