const http = require('http')
const {v4: uuidv4} = require('uuid')
const header = require('./header')
const handleError = require('./handleError')

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
                        handleError(res, error)
                    }
                })
                break
            }
            default: {
                handleError(res, '無此 method')
                break
            }
        }
    } else if(url.includes('/todo')) {
        switch(method) {
            case 'DELETE': {
                if(url === '/todo') {
                    database.length = 0
                    res.writeHeader(200, header)
                    res.write(JSON.stringify({
                        url,
                        method,
                        data: database
                    }))
                    res.end()
                }
                break
            }
            default: {
                handleError(res, '無此 method')
                break
            }
        }
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

