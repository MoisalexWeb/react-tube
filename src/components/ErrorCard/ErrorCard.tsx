import "./ErrorCard.scss"

export const ErrorCard = ({ message }: { message: string}) => {
    return (
        <div className="error-card">
            <i className='bx bx-error'></i>
            <h2 className="error-card-text">{message}</h2>
        </div>
    )
}
