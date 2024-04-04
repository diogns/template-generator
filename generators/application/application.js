const { addCommandGenerator } = require('./command/add');
const { removeCommandGenerator } = require('./command/remove');
const { updateCommandGenerator } = require('./command/update');
const { getQueryGenerator } = require('./query/get');
const { listQueryGenerator } = require('./query/list');


const { getNames, crud, fileAndFolderObject } = require('../helpers');

const applicationGenerator = (ffobject, entity, entities) => {
  let ffobjectSeeds = ffobject.seeds;
  ffobjectSeeds.map((seed) => {
    let seedName = seed.name;

    // commands
    if (seedName == 'commands') {
      const names = getNames(entity)
      crud.map((method) => {
        const methodName = method.name;
        const type = method.type;
        if (type == 'command') {
          const newFfobjectCommand = JSON.parse(JSON.stringify(fileAndFolderObject));
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
          seed.seeds.push(newFfobjectCommand);
        }
      });
    }

    if (seedName == 'queries') {
      const names = getNames(entity)
      crud.map((method) => {
        const methodName = method.name;
        const type = method.type;
        if (type == 'query') {
          const newFfobjectQuery = JSON.parse(JSON.stringify(fileAndFolderObject));
          newFfobjectQuery.type = 'file';
          if (methodName == 'get') {
            newFfobjectQuery.name = `${methodName}-${names.fileName}-by-id.query.ts`;
            newFfobjectQuery.content = getQueryGenerator(entity);
          }
          if (methodName == 'list') {
            newFfobjectQuery.name = `${methodName}-${names.fileName}s.query.ts`;
            newFfobjectQuery.content = listQueryGenerator(entity);
          }
          seed.seeds.push(newFfobjectQuery);
        }
      });
    }
  });
}

module.exports = { applicationGenerator };
