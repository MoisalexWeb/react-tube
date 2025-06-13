import "./VideoDetail.scss"
import { useParams } from "wouter"
import { useEffect, useState } from "react"
import { getVideoDetails, getRelatedVideos } from "../../utils/getVideos"
// import { SkeletonVideoCard } from "../SkeletonVideoCard/SkeletonVideoCard.tsx"
import { SkeletonVideoPlayer } from "../SkeletonVideoPlayer/SkeletonVideoPlayer.tsx"
import { useVideoStore } from "../../store/videos"
// import { Videos } from "../Videos/Videos.tsx"
import { APIResponse } from "../../types"
import { VideoPlayer } from "../VideoPlayer/VideoPlayer.tsx"
import { RelatedVideos } from "../RelatedVideos/RelatedVideos.tsx"
import { ErrorCard } from "../ErrorCard/ErrorCard.tsx"
import { VideoListResponse } from "../../types"


export const VideoDetail: React.FC = () => {
    const videoId = useParams().videoId
    const relatedVideos = useVideoStore(state => state.relatedVideos)
    const setRelatedVideos = useVideoStore(state => state.setRelatedVideos)
    const videoPlayer = useVideoStore(state => state.videoPlayer)
    const setVideoPlayer = useVideoStore(state => state.setVideoPlayer)
    const loadingVideos = useVideoStore(state => state.loadingVideos)
    const setLoadingVideos = useVideoStore(state => state.setLoadingVideos)
    const [error, setError] = useState<null | string>(null)
    const [loadingRelatedVideos, setLoadingRelatedVideos] = useState<boolean>(false)

    useEffect(() => {
        if (videoId) {
            setLoadingVideos(true)
            setLoadingRelatedVideos(true)

            // Obetener el video
            getVideoDetails(videoId)
                .then((data: VideoListResponse) => {
                    if (data.error) {
                        setError(data.error.message)
                        console.log(data.error.message)
                    }
                    else if (data.items.length > 0){
                        console.log(data)
                        setVideoPlayer(data)
                    } else {
                        setError("We couldn't play the video")
                    }
                })
                .catch(error => {
                    console.log(error)
                    setError("We couldn't play the video")
                })
                .finally(() => setLoadingVideos(false))


            // Obtener los videos relacionados
            getRelatedVideos(videoId)
                .then((data: APIResponse) => {
                    console.log(data)
                    if (data.error) {
                        setError(data.error.message)
                        console.log(data.error.message)
                    }
                    else if (data.items.length > 0) {
                        setRelatedVideos(data.items)
                    }
                })
                .catch(error => {
                    console.log(error)
                    setError("We couldn't play the video")
                })
                .finally(() => setLoadingRelatedVideos(false))
        }
    }, [videoId])


    return (
        <section className="videos__section">
            {
                // (videoPlayer && loadingVideos && videoId && error !== null)
                (error === null && loadingVideos) && <SkeletonVideoPlayer />
            }

            {
                (videoPlayer && videoId && error === null) && <VideoPlayer videoData={videoPlayer} videoID={videoId} />
            }

            {
                error === null && <RelatedVideos videos={relatedVideos} loading={loadingRelatedVideos} />
            }

            {
                error && <ErrorCard message={error} />
            }

        </section>
    )
}
