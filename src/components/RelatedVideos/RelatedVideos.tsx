import "./RelatedVideos.scss"
import { SkeletonVideoCard } from "../SkeletonVideoCard/SkeletonVideoCard"
import { Videos } from "../Videos/Videos"
import { Item } from "../../types"

interface Props {
    loading: boolean
    videos: Item[] | null
}

export const RelatedVideos:React.FC<Props> = ({ loading, videos }) => {

    return (
        <aside className="suggested__videos">
            <h2 className="suggested__videos-title">Videos relacionados</h2>
            {
                loading && Array.from({ length: 10 }).map((_, index) => <SkeletonVideoCard key={index} />)
            }
            {
                (videos && !loading) && <Videos videos={videos} />
            }
        </aside>
    )
}
