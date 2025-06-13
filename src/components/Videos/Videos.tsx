import { VideoCard } from "../VideoCard/VideoCard"
import { ChannelCard } from "../ChannelCard/ChannelCard"
import { PlaylistCard } from "../PlaylistCard/PlaylistCard"
import { Item, VideoType, ChannelType } from "../../types.d"


interface Props {
    videos: Item[]
}


export const Videos: React.FC<Props> = ({ videos }) => {
    
    return (
        <>
            {
                videos && videos.map((item) => (
                    (item.id.kind === VideoType)
                        ?
                        <VideoCard
                            key={item.id.videoId}
                            id={item.id}
                            kind={item.kind}
                            snippet={item.snippet}
                        />
                        : (item.id.kind === ChannelType)
                            ?
                            <ChannelCard
                                snippet={item.snippet}
                                key={item.id.channelId}
                                id={item.id}
                                kind={item.kind}
                            />
                            :
                            <PlaylistCard   
                                key={item.id.playlistId}
                                id={item.id.playlistId}
                                kind={item.kind}
                                snippet={item.snippet}
                            />
                ))
            }
        </>
    )
}
