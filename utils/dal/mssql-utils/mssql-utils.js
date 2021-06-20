const config = {
    user: 'sa',
    password: 'tingshuo768',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'KSNL',
    port: 1434,
    dialect: 'mssql',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

const sql = require('mssql');

const {Request} = sql;

async function test(){
    try {
        // console.log(sql.connect)
        let pool = new sql.ConnectionPool(config);
        // pool.connect();
        await pool.connect();
        // console.log('pool:', pool)

        // (await pool).on()

        pool.on('error', err=>{
            console.log('pool error:', err)
        })

        const request = new Request(pool);
        request.on('row', row=>{

        })

        request.on('done', ()=>{
            console.log('request done, about to close the connection')
            pool.close();
        })

        let result1 = await request.query('select 1 as name');
        console.log('result1:', result1)
    } catch (error) {
        console.log('error:', error)
    }
}

sql.on('error', err=>{
    console.log(err)
});

module.exports = {test}