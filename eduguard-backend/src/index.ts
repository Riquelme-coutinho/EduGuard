import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import studentRoutes from './routes/studentRoutes';
import medicationRoutes from './routes/medicationRoutes';
import routineRoutes from './routes/routineRoutes';
import noticeRoutes from './routes/noticeRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/routine', routineRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
