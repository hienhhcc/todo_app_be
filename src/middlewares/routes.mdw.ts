import { Application } from 'express';

import { authUserRoute, userRoute } from '../routes';

const requireRoutes = (app: Application) => {
  app.use('/user/auth', authUserRoute);
  app.use('/user', userRoute);
};

export default requireRoutes;
