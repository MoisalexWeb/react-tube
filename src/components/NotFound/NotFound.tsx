import "./NotFound.scss"
import thisIsFine from "/this-is-fine.gif"

export const NotFound = () => {
    return (
        <section className="not-found">
            <div className="not-found__container">
                <h2 className="not-found__title">The page you are looking for does not exist</h2>
                <img src={thisIsFine} alt="This is fine gif..." className="not-found__img" />
            </div>
        </section>
    )
}
