const envGenerator = (ffobject, options) => {
  const envVariables = options.env;
  
  ffobject.content = `# Environment variables
PORT = ${envVariables.port}
ENVIRONMENT = '${envVariables.environment}'

# DB
DB_HOST = '${envVariables.dbHost}'
DB_PORT = ${envVariables.dbPort}
DB_NAME = '${envVariables.dbName}'
DB_USER = '${envVariables.dbUser}'
DB_PASS = '${envVariables.dbPass}'
DB_LOGGING = '${envVariables.dbLogging}'
DB_DIALECT = '${envVariables.dbDialect}'
POOL_SIZE = ${envVariables.poolSize}
`;
};

module.exports = { envGenerator };