import "./SkeletonPlaylistVideo.scss"

export const SkeletonPlaylistVideo = () => {
    return (
        <div className="skeleton-playlist-video">
            <div className="skeleton-playlist-video__thumbnail"></div>
            <div className="skeleton-playlist-video__texts">
                <div className="skeleton-playlist-video__title"></div>
                <div className="skeleton-playlist-video__channel"></div>
            </div>
        </div >
    )
}
