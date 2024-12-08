import { NextFunction, Request, Response } from 'express';
import { RedditService } from '@/services/reddit.service';
import { StatusCodes } from 'http-status-codes';

export class SubredditController {
  /**
   * Lists all subreddits.
   * @param req - Express request object.
   * @param res - Express response object.
   */
  public async listSubreddits(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const subReddits = await RedditService.getAllSubreddit();
      res.status(StatusCodes.OK).json(subReddits);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Creates a new subreddit.
   * @param req - Express request object.
   * @param res - Express response object.
   */
  public async createSubreddit(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await RedditService.createSubreddit();
      res.status(StatusCodes.CREATED).json({
        data: {
          type: 'subreddit',
        },
        meta: {
          message: 'Subreddits created successfully',
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves a subreddit by its ID.
   * @param req - Express request object.
   * @param res - Express response object.
   */
  public async getSubredditById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { subredditId } = req.params;
      const subreddit = await RedditService.getSubredditById(subredditId);
      res.status(StatusCodes.OK).json(subreddit);
    } catch (error) {
      next(error);
    }
  }
}
