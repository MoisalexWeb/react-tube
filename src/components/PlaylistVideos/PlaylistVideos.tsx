import "./PlaylistVideos.scss"
import { Item } from "../../types"
import { VideoCard } from "../VideoCard/VideoCard"

interface Props {
    videos: Item[]
}



export const PlaylistVideos:React.FC<Props> = ({ videos }) => {
    return (
        <div className="playlist__videos">
                {
                    videos && videos.length > 0
                        ? videos.map((item: Item, index) => (
                            <div className="playlist__videos__card" key={item.id}>
                                <span className="playlist__videos__card-number">{item.snippet.position ? item.snippet.position + 1 : index + 1}</span>
                                <VideoCard
                                    key={item.id}
                                    id={item.snippet.resourceId}
                                    snippet={item.snippet}
                                    kind={item.kind}
                                />
                            </div>
                        ))
                        : null
                }
            </div>
    )
}
