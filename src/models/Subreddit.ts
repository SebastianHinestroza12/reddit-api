import { sequelize } from '@/database';
import { DataTypes } from 'sequelize';
import { SubredditInstance } from '@/interfaces/subreddits';
import { getCurrentUnixTimestamp } from '@/utils';
import { format } from 'date-fns';

export const Subreddit = sequelize.define<SubredditInstance>(
  'subreddit',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    display_name: { type: DataTypes.STRING, allowNull: false },
    subscribers: { type: DataTypes.INTEGER, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
    banner_img: { type: DataTypes.STRING, allowNull: true },
    key_color: { type: DataTypes.STRING, allowNull: true },
    primary_color: { type: DataTypes.STRING, allowNull: true },
    community_icon: { type: DataTypes.STRING, allowNull: true },
    mobile_banner_img: { type: DataTypes.STRING, allowNull: true },
    header_img: { type: DataTypes.STRING, allowNull: true },
    icon_img: { type: DataTypes.STRING, allowNull: true },
    active_user_count: { type: DataTypes.INTEGER, allowNull: true },
    submit_text: { type: DataTypes.TEXT, allowNull: true },
    submit_text_html: { type: DataTypes.TEXT, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    description_html: { type: DataTypes.TEXT, allowNull: true },
    public_description: { type: DataTypes.TEXT, allowNull: true },
    created_utc: {
      type: DataTypes.INTEGER,
      defaultValue: getCurrentUnixTimestamp,
      allowNull: false,
      get(this) {
        const rawValue = this.getDataValue('created_utc');
        if (rawValue && typeof rawValue === 'number') {
          const date = new Date(rawValue * 1000);
          return format(date, 'dd-MM-yyyy HH:mm');
        }
        return null;
      },
    },
  },
  { tableName: 'subreddits', timestamps: false },
);
