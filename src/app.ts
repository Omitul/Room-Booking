import cors from 'cors';
import express, { Request, Response } from 'express';
import { UserRoutes } from './modules/User/user.route';
import { AuthRoutes } from './modules/Auth/auth.route';
import { RoomRoutes } from './modules/Room/room.route';
import globalErrorHandler from './middlewares/GlobalErrorHandler';
import notFound from './middlewares/notFound';
const app = express();

///its a parser

app.use(express.json());
app.use(cors());

///application routes
app.use('/api/auth', UserRoutes);

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
