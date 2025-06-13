import "./ChannelData.scss"
import { ChannelItem } from "../../types"

interface ChannelDataProps {
    channel: ChannelItem;
}

export const ChannelData: React.FC<ChannelDataProps> = ({ channel }) => {
    return (
        <>
            <section className="banner container">
                <div className="banner-bg"></div>
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
    )
}
