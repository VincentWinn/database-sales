/* This database.js files funciton is to set up an express server and handles the information I get from the html page
and inserts it into the table I created called sales (all the informaiton stored) */ 
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const client = new Client({
    host: '127.0.0.1',
    database: 'salesdb',
    user: 'vincent',
    password: 'nguyen1',
    port: 5432
});

client.connect();

app.post('/submit-form-data', (req, res) => {
    const { date, realDate, morningSales, nightSales, totalSales, targetSales, hit } = req.body;

    // Insert the form data into the database
    const query = 'INSERT INTO sales (date, real_date, morning_sales, night_sales, total_sales, target_sales, hit) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const values = [date, realDate, morningSales, nightSales, totalSales, targetSales, hit];

    client.query(query, values, (err, dbRes) => {
        if (!err) {
            console.log('Data inserted successfully');
            res.sendStatus(200);
        } else {
            console.error('Failed to insert data:', err.message);
            res.sendStatus(500);
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
