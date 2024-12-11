import express from 'express';
import customers from '../../controllers/customerController.mjs'

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the customer
 *         firstName:
 *           type: string
 *           description: First name of the customer
 *         lastName:
 *           type: string
 *           description: Last name of the customer
 *       example:
 *         id: "1"
 *         firstName: "Jane"
 *         lastName: "Doe"
 */

/**
 * @swagger
 * /all-customers:
 *   get:
 *     summary: Retrieve all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Failed to fetch data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get('/all-customers', async (req, res) => {
    try {
        const data = await customers.getAllCustomers();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch data', error: error.message});
    }
})

/**
 * @swagger
 * /add-customer:
 *   post:
 *     summary: Add a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the customer
 *               lastName:
 *                 type: string
 *                 description: Last name of the customer
 *             example:
 *               firstName: "John"
 *               lastName: "Smith"
 *     responses:
 *       200:
 *         description: Customer successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *                 result:
 *                   type: object
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Failed to add customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 details:
 *                   type: string
 */
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