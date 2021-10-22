import express from 'express';
import routes from './routes';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import AppError from './errors/appError';
import errorHandler from './middlewares/errHandlerMiddleware';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());

app.use(routes);

app.use((req, res, next) => {
  next(new AppError.notFoundError(`NOT FOUND ${req.originalUrl}`));
});

app.use(errorHandler);

export default app;
