// const express = require('express');
// const Data = require('../models/dataModel');
// const router = express.Router();

// // Create
// router.post('/', async (req, res) => {
//     try {
//         const data = new Data(req.body);
//         await data.save();
//         res.status(201).json(data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Read
// router.get('/', async (req, res) => {
//     try {
//         const data = await Data.find();
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Update
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.status(200).json(updatedData);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Delete
// router.delete('/:id', async (req, res) => {
//     try {
//         await Data.findByIdAndDelete(req.params.id);
//         res.status(200).json({ message: 'Data deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Data = require('../models/dataModel'); // Ensure the model is imported

router.post('/', async (req, res) => {
    console.log('Request body:', req.body); // Log the data to check what is being sent

    const { name, description } = req.body;

    try {
        const newData = new Data({ name, description });
        await newData.save(); // Save to MongoDB
        console.log('Data saved to MongoDB:', newData); // Confirm the data saved

        res.status(201).json({ message: 'Data saved successfully', data: newData });
    } catch (error) {
        console.error('Error saving data:', error); // Log any errors
        res.status(500).json({ message: 'Error saving data', error });
    }
});

// In your backend dataRoutes.js
router.get('/', async (req, res) => {
    try {
        const allData = await Data.find(); // Get all the documents in the 'Data' collection
        res.status(200).json(allData); // Send the data as a response
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data', error });
    }
});



module.exports = router;
