const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// POST Method Endpoint
app.post('/bfhl', (req, res) => {
    const data = req.body.data;
    const user_id = "john_doe_17091999"; // Use your user_id
    const email = "john@xyz.com"; // Use your email
    const roll_number = "ABCD123"; // Use your roll_number

    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = '';

    // Process data
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.length === 1) {
            alphabets.push(item);
            if (item === item.toLowerCase() && (highestLowercaseAlphabet === '' || item > highestLowercaseAlphabet)) {
                highestLowercaseAlphabet = item;
            }
        }
    });

    // Response
    res.json({
        is_success: true,
        user_id: user_id,
        email: email,
        roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});

// GET Method Endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
