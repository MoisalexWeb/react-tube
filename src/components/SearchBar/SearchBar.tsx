import "./SearchBar.scss"
import { useId } from "react"
import { useLocation } from "wouter"

export const SearchBar = () => {
    const inputId = useId()
    const [, setLocation] = useLocation()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const input = document.getElementById(inputId) as HTMLInputElement
        const searchText = input.value.trim()
        if (searchText) {
            setLocation(`/search/${searchText}`)
        }
        console.log(searchText)
    }

    return (
        <form className="searchbar" role="search" onSubmit={handleSubmit} autoComplete="off">
            <input type="search" id={inputId} className="searchbar-input" placeholder="Search" />
            
            <button type="submit" className="searchbar__button">
                <i className='bx bx-search'></i>
            </button>
        </form>
    )
}
