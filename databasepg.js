const { Client } = require('pg');

const client = new Client({
    host: '127.0.0.1',
    database: 'salesdb',
    user: 'vincent',
    password: 'nguyen1',
    port: 5432
});

client.connect();

client.query('SELECT * FROM sales', (err, res) => {
    if (!err) {
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    client.end(); 
});
