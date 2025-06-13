
import "./PlaylistDetail.scss"
import { Link } from "wouter"
import { PlaylistListResponse } from "../../types"
import { formatDistanceToNow } from "date-fns"
import { es } from 'date-fns/locale';

type Props = {
    playlist: PlaylistListResponse | null
}

export const PlaylistDetail: React.FC<Props> = ({ playlist }) => {
    // Para poner la fecha de publicacion
    const formatDate = ({ date }: { date: string }) => {
        const fechaRelativa = formatDistanceToNow(new Date(date), {
            addSuffix: true,
            locale: es, // Para mostrar el texto en español
        });

        return fechaRelativa
    };

    return (
        <div className="playlist__detail-container">
            <div className="playlist__detail">
                <img
                    src={
                        playlist?.items[0].snippet.thumbnails.high?.url ||
                        playlist?.items[0].snippet.thumbnails.medium?.url ||
                        playlist?.items[0].snippet.thumbnails.standard?.url ||
                        playlist?.items[0].snippet.thumbnails.default?.url
                    }
                    alt={playlist?.items[0].snippet.title}
                    className="playlist__detail-img"
                />

                <div className="playlist__detail__text">
                    {
                        (playlist?.items[0].snippet.title.length && playlist?.items[0].snippet.title.length > 1) &&
                        <h1 className="playlist__detail-title">{playlist?.items[0].snippet.title}</h1>

                    }

                    <Link to={`/channel/${playlist?.items[0].snippet.channelId}`} className="playlist__detail-channel">
                        {playlist?.items[0].snippet.channelTitle}
                        <i className='bx bxs-badge-check'></i>
                    </Link>

                    <p className="playlist__detail-list">Lista de reproducción</p>

                    {
                        (playlist?.items[0].snippet.description.length && playlist?.items[0].snippet.description.length > 1) 
                            ? <p className="playlist__detail-description">{playlist?.items[0].snippet.description}</p>
                            : null
                    }

                    {
                        playlist?.items[0].snippet.publishedAt
                            ? <p className="playlist__detail-date">{formatDate({ date: playlist?.items[0].snippet.publishedAt })}</p>
                            : null
                    }
                </div>

            </div>
        </div>
    )
}
