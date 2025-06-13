import "./Feed.scss"
import { useEffect, useState } from "react"
import { getFeedVideos } from "../../utils/getVideos"
import { useVideoStore } from "../../store/videos"
import { SkeletonVideoCard } from "../SkeletonVideoCard/SkeletonVideoCard"
import { Videos } from "../Videos/Videos"
import { APIResponse } from "../../types"
import { ErrorCard } from "../ErrorCard/ErrorCard"



export const Feed = () => {
    const videos = useVideoStore(state => state.videos)
    const setVideos = useVideoStore(state => state.setVideos)
    const loadingVideos = useVideoStore(state => state.loadingVideos)
    const setLoadingVideos = useVideoStore(state => state.setLoadingVideos)
    const filterVideo = useVideoStore(state => state.filterVideo)
    const [nextPageToken, setNextPageToken] = useState<null | string>(null)
    const [error, setError] = useState<string | null>(null)

    const fetchVideos = () => {
        setLoadingVideos(true)
        getFeedVideos({
            filter: filterVideo,
            pageToken: null
        })
            .then((data: APIResponse) => {
                if (data.nextPageToken) {
                    setNextPageToken(data.nextPageToken)
                }
                if (data.error) {
                    setError(data.error.message)
                    setVideos([])
                } else {
                    setVideos(prevVideos => [...(prevVideos || []), ...data.items]);
                    // setNumPeticiones(numPeticiones + 1)
                    setError(null)
                }
            })
            .catch(error => {
                console.error("Error fetching videos:", error)
                setError("Failes to load videos")
            })
            .finally(() => setLoadingVideos(false))
    }


    const handleClick = () => {

        if (nextPageToken == null) return

        setLoadingVideos(true)

        getFeedVideos({
            filter: filterVideo,
            pageToken: nextPageToken
        })
            .then((data: APIResponse) => {
                if (data.nextPageToken) {
                    setNextPageToken(data.nextPageToken)
                }
                if (data.error) {
                    setError(data.error.message)
                    setVideos([])
                }
                else {
                    setVideos(prevVideos => [...(prevVideos || []), ...data.items]);
                    // setNumPeticiones(numPeticiones + 1)
                    setError(null)
                }
            })
            .catch((error) => {
                console.error("Error fetching videos:", error)
                setError("Failes to load videos")
            })
            .finally(() => setLoadingVideos(false))
    }


    useEffect(() => {
        setNextPageToken(null)
        setVideos([])
        fetchVideos()
    }, [filterVideo])

    return (
        <div className="feed__grid">
            {(videos && error == null) && <Videos videos={videos} />}

            {loadingVideos && Array.from({ length: 15 }).map((_, index) => <SkeletonVideoCard key={index} />)}

            {
                (videos && videos.length > 0 && error === null && !loadingVideos && nextPageToken !== null) && <button className="load-more-btn" onClick={handleClick}>Ver más</button>
            }

            {error && <ErrorCard message={error} />}
        </div>
    )
}
