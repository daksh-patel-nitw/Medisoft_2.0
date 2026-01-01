import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import adminRoutes from './Routes/Admin.Route';

// import authRoutes from './routes/authRoutes';
// import medicineRoutes from './routes/medicineRoutes';
// import labRoutes from './routes/laboratoryRoutes';
// import roomRoutes from './routes/roomRoutes';
// import memberRoutes from './routes/memberRoutes';
// import appointmentRoutes from './routes/appointmentRoutes';
// import billRoutes from './routes/billRoutes';
import {errorMiddleware} from './Middlewares/handleError';

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

app.use('/admin', adminRoutes);
// Use the APIs
// app.use('/api', authRoutes);
// app.use('/pharmacy', medicineRoutes);
// app.use('/lab', labRoutes);
// app.use('/room', roomRoutes);
// app.use('/member', memberRoutes);
// app.use('/appointment', appointmentRoutes);
// app.use('/bill',billRoutes);
app.use(errorMiddleware);

// Just for testing purpose
app.get('/', (req, res) => {
    res.status(500);
    res.json({
        message: "Welcome To the REST API",
    });
});

export {app};