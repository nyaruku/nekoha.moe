import { Helmet } from 'react-helmet';
import nekohaImage from './images/nekoha.png';
import ChatBox from './components/chatBox.jsx';  // Make sure this path matches where you put ChatBox.jsx

function Index() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="container py-4 px-3 mx-auto">
        <div className="row mt-4">
          <div className="col-12 col-md-3 align-self-start">
            <img src={nekohaImage} className="mx-auto d-block img-fluid" alt="nekoha" />
          </div>
          <div className="col-12 col-md-9 align-self-center">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Hiii :3</h5>
                <p className="card-text">
                  Alright, uhm... I don't know what to really type here,<br />
                  here are some infos about me:
                </p>
                <ul>
                  <li>Age: 20 (18.08.2004)</li>
                  <li>Country: Germany</li>
                  <li>Fav Programming Language: C++</li>
                  <li>Socially shy and awkward</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div class="col-12 col-md-8 d-flex flex-column">
            <div className="mb-3 flex-grow-1">
              <ChatBox />
            </div>
          </div>
          <div class="col-12 col-md-4 d-flex flex-column">

            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Info</h5>
                  <p class="mb-0">Users online: <span class="text-secondary" id="userCount"></span></p>
                  <p class="mb-0">Server uptime: <span class="text-secondary" id="serverUptime"></span></p>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Socials</h5>
                <ul>
                  <li>Discord: railgun_osu</li>
                  <li>
                    <a href="https://discord.gg/FN6vauFTGA" className="default-link">My Discord Server</a>
                  </li>
                  <li>
                    <a href="https://github.com/nyaruku" className="default-link">GitHub</a>
                  </li>
                  <li>
                    <a href="https://github.com/nyaruku/nekoha.moe" className="default-link">GitHub Repo</a>
                  </li>
                  <li>
                    <a href="https://osu.ppy.sh/users/13817114" className="default-link">My osu! Profile</a>
                  </li>
                  <li>
                    <a href="https://twitter.com/railgun_osu" className="default-link">Twitter</a>
                  </li>
                  <li>
                    <a href="https://steamcommunity.com/id/_Railgun_/" className="default-link">Steam</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
