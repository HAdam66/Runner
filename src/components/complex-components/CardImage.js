import React from 'react'
import ReviewStyle from '../../CSS-styles/ReviewStyles.module.css'

function CardImage(props) {
  return (
    <img className={ReviewStyle.Image}
    src={props.imgsource}></img>
  )
}

export default CardImage