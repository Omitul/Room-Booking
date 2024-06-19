import cors from 'cors';
import express, { Request, Response } from 'express';
import { UserRoutes } from './modules/User/user.route';
import { AuthRoutes } from './Auth/auth.route';
const app = express();

///its a parser

app.use(express.json());
app.use(cors());

///application routes
app.use('/', UserRoutes);
app.use('/', AuthRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

console.log(process.cwd());

export default app;
