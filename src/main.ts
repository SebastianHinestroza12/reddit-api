import 'dotenv/config';
import express from 'express';
import { sequelize } from '@/database';
import { middlewares } from '@/middlewares/middlewares.server';
import { routes } from '@/routes/index.routes';
import { Subreddit } from '@/models/Subreddit';
import { SubredditMetadata } from '@/models/SubredditMetadata';

const app = express();
const PORT = process.env.PORT ?? 3001;

// Initialize models
new Subreddit();
new SubredditMetadata();

//Middleware configuration
middlewares(app);

//Routes configuration
routes(app);

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
