import * as express from "express"
import { ConnectionPool } from "mssql";

const md5 = require('md5')
const sql = require("mssql")

const url = require('url');
const querystring = require('querystring');

export class ServiceRouter {
    public create(app: express.Application, pool: ConnectionPool): void {
        app.get('/services/get', function (req, res) {
            let parsedUrl = url.parse(req.url);
            let parsedQs = querystring.parse(parsedUrl.query);
                        
            pool.request()
                .query(`select serviceKey from dbo.Operations where brand='${parsedQs.brand}'`)
                .then(data => {
                    var serviceKeys = []
                    for (var index in data.recordset) {
                        if(serviceKeys.indexOf(`${data.recordset[index].serviceKey}`) == -1) {
                            serviceKeys.push(`${data.recordset[index].serviceKey}`)
                        }
                    }
                    
                    pool.request()  
                        .query(`select serviceName from dbo.Services where serviceKey in(${serviceKeys})`)
                        .then(names => {
                            var result = []
                            for (var index in names.recordset) {
                                result.push(`${names.recordset[index].serviceName}`)
                            }

                            res.send(JSON.parse(JSON.stringify(result)))
                        })
                        .catch(e => {
                            console.log("Error GET: ", e)
                            res.send(JSON.parse(JSON.stringify([])))
                        })
                })
                .catch(e => {
                    console.log("Error GET: ", e)
                    res.send(JSON.parse(JSON.stringify([])))
                })
        })
        app.get('/operations/get', function (req, res) {
            let parsedUrl = url.parse(req.url);
            let parsedQs = querystring.parse(parsedUrl.query);

            let brand = parsedQs.brand
            let service = parsedQs.service
                        
            pool.request()
                .query(`select serviceKey from dbo.Services where serviceName='${service}'`)
                .then(data => {
                    let serviceKey = data.recordset[0].serviceKey
                    pool.request()  
                        .query(`select opName from dbo.Operations where serviceKey=${serviceKey} and brand='${brand}'`)
                        .then(data => {
                            var operations = []
                            for (var index in data.recordset) {
                                if(operations.indexOf(`${data.recordset[index].opName}`) == -1) {
                                    operations.push(`${data.recordset[index].opName}`)
                                }
                            }
                            res.send(JSON.parse(JSON.stringify(operations)))
                        })
                        .catch(e => {
                            console.log("Error GET: ", e)
                            res.send(JSON.parse(JSON.stringify([])))
                        })
                })
                .catch(e => {
                    console.log("Error GET: ", e)
                    res.send(JSON.parse(JSON.stringify([])))
                })
        })
        
        app.get('/auth/login', function (req, res) {
            let parsedUrl = url.parse(req.url);
            let parsedQs = querystring.parse(parsedUrl.query);

            let password = md5(parsedQs.password)
            let email = parsedQs.email
                        
            pool.request()
                .query(`select Password from dbo.Auth where Email='${email}'`)
                .then(data => {
                    if (data != null){
                        let dbPassword = data.recordset[0].Password
                        
                        if (dbPassword === password)
                            res.send(JSON.parse(JSON.stringify({value: "OK"})))
                        else
                            res.send(JSON.parse(JSON.stringify(null)))
                    }
                    else {
                        res.send(JSON.parse(JSON.stringify({value: "No User"})))
                    }
                })
                .catch(e => {
                    console.log("Error GET: ", e)
                    res.send(JSON.parse(JSON.stringify(null)))
                })
        })

        app.get('/auth/register', function (req, res) {
            let parsedUrl = url.parse(req.url);
            let parsedQs = querystring.parse(parsedUrl.query);

            let password = md5(parsedQs.password)
            let email = parsedQs.email
                        
            pool.request()
                .query(`select Password from dbo.Auth where Email='${email}'`)
                .then(data => {
                    console.log(data)
                    if (data.recordset.length == 0){
                        
                        console.log("email: ", email)
                        console.log("Pass: ", password)
                        console.log(`insert into dbo.Auth values('${email}', '${password}')`)                        
                        pool.request()
                            .query(`insert into dbo.Auth (Email, Password) values('${email}', '${password}')`)
                            .then(() => {
                                console.log("lalalal")
                                res.send(JSON.parse(JSON.stringify({value: "OK"})))
                            })
                            .catch(e => {
                                console.log("Error GET: ", e)
                                res.send(JSON.parse(JSON.stringify(null)))
                            })
                    }
                    else {
                        res.send(JSON.parse(JSON.stringify(null)))
                    }
                })
                .catch(e => {
                    console.log("Error GET: ", e)
                    res.send(JSON.parse(JSON.stringify(null)))
                })
        })
    }
}