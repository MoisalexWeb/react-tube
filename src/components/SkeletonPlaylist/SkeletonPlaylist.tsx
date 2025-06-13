import "./SkeletonPlaylist.scss"

export const SkeletonPlaylist = () => {
    return (
        <div className="skeleton-playlist__container">
            <div className="skeleton-playlist">
                <div className="skeleton-playlist__thumbnail"></div>
                <div>
                    <div className="skeleton-playlist__text"></div>
                    <div className="skeleton-playlist__text"></div>
                    <div className="skeleton-playlist__text"></div>
                </div>
            </div>
        </div>
    )
}
