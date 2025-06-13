import React from "react"
import "./MenuFilter.scss"
import { useVideoStore } from "../../store/videos"
import { FilterCategory } from "../../types"
import { Link } from "wouter"


interface Props {
    text: FilterCategory
    icon: React.ReactNode
}


export const MenuFilter: React.FC<Props> = ({ icon, text }) => {
    const setFilterVideo = useVideoStore(state => state.setFilterVideo)
    const filterVideo = useVideoStore(state => state.filterVideo)

    const handleClick = (newFilter: FilterCategory) => {
        setFilterVideo(newFilter)
    }

    return (
        <li
            
            onClick={() => handleClick(text)}
        >
            <Link to="/" className={`filter-item ${filterVideo === text ? "active" : ""}`}>
                {icon}
                {text}
            </Link>
        </li>
    )
}
