const fs = require("fs");

const { moduleGenerator } = require("./module");
const { appModuleGenerator } = require("./app.module");
const { appServiceGenerator } = require("./app.service");
const { coreGenerator } = require("./core");
const { mainGenerator } = require("./main");
const { migrationsDataSourceGenerator } = require("./migrationsDataSource");
const { helpersGenerator } = require("./helpers");

const srcGenerator = (ffobject, entities) => {
  let ffobjectSeeds = ffobject.seeds;
  ffobjectSeeds.map((seed) => {
    let seedName = seed.name;

    if (seedName == "app.module.ts") {
      seed.content = appModuleGenerator(entities);
    }

    if (seedName == "app.service.ts") {
      seed.content = appServiceGenerator();
    }

    if (seedName == "core") {
      coreGenerator(seed);
    }

    if (seedName == "helpers") {
      helpersGenerator(seed);
    }

    if (seedName == "main.ts") {
      seed.content = mainGenerator();
    }

    if (seedName == "migrationsDataSource.ts") {
      seed.content = migrationsDataSourceGenerator();
    }

    if (seedName == "modules") {
      moduleGenerator(seed, entities);
    }

    if (seedName == "seeds") {
    }
  });
};

module.exports = { srcGenerator };
