const packagejsonGenerator = (ffobject, options) => {
  const projectName = options.projectName;
  const jiraPrefix = options.jiraPrefix;

  ffobject.content = `{
  "name": "${projectName}-ms",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \\"src/**/*.ts\\" \\"test/**/*.ts\\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \\"{src,apps,libs,test}/**/*.ts\\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "migration:create": "typeorm-ts-node-esm migration:create ./src/migrations/$npm_config_name --outputJs",
    "migration:generate": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate ./src/migrations/$npm_config_name --dataSource ./src/migrationsDataSource.ts --outputJs",
    "migration:run": "typeorm-ts-node-esm migration:run --dataSource ./src/migrationsDataSource.ts",
    "migration:revert": "typeorm-ts-node-esm migration:revert --dataSource ./src/migrationsDataSource.ts"
  },
  "dependencies": {
    "@nestjs/axios": "^3.0.2",
    "@nestjs/common": "^10.0.0",
    "@nestjs/config": "^3.2.1",
    "@nestjs/core": "^10.0.0",
    "@nestjs/cqrs": "^10.2.7",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/swagger": "^7.3.1",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "compression": "^1.7.4",
    "dotenv": "^16.4.5",
    "helmet": "^7.1.0",
    "mysql2": "^3.9.3",
    "neverthrow": "^6.1.0",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.1",
    "typeorm": "^0.3.20"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/babel__core": "^7.20.5",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/supertest": "^6.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.42.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "jest": "^29.5.0",
    "prettier": "^3.0.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\\\.spec\\\\.ts$",
    "transform": {
      "^.+\\\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/@digitalroute/cz-conventional-changelog-for-jira",
      "jiraPrefix": "${jiraPrefix}",
      "jiraLocation": "post-body"
    }
  }
}
`;
};

module.exports = { packagejsonGenerator };
