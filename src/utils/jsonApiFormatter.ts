import {
  JsonApiResponse,
  JsonApiResource,
  Relationship,
  JsonApiDataIProps,
} from '@/interfaces/jsonApi';

export const formatResource = (
  type: string,
  resource: JsonApiDataIProps,
  relationships?: Relationship,
): JsonApiResource => {
  const { id, subreddit_metadata, ...attributes } = resource;
  return {
    type,
    id: id?.toString()!,
    attributes,
    relationships: relationships || undefined,
  };
};

export const createRelationship = (subredditMetadata?: any): Relationship | undefined => {
  if (!subredditMetadata || subredditMetadata.length === 0) return undefined;

  const metadata = subredditMetadata[0];
  return {
    type: 'subreddit_metadata',
    id: metadata.id?.toString() || '',
    attributes: {
      subreddit_id: metadata.subreddit_id,
      restrict_posting: metadata.restrict_posting,
      free_form_reports: metadata.free_form_reports,
      wiki_enabled: metadata.wiki_enabled,
      allow_galleries: metadata.allow_galleries,
      comment_score_hide_minimum: metadata.comment_score_hide_minimum,
      allow_predictions: metadata.allow_predictions,
      spoilers_enabled: metadata.spoilers_enabled,
      emojis_enabled: metadata.emojis_enabled,
      advertiser_category: metadata.advertiser_category,
      allow_videos: metadata.allow_videos,
      allow_polls: metadata.allow_polls,
      allow_images: metadata.allow_images,
      lang: metadata.lang,
      over18: metadata.over18,
    },
  };
};

export const formatResponse = (
  type: string,
  data: JsonApiDataIProps | JsonApiDataIProps[],
): JsonApiResponse => {
  const isArray = Array.isArray(data);
  const formattedData: JsonApiResource | JsonApiResource[] = isArray
    ? (data as JsonApiDataIProps[]).map((item) =>
        formatResource(type, item, createRelationship(item.subreddit_metadata)),
      )
    : formatResource(type, data, createRelationship(data.subreddit_metadata));

  return { data: formattedData };
};
