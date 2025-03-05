import { Helmet } from "react-helmet";

export default function Error() {
  return (
    <>
      <Helmet>
        <title>Error</title>
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
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/log/osu">osu! Log (Beta)</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/chat/osu">Live osu! Chat</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" target="_black" href="https://github.com/nyaruku/nekoha.moe">GitHub</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="container d-flex justify-content-center">
        <div class="card card-error mt-5">
          <div class="card-body">
            <h5 class="card-title">OOPSIE WOOPSIE!!</h5>
            <p class="card-text">Uwu We make a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!</p>
          </div>
        </div>
      </div>
    </>
  )
}


