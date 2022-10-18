import React from 'react'
import ReviewStyle from '../../CSS-styles/ReviewStyles.module.css'
import Card from './Card'
import LeftArrow from './LeftArrow'
import RightArrow from './RightArrow'
import deliverypic1 from '../../CSS-styles/biker-delivery-2.jpg'
import deliverypic2 from '../../CSS-styles/businesswoman.jpg'
import deliverypic3 from '../../CSS-styles/businessman.jpg'


function Cards(props) {

  return (
    <div className={ReviewStyle.Container}>
       <LeftArrow 
       activeCard={props.activeCard}
       setActiveCard={props.setActiveCard}
       />
       {props.activeCard == 1 && 
       <Card
        text={"A legjobb futár app amivel valaha dolgoztam!"}
        author={"Gábor"}
        user={"Futár"}
        imgsource={deliverypic1}
        />}
        {props.activeCard == 2 && 
        <Card 
        text={"A RnnR-nek köszönhetően könnyedén és gyorsan eljutnak a termékeim az ügyfelekhez."}
        author={"Anikó"}
        user={"Feladó"}
        imgsource={deliverypic2}
        />}
         {props.activeCard == 3 && 
         <Card className={ReviewStyle.Card3}
        text={"Jobb app mint a DinR az EUban!!!"}
        author={"Levi"}
        user={"Feladó"}
        imgsource={deliverypic3}
        />}
        <RightArrow
        activeCard={props.activeCard}
        setActiveCard={props.setActiveCard} />  
    </div>
  )
}

export default Cards