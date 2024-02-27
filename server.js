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
                    database
                }))
                res.end()
                break
            }
        }
    } else if(url.includes('/todo')) {
        console.log('/todo')
    } else {
        console.log('路由錯誤')
    }
})

server.listen(3535, () => console.log('伺服器已啟動'))

