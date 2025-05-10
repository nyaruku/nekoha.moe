import { Helmet } from 'react-helmet';
import nekohaImage from './images/nekoha.png';
import shadify from './javascript/shadify.js';
import ChatBox from './components/chatBox.jsx';  // Make sure this path matches where you put ChatBox.jsx
import FpsCounter from './components/fps.jsx';  // Import the FPS counter component
import CursorSync from './components/cursorSync.jsx';  // Import the CursorSync component
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// BUTTONS
import img_2hu from './images/buttons/2hu.gif';
import img_1080p from './images/buttons/1080p.gif';
import img_2001 from './images/buttons/2001.gif';
import img_2019 from './images/buttons/2019.gif';
import img_animegay from './images/buttons/animegay.gif';
import img_antinf from './images/buttons/antinft.webp';
import img_blink0 from './images/buttons/blink-0.gif';
import img_buryNice from './images/buttons/bury_nice.webp';
import img_cal2 from './images/buttons/cal_2.gif';
import img_construction from './images/buttons/construction.gif';
import img_debian from './images/buttons/debian.gif';
import img_discordNow from './images/buttons/discord_now.gif';
import img_fckgoogle from './images/buttons/fckgoogle.gif';
import img_firefox3 from './images/buttons/firefox3.gif';
import img_getacomp from './images/buttons/getacomp.webp';
import img_github from './images/buttons/github.gif';
import img_gnunano from './images/buttons/gnunano.gif';
import img_hatsunemiku1 from './images/buttons/hatsunemiku1.gif';
import img_icongallery from './images/buttons/icongallery.gif';
import img_knbutton from './images/buttons/knbutton.gif';
import img_linux from './images/buttons/linux.gif';
import img_mysql from './images/buttons/mysqla.webp';
import img_ostan from './images/buttons/ostan.gif';
import img_poweredCpp from './images/buttons/powered-cpp.gif';
import img_reshirii from './images/buttons/reshirii.gif';
import img_transnow2 from './images/buttons/transnow2.gif';
import img_xenia from './images/buttons/xenia.gif';
import img_yumenikki from './images/buttons/yumenikki.gif';
import img_z3r0s from './images/buttons/z3r0s.gif';
import img_winamp from './images/buttons/winamp.webp';
import img_anythingbut from './images/buttons/anythingbut.webp';
import img_anonymize from './images/buttons/anonymize.webp';
import img_hashNow from './images/buttons/hash_now.webp';
import img_thoughtcrimes from './images/buttons/thoughtcrimes.webp';
import img_gay from './images/buttons/gay.webp';
import img_imissxp from './images/buttons/imissxp.webp';
import img_withLove from './images/buttons/with_love.webp';
import img_webpassion from './images/buttons/webpassion.gif';
// BUTTONS
function Index() {
  const [visitCount, setVisitCount] = useState(null);
  useEffect(() => {
    axios.get('/api/visit')
    .then(res => setVisitCount(res.data.count))
      .catch(err => console.error('Visit counter error:', err));
  }, []);

  useEffect(() => {
    // Apply shader attributes to the <body> only on this page
    const body = document.body;
    body.setAttribute('data-shader', '/shader/shader.h');
    body.setAttribute('data-shader-speed', '0.1');
    body.setAttribute('data-shader-quality', '1.0');
    body.style = "overflow-y: scroll;";

    return () => {
    };
  }, []);
  
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
            <div className="card mb-4 border-glow">
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
        <CursorSync />
        <div className="row">
          <div className="col-12 col-md-8 d-flex flex-column">
            <div className="mb-3 flex-grow-1">
              <ChatBox />
            </div>
          </div>
          <div className="col-12 col-md-4 d-flex flex-column">

            <div className="border-glow card mb-3">
              <div className="card-body">
                <h5 className="card-title">Info</h5>
                <p className="mb-0">Users online: <span className="text-secondary" id="userCount"></span></p>
                <p className="mb-0">Server uptime: <span className="text-secondary" id="serverUptime"></span></p>
                <p className="mb-0">Visits: <span className="text-secondary">{visitCount}</span></p>
              </div>
            </div>

            <div className="border-glow card mb-3">
              <div className="card-body">
                <h5 className="card-title">Socials</h5>
                <ul>
                  <li>Discord: railgun_osu</li>
                  <li>
                    <a href="https://discord.gg/FN6vauFTGA" target="_blank" className="default-link">My Discord Server</a>
                  </li>
                  <li>
                    <a href="https://github.com/nyaruku" target="_blank" className="default-link">GitHub</a>
                  </li>
                  <li>
                    <a href="https://github.com/nyaruku/nekoha.moe" target="_blank" className="default-link">GitHub Repo</a>
                  </li>
                  <li>
                    <a href="https://osu.ppy.sh/users/13817114" target="_blank" className="default-link">My osu! Profile</a>
                  </li>
                  <li>
                    <a href="https://twitter.com/railgun_osu" target="_blank" className="default-link">Twitter</a>
                  </li>
                  <li>
                    <a href="https://steamcommunity.com/id/_Railgun_/" target="_blank" className="default-link">Steam</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-glow card mb-3">
              <div className="card-body">
                <h5 className="card-title">Cool Websites</h5>
                <a href="https://comfybox.floofey.dog/" target="_blank" className="default-link">Comfy Box</a><br/>
                <a href="https://glslsandbox.com/" target="_blank" className="default-link">GLSL Sandbox Gallery</a><br/>
                <a href="https://www.yourworldoftext.com/" target="_blank" className="default-link">Your World of Text</a><br/>
                <a href="https://cyber.dabamos.de/88x31/" target="_blank" className="default-link">88x31 buttons archive</a><br/>
                <a href="https://gifcities.org/" target="_blank" className="default-link">GifCities</a><br/>
                <a href="https://neocities.org/" target="_blank" className="default-link">neocities</a><br/>
                <a href="https://www.cameronsworld.net/" target="_blank" className="default-link">Cameron's World</a>
              </div>
            </div>
            <div className="mb-3">
              <div className="button-grid d-flex flex-wrap">
                <img src={img_2hu} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_1080p} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_2001} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_2019} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_animegay} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_antinf} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_blink0} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_buryNice} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_cal2} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_construction} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_debian} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_discordNow} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_fckgoogle} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_firefox3} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_getacomp} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_github} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_gnunano} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_hatsunemiku1} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_icongallery} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_knbutton} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_linux} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_mysql} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_ostan} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_poweredCpp} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_reshirii} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_transnow2} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_xenia} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_yumenikki} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_z3r0s} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_winamp} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_anythingbut} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_anonymize} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_hashNow} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_thoughtcrimes} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_gay} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_imissxp} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_withLove} className="img-fluid me-1 mb-1" alt="nekoha" />
                <img src={img_webpassion} className="img-fluid me-1 mb-1" alt="nekoha" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FPS Counter Component */}
      <FpsCounter />
    </>
  );
}

export default Index;
