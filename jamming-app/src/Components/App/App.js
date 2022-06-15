import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

Spotify.getAccessToken();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: {title: 'New Playlist'},
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(el => el.id === track.id)) {
      return;
    }
    tracks.push(track);

    this.setState({playlistTracks: tracks});
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    //this renders all the tracks EXCEPT the one selected - removing the selected from the playlist
    tracks = tracks.filter(el => el.id !== track.id);

    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
    
  }

  //this generates a new array of uri properties from the playlistTracks property
  savePlaylist() {
     const trackURIs = this.state.playlistTracks.map(el => el.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }
  
  render() {
    return (
      <div>
        <h1><span className="highlight">Be</span>ats Ba<span className="highlight">you</span></h1>
        <div className="App">
         <SearchBar onSearch={this.search} />
          <div className="App-playlist">
        <SearchResults  searchResults={this.state.searchResults} 
                        onAdd={this.addTrack} />
        <Playlist   playlistName={this.state.playlistName} 
                    playlistTracks={this.state.playlistTracks}
                    onRemove={this.removeTrack}
                    onNameChange={this.updatePlaylistName}
                    onSave ={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
