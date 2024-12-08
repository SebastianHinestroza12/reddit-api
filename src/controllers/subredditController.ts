import { NextFunction, Request, Response } from 'express';
import { RedditService } from '@/services/reddit.service';
import { formatResponse } from '@/utils/jsonApiFormatter';
import { StatusCodes } from 'http-status-codes';
import { JsonApiResponse } from '@/interfaces/jsonApi';
import { SubredditMetadataAttributes } from '@/interfaces/subreddits-metadata';

export class SubredditController {
  /**
   * Lists all subreddits.
   * @param req - Express request object.
   * @param res - Express response object.
   */
  public async listSubreddits(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const subReddits = await RedditService.getAllSubreddit();

      const getRelationships = (subreddit: any) => {
        const metadata = subreddit.subreddit_metadata[0];
        if (metadata) {
          return {
            metadata: {
              data: {
                type: 'subreddit_metadata',
                id: metadata.id.toString(),
              },
            },
          };
        }
        return undefined;
      };

      const formattedResponse: JsonApiResponse = formatResponse(
        'subreddit',
        subReddits,
        getRelationships,
      );

      res.status(StatusCodes.OK).json(formattedResponse);
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
        subreddits: 'Created successfully',
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

      res.status(StatusCodes.OK).json({
        data: subreddit,
      });
    } catch (error) {
      next(error);
    }
  }
}
