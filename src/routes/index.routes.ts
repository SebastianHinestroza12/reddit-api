import { Application } from 'express';
import {router } from '@/routes/subreddit.routes'

export const routes = (app: Application): void => {
  app.use('/api/v1/subreddits', router);
};
