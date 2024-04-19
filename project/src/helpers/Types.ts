import type { DataSource, EntityManager } from 'typeorm';

export type Instance = {
  manager: EntityManager;
  dataSource: DataSource | void;
};
