import { Model } from 'sequelize';

export interface SubredditAttributes {
  id: string;
  name: string;
  title: string;
  display_name: string;
  description: string | null;
  description_html: string | null;
  public_description: string | null;
  subscribers: number;
  url: string;
  banner_img: string | null;
  key_color: string | null;
  primary_color: string | null;
  community_icon: string | null;
  mobile_banner_img: string | null;
  header_img: string | null;
  icon_img: string | null;
  active_user_count: number | null;
  submit_text: string | null;
  submit_text_html: string | null;
  created_utc: Date;
}

export interface SubredditInstance extends Model<SubredditAttributes>, SubredditAttributes {}
