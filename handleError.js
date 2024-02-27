const header = require('./header')

const handleError = (res, error, status = 400) => {
    console.log(error)
    res.writeHead(status, header)
    res.write(JSON.stringify({
        status: false,
        data: []
    }))
    res.end()
}

module.exports = handleError