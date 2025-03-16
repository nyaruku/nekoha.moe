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
        <img src={nekohaImage} class="mx-auto d-block img-fluid" style={{ maxWidth: "50%" }} alt="nekoha" />
      </div>
    </>
  )
}

export default Index
