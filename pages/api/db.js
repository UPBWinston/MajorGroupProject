export function getDatabaseConnection() {
    const mysql = require('mysql2');

    return mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        port: 3306,
        database: 'test'
    });
}