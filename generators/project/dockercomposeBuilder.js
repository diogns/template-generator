const dockercomposeGenerator = (ffobject, options) => {
  const projectName = options.projectName;
  const dbPort = options.env.dbPort;
  const dbUser = options.env.dbUser;
  const dbName = options.env.dbName;

  ffobject.content = `version: '3.8'

services:
  mysql-server:
    image: mysql:8
    container_name: ${projectName}-mysql
    ports:
      - '${dbPort}:3306'
    environment:
      - MYSQL_ROOT_PASSWORD=${dbUser}
      - MYSQL_DATABASE=${dbName}
    networks:
      - ${projectName}-network

networks:
${projectName}-network:
    driver: bridge
    name: ${projectName}-network
  
`;
};

module.exports = { dockercomposeGenerator };