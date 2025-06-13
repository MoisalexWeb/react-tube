import "./ChannelCard.scss"
import { ItemChannel } from "../../types"
import { Link } from "wouter"


export const ChannelCard: React.FC<ItemChannel> = ({ id, snippet }) => {
    const descripcion = snippet.description
    const image = snippet.thumbnails.high?.url || snippet.thumbnails.default?.url || snippet.thumbnails.medium?.url || snippet.thumbnails.standard?.url
    const channelTitle = snippet.channelTitle

    return ( 
        <div className="channelCard">
            <Link className="channelCard-content" to={`/channel/${id.channelId}`}>
                <img src={image} alt={channelTitle} className="channelCard-logo" />
                <h3 className="channelCard-title">
                    {channelTitle.length > 20 ? `${descripcion.slice(0, 20)}...` : channelTitle}
                    <i className='bx bxs-badge-check'></i>
                </h3>
                {
                    descripcion.length > 0 && <p className="channelCard-descripcion">{descripcion}</p>
                }
            </Link>
        </div>
    )
}
