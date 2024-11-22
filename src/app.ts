import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import { CarRoutes } from './app/modules/Car/car.route';
const app: Application = express();

// parser

app.use(express.json());
app.use(cors());

// application route
// it goes Car routes
app.use('/api/cars', CarRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
