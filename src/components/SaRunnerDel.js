import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { runnerDel } from '../service/runners-service';
import DeletePage from '../CSS-styles/DeletePage.module.css'

function SaRunnerDel() {
  let param = useParams()
  console.log(param)

  let navigate = useNavigate();
  return (
    <div className={DeletePage.MainDelete}>
      <div className={DeletePage.DeleteContainer}>
        <div className={DeletePage.DeleteBox}>
          <div className={DeletePage.DeleteImg}></div>
          <h1>Törlés</h1>
          <p className={DeletePage.Paragraph} >Biztosan törölni akarod a ' {param.runnerId} ' felhasználónevű futárt?</p>
        </div>
        <div className={DeletePage.DeleteButtons}>
          <button onClick={() => {
            runnerDel(param.runnerId)
              .then(() => navigate("/SaFutarListazas"))
          }}>Törlés</button>
          <button className='backButton' onClick={() => {
            navigate("/SaFutarListazas");
          }}>Vissza</button>
        </div>
      </div>
    </div>
  )
}

export default SaRunnerDel