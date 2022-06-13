import knex from 'knex';

export const DB = knex({
    client: 'mssql',
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: 1433,
        ssl: true,
        debug: true,
        options: {
            encrypt: true,
        },
    },
});
