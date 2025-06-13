import "./ChannelPage.scss"
import { useState } from "react"
import { useParams } from "wouter"
import { useEffect } from "react"
import { Videos } from "../Videos/Videos"
import { getChannelData, getChannelVideos } from "../../utils/getVideos"
import { useVideoStore } from "../../store/videos"
import { ChannelListResponse, APIResponse } from "../../types"
import { SkeletonVideoCard } from "../SkeletonVideoCard/SkeletonVideoCard"
import { SkeletonChannelPage } from "../SkeletonChannelPage/SkeletonChannelPage"
import { ErrorCard } from "../ErrorCard/ErrorCard"
import { ChannelData } from "../ChannelData/ChannelData"
import { Item } from "../../types"


export const ChannelPage = () => {
    const channelId = useParams().channelId
    const channel = useVideoStore(state => state.channelItem)
    const setChannel = useVideoStore(state => state.setChannelItem)
    const loadingVideos = useVideoStore(state => state.loadingVideos)
    const setLoadingVideos = useVideoStore(state => state.setLoadingVideos)
    const [channelVideos, setChannelVideos] = useState<Item[] | null>(null)
    const [loadingChannelData, setLoadingChannelData] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [nextPageToken, setNextPageToken] = useState<string | null>(null)


    useEffect(() => {
        setLoadingVideos(true)

        if (channelId) {
            getChannelData(channelId)
                .then((data: ChannelListResponse) => {
                    console.log(data)
                    if (data.items) setChannel(data.items[0])
                    else setError("Failed to load channel data")
                })
                .catch((error) => {
                    console.error("Error fetching channel data:", error)
                    setError("Failed to load channel data")
                })
                .finally(() => setLoadingChannelData(false))

            getChannelVideos({
                channelId: channelId,
                nextPageToken: null
            })
                .then((data: APIResponse) => {
                    if (data.error) {
                        setError(data.error.message)
                        setChannelVideos([])
                    } else {
                        console.log(data.items)
                        setChannelVideos(data.items)
                        setNextPageToken(data?.nextPageToken || null)
                    }
                })
                .catch((error) => {
                    console.error("Error fetching channel videos:", error)
                    setError("Failed to load channel videos")
                })
                .finally(() => setLoadingVideos(false))
        }
    }, [channelId])


    const handleClick = () => {
        if (!channelId || nextPageToken === null) return

        setLoadingVideos(true)

        getChannelVideos({
            channelId: channelId,
            nextPageToken: nextPageToken
        })
            .then((data: APIResponse) => {
                if (data.error) {
                    setError(data.error.message)
                    setChannelVideos([])
                } else {
                    setChannelVideos((prevVideos) => [...(prevVideos ?? []), ...data.items]);
                    setNextPageToken(data?.nextPageToken || null)
                }
            })
            .catch((error) => {
                console.error("Error fetching channel videos:", error)
                setError("Failed to load channel videos")
            })
            .finally(() => setLoadingVideos(false))
    }


    return (
        <>
            {
                // Channel stadistics
                (loadingChannelData && !channel && error === null) && <SkeletonChannelPage />
            }
            {
                (channel && !loadingChannelData && error === null) && <ChannelData channel={channel} />
            }
            {
                (error  && !loadingChannelData) && <ErrorCard message={error} />
            }

            <section className="videos__grid">
                {
                    (channelVideos && channelVideos.length > 0 && error === null) && <Videos videos={channelVideos} />
                }

                {
                    // Channel Videos
                    (loadingVideos && error === null && (!channelVideos || channelVideos)) && Array.from({ length: 10 }).map((_, index) => (
                        <SkeletonVideoCard key={index} />
                    ))
                }

                {
                    (channelVideos && channelVideos.length > 0 && error === null && !loadingVideos && nextPageToken !== null) && <button className="load-more-btn" onClick={handleClick}>Ver más</button>
                }
            </section>
        </>
    )
}






/*
 <>
            {loadingVideos && !channel ? (
                <SkeletonChannelPage />
            ) : channel ? (
                <>
                    <section className="banner container">
                        {channel?.brandingSettings.image.bannerExternalUrl ? (
                            <img
                                src={channel.brandingSettings.image.bannerExternalUrl}
                                alt={`${channel.snippet.title} banner image`}
                                className="banner-img"
                            />
                        ) : (
                            <div className="banner-bg"></div>
                        )}
                    </section>

                    <section className="channel-info container">
                        <div className="channel-info__data">
                            <figure className="channel-info__data__figure">
                                {channel.snippet.thumbnails.default?.url && (
                                    <img 
                                        src={channel.snippet.thumbnails.default.url} 
                                        alt={channel.snippet.title} 
                                        className="channel-info__data__figure-img" 
                                    />
                                )}
                            </figure>

                            <div className="channel-info__data__texts">
                                <h1 className="channel-info__data__texts-title">
                                    {channel.snippet.title} <i className="bx bxs-badge-check"></i>
                                </h1>

                                {channel.snippet.customUrl && (
                                    <span className="channel-info__data__texts-name">{channel.snippet.customUrl}</span>
                                )}

                                {channel.statistics.subscriberCount && (
                                    <span className="channel-info__data__texts-text">
                                        {parseInt(channel.statistics.subscriberCount).toLocaleString("es")} Suscribers
                                    </span>
                                )}

                                {channel.statistics.viewCount && (
                                    <span className="channel-info__data__texts-text">
                                        {parseInt(channel.statistics.viewCount).toLocaleString("es")} Views
                                    </span>
                                )}

                                {channel.statistics.videoCount && (
                                    <span className="channel-info__data__texts-text">
                                        {parseInt(channel.statistics.videoCount).toLocaleString("es")} Videos
                                    </span>
                                )}
                            </div>

                            <p className="channel-info__data-description">{channel.snippet.description}</p>
                        </div>
                    </section>
                </>
            ) : error ? (
                <ErrorCard message={error} />
            ) : null}

            <section className="videos__grid">
                {loadingVideos ? (
                    // Mostrar skeletons mientras carga
                    Array.from({ length: 10 }).map((_, index) => (
                        <SkeletonVideoCard key={index} />
                    ))
                ) : error ? (
                    // Mostrar error si existe
                    <ErrorCard message={error} />
                ) : channelVideos && channelVideos.length > 0 ? (
                    // Mostrar videos si existen
                    <Videos videos={channelVideos} />
                ) : (
                    // Estado cuando no hay videos (pero no hay error)
                    <ErrorCard message="The channel has not been found" />
                )}
            </section>
        </>
*/ 