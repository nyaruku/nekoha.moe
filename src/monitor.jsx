import React from "react";
import Iframe from "react-iframe";
import { Helmet } from "react-helmet";

function ServerMonitor() {
  return (
    <>
      <Helmet>
        <title>Monitor</title>
      </Helmet>

        <div style={{ width: "100%", height: "90vh" }}>
            <Iframe
                url="http://nekoha.moe/d/aefd00z6bn8xse/new-dashboard?orgId=1&from=2025-03-09T16:52:08.412Z&to=2025-03-09T22:52:08.412Z&timezone=browser&viewPanel=panel-1"
                width="100%"
                height="100%"
                frameBorder="0"
            />
        </div>
    </>
  )
}

export default ServerMonitor