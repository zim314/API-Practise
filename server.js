const http = require('http')
const header = require('./header')

const database = []

const server = http.createServer((req, res) => {
    const {url, method} = req

    if(url === '/') {
        switch(method) {
            case 'GET': {
                res.writeHeader(200, header)
                res.write(JSON.stringify({
                    url,
                    method,
                    data: database
                }))
                res.end()
                break
            }
        }
    } else if(url.includes('/todo')) {
        console.log('/todo')
    } else {
        res.writeHeader(400, header)
        res.write(JSON.stringify({
            status: false,
            data: []
        }))
        res.end()
    }
})

server.listen(3535, () => console.log('伺服器已啟動'))

