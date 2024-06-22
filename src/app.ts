import cors from 'cors';
import express, { Request, Response } from 'express';
import router from './app/modules/User/user.route';
import { AuthRoutes } from './app/modules/Auth/auth.route';
import { RoomRoutes } from './app/modules/Room/room.route';
import { SlotRoutes } from './app/modules/Slot/slot.route';
import { BookingRoutes } from './app/modules/Booking/booking.route';
import globalErrorHandler from './app/middlewares/GlobalErrorHandler';
import notFound from './app/middlewares/notFound';

const app = express();

///its a parser

app.use(express.json());
app.use(cors());

///application routes
app.use('/api', router);
app.use('/api', AuthRoutes);
app.use('/api', RoomRoutes);
app.use('/api', SlotRoutes);
app.use('/api', BookingRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
app.use(notFound);

console.log(process.cwd());

export default app;
