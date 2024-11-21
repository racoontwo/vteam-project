const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ hej: 'Hello World' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});