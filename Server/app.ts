import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import adminRoutes from './Routes/Admin.Route';
import loginRoutes from './Routes/Open.Routes';

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

app.use('/', loginRoutes);
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

export {app};