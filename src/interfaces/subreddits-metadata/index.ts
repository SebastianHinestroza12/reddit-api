import { Model } from 'sequelize';

export interface SubredditMetadataAttributes {
  id: number;
  subreddit_id: string;
  restrict_posting: boolean;
  free_form_reports: boolean;
  wiki_enabled: boolean;
  allow_galleries: boolean;
  comment_score_hide_minimum: number;
  allow_predictions: boolean;
  spoilers_enabled: boolean;
  emojis_enabled: boolean;
  advertiser_category: string | null;
  allow_videos: boolean;
  allow_polls: boolean;
  allow_images: boolean;
  lang: string;
  over18: boolean;
}

export interface SubredditMetadataInstance
  extends Model<SubredditMetadataAttributes>,
    SubredditMetadataAttributes {}
