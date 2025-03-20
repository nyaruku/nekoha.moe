import { useState } from 'react'
import { Helmet } from "react-helmet";
import nekohaImage from './images/nekoha.png';

function Index() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      {/* Added HTML Content */}
      <div className="container py-4 px-3 mx-auto">
        <div class="row mt-4">
          <div class="col-12 col-md-3 align-self-start">
            <img src={nekohaImage} class="mx-auto d-block img-fluid" alt="nekoha" />
          </div>
          <div class="col-12 col-md-9 align-self-center">
            <div class="card mb-4">
              <div class="card-body">
                <h5 class="card-title">Hiii :3</h5>
                <p class="card-text">
                  Alright, uhm... i don't know what to really type here,<br/>here  are some infos about me:
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
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Socials</h5>
            <ul>
              <li>Discord: railgun_osu</li>
              <li><a href="https://discord.gg/FN6vauFTGA" class="default-link">My Discord Server</a></li>
              <li><a href="https://osu.ppy.sh/users/13817114" class="default-link">My osu! Profile</a></li>
              <li><a href="https://twitter.com/railgun_osu" class="default-link">Twitter</a></li>
              <li><a href="https://steamcommunity.com/id/_Railgun_/" class="default-link">Steam</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index