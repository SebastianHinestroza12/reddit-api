import { Request, Response } from 'express';

export class SubredditController {
  /**
   * Lists all subreddits.
   * @param req - Express request object.
   * @param res - Express response object.
   */
  public async listSubreddits(req: Request, res: Response): Promise<void> {
    // TODO: Logic
  }

  /**
   * Creates a new subreddit.
   * @param req - Express request object.
   * @param res - Express response object.
   */
  public async createSubreddit(req: Request, res: Response): Promise<void> {
    // TODO: Logic
  }

  /**
   * Retrieves a subreddit by its ID.
   * @param req - Express request object.
   * @param res - Express response object.
   */
  public async getSubredditById(req: Request, res: Response): Promise<void> {
    // TODO: Logic
  }
}
