import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FilterCategory, Item, VideoListResponse, ChannelItem } from "../types";

interface State {
    // APIResponse: APIResponse;
    // Para almacenar el filtro de videos en el home
    filterVideo: FilterCategory;
    setFilterVideo: (filter: FilterCategory) => void;

    // Para saber si hay videos cargando en el home
    loadingVideos: boolean;
    setLoadingVideos: (loading: boolean) => void

    // Para almacenar los videos en el home
    videos: Item[] | null
    // setVideos: (videos: Item[]) => void
    setVideos: (videos: Item[] | ((prevVideos: Item[] | null) => Item[])) => void;

    // Para almacenar el video que se esta reproduciendo
    videoPlayer: VideoListResponse | null
    setVideoPlayer: (video: VideoListResponse) => void

    // Para almacenar los videos relacionados
    relatedVideos: Item[] | null
    setRelatedVideos: (videos: Item[]) => void

    // Para almacenar el canal del video
    channelItem: ChannelItem | null
    setChannelItem: (channel: ChannelItem) => void

    // Para almacenar los videos del canal
    channelVideos: Item[] | null
    setChannelVideos: (videos: Item[]) => void

    // Parael dark mode
    darkTheme: boolean
    setDarkTheme: (theme: boolean) => void
}



export const useVideoStore = create<State>()(
    persist(
        (set) => ({
            filterVideo: "New",

            setFilterVideo: (filter: FilterCategory) => {
                set({ filterVideo: filter })
            },

            videos: null,

            setVideos: (videos: Item[] | ((prev: Item[] | null) => Item[])) => {
                if (typeof videos === "function") {
                    set(state => ({ videos: videos(state.videos) }));
                } else {
                    set({ videos });
                }
            },

            loadingVideos: false,

            setLoadingVideos: (loading) => {
                set({ loadingVideos: loading })
            },

            relatedVideos: null,

            setRelatedVideos: (videos: Item[]) => {
                set({ relatedVideos: videos })
            },

            videoPlayer: null,

            setVideoPlayer: (video: VideoListResponse) => {
                set({ videoPlayer: video })
            },

            channelItem: null,

            setChannelItem: (channel: ChannelItem) => {
                set({ channelItem: channel })
            },

            channelVideos: null,

            setChannelVideos: (videos: Item[]) => {
                set({ channelVideos: videos })
            },

            darkTheme: false,

            setDarkTheme: (theme) => {
                set({ darkTheme: !theme })
            }
        }),
        {
            name: "video-store", // Nombre para el localStorage
            partialize: (state) => ({
                darkTheme: state.darkTheme,
                filterVideo: state.filterVideo
            }) // Solo estas propiedades se persistirán
        }
    )
)


// Poner el get como parametro para obtener un valor por del estado
/*export const useVideoStore = create<State>((set) => {
    return {
        filterVideo: "New",

        setFilterVideo: (filter: FilterCategory) => {
            set({ filterVideo: filter })
        },

        videos: null,

        setVideos: (videos: Item[] | ((prev: Item[] | null) => Item[])) => {
            if (typeof videos === "function") {
                set(state => ({ videos: videos(state.videos) }));
            } else {
                set({ videos });
            }
        },

        loadingVideos: false,

        setLoadingVideos: (loading) => {
            set({ loadingVideos: loading })
        },

        relatedVideos: null,

        setRelatedVideos: (videos: Item[]) => {
            set({ relatedVideos: videos })
        },

        videoPlayer: null,

        setVideoPlayer: (video: VideoListResponse) => {
            set({ videoPlayer: video })
        },

        channelItem: null,

        setChannelItem: (channel: ChannelItem) => {
            set({ channelItem: channel })
        },

        channelVideos: null,

        setChannelVideos: (videos: Item[]) => {
            set({ channelVideos: videos })
        },

        darkTheme: false,

        setDarkTheme: (theme) => {
            set({ darkTheme: !theme })
        }
    }
}) */