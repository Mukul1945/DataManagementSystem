const express = require('express');
const router = express.Router();
const Data = require('../models/dataModel');

// POST route to add data
router.post('/', async (req, res) => {
    const { name, description } = req.body;
    try {
        const newData = new Data({ name, description });
        await newData.save();
        res.status(201).json({ message: 'Data saved successfully', data: newData });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data', error });
    }
});

// GET route to fetch all data
router.get('/', async (req, res) => {
    try {
        const allData = await Data.find();
        res.status(200).json(allData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
    }
});

// PUT route to update data
router.put('/:id', async (req, res) => {
    const { name, description } = req.body;
    try {
        const updatedData = await Data.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true }
        );
        if (!updatedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json({ message: 'Data updated successfully', data: updatedData });
    } catch (error) {
        res.status(500).json({ message: 'Error updating data', error });
    }
});

// DELETE route to delete data
router.delete('/:id', async (req, res) => {
    try {
        const deletedData = await Data.findByIdAndDelete(req.params.id);
        if (!deletedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting data', error });
    }
});

module.exports = router;
