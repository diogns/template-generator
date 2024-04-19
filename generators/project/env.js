const envGenerator = (ffobject) => {
  ffobject.content = `# Environment variables
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASS=
DB_LOGGING='false' | 'true' | default: false
DB_DIALECT='mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | default: mysql
`;
};

module.exports = { envGenerator };