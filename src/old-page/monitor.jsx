import { useState } from 'react'
import { Helmet } from "react-helmet";
import React, { useEffect } from 'react';

export default function ServerMonitor() {

  useEffect(() => {
    import('./scss/monitor.scss'); // manual theme import exclusive to page
  }, []);

  return (
    <>
      <Helmet>
        <title>Server Monitor</title>
      </Helmet>

      <iframe src="https://grafana.nekoha.moe/public-dashboards/3f75dde11fcd4bad933dc648796284b5"></iframe>

    </>
  )
}