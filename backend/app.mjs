import 'dotenv/config'

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from './config/swagger.mjs'
import cors from 'cors';
import customerRoutesV1 from './src/routes/v1/customer.mjs'
import adminRoutesV1 from './src/routes/v1/admin.mjs'
import { authenticateApiKey } from './src/middleware/authApiKey.mjs';
import { rateLimiter } from './src/middleware/rateLimit.mjs';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

//Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig.swaggerSpec));

app.get('/', (req, res) => {
    res.json({ hej: 'Hello World' });
});


app.use('/api/v1/customers', authenticateApiKey, customerRoutesV1);
app.use('/api/v1/admins', authenticateApiKey, adminRoutesV1);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Documentation available at: http://localhost:${PORT}/api-docs`)
});

export default { app };
