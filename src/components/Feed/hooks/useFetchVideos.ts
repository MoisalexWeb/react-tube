// import { getFeedVideos } from "../../../utils/getVideos"
// import { useVideoStore } from "../../../store/videos"
// import { useEffect } from "react"


// export const useFetchVideos = () => {
//     const setLoadingVideos = useVideoStore(state=> state.setLoadingVideos)
//     const filterVideo = useVideoStore(state => state.filterVideo)
//     const setVideos = useVideoStore(state => state.setVideos)


//     useEffect(() => {
//         setLoadingVideos(true)
//         getFeedVideos(filterVideo)
//             .then(data => {
//                 console.log(data)
//                 setVideos(data.items)
//             })
//             .finally(() => setLoadingVideos(false))
//     }, [filterVideo])
// }
