import createError from 'http-errors';
import { sequelize } from '@/database';
import { Subreddit } from '@/models/Subreddit';
import { SubredditMetadata } from '@/models/SubredditMetadata';
import { apiClient } from '@/utils';
import { ApiResponse, ChildItem } from '@/interfaces/subreddits';
import { StatusCodes } from 'http-status-codes';
import { CustomHttpError } from '@/interfaces/customHttpError';
import { JsonApiDataIProps, JsonApiResponse } from '@/interfaces/jsonApi';
import { formatResponse } from '@/utils/jsonApiFormatter';

class RedditService {
  static async fetchDataReddits(): Promise<ChildItem[]> {
    try {
      const {
        data: {
          data: { children },
        },
      } = await apiClient.get<ApiResponse>('https://www.reddit.com/reddits.json');
      return children;
    } catch (e) {
      const error = e as Error;
      throw createError(
        StatusCodes.BAD_GATEWAY,
        `Failed to fetch data from Reddit: ${error.message}`,
      );
    }
  }

  static async createSubreddit(): Promise<void> {
    const transaction = await sequelize.transaction();

    try {
      const subredditExists = await Subreddit.findOne({ transaction });

      if (subredditExists) {
        await transaction.commit();
        return;
      }

      // If the table is empty, proceed with the insertion
      const allSubreddits = await this.fetchDataReddits();

      const subredditData = allSubreddits.map((subreddit) => ({
        name: subreddit.data.display_name,
        title: subreddit.data.title,
        display_name: subreddit.data.display_name_prefixed,
        description: subreddit.data.description,
        description_html: subreddit.data.description_html,
        public_description: subreddit.data.public_description,
        subscribers: subreddit.data.subscribers,
        url: subreddit.data.url,
        banner_img: subreddit.data.banner_img,
        key_color: subreddit.data.key_color,
        primary_color: subreddit.data.primary_color,
        community_icon: subreddit.data.community_icon,
        mobile_banner_img: subreddit.data.mobile_banner_image,
        header_img: subreddit.data.header_img,
        icon_img: subreddit.data.icon_img,
        active_user_count: subreddit.data.active_user_count,
        submit_text: subreddit.data.submit_text,
        submit_text_html: subreddit.data.submit_text_html,
      }));

      const createdSubreddits = await Subreddit.bulkCreate(subredditData, {
        returning: true,
        transaction,
      });

      const subredditMetadataData = allSubreddits.map((subreddit, index) => ({
        subreddit_id: createdSubreddits[index].id as string,
        restrict_posting: subreddit.data.restrict_posting,
        free_form_reports: subreddit.data.free_form_reports,
        wiki_enabled: subreddit.data.wiki_enabled,
        allow_galleries: subreddit.data.allow_galleries,
        comment_score_hide_minimum: subreddit.data.comment_score_hide_mins,
        allow_predictions: subreddit.data.allow_predictions,
        spoilers_enabled: subreddit.data.spoilers_enabled,
        emojis_enabled: subreddit.data.emojis_enabled,
        advertiser_category: subreddit.data.advertiser_category,
        allow_videos: subreddit.data.allow_videos,
        allow_polls: subreddit.data.allow_polls,
        allow_images: subreddit.data.allow_images,
        lang: subreddit.data.lang,
        over18: subreddit.data.over18,
      }));

      await SubredditMetadata.bulkCreate(subredditMetadataData, {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new Error('Subreddits could not be created.');
    }
  }

  static async getAllSubreddit(): Promise<JsonApiResponse> {
    try {
      const subReddits = await Subreddit.findAll({
        include: [{ model: SubredditMetadata }],
      });

      const flattenData = subReddits.map((subreddit) => subreddit.toJSON());
      const formattedResponse: JsonApiResponse = formatResponse(
        'subreddit',
        flattenData as unknown as JsonApiDataIProps[],
      );

      return formattedResponse;
    } catch (error) {
      throw createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error getting subreddits.');
    }
  }

  static async getSubredditById(subredditId: string): Promise<JsonApiResponse> {
    try {
      const subreddit = await Subreddit.findOne({
        where: { id: subredditId },
        include: [{ model: SubredditMetadata }],
      });

      if (!subreddit) {
        const error: CustomHttpError = createError(StatusCodes.NOT_FOUND, 'Subreddit not found');
        error.type = 'resource_not_found';
        throw error;
      }

      const flattenData = subreddit.toJSON();
      const formattedResponse: JsonApiResponse = formatResponse(
        'subreddit',
        flattenData as unknown as JsonApiDataIProps[],
      );

      return formattedResponse;
    } catch (error) {
      throw error;
    }
  }
}

export { RedditService };
