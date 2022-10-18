import React from 'react'
import { AuthContext } from './components/AuthContext'
import HomeStyles from './CSS-styles/HomeStyles.module.css'
import { Link, useNavigate } from "react-router-dom";
import Card from './components/complex-components/Card';
import Cards from './components/complex-components/Cards';


function Home() {
  const loginContext = React.useContext(AuthContext);
  const [activeCard, setActiveCard] = React.useState(1)
  const navigate = useNavigate();

  return (
    <div className={HomeStyles.Container}>
      <div className={HomeStyles.HeroImg}>

          <p className={HomeStyles.MainSlogen}>
            {/* <span className={HomeStyles.RnnR}>RnnR </span><br></br> */}
            A közösségi csomagküldő alkalmazás</p>
          <p className={HomeStyles.SecondSlogen}>ahol bárki lehet futár vagy feladó</p>
        <button className={HomeStyles.StartButton} onClick={() => {
          navigate("/Regisztracio")
        }}>Regisztráció</button>
      </div>
      <div className={HomeStyles.Content}>
      <h2>Rólunk </h2>

      <div>
        <div className={HomeStyles.ParagraphDivs}>
          <p>Magyarországon elsőként indítottuk el a csomagküldési szolgáltatásunkat
            ahol bárki lehet futár, akár tömegközlekedés használatával is.
            Csomagküldés magánszemélyként vagy cégként egyszerűen, hatékonyan, gyorsan, akár pár
            perces kiszállítási idővel városon belül.
          </p>
        </div>
        <div className={HomeStyles.BackgroundImg}></div>
        <div className={HomeStyles.ParagraphDivs}>
          <p>
            Rugalmas de biztonságos csomagátvétel akár QR-kódos alapon.
            Költséghatékony szolgáltatás teljes országos lefedettséggel.
            Kövesd nyomon a csomagjaid akár regisztráció nélkül is.
            Kiváló lehetőség számodra hogy extra jövedelemre tegyél szert, de ha szeretsz biciklizni/vezetni
            akkor itt akár a teljes állású álommunkádat is megtalálhatod
          </p>
          <div className={HomeStyles.ButtonDiv}>
          <button className={HomeStyles.Start2Button} onClick={() => {
            navigate("/Regisztracio")
          }}>Vágj bele</button>
          </div>
          <Link to="/Bejelentkezes">Bejelentkezés</Link>
        </div>
      </div>
      
      <h2>Hasznos infók</h2>
      <div className={HomeStyles.ParagraphDivs}>
        <ul>
          <li><p>Lehetsz futár és csomagküldő is.</p></li>
          <li><p>Megbízóként Költséghatékony megoldást nyujtunk csomagjaid célbajuttatására</p></li>
          <li><p>Megbízásokkal támogatod futárainkat akik mindent megtesznek hogy megfelelő időben és minőségben kiszállítsák a feladott csomagokat.</p></li>
          <li><p>Folyamatos ügyfélszolgálattal rendelkezünk, amennyiben bármilyen probléma felmerülne, azonnal itt leszünk hogy segítsünk.</p></li>

        </ul>

      </div>

      <h2>Felhasználói vélemények</h2>
      
      <Cards
        activeCard={activeCard}
        setActiveCard={setActiveCard}
        className={HomeStyles.SliderContainer}
      />
      {/* <h2>Kapcsolat</h2>
      
        <div className={HomeStyles.BackgroundImg2}>
          <p>E-mail: support@rnnr.hu</p>
          <p>Telefon:  +3611111111</p>
          <p>Székház: Budapest, random cím 1</p>
        </div>
       */}
    </div>
    </div>

  )
}

export default Home