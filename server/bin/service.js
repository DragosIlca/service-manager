const Server = require('../dest/server').Server

const service = new Server()
const app = service.app
service.start()

const port = 9000

app.listen(port, () => {
    console.log ("\nService-manager listening on port", port, "\n")
})