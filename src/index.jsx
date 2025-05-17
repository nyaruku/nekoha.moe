import { Helmet } from 'react-helmet';
import nekohaImage from './images/nekoha.png';
import shadify from './javascript/shadify.js';
import ChatBox from './components/chatBox.jsx';  // Make sure this path matches where you put ChatBox.jsx
import FpsCounter from './components/fps.jsx';  // Import the FPS counter component
import CursorSync from './components/cursorSync.jsx';  // Import the CursorSync component
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
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
  const audio = audioRef.current;
  if (!audio) return;

  // Attach event listeners for loading state
  const handleCanPlay = () => setIsLoading(false);
  const handleWaiting = () => setIsLoading(true);

  audio.addEventListener('canplay', handleCanPlay);
  audio.addEventListener('waiting', handleWaiting);

  // Try autoplay on load
  const cookies = Object.fromEntries(
    document.cookie
      .split('; ')
      .map((c) => c.split('=').map(decodeURIComponent))
  );
  const savedVolume = parseInt(cookies.volume || '10', 10);

  setVolume(savedVolume);
  audio.volume = savedVolume / 100;

  audio.play()
    .then(() => {
      setIsPlaying(true);
      setIsLoading(false);
    })
    .catch((err) => {
      console.warn('Autoplay blocked:', err);
      // Autoplay blocked, so mark loading as false and let user manually play
      setIsPlaying(false);
      setIsLoading(false);
    });

  // Cleanup listeners on unmount
  return () => {
    audio.removeEventListener('canplay', handleCanPlay);
    audio.removeEventListener('waiting', handleWaiting);
  };
}, []);

  useEffect(() => {
    const cookies = Object.fromEntries(
      document.cookie
        .split('; ')
        .map((c) => c.split('=').map(decodeURIComponent))
    );

    const shader = cookies.shader || '/shader/snow.h';
    const speed = cookies.shaderSpeed || '0.1';
    const quality = cookies.shaderQuality || '1.0';

    const body = document.body;
    body.setAttribute('data-shader', shader);
    body.setAttribute('data-shader-speed', speed);
    body.setAttribute('data-shader-quality', quality);
    body.classList.add('bg-black');
    body.style.overflowY = 'scroll';

    // Volume setup + autoplay
    const savedVolume = parseInt(cookies.volume || '10', 10);
    setVolume(savedVolume);
    if (audioRef.current) {
      audioRef.current.volume = savedVolume / 100;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Autoplay blocked:', err));
    }
  }, []);

  // React-safe shader switcher
  const handleShaderChange = (shader, speed, quality = '1.0') => {
    const body = document.body;
    body.setAttribute('data-shader', shader);
    body.setAttribute('data-shader-speed', speed);
    body.setAttribute('data-shader-quality', quality);
    body.style.overflowY = 'scroll';

    document.cookie = `shader=${encodeURIComponent(shader)}; path=/; max-age=${60 * 60 * 24 * 30}`;
    document.cookie = `shaderSpeed=${speed}; path=/; max-age=${60 * 60 * 24 * 30}`;
    document.cookie = `shaderQuality=${quality}; path=/; max-age=${60 * 60 * 24 * 30}`;
  };

  const shaders = [
    { label: 'Snow', path: '/shader/snow.h', speed: '0.1' },
    { label: 'Abstract', path: '/shader/abstract.h', speed: '0.1' },
    { label: 'Void', path: '/shader/void.h', speed: '1.0' },
    { label: 'Vector', path: '/shader/vector.h', speed: '0.05' },
    { label: 'Cloud', path: '/shader/cloud.h', speed: '1.0' },
    { label: 'Singularity', path: '/shader/singularity.h', speed: '1.0' },
    { label: 'Fluid', path: '/shader/fluid.h', speed: '1.0' },
    { label: 'Galaxy 1', path: '/shader/galaxy1.h', speed: '1.0' },
    { label: 'Galaxy 2', path: '/shader/galaxy2.h', speed: '1.0' },
    { label: 'Galaxy 3', path: '/shader/galaxy3.h', speed: '1.0' },
  ];
  

  const audioRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(10);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    document.cookie = `volume=${newVolume}; path=/; max-age=${60 * 60 * 24 * 30}`;
  };

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
            <div className="card mb-4 rounded-0">
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
              <div className="mt-5 rounded-0 card mb-3">
                <div class="card-header">Projects</div>
              </div>
              <div className="rounded-0 card mb-3">
                <div className="card-body">
                  <h5 className="card-title">osu! Chat Logger</h5>
                  <p>An IRC Chat Logger that logs all channels and messages from the game osu!</p>
                  <a href="/log" target="_blank" class="btn btn-dark rounded-0 me-3">osu! Chat Logs</a>
                  <a href="https://github.https://github.com/nyaruku/nekoha.moe-server/blob/main/logger.cjs" target="_blank" class="btn btn-dark rounded-0">Source Code</a>
                </div>
              </div>
              <div className="rounded-0 card mb-3">
                <div className="card-body">
                  <h5 className="card-title">osuTo2007</h5>
                  <p>A .osu file converter to make any map playable in any osu! version</p>
                  <a href="https://github.com/nyaruku/osuTo2007" target="_blank" class="btn btn-dark rounded-0">GitHub Project</a>
                </div>
              </div>
              <div className="rounded-0 card mb-3">
                <div className="card-body">
                  <h5 className="card-title">osu! Tracker</h5>
                  <p>A wip project to track osu! Stats and Sessions</p>
                  <a href="https://github.com/nyaruku/osu-tracker" target="_blank" class="btn btn-dark rounded-0">GitHub Project</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 d-flex flex-column">
            <div className="card rounded-0 mb-3">
              <div className="card-body">
                <h5 className="card-title">Settings</h5>
                <div class="dropdown mb-3" data-bs-theme="dark">
                  <button class="btn btn-sm btn-dark dropdown-toggle rounded-0" type="button" data-bs-toggle="dropdown">
                    Select Background
                  </button>
                  <ul className="dropdown-menu bg-primary rounded-0">
                    {shaders.map((shader) => (
                      <li key={shader.path}>
                        <a
                          className="dropdown-item hover-bg-override"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleShaderChange(shader.path, shader.speed);
                          }}
                        >
                          {shader.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <audio ref={audioRef} src="https://icecast.nekoha.moe/stream.mp3" preload="none"/>
                
              <div className="mx-auto" style={{ maxWidth: "100%" }}>
                <label htmlFor="volumeControl" className="form-label mb-0">
                  Volume ({volume}%)
                </label>
                {isLoading && <span className="text-muted small ms-2">Loading...</span>}
                
                <div className="d-flex align-items-center mt-2">
                  <i className={`fas me-3 fa-${isPlaying ? "pause" : "play"}`} role="button" onClick={togglePlay}></i>
                  <i className={`fas me-3 fa-volume-${isMuted ? "mute" : "up"}`} role="button" onClick={toggleMute}></i>
                  <input type="range" className="form-range flex-grow-1" id="volumeControl" min="0" max="100" value={volume} onChange={handleVolumeChange}/>
                </div>
              </div>              
              </div>
            </div>
            <div className="card rounded-0 mb-3">
              <div className="card-body">
                <h5 className="card-title">Info</h5>
                <p className="mb-0">Users online: <span className="text-secondary" id="userCount"></span></p>
                <p className="mb-0">Server uptime: <span className="text-secondary" id="serverUptime"></span></p>
                <p className="mb-0">Visits: <span className="text-secondary">{visitCount}</span></p>
              </div>
            </div>
            <div className="rounded-0 card mb-3">
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
            <div className="card rounded-0 mb-3">
              <div className="card-body">
                <h5 className="card-title">Cool Websites</h5>
                <a href="https://comfybox.floofey.dog/" target="_blank" className="default-link">Comfy Box</a><br/>
                <a href="https://glslsandbox.com/" target="_blank" className="default-link">GLSL Sandbox Gallery</a><br/>
                <a href="https://www.yourworldoftext.com/" target="_blank" className="default-link">Your World of Text</a><br/>
                <a href="https://cyber.dabamos.de/88x31/" target="_blank" className="default-link">88x31 buttons archive</a><br/>
                <a href="https://gifcities.org/" target="_blank" className="default-link">GifCities</a><br/>
                <a href="https://neocities.org/" target="_blank" className="default-link">neocities</a><br/>
                <a href="https://www.cameronsworld.net/" target="_blank" className="default-link">Cameron's World</a><br/>
                <a href="https://www.radio-browser.info/" target="_blank" className="default-link">radio-browser</a>
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
        <div className="mt-5 card rounded-0 mb-3">
          <div className="card-body text-center">
            <div class="row align-items-center mb-2">
              <a href="/privacy" target="_blank" class="default-link col-12">Privacy Policy</a>
              <a href="https://icecast.nekoha.moe" target="_blank" class="default-link col-12">Icecast2 Dashboard</a>
            </div>
            <span>Compiled on: {dayjs(__BUILD_DATE__).format('DD.MM.YYYY HH:mm:ss')}</span>
          </div>
        </div>
      </div>

      {/* FPS Counter Component */}
      <FpsCounter />
    </>
  );
}

export default Index;
