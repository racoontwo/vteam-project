import express from 'express';
import cities from '../../controllers/citiesController.mjs';

const router = express.Router();

router.get('/all-cities', async (req, res) => {
    try {
        const data = await cities.getAllCities();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch data',
            error: error.message
        });
    }
});

router.get('/city/:cityName', async (req, res) => {
    const cityName = req.params.cityName;

    try {
        const data = await admins.getCity(cityName);
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch data',
            error: error.message
        });
    }
});


export default router;
