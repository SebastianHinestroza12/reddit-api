import { SubredditMetadataAttributes } from '@/interfaces/subreddits-metadata';
import { SubredditAttributes } from '@/interfaces/subreddits';

export interface JsonApiResource {
  type: string;
  id: string;
  attributes?: Record<string, any>;
  relationships?: Relationship;
}
export interface Relationship {
  type: string;
  id: string;
  attributes: SubredditMetadataAttributes;
}

export interface JsonApiResponse {
  data: JsonApiResource | JsonApiResource[];
}

export interface Identifiable {
  id: string | number;
  [key: string]: any;
}

export interface JsonApiError {
  status: string;
  title: string;
  detail?: string;
  source?: {
    pointer?: string;
    parameter?: string;
  };
}

export interface JsonApiResponseSingle<T extends JsonApiResource> {
  data: T;
  errors?: JsonApiError[];
}

export interface JsonApiResponseMultiple<T extends JsonApiResource> {
  data: T[];
  errors?: JsonApiError[];
}

export interface JsonApiDataIProps extends SubredditAttributes {
  subreddit_metadata: SubredditMetadataAttributes[];
}
