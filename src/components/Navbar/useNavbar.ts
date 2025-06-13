import { useState } from 'react'
// import { useVideoStore } from '../../store/videos'


export const useNavbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    // const theme = useVideoStore(state => state.darkTheme)
    

    const openMenu = () => setIsOpen(true)

    const closeMenu = () => setIsOpen(false) 

    return {
        isOpen,
        openMenu,
        closeMenu
    }
}
