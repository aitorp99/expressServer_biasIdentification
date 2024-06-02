const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

async function handleApiRequest(req, res, apiUrl) {
    const { id, text } = req.body;
    const headers = {
        'Accept': 'application/json',
        'x-api-key': 'xxx',
        'Content-Type': 'application/json'
    };
    const data = [{ id, text, language: "en" }];
    console.log('Sending request to API with data:', data);

    try {
        const response = await axios.post(apiUrl, data, { headers });
        if (response.status === 200 && response.data && response.data.length > 0) {
            res.json({ success: true, data: response.data[0]['predictions'] });
        } else {
            res.status(response.status).json({ success: false, error: 'Invalid API response' });
        }
    } catch (error) {
        console.error(`Excepción al hacer la solicitud: ${error.message}`);
        res.status(500).json({ success: false, error: "Error en el servidor" });
    }
}

app.post('/api/ekman-emotion', async (req, res) => {
    const apiUrl = 'https://api.symanto.net/ekman-emotion?all=true';
    await handleApiRequest(req, res, apiUrl);
});

app.post('/api/sentiment', async (req, res) => {
    const apiUrl = 'https://api.symanto.net/sentiment?all=true';
    await handleApiRequest(req, res, apiUrl);
});

app.post('/api/age', async (req, res) => {
    const apiUrl = 'https://api.symanto.net/age/doc-level?all=true';
    await handleApiRequest(req, res, apiUrl);
});

app.post('/api/gender', async (req, res) => {
    const apiUrl = 'https://api.symanto.net/gender/doc-level?all=true';
    await handleApiRequest(req, res, apiUrl);
});

app.post('/api/personality', async (req, res) => {
    const apiUrl = 'https://api.symanto.net/personality?all=true';
    await handleApiRequest(req, res, apiUrl);
});
