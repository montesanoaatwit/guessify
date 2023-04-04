import React, { useEffect, useState } from "react";
import "./css/App.css"

function App() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")

  useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")

      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

          window.location.hash = ""
          window.localStorage.setItem("token", token)
      }

      setToken(token)

  }, [])

  const logout = () => {
      setToken("")
      window.localStorage.removeItem("token")
  }

  return (
      <div className="App">
          <header className="App-header">
            <h1>Guessify</h1>
            <h3>Spotify Guessing Game</h3>

            { !token ?
              <div class="connect-wrapper">
                <button><a class="connect-btn" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Play Now</a></button>
                <p>Connect your Spotify account to start playing!</p>
              </div>
              :
              <div class="playlist-wrapper">
                <button onClick={logout}>Logout</button>
                <p>Token: {token} </p>
              </div> 
            }
              
          </header>
      </div>
  );
}

export default App;
