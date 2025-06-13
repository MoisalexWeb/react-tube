import "./PlaylistPage.scss"
import { useEffect, useState } from "react"
import { useParams } from "wouter"
import { getPlaylistVideos, getPlaylistDetail } from "../../utils/getVideos"
import { Item, PlaylistListResponse } from "../../types"
import { PlaylistDetail } from "../PlaylistDetail/PlaylistDetail"
import { PlaylistVideos } from "../PlaylistVideos/PlaylistVideos"
import { ErrorCard } from "../ErrorCard/ErrorCard"
import { SkeletonPlaylist } from "../SkeletonPlaylist/SkeletonPlaylist"
import { SkeletonPlaylistVideo } from "../SkeletonPlaylistVideo/SkeletonPlaylistVideo"


export const PlaylistPage = () => {
    const { playlistId } = useParams()
    const [videos, setVideos] = useState<Item[] | null>(null)
    const [playlist, setplaylist] = useState<PlaylistListResponse | null>(null)
    const [loadingDetail, setLoadingDetail] = useState<boolean>(true)
    const [loadingVideos, setLoadingVideos] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (playlistId) {

            setLoadingDetail(true)
            setLoadingVideos(true)

            getPlaylistDetail(playlistId)
                .then((data: PlaylistListResponse) => {
                    if (data.items.length === 0) {
                        setplaylist(null)
                        setError("The playlist with the request ID cannot be found.")
                    } else {
                        setplaylist(data)
                        setError(null)
                    }
                })
                .catch(error => {
                    console.error("Error fetching the playlist videos", error)
                    setError("Error fetching the playlist videos")
                })
                .finally(() => {
                    setLoadingDetail(false)
                })

            getPlaylistVideos(playlistId)
                .then((data: PlaylistListResponse) => {
                    if (data?.error) {
                        setVideos(null)
                        setError(data.error.message)
                    } else {
                        setError(null)
                        setVideos(data.items)
                    }
                })
                .catch(error => {
                    console.error("Error fetching the playlist videos", error)
                    setVideos(null)
                    setError("Error fetching the playlist videos")
                })
                .finally(() => {
                    setLoadingVideos(false)
                })
        }
    }, [playlistId])



    return (
        <section className="playlist__page">

            {
                (playlist !== null && !loadingDetail && !loadingVideos && error === null)
                && <PlaylistDetail playlist={playlist} />
            }

            {
                (videos && videos.length > 0 && !loadingVideos && !loadingDetail && error === null)
                    ? <PlaylistVideos videos={videos} />
                    : null
            }

            {
                (error && !loadingVideos && !loadingDetail) && <ErrorCard message={error} />
            }

            {
                (loadingDetail || loadingVideos) &&
                <>
                    <SkeletonPlaylist />
                    <div className="playlist-grid-skeleton">
                        { Array.from({ length: 10 }).map((_, index) => <SkeletonPlaylistVideo key={index} />) }
                    </div>
                </>
            }

        </section>
    )
}
