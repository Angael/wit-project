require('dotenv').config({ path: './.env.local' });

module.exports = {
    production: {
        client: 'mssql',
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: 1433,
            ssl: true,
            options: {
                encrypt: true,
            },
        },
    },
};
