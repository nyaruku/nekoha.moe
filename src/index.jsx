import { useState } from 'react'
import { Helmet } from "react-helmet";

function Index() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      {/* Added HTML Content */}
      <div className="container py-4 px-3 mx-auto">
        <p>Nothing here yet....</p>
      </div>
    </>
  )
}

export default Index
