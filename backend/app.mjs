import 'dotenv/config'

import express from 'express';
import cors from 'cors';
import customerRoutesV1 from './src/routes/v1/customer.mjs'
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ hej: 'Hello World' });
});

app.use('/api/v1/customers', customerRoutesV1)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default { app };
