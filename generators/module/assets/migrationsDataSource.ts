import * as dotenv from 'dotenv';
dotenv.config();

import { AuroraManager } from './helpers/AuroraManager';
import { entities } from './app.service';

const buildDataSource = async () => {
  const config = await AuroraManager.getDbConfig();
  return AuroraManager.getDataSource(config, entities);
};

export default buildDataSource();
