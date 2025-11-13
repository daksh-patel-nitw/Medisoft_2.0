import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { insertData } from './Repository/addSetupData';

import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

// import authRoutes from './routes/authRoutes';
// import medicineRoutes from './routes/medicineRoutes';
// import labRoutes from './routes/laboratoryRoutes';
// import roomRoutes from './routes/roomRoutes';
// import memberRoutes from './routes/memberRoutes';
// import appointmentRoutes from './routes/appointmentRoutes';
// import billRoutes from './routes/billRoutes';


// Load environment variables
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({
    limits: { fileSize: 1000 * 1024 }, // 1MB
    abortOnLimit: true,
    responseOnLimit: 'File too large',
  }));

// Enable all CORS requests
app.use(cors());

// Use the APIs
// app.use('/api', authRoutes);
// app.use('/pharmacy', medicineRoutes);
// app.use('/lab', labRoutes);
// app.use('/room', roomRoutes);
// app.use('/member', memberRoutes);
// app.use('/appointment', appointmentRoutes);
// app.use('/bill',billRoutes);


// Connecting to mongoose Database using MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
        console.log('Connected to MongoDB')
        insertData();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);  // Exit the process with failure
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
