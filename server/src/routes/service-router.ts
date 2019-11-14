import * as express from "express"

export class ServiceRouter {
    public create(app: express.Application): void {
        app.get('/*', function (req, res) {
            res.send('Empty route')
        })
    }
}