import { useState } from 'react'
import { Helmet } from "react-helmet";

function Index() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <nav class="navbar navbar-expand-md bg-black bg-gradient">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">nekoha.moe</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbar-content" toggle="collapse" data-target=".navbar-collapse">
            <ul class="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/log/osu">osu! Log (Beta)</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/chat/osu">Live osu! Chat</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" target="_blank" href="https://github.com/nyaruku/nekoha.moe">GitHub</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" target="_blank" href="https://discord.gg/FN6vauFTGA">Discord</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" target="_blank" href="https://discord.gg/FN6vauFTGA">Discord</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Added HTML Content */}
      <div className="container py-4 px-3 mx-auto">
        <p>Nothing here yet....</p>
      </div>
    </>
  )
}

export default Index
