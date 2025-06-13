import "./VideoCard.scss"
import { Link } from "wouter"
import { Item } from "../../types"
import { formatDistanceToNow } from "date-fns"
import { es } from 'date-fns/locale';

// Define las props adicionales que quieres agregar
type VideoCardProps = Item


export const VideoCard: React.FC<VideoCardProps> = ({ id, snippet }) => {
    const channelTitle = snippet.channelTitle
    const videoTitle = snippet.title
    const image = snippet.thumbnails.high?.url || snippet.thumbnails.default?.url || snippet.thumbnails.medium?.url || snippet.thumbnails.standard?.url

    const FechaRelativa = ({ date }: { date: string }) => {
        const fechaRelativa = formatDistanceToNow(new Date(date), {
            addSuffix: true,
            locale: es, // Para mostrar el texto en español
        });

        return fechaRelativa
    };

    return (

        <div className="videoCard">
            <Link to={`/video/${id.videoId}`}>
                <img className="videoCard-img" title={videoTitle} src={image} alt={snippet.title} />
            </Link>

            <div className="videoCard__details">
                <Link to={`/video/${id.videoId}`}>
                    <h2 className="videoCard__details-title">
                        {videoTitle}
                    </h2>
                </Link>

                <div className="videoCard__details__descripcion">
                    <Link
                        className="videoCard__details__descripcion-channel"
                        to={`/channel/${snippet.channelId}`}
                    >
                        {(channelTitle.length > 25) ? `${channelTitle.slice(0, 25)}...` : channelTitle}
                        <i className='bx bxs-badge-check'></i>
                    </Link>

                    <p className="videoCard__details__descripcion-time">
                        {FechaRelativa({ date: snippet.publishedAt })}
                    </p>
                </div>
            </div>
        </div>
    )
}
