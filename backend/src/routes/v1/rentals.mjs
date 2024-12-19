import express from 'express';
import rentals from '../../controllers/rentalController.mjs'

const router = express.Router();

router.post('/new-rental', async (req, res) => {
    const data = req.body;

    try {
        const result = await rentals.newRental(data);
        res.status(200).json({ message: 'Data received and inserted', data: data, result });
    } catch (error) {
        console.error('Error occurred during customer insertion:', error);
        res.status(500).json({ error: 'Failed to insert data into database', details: error.message });
    }
});

router.get('/all-rentals', async (req, res) => {
    try {
        const data = await rentals.getAllRentals();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch data', error: error.message});
    }
})

router.delete('/delete-all-rentals', async (req, res) => {
    try {
        const result = await rentals.deleteAllRentals();
        res.status(200).json({ message: 'All rental history deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete rentals', error: error.message });
    }
});
