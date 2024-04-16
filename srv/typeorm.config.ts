import * as path from 'path';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  url: process.env.APP_PG_URL,
  ssl: false,
  type: 'postgres',
  entities: [path.join('dist', '**', '*.entity.{ts,js}')],
  migrations: [path.join('./migrations/*.ts')],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development'
});

export default dataSource;
