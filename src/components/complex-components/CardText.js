import React from 'react'
import ReviewStyle from '../../CSS-styles/ReviewStyles.module.css'

function CardText(props) {
  return (
    <p className={ReviewStyle.Text}>{props.text}</p>
  )
}

export default CardText