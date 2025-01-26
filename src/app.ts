import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import { CarRoutes } from './app/modules/Car/car.route';
import { OrderRoutes } from './app/modules/Orders/order.route';
import globalErrorhandler from './app/middleware/globalErrorhandler';
import Notfound from './app/middleware/notFound';
import { UserRoutes } from './app/modules/user/user.route';
import cookieParser from 'cookie-parser';
const app: Application = express();


app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.use(cookieParser());

app.use('/api/cars', CarRoutes);
app.use('/api/orders',OrderRoutes)
app.use('/api',UserRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorhandler);
app.use(Notfound);

export default app;
