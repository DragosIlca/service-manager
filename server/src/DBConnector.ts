import { ConnectionPool } from "mssql";

const sql = require('mssql')

const config = {
    "user": "sa",
    "password": "4198607",
    "server": "localhost",
    "port": 1433,
    "database": "PW"
}

export class DBConnector {
    public static getConnection(): Promise<ConnectionPool> {
        return new Promise((resolve, reject) => {
            let connection: ConnectionPool = new sql.ConnectionPool(config, (err: any) => {
                if (err) {
                    console.error("Connection failed.", err);
                    reject(err);
                } else {
                    console.log("Database connected.");
                    resolve(connection);
                }
            });
        });
    }
}