import 'dotenv/config';
import express from 'express';
import { sequelize } from '@/database';
import { middlewares } from '@/middlewares/middlewares.server';
import { routes } from '@/routes/index.routes';
import { Subreddit } from '@/models/Subreddit';
import { SubredditMetadata } from '@/models/SubredditMetadata';
import { errorHandler } from '@/middlewares/errorHandler';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

const app = express();
const PORT = process.env.PORT ?? 3001;

// Initialize models
new Subreddit();
new SubredditMetadata();

//Middleware configuration
middlewares(app);

//Routes configuration
routes(app);

app.use((req, res, next) => {
  const error = createError(
    StatusCodes.NOT_FOUND,
    `The requested route ${req.method} ${req.url} was not found.`,
  );
  error.expose = true;
  error.title = 'Route not found';
  next(error);
});

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Running In The Port ${PORT}🍓💻`);
  void (async () => {
    try {
      await sequelize.authenticate();
      console.log('DB connection established💯🖥️.');
      await sequelize.sync({ force: true });
    } catch (error) {
      console.error('Connection to DB failed:', error);
    }
  })();
});
