import 'dotenv/config'

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from './config/swagger.mjs'
import cors from 'cors';
import customerRoutesV1 from './src/routes/v1/customer.mjs'
import adminRoutesV1 from './src/routes/v1/admin.mjs'

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

//Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig.swaggerSpec));

app.get('/', (req, res) => {
    res.json({ hej: 'Hello World' });
});

app.use('/api/v1/customers', customerRoutesV1)
app.use('/api/v1/admins', adminRoutesV1)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Documentation available at: http://localhost:${PORT}/api-docs`)
});

export default { app };
