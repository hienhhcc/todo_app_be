import { Application } from 'express';

import { authUserRoute } from '../routes';

const requireRoutes = (app: Application) => {
  app.use('/user/auth', authUserRoute);
};

export default requireRoutes;
