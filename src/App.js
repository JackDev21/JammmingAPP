import { useState } from 'react';
import './App.css';
import Playlist from './components/Playlist';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';
import { ImHeadphones } from "react-icons/im";
import { Spotify } from './util/Spotify'



function App() {

  const [searchResults, setSearchResults] = useState([
    {
      name: "Example Track Name 1",
      artist: "Example Track Artist 1",
      album: "Example Track Album 1",
      id: 1,
    },
    {
      name: "Example Track Name 2",
      artist: "Example Track Artist 2",
      album: "Example Track Album 2",
      id: 2,
    },
  ]);
  const [playlistName, setPlaylistName] = useState("Example Playlist Name");
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "Example Playlist Name 1",
      artist: "Example Playlist Artist 1",
      album: "Example Playlist Album 1",
      id: 11,
    },
    {
      name: "Example Playlist Name 2",
      artist: "Example Playlist Artist 2",
      album: "Example Playlist Album 2",
      id: 22,
    },
    {
      name: "Example Playlist Name 3",
      artist: "Example Playlist Artist 3",
      album: "Example Playlist Album 3",
      id: 33,
    },
  ]);

  const addTrack = (track) => {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log('Cancion ya existe')
    } else {
      setPlaylistTracks(newTrack)
    }
  }

  const removeTrack = (track) => {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack)
  }

  const updatePlaylistName = (name) => {
    setPlaylistName(name)
  }

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((track) => track.uri)
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      updatePlaylistName('New Playlist')
      setPlaylistName([])
    })
  }

  const search = (term) => {
    Spotify.search(term).then(result => {
      setSearchResults(result)
      console.log(term)
    })
  }



  return (
    <div className="App">
      <div className='header'><i className='icon'><ImHeadphones /></i><h1>Jammming</h1></div>
      <div className='container-searchBar'>
        <SearchBar onSearch={search} />
      </div>
      <div className='container-list'>
        <SearchResult userSearchResults={searchResults}
          onAdd={addTrack} />
        <Playlist playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onSave={savePlaylist}
          onNameChange={updatePlaylistName} />
      </div>
      <footer className='footer'>Made with ❤️ by Jose A.Canto (JackDev)</footer>

    </div>
  );
}

export default App;
