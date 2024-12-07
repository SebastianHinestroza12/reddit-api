import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

export const middlewares = (app: Application): void => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
    }),
  );
  app.use(helmet());
};
