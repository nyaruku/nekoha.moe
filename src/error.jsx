import { Helmet } from "react-helmet";
import windowsXp from './videos/windowsxp.mp4';
export default function Error() {
  return (
    <>
      <Helmet>
        <title>Error</title>
      </Helmet>
      <div class="container d-flex justify-content-center">
        <div class="card card-error mt-5">
          <div class="card-body">
            <video controls width="100%">
              <source src={windowsXp} type="video/mp4" />
            </video>
          </div>
        </div>
        {/*  
        <div class="card card-error mt-5">
          <div class="card-body">
            <h5 class="card-title">OOPSIE WOOPSIE!!</h5>
            <p class="card-text">Uwu We make a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!</p>
          </div>
        </div>
        */}

      </div>
    </>
  )
}


