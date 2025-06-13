import "./PlaylistCard.scss"
import { Item } from "../../types"
import { Link } from "wouter"


export const PlaylistCard: React.FC<Item> = ({ id, snippet }) => {
    const title = snippet.title
    const channelTitle = snippet.channelTitle
    const image = snippet.thumbnails.high?.url || snippet.thumbnails.default?.url || snippet.thumbnails.medium?.url || snippet.thumbnails.standard?.url

    return (
        <div className="playlistCard">
            <figure className="playlistCard__figure">
                <Link to={`/playlist/${id}`}>
                    <img
                        className="playlistCard__figure-img"
                        src={image}
                        alt={title}
                        title={title}
                    />
                </Link>
            </figure>

            <div className="playlistCard__details">
                <Link to={`/playlist/${id}`} className="playlistCard__details-title">
                    {(title.length > 70) ? `${title.slice(0, 70)}...` : title}
                </Link>

                <div className="playlistCard__details__descripcion">
                    <Link
                        className="playlistCard__details__descripcion-channel"
                        to={`/channel/${snippet.channelId}`}
                    >
                        {(channelTitle.length > 15) ? `${channelTitle.slice(0, 20)}...` : channelTitle}
                        <i className='bx bxs-badge-check'></i>
                    </Link>

                    <p className="playlistCard__details__descripcion-time">Hace 12 horas</p>
                </div>

                <Link to={`/playlist/${id}`} className="playlistCard-playlist">Ver lista de reproduccion completa</Link>
            </div>
        </div>
    )
}
