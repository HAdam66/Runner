import React from 'react'
import ReviewStyle from '../../CSS-styles/ReviewStyles.module.css'


function LeftArrow(props) {
  return (
    <>
    {props.activeCard == 1?  <div
    onClick={()  => {
      console.log("leftarrow")
    }}
    className={`${ReviewStyle.LeftArrow} ${ReviewStyle.DisabledLeft} ${ReviewStyle.Hidden}`}></div> 
    :
    <div
    onClick={()  => {
      console.log("lefttarrow")
      if(props.activeCard > 1) {
        props.setActiveCard(props.activeCard - 1)
      }
    }}
    className={ReviewStyle.LeftArrow}></div> }
    
    </>
    
  )
}

export default LeftArrow