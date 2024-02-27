const http = require('http')
const header = require('./header')

const server = http.createServer((req, res) => {
    console.log('url',req.url)
    console.log('method',req.method)    

    if(req.url === '/') {
        console.log('/')
    } else if(req.url.includes('/todo')) {
        console.log('/todo')
    } else {
        console.log('路由錯誤')
    }
})

server.listen(3535, () => console.log('伺服器已啟動'))

