import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import httpStatus from 'http-status';
import morgan from 'morgan';
import mongoose from 'mongoose';

import { errorHandler, errorConverter } from './middlewares/error.mdw';
import {
  port,
  MONGO_DEFAULT_DATABASE,
  MONGO_PASSWORD,
  MONGO_USER,
} from './configs/config';
import ApiError from './utils/ApiError';
import requireRoutes from './middlewares/routes.mdw';

const app = express();

app.disable('etag');

//body parser
app.use(bodyParser.json());

// enable cors
app.use(cors());
app.options('*', cors());

app.use(morgan('dev'));

requireRoutes(app);

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@mycluster.r6sla.mongodb.net/${MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Connect Mongodb Successfully');
    app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });
  })
  .catch((error) => console.log(error));
