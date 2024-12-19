import express from 'express';
import admins from '../../controllers/adminController.mjs'

const router = express.Router();

router.get('/all-admins', async (req, res) => {
    try {
        const data = await admins.getAllAdmins();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch data', error: error.message});
    }
})

router.post('/new-admin', async (req, res) => {
    const data = req.body;

    try {
        const result = await admins.newAdmin(data);
        res.status(200).json({ message: 'Data received and inserted', data: data, result });
    } catch (error) {
        console.error('Error occurred during insertion:', error);
        res.status(500).json({ error: 'Failed to insert data into database', details: error.message });
    }
});

router.get('/admin/:id', async (req, res) => {
    const adminId = req.params.id;

    try {
        const data = await admins.getAdmin(adminId);
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch data', error: error.message});
    }
});

router.put('/update-admin/:id', async (req, res) => {
    const adminId = req.params.id;
    const updatedData = req.body;

    try {
        if (!updatedData || Object.keys(updatedData).length === 0) {
            return res.status(400).json({ error: 'No data was provided.' });
        }

        const result = await admins.updateAdmin(adminId, updatedData);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update information', error: error.message });
    }
});

router.delete('/delete-all-admins', async (req, res) => {
    try {
        const result = await admins.deleteAllAdmins();
        res.status(200).json({ message: 'All admins deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete admins', error: error.message });
    }
});

router.delete('/delete-admin', async (req, res) => {
    const adminID = req.body._id;
    try {
        const result = await admins.deleteAdmin(adminID);

        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Admin deleted successfully" });
        } else {
            res.status(404).json({ message: "Admin not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete admin', error: error.message });
    }
});

export default router;
