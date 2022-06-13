let accessToken;
const clientID = '7033ba45bb374fd2991551b40ac8afbb';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken() {
       if (accessToken) {
           return accessToken;
       }

       //check for accessToken match
       const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
       const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

       if (accessTokenMatch && expiresInMatch) {
           accessToken = accessTokenMatch[1];
           const expiresIn = Number(expiresInMatch[1]);

           //clears parameters and grabs new access token
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
       } else {
           const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
           window.location = accessURL;
       }
    },

    //might make it async search(term) and replace return fetch with await fetch
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: 
            {Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            return  !jsonResponse.tracks ? [] :
                    jsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }));
        })
    },

    savePlaylist(name, trackURIs) {
        //checks to see if playlistName or array of track URIs is empty and just returns.
        if (!name || !trackURIs.length) {
            return;
        }

        //sets the default variables
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
            return response.json()
        }).then(jsonResponse => {
            userId = jsonResponse.id;
        })

    }
}

export default Spotify;