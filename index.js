import express from 'express';
import path from 'path';
import dotenv from "dotenv";

dotenv.config();
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {



    return res.send('Data received:\n' + process.env.data);
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});