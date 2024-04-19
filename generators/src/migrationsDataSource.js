const migrationsDataSourceGenerator = () => {
  const content = `
  import * as dotenv from 'dotenv';
  dotenv.config();
  
  import { DbManager } from './helpers/DbManager';
  import { entities } from './app.service';
  
  const buildDataSource = async () => {
    const config = await DbManager.getDbConfig();
    return DbManager.getDataSource(config, entities);
  };
  
  export default buildDataSource();
  
    `;
  return content;
};

module.exports = { migrationsDataSourceGenerator };
