import React from 'react'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { packageDel } from '../service/package-service.js';
import DeletePage from '../CSS-styles/DeletePage.module.css'

function SaPackageDel() {
  const location = useLocation()
  const currentPackage = location.state.from
  console.log(currentPackage)
  // const { from } = location.state
  let param = useParams();
  let navigate = useNavigate();
  console.log(param)

  return (
    <div className={DeletePage.MainDelete}>
      <div className={DeletePage.DeleteContainer}>
        <div className={DeletePage.DeleteBox}>
          <div className={DeletePage.DeleteImg}></div>
          <h1>Törlés</h1>
          <p className={DeletePage.Paragraph}>Biztosan törölni akarod a(z) ' {param.packageId} ' ID-val rendelkező csomagot?</p>
          <div className={DeletePage.DeleteButtons}>
            <button onClick={() => {
              packageDel(currentPackage)
                .then(() => navigate("/SaCsomagListazas"))
            }}>Törlés</button>
            <button className='backButton' onClick={() => navigate("/SaCsomagListazas")}>Vissza</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SaPackageDel