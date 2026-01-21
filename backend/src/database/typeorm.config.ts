import { DataSource } from "typeorm";

export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'library',
    entities: ['src/database/entities/*'],
    migrations: ['src/database/migrations/*.ts']
})