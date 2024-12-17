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
 * /api/v1/customers/all-customers:
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
 * /api/v1/customers/add-customer:
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
router.post('/new-customer', async (req, res) => {
    const data = req.body;
    // if (!data.firstName || !data.lastName) {
    //     return res.status(400).json({ error: 'Full name is required' });
    // }

    try {
        const result = await customers.addCustomer(data);
        res.status(200).json({ message: 'Data received and inserted', data: data, result });
    } catch (error) {
        console.error('Error occurred during customer insertion:', error);
        res.status(500).json({ error: 'Failed to insert data into database', details: error.message });
    }
});

router.get('/customer/:id', async (req, res) => {
    const customerId = req.params.id;

    try {
        const data = await customers.getCustomer(customerId);
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch data', error: error.message});
    }
})

/**
 * @swagger
 * /api/v1/customers/delete-all-customers:
 *   delete:
 *     summary: Delete all customers from the collection
 *     description: Removes all customer records from the database.
 *     tags:
 *       - Customers
 *     responses:
 *       200:
 *         description: Successfully deleted all customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All customers deleted successfully
 *                 result:
 *                   type: object
 *                   properties:
 *                     acknowledged:
 *                       type: boolean
 *                       example: true
 *                     deletedCount:
 *                       type: integer
 *                       example: 10
 *       500:
 *         description: Failed to delete customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to delete customers
 *                 error:
 *                   type: string
 *                   example: An error occurred while deleting customers
 */
router.delete('/delete-all-customers', async (req, res) => {
    try {
        const result = await customers.deleteAllCustomers();
        res.status(200).json({ message: 'All customers deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete customers', error: error.message });
    }
});

/**
 * @swagger
 * /api/v1/customers/delete-one-customer:
 *   delete:
 *     summary: Deletes a customer by ID
 *     description: Deletes a customer record from the database using the provided customer ID.
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The ID of the customer to be deleted.
 *                 example: "60d72b2f9b1d8a7a1c7d56e7"
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Failed to delete customer due to an internal error
 */
router.delete('/delete-one-customer', async (req, res) => {
    const customerID = req.body._id;
    try {
        const result = await customers.deleteOneCustomer(customerID);

        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Customer deleted successfully" });
        } else {
            res.status(404).json({ message: "Customer not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete customer" });
    }
});

export default router;
