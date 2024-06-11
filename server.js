const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors());

// PostgreSQL client setup
const client = new Client({
    host: '127.0.0.1',
    database: 'salesdb',
    user: 'vincent',
    password: 'nguyen1',
    port: 5432
});

// Connect to the database
client.connect(err => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Database connected');
    }
});

// Handle form submission
app.post('/submit-form-data', (req, res) => {
    const { date, rdate, msales, nsales, tsales, target, hit } = req.body;

    // Log the received data
    console.log('Received data:', { date, rdate, msales, nsales, tsales, target, hit });

    // Insert the form data into the database
    const query = 'INSERT INTO sales (date, rdate, msales, nsales, tsales, target, hit) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [date, rdate, msales, nsales, tsales, target, hit];

    // Log the query and values
    console.log('Executing query:', query);
    console.log('With values:', values);

    client.query(query, values, (err, dbRes) => {
        if (!err) {
            console.log('Data inserted successfully:', dbRes.rows[0]);
            res.status(200).send('Data inserted successfully');
        } else {
            console.error('Failed to insert data:', err.stack);
            res.status(500).send('Failed to insert data');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
