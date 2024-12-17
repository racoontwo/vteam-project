const validApiKeys = ['api-key-1234', 'api-key-5678']; // Replace with DB-stored keys in production

export const authenticateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key']; // API key passed in the request headers

    if (!apiKey || !validApiKeys.includes(apiKey)) {
        return res.status(403).json({ error: 'Invalid API Key.' });
    }

    next(); // Proceed if the key is valid
};

