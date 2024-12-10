import express from 'express';
import customers from '../../controllers/customerController.mjs'

const router = express.Router();

// Fetch data for all users
router.get('/all-customers', async (req, res) => {
    try {
        const data = await customers.getAllCustomers();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch data', error: error.message});
    }
})

router.post('/add-customer', async (req, res) => {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
        return res.status(400).json({ error: 'Full name is required' });
    }

    try {
        const result = await customers.addCustomer({ firstName, lastName });
        res.status(200).json({ message: 'Data received and inserted', data: { firstName, lastName }, result });
    } catch (error) {
        console.error('Error occurred during customer insertion:', error);
        res.status(500).json({ error: 'Failed to insert data into database', details: error.message });
    }
});
export default router;