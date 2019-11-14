import * as express from "express"
import { ServiceRouter } from "./routes/service-router"

export class Server {
    public app: express.Application

    public constructor() {
        this.app = express()
    }

    public start (): void {
        let router = new ServiceRouter()

        router.create(this.app)
    }
}