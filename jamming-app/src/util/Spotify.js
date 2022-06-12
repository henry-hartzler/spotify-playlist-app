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
    }
}

export default Spotify;