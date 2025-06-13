import { FilterCategory } from "../types"

// Obtener los videos del home
export const getFeedVideos = async ({filter, pageToken }:{filter: FilterCategory, pageToken?: string | null}) => {
    try {
        let URL = `https://youtube-v31.p.rapidapi.com/search?q=${filter}&order=date&regionCode=US&maxResults=15&part=snippet%2Cid`

        // Si hay un pageToken, lo añade a la URL
        if (pageToken) {
            URL += `&pageToken=${pageToken}`;
        }

        const peticion = await fetch(URL, {
            headers: {
                'x-rapidapi-key': '5f6217efb6mshd5fa0005dd0e2ddp10ff1bjsnd0ba7b543a98',
                'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
            }
        })

        if (peticion.ok) {
            const data = await peticion.json()
            console.log(data)
            return data
        }
    } catch (error) {
        console.log(error)
    }
}


// Obtener los detallesdel video
export const getVideoDetails = async (videoId: string) => {
    try {
        const peticion = await fetch(`https://youtube-v31.p.rapidapi.com/videos?part=contentDetails,snippet,statistics&id=${videoId}&part=snippet,id&regionCode=US`, {
            headers: {
                'x-rapidapi-key': '5f6217efb6mshd5fa0005dd0e2ddp10ff1bjsnd0ba7b543a98',
                'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
            }
        })

        if (peticion.ok) {
            const data = await peticion.json()
            console.log(data)
            return data
        }
    } catch (error) {
        console.log(error)
    }
}


// Obtener los videos relacionados
export const getRelatedVideos = async (videoId: string) => {
    try {
        const peticion = await fetch(`https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=${videoId}&part=id,snippet&type=video&maxResults=15&part=snippet,id&regionCode=US`, {
            headers: {
                'x-rapidapi-key': '5f6217efb6mshd5fa0005dd0e2ddp10ff1bjsnd0ba7b543a98',
                'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
            }
        })

        if (peticion.ok) {
            const data = await peticion.json()
            console.log(data)
            return data
        }
    } catch (error) {
        console.log(error)
    }
}


// Obtener los datos del canal
export const getChannelData = async (videoId: string) => {
    try {
        const peticion = await fetch(`https://youtube-v31.p.rapidapi.com/channels?part=snippet,statistics&id=${videoId}`, {
            headers: {
                'x-rapidapi-key': '5f6217efb6mshd5fa0005dd0e2ddp10ff1bjsnd0ba7b543a98',
                'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
            }
        })

        if (peticion.ok) {
            const data = await peticion.json()
            // console.log(data)
            return data
        }
    } catch (error) {
        console.log(error)
    }
}


// Obtener los videos del canal
export const getChannelVideos = async ({channelId, nextPageToken}: {channelId: string, nextPageToken: string | null}) => {
    try {
        let URL = `https://youtube-v31.p.rapidapi.com/search?channelId=${channelId}&part=snippet,id&order=date&maxResults=40`

        if (nextPageToken) {
            URL += `&pageToken=${nextPageToken}`
        }

        const peticion = await fetch(URL, {
            headers: {
                'x-rapidapi-key': '5f6217efb6mshd5fa0005dd0e2ddp10ff1bjsnd0ba7b543a98',
                'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
            }
        })

        if (peticion.ok) {
            const data = await peticion.json()
            // console.log(data)
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

// Obtener los videos de la busqueda
export const getSearchVideos = async ({searchText, nextPageToken}: {searchText: string, nextPageToken: string | null}) => {
    try {
        let URL = `https://youtube-v31.p.rapidapi.com/search?q=${searchText}&part=snippet,id&regionCode=US&maxResults=25`

        if (nextPageToken !== null) {
            URL += `&pageToken=${nextPageToken}`
        }

        const peticion = await fetch(URL, {
            headers: {
                'x-rapidapi-key': '5f6217efb6mshd5fa0005dd0e2ddp10ff1bjsnd0ba7b543a98',
                'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
            }
        })

        if (peticion.ok) {
            const data = await peticion.json()
            console.log(data)
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

// Obtener los datos de la playlist
export const getPlaylistDetail = async (playlistId: string) => {
    try {
        const peticion = await fetch(`https://youtube-v31.p.rapidapi.com/playlists?id=${playlistId}&part=snippet`, {
            headers: {
                'x-rapidapi-key': '5f6217efb6mshd5fa0005dd0e2ddp10ff1bjsnd0ba7b543a98',
                'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
            }
        })

        if (peticion.ok) {
            const data = await peticion.json()
            // console.log(data)
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

// Obtener los videos de la playlist
export const getPlaylistVideos = async (playlistId: string) => {
    try {
        const peticion = await fetch(`https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=${playlistId}&part=snippet&maxResults=50`, {
            headers: {
                'x-rapidapi-key': '5f6217efb6mshd5fa0005dd0e2ddp10ff1bjsnd0ba7b543a98',
                'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
            }
        })

        if (peticion.ok) {
            const data = await peticion.json()
            // console.log(data)
            return data
        }
    } catch (error) {
        console.log(error)
    }
}