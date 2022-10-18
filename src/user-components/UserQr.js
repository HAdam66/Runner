import React from 'react';
import { logout } from '../service/auth-service';
import { useSearchParams } from 'react-router-dom';
import { packageShipped } from '../service/package-service';
import FixStyle from "../CSS-styles/FixStyles.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserQr() {

    const [searchParams, setSearchParams] = useSearchParams()
    let runnerFromUrl = searchParams.get('futar')
    let senderUserFromUrl = searchParams.get('felado')
    let packageIdFromUrl = searchParams.get('csomagid')

    React.useEffect(() => {
      logout()
    }, [])


  return (
    <div className={FixStyle.QrContainer}>
        <h1 className={FixStyle.QrH1}>Csomagátvétel QR kóddal</h1>
        <button className={FixStyle.QrButton}
            onClick={() => {
              toast.info("Sikeres csomagleadás!")
            let packageObj = {
              id: packageIdFromUrl,
              user: senderUserFromUrl
            }
            console.log(packageObj)
             packageShipped(packageObj, runnerFromUrl) 
        }}>Átvétel</button>
        <ToastContainer
                    position="bottom-center"
                    autoClose={3500}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />

    </div>
  )
}

export default UserQr