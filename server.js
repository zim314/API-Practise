const http = require('http')
const header = require('./header')
const {v4: uuidv4} = require('uuid')

const database = []

const server = http.createServer((req, res) => {
    const {url, method} = req
    let body = ''
    req.on('data', chunk => body += chunk )

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

            case 'POST': {
                req.on('end', () => {
                    try {  
                        const title = JSON.parse(body).title
                        if(title === undefined) throw '找不到title'
                        const todo = {
                            title,
                            id: uuidv4()
                        }
                        database.push(todo)
                        res.writeHeader(200, header)
                        res.write(JSON.stringify({
                            url,
                            method,
                            data: database
                        }))
                        res.end()
                    } catch (error) {
                        console.log('錯誤', error)
                    }
                })
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

