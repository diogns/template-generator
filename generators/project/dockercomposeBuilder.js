const dockercomposeGenerator = (ffobject) => {
  ffobject.content = `version: '3.8'

services:
  redis-server:
    image: redis:6.0.5-alpine
    container_name: maintainers-redis-server
    command: redis-server
    ports:
      - '6379:6379'
    restart: always

  redis-client:
    image: rediscommander/redis-commander:latest
    container_name: maintainers-redis-client
    ports:
      - '8081:8081'
    restart: always
    environment:
      - REDIS_HOSTS=local:redis-server:6379

  mysql-server:
    image: mysql:8
    container_name: maintainers-mysql-server
    ports:
      - '3306:3306'
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=dev_db
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
    name: app-network
  
`;
};

module.exports = { dockercomposeGenerator };