import express from 'express';
import scooters from '../../controllers/scooterController.mjs';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     scooter:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the scooter
 *         firstName:
 *           type: string
 *           description: First name of the scooter
 *         lastName:
 *           type: string
 *           description: Last name of the scooter
 *       example:
 *         id: "1"
 *         firstName: "Jane"
 *         lastName: "Doe"
 */

/**
 * @swagger
 * /api/v1/scooters/all-scooters:
 *   get:
 *     summary: Retrieve all scooters
 *     tags: [scooters]
 *     responses:
 *       200:
 *         description: A list of scooters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/scooter'
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
router.get('/all-scooters', async (req, res) => {
    try {
        const data = await scooters.getAllScooters();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch data',
            error: error.message
        });
    }
});


router.get('/scooter/:id', async (req, res) => {
    const scooterId = req.params.id;

    try {
        const data = await scooters.getScooter(scooterId);
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch data',
            error: error.message
        });
    }
});

router.put('/update-scooter/:id', async (req, res) => {
    const scooterId = req.params.id;
    const updatedData = req.body;

    try {
        if (!updatedData || Object.keys(updatedData).length === 0) {
            return res.status(400).json({ error: 'No data was provided.' });
        }

        const result = await scooters.updateScooter(scooterId, updatedData);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update scooter information',
            error: error.message
        });
    }
});

router.delete('/delete-one-scooter', async (req, res) => {
    const scooterID = req.body._id;
    try {
        const result = await scooters.deleteOneScooter(scooterID);

        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Scooter deleted successfully' });
        } else {
            res.status(404).json({ message: 'Scooter not found' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete Scooter',
            error: error.message
        });
    }
});


export default router;
