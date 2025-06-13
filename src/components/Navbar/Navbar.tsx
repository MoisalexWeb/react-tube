import "./Navbar.scss"
import logo from "/youtube.png"
import { SearchBar } from "../SearchBar/SearchBar"
import { MenuFilter } from "../MenuFilter/MenuFilter"
import { useNavbar } from "./useNavbar"
import { Link } from "wouter"
import { useVideoStore } from "../../store/videos"


export const Navbar = () => {
    const { isOpen, openMenu, closeMenu } = useNavbar()
    const changeTheme = useVideoStore(state => state.setDarkTheme)
    const theme = useVideoStore(state => state.darkTheme)

    return (
        <header className={`header ${isOpen ? "menu-open" : ""} ${theme ? "dark" : ""}`}>
            <nav className="navbar">
                <div className="navbar__items">
                    <button 
                        className="navbar__items-menu" 
                        aria-label="Open/close Menu"
                        onClick={openMenu}
                    >
                        <i className='bx bx-menu'></i>
                    </button>

                    <Link to="/" className="navbar__items__logo">
                        <img src={logo} alt="YouTube" className="navbar__items__logo-img" />
                        <figcaption className="navbar__items__logo-text">ReactTube</figcaption>
                    </Link>
                </div>

                <SearchBar />

                <button className="navbar-theme" onClick={() => changeTheme(theme)}>
                    {
                        theme ? < i className='bx  bx-sun'  ></i> : <i className='bx bx-moon'></i>
                    }
                </button>
            </nav>

            <ul className="menu__items">
                <div className="navbar__items">
                    <button 
                        className="navbar__items-menu"
                        aria-label="Open/close Menu"
                        onClick={closeMenu}
                    >
                        <i className='bx bx-x'></i>
                    </button>

                    <figure className="navbar__items__logo">
                        <img src={logo} alt="YouTube" className="navbar__items__logo-img" />
                        <figcaption className="navbar__items__logo-text">ReactTube</figcaption>
                    </figure>
                </div>

                <MenuFilter
                    text="New"
                    icon={<i className='bx bx-home-alt-2'></i>}
                />

                <MenuFilter
                    text="Sports"
                    icon={<i className='bx bx-trophy'></i>}
                />

                <MenuFilter
                    text="Music"
                    icon={<i className='bx bx-music'></i>}
                />

                <MenuFilter
                    text="Coding"
                    icon={<i className='bx bx-code-alt'></i>}
                />

                <MenuFilter
                    text="Education"
                    icon={<i className='bx bx-book-open'></i>}
                />

                <MenuFilter
                    text="Food"
                    icon={<i className='bx bx-bowl-hot'></i>}
                />

                <MenuFilter
                    text="Language"
                    icon={<i className='bx bx-globe'></i>}
                />

                <MenuFilter
                    text="Math"
                    icon={<i className='bx bx-calculator'></i>}
                />

                <MenuFilter
                    text="Science"
                    icon={<i className='bx bx-atom'></i>}
                />

                <MenuFilter
                    text="Art"
                    icon={<i className='bx bx-paint'></i>}
                />

                <MenuFilter
                    text="Fitness"
                    icon={<i className='bx bx-dumbbell'></i>}
                />

                <MenuFilter
                    text="Gaming"
                    icon={<i className='bx bx-game'></i>}
                />

                <MenuFilter
                    text="Movie"
                    icon={<i className='bx bx-camera-movie'></i>}
                />

                <MenuFilter
                    text="Podcast"
                    icon={<i className='bx bx-podcast'></i>}
                />

                <MenuFilter
                    text="Crypto"
                    icon={<i className='bx bx-dollar-circle'></i>}
                />
            </ul>

            <div className="menu__overlay" onClick={closeMenu}></div>
        </header>
    )
}
