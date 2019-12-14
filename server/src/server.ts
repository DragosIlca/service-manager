import * as express from "express"
import { ServiceRouter } from "./routes/service-router"
import { DBConnector } from "./DBConnector"

export class Server {
    public app: express.Application

    public constructor() {
        this.app = express()
    }

    public start (): void {
        let router = new ServiceRouter()
        let dbConnection = DBConnector.getConnection()
        dbConnection
            .then((pool) => router.create(this.app, pool))
            .catch((e) => console.log(e));
    }
}