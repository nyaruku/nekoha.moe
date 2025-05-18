import { Helmet } from 'react-helmet';
import shadify from './javascript/shadify.js';
import FpsCounter from './components/fps.jsx';  // Import the FPS counter component
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function LogStats() {
  useEffect(() => {
    const cookies = Object.fromEntries(
      document.cookie
        .split('; ')
        .map((c) => c.split('=').map(decodeURIComponent))
    );

    const shader = cookies.shader || '/shader/void.h';
    const speed = cookies.shaderSpeed || '0.1';
    const quality = cookies.shaderQuality || '1.0';

    const body = document.body;
    body.setAttribute('data-shader', shader);
    body.setAttribute('data-shader-speed', speed);
    body.setAttribute('data-shader-quality', quality);
    body.classList.add('bg-black');
    body.style.overflowY = 'scroll';

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
  
  return (
    <>
      <Helmet>
        <title>Log Stats</title>
      </Helmet>
      <div className="container py-4 px-3 mx-auto">
        <div className="row">
            <div col>
                <p className="form-label">Select Channel</p>
                <div class="d-flex">
                    <select className="form-select w-auto me-2" name="channel">
                        <option value="osu">#osu</option>
                        <option value="german">#german</option>
                        <option value="announce">#announce</option>
                        <option value="arabic">#arabic</option>
                        <option value="balkan">#balkan</option>
                        <option value="bulgarian">#bulgarian</option>
                        <option value="cantonese">#cantonese</option>
                        <option value="chinese">#chinese</option>
                        <option value="ctb">#ctb</option>
                        <option value="czechoslovak">#czechoslovak</option>
                        <option value="dutch">#dutch</option>
                        <option value="english">#english</option>
                        <option value="estonian">#estonian</option>
                        <option value="filipino">#filipino</option>
                        <option value="finnish">#finnish</option>
                        <option value="french">#french</option>
                        <option value="greek">#greek</option>
                        <option value="hebrew">#hebrew</option>
                        <option value="help">#help</option>
                        <option value="hungarian">#hungarian</option>
                        <option value="indonesian">#indonesian</option>
                        <option value="italian">#italian</option>
                        <option value="japanese">#japanese</option>
                        <option value="korean">#korean</option>
                        <option value="latvian">#latvian</option>
                        <option value="lazer">#lazer</option>
                        <option value="lobby">#lobby</option>
                        <option value="malaysian">#malaysian</option>
                        <option value="mapping">#mapping</option>
                        <option value="modreqs">#modreqs</option>
                        <option value="osumania">#osumania</option>
                        <option value="polish">#polish</option>
                        <option value="portuguese">#portuguese</option>
                        <option value="romanian">#romanian</option>
                        <option value="russian">#russian</option>
                        <option value="skandinavian">#skandinavian</option>
                        <option value="spanish">#spanish</option>
                        <option value="taiko">#taiko</option>
                        <option value="taiwanese">#taiwanese</option>
                        <option value="thai">#thai</option>
                        <option value="turkish">#turkish</option>
                        <option value="ukrainian">#ukrainian</option>
                        <option value="uzbek">#uzbek</option>
                        <option value="videogames">#videogames</option>
                        <option value="vietnamese">#vietnamese</option>
                    </select>
                    <button target="_blank" class="btn btn-dark rounded-0">Filter</button>
                </div>
            </div>
        </div>
      </div>

      {/* FPS Counter Component */}
      <FpsCounter />
    </>
  );
}

export default LogStats;
