import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
      {
        name: 'name1',
        artist: 'artist1',
        album: 'album1',
        id: 1
      },
      {
        name: 'name2',
        artist: 'artist2',
        album: 'album2',
        id: 2
      },
      {
        name: 'name3',
        artist: 'artist3',
        album: 'album3',
        id: 3
      }
    ],
    playlistName: {title: 'New Playlist'},
    playlistTracks: [
      {
        name: 'playlistname1',
        artist: 'playlistartist1',
        album: 'playlistalbum1',
        id: 4
      },
      {
        name: 'playlistname2',
        artist: 'playlistartist2',
        album: 'playlistalbum2',
        id: 5
      },
      {
        name: 'playlistname3',
        artist: 'playlistartist3',
        album: 'playlistalbum3',
        id: 6
      }
    ]
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
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
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
