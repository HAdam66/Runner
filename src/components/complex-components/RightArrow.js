import React from 'react'
import ReviewStyle from '../../CSS-styles/ReviewStyles.module.css'

function RightArrow(props) {
  
  return (
    <>
    {props.activeCard == 3?  <div 
    onClick={()  => {
      console.log("rightarrow")
    }}
    className={`${ReviewStyle.RightArrow} ${ReviewStyle.DisabledRight} ${ReviewStyle.Hidden}`}></div>
    :
    <div
    onClick={()  => {
      console.log("rightarrow")
      if(props.activeCard < 3) {
        props.setActiveCard(props.activeCard + 1)
      }
    }}
    className={ReviewStyle.RightArrow}></div>
  }
  </>
  )
}

export default RightArrow