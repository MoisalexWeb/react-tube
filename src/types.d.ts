// Filtro para el menu
export type FilterCategory = "New" | "Sports" | "Music" | "Coding" | "Education" | "Food" | "Language"
    | "Math" | "Science" | "Art" | "Fitness" | "Gaming" | "Movie" | "Podcast" | "Crypto"


// Para tipar la respuesta de la API
export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}

export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

export interface Thumbnails {
    default?: Thumbnail;
    medium?: Thumbnail;
    high?: Thumbnail;
    standard?: Thumbnail; // Opcional, ya que no siempre está presente
    maxres?: Thumbnail;   // Opcional
}

export interface Snippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails
    channelTitle: string;
    liveBroadcastContent?: string;
    publishTime?: string;
    // Para las listas de reproduccion
    resourceId?: {
        kind: string,
        videoId: string
    },
    playlistId?: string,
    position?: number,
    videoOwnerChannelTitle?: string,
    videoOwnerChannelId?: string,
}

export interface videoId {
    kind: string;
    videoId: string;
}

export interface playlistId {
    kind: string;
    playlistId: string;
}

export interface channelId {
    kind: string;
    channelId: string;
}

export interface Item {
    kind: string;
    id: string | VideoId | ChannelId | playlistId
    snippet: Snippet;
    contentDetails?: ContentDetails; // Opcional
    statistics?: Statistics;
}

export interface APIResponse {
    kind: string;
    nextPageToken?: string;
    prevPageToken?: string;
    regionCode: string;
    pageInfo: PageInfo;
    items: Item[];
    error?: {
        code: number;
        message: string;
    }
}

export interface ItemChannel {
    kind: string;
    id: channelId
    snippet: Snippet
}


export interface Localized {
    title: string;
    description: string;
}

// Tipos específicos para videoListResponse
export interface VideoContentDetails {
    duration: string; // Formato ISO 8601 (ej: PT8H49M4S)
    dimension: string; // '2d' o '3d'
    definition: string; // 'sd', 'hd', etc.
    caption: string; // 'true' o 'false'
    licensedContent: boolean;
    regionRestriction?: {
        allowed?: string[];
        blocked?: string[];
    };
    contentRating?: Record<string, unknown>;
    projection?: string; // 'rectangular'
    hasCustomThumbnail?: boolean;
}



export interface VideoStatistics {
    viewCount?: string;
    likeCount?: string;
    dislikeCount?: string; // Algunas APIs ya no lo devuelven
    favoriteCount: string;
    commentCount: string;
}

export interface VideoSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    tags?: string[];
    categoryId: string;
    liveBroadcastContent: 'none' | 'upcoming' | 'live' | 'completed';
    defaultLanguage?: string;
    localized?: Localized;
    defaultAudioLanguage?: string;
}

export interface VideoPlayerItem {
    kind: 'youtube#video';
    etag?: string; // Opcional
    id: string; // El ID del video
    snippet: VideoSnippet;
    contentDetails: VideoContentDetails;
    statistics: VideoStatistics;
    // Otros campos que podrían estar presentes
    status?: { // Opcional
        uploadStatus: string;
        privacyStatus: string;
        license: string;
        embeddable: boolean;
        publicStatsViewable: boolean;
    };
    player?: { // Opcional
        embedHtml: string;
    };
}

export interface VideoListResponse {
    kind: 'youtube#videoListResponse';
    etag?: string;
    nextPageToken?: string;
    prevPageToken?: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: VideoPlayerItem[];
    error?: {
        code: number;
        message: string;
    },
}


// Para tipar la respuesta cuando se trae un canal
export interface ChannelBrandingSettings {
    channel: {
        title: string,
        description: string
        keywords: string
        trackingAnalyticsAccountId: string,
        unsubscribedTrailer: string
    },
    image: {
        bannerExternalUrl?: string
    }
}

export interface ChannelSnippet {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: Thumbnails;
    localized: Localized;
    country?: string;
}

export interface ChannelContentDetails {
    relatedPlaylists: {
        likes: string,
        uploads: string
    }
}

export interface ChannelStatistics {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
}

export interface ChannelItem {
    kind: 'youtube#channel';
    etag?: string;
    id: string;
    snippet: ChannelSnippet;
    contentDetails: ChannelContentDetails;
    statistics: ChannelStatistics;
    brandingSettings: ChannelBrandingSettings;
    status?: {
        privacyStatus: string;
        isLinked: boolean;
        longUploadsStatus: string;
        madeForKids: boolean;
    };
}

// Tipos para channelListResponse, Para mostrar el canal en la vista de canal
export interface ChannelListResponse {
    kind: 'youtube#channelListResponse';
    etag?: string;
    pageInfo: PageInfo;
    items: ChannelItem[];
}


// Tipos para playlist
export interface PlaylistItem {
    kind: 'youtube#playlist';
    id: string;
    snippet: Snippet;
    error?: {
        code: number;
        message: string;
    },
    // Puedes añadir más campos si la API los devuelve en otros casos
    // como contentDetails, status, etc.
}


export interface PlaylistListResponse {
    kind: 'youtube#playlistListResponse';
    etag?: string;
    nextPageToken?: string;
    prevPageToken?: string;
    pageInfo: PageInfo;
    items: PlaylistItem[];
    error?: {
        code: number;
        message: string;
    };
}

export interface ErrorPlaylistVideos {
    error: {
        code: number;
        message: string;
    }
}

// Tipo de video
export const VideoType = "youtube#video"
export const VideoPlaylist = "youtube#playlistItem"
export const PlaylistType = "youtube#playlist"
export const ChannelType = "youtube#channel"