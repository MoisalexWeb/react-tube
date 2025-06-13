import "./SkeletonVideoPlayer.scss"

export const SkeletonVideoPlayer = () => {
    return (
        <div className="skeleton-video-player">
            <div className="skeleton-video-player__video"></div>
            <div className="skeleton-video-player__title"></div>
            <div className="skeleton-video-player__stadistics">
                <div className="skeleton-video-player__stadistics-item"></div>
                <div className="skeleton-video-player__stadistics-item"></div>
            </div>
            <div className="skeleton-video-player__description"></div>
        </div>
    )
}
