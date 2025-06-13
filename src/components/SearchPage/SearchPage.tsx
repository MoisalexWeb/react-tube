import { useEffect, useState } from "react"
import "./SearchPage.scss"
import { useParams } from "wouter"
import { getSearchVideos } from "../../utils/getVideos"
import { Item, APIResponse } from "../../types"
import { SkeletonVideoCard } from "../SkeletonVideoCard/SkeletonVideoCard"
import { ErrorCard } from "../ErrorCard/ErrorCard"
import { Videos } from "../Videos/Videos"


export const SearchPage = () => {
    const searchText = useParams().searchText
    const [videos, setVideos] = useState<Item[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [nextPageToken, setNextPageToken] = useState<string | null>(null)

    useEffect(() => {
        if (searchText && searchText.trim() !== "") {
            setLoading(true)
            setVideos(null)
            getSearchVideos({
                searchText,
                nextPageToken
            })
                .then((data: APIResponse) => {
                    console.log(data.items)
                    if (data.nextPageToken) {
                        setNextPageToken(data.nextPageToken)
                    }
                    if (data.error) {
                        setVideos(null)
                        setError(data.error.message)
                    } else {
                        setVideos(data.items)
                    }
                })
                .catch(error => {
                    console.error("Error fetching search videos:", error)
                })
                .finally(() => {
                    setLoading(false)
                    setError(null)
                })
        }
    }, [searchText])

    // For infinite scroll on click
    const handleClick = () => {
        if (searchText && searchText.trim() !== "") {
            setLoading(true)
            
            getSearchVideos({
                searchText,
                nextPageToken
            })
                .then((data: APIResponse) => {
                    console.log(data.items)
                    if (data.nextPageToken) {
                        setNextPageToken(data.nextPageToken)
                    }
                    if (data.error) {
                        setVideos(null)
                        setError(data.error.message)
                    } else {
                        setVideos((prevVideos) => [...(prevVideos ?? []), ...data.items]);
                    }
                })
                .catch(error => {
                    console.error("Error fetching search videos:", error)
                })
                .finally(() => {
                    setLoading(false)
                    setError(null)
                })
        }
    }


    return (
        <section className="search__videos">
            {(videos) && <Videos videos={videos} />}

            {loading && Array.from({ length: 15 }).map((_, index) => <SkeletonVideoCard key={index} />)}

            {
                (videos && videos.length > 0 && error === null && !loading && nextPageToken !== null) && <button onClick={handleClick} className="load-more-btn">Ver más</button>
            }

            {error && <ErrorCard message={error} />}
        </section>
    )
}
