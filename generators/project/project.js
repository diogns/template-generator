const { envGenerator } = require('./env');
const { gitignoreGenerator } = require('./gitignore');
const { dockerignoreGenerator } = require('./dockerignore');
const { dockerfileGenerator } = require('./dockerfileBuilder');
const { dockercomposeGenerator } = require('./dockercomposeBuilder');
const { packagejsonGenerator } = require('./packagejson');
const { eslintrcGenerator } = require('./eslintrc');
const { prettierrcGenerator } = require('./prettierrc');
const { nestcliGenerator } = require('./nestcli');
const { tsconfigGenerator } = require('./tsconfig');
const { tsconfigbuildGenerator } = require('./tsconfigbuild');

const projectGenerator = (ffobject, options) => {
  console.log('options', options)
  const name = ffobject.name;

  if (name === 'Dockerfile') {
    dockerfileGenerator(ffobject);
  }
  if (name === 'docker-compose.yml') {
    dockercomposeGenerator(ffobject);
  }
  if (name === '.dockerignore') {
    dockerignoreGenerator(ffobject);
  }
  if (name === '.gitignore') {
    gitignoreGenerator(ffobject);
  }
  if (name === '.env') {
    envGenerator(ffobject);
  }
  if (name === 'package.json') {
    packagejsonGenerator(ffobject);
  }
  if (name === '.eslintrc.js') {
    eslintrcGenerator(ffobject);
  }
  if (name === '.prettierrc') {
    prettierrcGenerator(ffobject);
  }
  if (name === 'nest-cli.json') {
    nestcliGenerator(ffobject);
  }
  if (name === 'tsconfig.json') {
    tsconfigGenerator(ffobject);
  }
  if (name === 'tsconfig.build.json') {
    tsconfigbuildGenerator(ffobject);
  }
};

module.exports = { projectGenerator };