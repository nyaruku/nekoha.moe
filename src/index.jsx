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
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link"href="/somerandomtext">Error Page</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Added HTML Content */}
      <div className="container py-4 px-3 mx-auto">
        <h1>Hi!</h1>
      </div>
    </>
  )
}

export default Index
