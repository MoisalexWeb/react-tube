import { Route, Switch } from 'wouter'
import { Navbar } from './components/Navbar/Navbar'
import { Feed } from './components/Feed/Feed'
import { VideoDetail } from './components/VideoDetail/VideoDetail'
import { ChannelPage } from './components/ChannelPage/ChannelPage'
import { SearchPage } from './components/SearchPage/SearchPage'
import { PlaylistPage } from './components/PlaylistPage/PlaylistPage'
import { NotFound } from './components/NotFound/NotFound'
import { useVideoStore } from './store/videos'
import './App.scss'

function App() {
    const darkTheme = useVideoStore(state => state.darkTheme)

    return (
        <>
            <Navbar />
            
            <main className={`${darkTheme ? "dark" : ""}`}>
                <Switch>
                    <Route path="/" component={Feed} />
                    <Route path="video/:videoId" component={VideoDetail} />
                    <Route path="channel/:channelId" component={ChannelPage} />
                    <Route path="search/:searchText" component={SearchPage} />
                    <Route path="playlist/:playlistId" component={PlaylistPage} />
                    <Route component={NotFound} />
                </Switch>
            </main>
        </>
    )
}

export default App
