const { fileAndFolderObject } = require('../helpers');
const { getNames, crud } = require('../helpers');
const { getControllerGenerator, getDtosGenerator, getDocsGenerator } = require('./get');
const { addControllerGenerator, addDtosGenerator, addDocsGenerator } = require('./add');

const interfacesGenerator = (ffobject, entity) => {
  const names = getNames(entity);
  let ffobjectSeeds = ffobject.seeds;
  ffobjectSeeds.map((seed1) => {
    const httpSeeds = seed1.seeds;
    const httpName = seed1.name;
    // http
    if (httpName == 'http') {
      httpSeeds.map((seed2) => {
        const v1Name = seed2.name;
        // v1
        if (v1Name == 'v1') {
          crud.map((method) => {
            const action = method.action;
            const type = method.type;
            const methodName = method.name;

            // interface object
            const newFfobject = JSON.parse(JSON.stringify(fileAndFolderObject));
            newFfobject.type = 'dir';

            // controller
            const ffobjectController = JSON.parse(JSON.stringify(fileAndFolderObject));
            ffobjectController.type = 'file';

            // Docs
            const ffobjectDocs = JSON.parse(JSON.stringify(fileAndFolderObject));
            ffobjectDocs.type = 'dir';
            ffobjectDocs.name = 'docs';
            const ffobjectDocsSeed = JSON.parse(JSON.stringify(fileAndFolderObject));
            ffobjectDocsSeed.type = 'file';

            // Dtos
            const ffobjectDtos = JSON.parse(JSON.stringify(fileAndFolderObject));
            ffobjectDtos.type = 'dir';
            ffobjectDtos.name = 'dtos';
            const ffobjectRequest = JSON.parse(JSON.stringify(fileAndFolderObject));
            const ffobjectResponse = JSON.parse(JSON.stringify(fileAndFolderObject));
            ffobjectRequest.type = 'file';
            ffobjectResponse.type = 'file';

            if (methodName == 'get') {
              newFfobject.name = `${methodName}-${names.fileName}-by-id`;

              // controller
              ffobjectController.name = `${methodName}-${names.fileName}-by-id.controller.ts`;
              ffobjectController.content = getControllerGenerator(entity);

              // dtos
              ffobjectRequest.name = `${methodName}-${names.fileName}-by-id.request.ts`;
              ffobjectResponse.name = `${methodName}-${names.fileName}-by-id.response.ts`;

              // docs
              ffobjectDocsSeed.name = `${methodName}-${names.fileName}-by-id.docs.ts`;
              ffobjectDocsSeed.content = getDocsGenerator(entity);

              ffobjectDtos.seeds = [ffobjectRequest, ffobjectResponse]
              ffobjectDocs.seeds = [ffobjectDocsSeed]

            }

            if (methodName == 'add' || methodName == 'list' || methodName == 'update' || methodName == 'remove') {
              newFfobject.name = `${methodName}-${names.fileName}`;

              // controller
              ffobjectController.name = `${methodName}-${names.fileName}.controller.ts`;
              ffobjectController.content = addControllerGenerator(entity);

              // dtos
              ffobjectRequest.name = `${methodName}-${names.fileName}.request.ts`;
              ffobjectResponse.name = `${methodName}-${names.fileName}.response.ts`;
              const dtoContent = addDtosGenerator(entity);
              ffobjectRequest.content = dtoContent.requestContent;
              ffobjectResponse.content = dtoContent.responseContent;

              // docs
              ffobjectDocsSeed.name = `${methodName}-${names.fileName}.docs.ts`;
              ffobjectDocsSeed.content = addDocsGenerator(entity);

              ffobjectDtos.seeds = [ffobjectRequest, ffobjectResponse]
              ffobjectDocs.seeds = [ffobjectDocsSeed]

            }

            newFfobject.seeds = [ffobjectDtos, ffobjectDocs, ffobjectController]

            seed2.seeds.push(newFfobject)
          });
        }
      });
    }
  });
}

module.exports = { interfacesGenerator };
