import "./VideoPlayer.scss"
import { useState } from "react"
import { VideoListResponse } from "../../types"
import ReactPlayer from "react-player"
import { Link } from "wouter"
import { formatDistanceToNow } from "date-fns"
import { es } from 'date-fns/locale';

interface Props {
    videoData: VideoListResponse | null,
    videoID: string
}


export const VideoPlayer: React.FC<Props> = ({ videoData, videoID }) => {
    const [showDescripcion, setShowDescripcion] = useState<boolean>(false)

    // Para transformar la fecha en hace tanto tiempo
    const FechaRelativa = ({ date }: { date: string }) => {
        const fechaRelativa = formatDistanceToNow(new Date(date), {
            addSuffix: true,
            locale: es, // Para mostrar el texto en español
        });

        return fechaRelativa
    };


    return (
        videoData !== null &&
        <div className="section__player">
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoID}`}
                controls={true}
                className="section__player-video"
            />

            <h1 className="section__player-title">{videoData.items[0].snippet.title}</h1>

            <span className="section__player-views">
                {videoData.items[0].statistics.viewCount
                    ? `${parseInt(videoData.items[0].statistics.viewCount).toLocaleString("es")} Visualizaciones`
                    : ""
                }
            </span>

            <div className="section__player__stadistics">
                <Link
                    to={`/channel/${videoData.items[0].snippet.channelId}`}
                    className="section__player__stadistics__channel"
                >
                    {videoData.items[0].snippet.channelTitle}
                    <i className='bx bxs-badge-check'></i>
                </Link>

                <div className="section__player__stadistics__likes">
                    {
                        videoData.items[0].statistics.likeCount &&
                        <>
                            <i className='bx bxs-like'></i>
                            {parseInt(videoData.items[0].statistics.likeCount).toLocaleString("es")}
                        </>
                    }
                </div>
            </div>

            <div className="section__player__descripcion">
                <span className="section__player__descripcion-time">
                    {FechaRelativa({ date: videoData.items[0].snippet.publishedAt })}
                </span>

                <button
                    className={`section__player__descripcion-btn ${showDescripcion ? "rotate" : ""}`}
                    onClick={() => setShowDescripcion(!showDescripcion)}
                >
                    {
                        (!showDescripcion) ? "Mostrar descripcion" : "Ocultar descripcion"
                    }
                    <i className='bx bxs-chevron-down'></i>
                </button>

                <p className="section__player__descripcion-text">
                    {
                        videoData.items[0].snippet.description
                    }
                </p>
            </div>
        </div>
    )
}
