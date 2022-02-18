import { Application } from 'express';

import { authUserRoute, userRoute } from '../routes';

const requireRoutes = (app: Application) => {
  app.use('/user', userRoute);
  app.use('/user/auth', authUserRoute);
};

export default requireRoutes;
