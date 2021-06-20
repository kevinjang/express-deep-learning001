const { Connection, Request } = require('tedious')
const config = {
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: 'tingshuo768'
        }
    },
    options: {
        port: 1434
    }
}

function test() {
    const connection = new Connection(config);

    connection.connect();

    connection.on('connect', (err) => {
        if (err) {
            console.log('connect error:', err)
            connection.close();
            throw err
        }

        console.log('connect no error');

        const sql = 'select 2 as name';
        const request = new Request(sql, (err) => {
            if (err) {
                console.log('request execution err:', err);
                throw err;
            }
        })

        request.on('error', error => {
            console.log('request execution error:', error);
            throw error;
        })

        request.on('returnValue', (value, metadata) => {
            console.log('return value:', value)
            console.log('return metadata:', metadata)
        })

        if (connection.loggedIn) {
            console.log('connection loggedin')
            connection.execSql(request);
        }

        request.on('doneInProc', (rowCount, more, rows)=>{
            console.log('request done in proc rowCount:', rowCount)
            console.log('request done in proc more:', more)
            console.log('request done in proc rows:', rows)
        });

        request.on('doneProc', (rowCount, more, returnStatus, rows)=>{
            console.log('request done proc rowCount:', rowCount)
            console.log('request done proc more:', more)
            console.log('request done proc returnStatus:', returnStatus)
            console.log('request done proc rows:', rows)
        })

        request.on('columnMetadata', (columns)=>{
            console.log('column metadata:', columns)
        })

        request.on('prepared', ()=>{
            console.log('request prepared');
        })

        request.on('row', (rows)=>{
            console.log('request row:', rows)
        })

        request.on('requestCompleted', ()=>{
            console.log('request completed')
            connection.close();
        })
    })

}

async function test2(){
    const connection = new Connection(config);

    connection.connect();
    connection.on('connect', (err) => {
        if (err) {
            console.log('connect error:', err)
            connection.close();
            throw err
        }

        const sql = 'select 2 as name';
        const request = new Request(sql, (err) => {
            if (err) {
                console.log('request execution err:', err);
                throw err;
            }
        })

        request.on('error', error => {
            console.log('request execution error:', error);
            throw error;
        })

        if (connection.loggedIn) {
            console.log('connection loggedin')
            connection.execSql(request);
        }

        request.on('row', (rows)=>{
            console.log('request row:', rows)
            return rows
        })

        request.on('requestCompleted', ()=>{
            console.log('request completed')
            connection.close();
        })

    });

}

module.exports = { test, test2 }