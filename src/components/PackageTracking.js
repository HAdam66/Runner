import React from 'react';
import { useNavigate } from "react-router-dom";
import PackageTrackingStyles from "../CSS-styles/PackageTracking.module.css";
import FormStyles from '../CSS-styles/FormStyles.module.css'


function PackageTracking() {
  const [searchValue, setSearchValue] = React.useState(null);
  let navigate = useNavigate();

  return (
    <>

      <div className={PackageTrackingStyles.Container}>
        <h1>Csomag nyomonkövetés</h1>
        {/* <div className={`${PackageTrackingStyles.TwoBoxes}`}> */}
        <div className={PackageTrackingStyles.InputBox}>

          <input type="search"
            placeholder="csomagID"
            onChange={e => {
              setSearchValue(e.target.value);
            }}
          >
          </input>
          <button onClick={() => {
            navigate(`/CsomagKovetes/${searchValue}`);
          }}>keresés</button>

        </div>
        <div className={/* ${FormStyles.ImageInfo} */` ${FormStyles.SaRunnerEditBackground} ${PackageTrackingStyles.LeftBackground}`}>
          <h1 className={PackageTracking.H1}>RnnR</h1>
        </div>
      </div>
      {/* </div> */}


    </>
  )
}

export default PackageTracking;