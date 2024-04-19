const { fileAndFolderObject } = require('../helpers');
const { getNames, crud } = require('../helpers');
const { docsGenerator } = require('./docs');
const { modDtosGenerator, requestDtosGenerator, responseDtosGenerator } = require('./dtos');
const { controllerGenerator } = require('./controller');

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
        const v1Seeds = seed2.seeds;

        // v1
        if (v1Name == 'v1') {
          v1Seeds.map((seed3) => {
            const seed3Name = seed3.name;

            if (seed3Name == 'docs') {
              const ffobjectDocs = JSON.parse(JSON.stringify(fileAndFolderObject));
              ffobjectDocs.type = 'file';
              ffobjectDocs.name = `${names.fileName}.docs.ts`;
              ffobjectDocs.content = docsGenerator(entity);
              seed3.seeds.push(ffobjectDocs);

            } else if (seed3Name == 'dtos') {
              const ffobjectDtosMod = JSON.parse(JSON.stringify(fileAndFolderObject));
              ffobjectDtosMod.type = 'file';
              ffobjectDtosMod.name = `mod-${names.fileName}.response.ts`;
              ffobjectDtosMod.content = modDtosGenerator(entity);

              const ffobjectDtosReq = JSON.parse(JSON.stringify(fileAndFolderObject));
              ffobjectDtosReq.type = 'file';
              ffobjectDtosReq.name = `${names.fileName}.request.ts`;
              ffobjectDtosReq.content = requestDtosGenerator(entity);

              const ffobjectDtosRes = JSON.parse(JSON.stringify(fileAndFolderObject));
              ffobjectDtosRes.type = 'file';
              ffobjectDtosRes.name = `${names.fileName}.response.ts`;
              ffobjectDtosRes.content = responseDtosGenerator(entity);

              seed3.seeds.push(ffobjectDtosMod);
              seed3.seeds.push(ffobjectDtosReq);
              seed3.seeds.push(ffobjectDtosRes);
            }

          });

          const ffobjectController = JSON.parse(JSON.stringify(fileAndFolderObject));
          ffobjectController.type = 'file';
          ffobjectController.name = `${names.fileName}.controller.ts`;
          ffobjectController.content = controllerGenerator(entity);
          seed2.seeds.push(ffobjectController);
        }
      });
    }
  });
}

module.exports = { interfacesGenerator };
