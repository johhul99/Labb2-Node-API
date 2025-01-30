require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/products', async (req, res) => { 
    try {
        const response = await axios.get(process.env.NET_GET_URL);

        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Kunde inte hämta produkter.'});
    }
});

app.post('/product', async (req, res) => {
    try {
        const response = await axios.post(process.env.NET_POST_URL, req.body);

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
});

app.listen(PORT, () => {
    console.log("Server is up and running on port 3000.");
});