import { app } from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connecting to mongoose Database using MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });

// Just for testing purpose
app.get('/', (req, res) => {
    res.status(500);
    res.json({
        message: "Welcome To the REST API",
    });
});

// Get port from .env (default to 5000 if not set)
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
