import "./SkeletonVideoCard.scss"


export const SkeletonVideoCard = () => {
    return (
        <div className="skeletonVideo">
            <div className="skeletonVideo-img"></div>
            <div className="skeletonVideo-title"></div>
            <div className="skeletonVideo__stadistics">                
                <span className="skeletonVideo__stadistics-text"></span>
                <span className="skeletonVideo__stadistics-text"></span>
            </div>
        </div>
    )
}
