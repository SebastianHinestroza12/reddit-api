import { DataTypes } from 'sequelize';
import { sequelize } from '@/database';
import { Subreddit } from '@/models/Subreddit';
import { SubredditMetadataInstance } from '@/interfaces/subreddits-metadata';

export const SubredditMetadata = sequelize.define<SubredditMetadataInstance>(
  'subreddit_metadata',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    subreddit_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    restrict_posting: { type: DataTypes.BOOLEAN, allowNull: false },
    free_form_reports: { type: DataTypes.BOOLEAN, allowNull: false },
    wiki_enabled: { type: DataTypes.BOOLEAN, allowNull: false },
    allow_galleries: { type: DataTypes.BOOLEAN, allowNull: false },
    comment_score_hide_minimum: { type: DataTypes.INTEGER, allowNull: false },
    allow_predictions: { type: DataTypes.BOOLEAN, allowNull: false },
    spoilers_enabled: { type: DataTypes.BOOLEAN, allowNull: false },
    emojis_enabled: { type: DataTypes.BOOLEAN, allowNull: false },
    advertiser_category: { type: DataTypes.STRING, allowNull: true },
    allow_videos: { type: DataTypes.BOOLEAN, allowNull: false },
    allow_polls: { type: DataTypes.BOOLEAN, allowNull: false },
    allow_images: { type: DataTypes.BOOLEAN, allowNull: false },
    lang: { type: DataTypes.STRING, allowNull: false },
    over18: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  { tableName: 'subreddit_metadata', timestamps: false },
);

Subreddit.hasMany(SubredditMetadata, { foreignKey: 'subreddit_id' });
SubredditMetadata.belongsTo(Subreddit, { foreignKey: 'subreddit_id' });
