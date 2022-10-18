import React from 'react'
import ReviewStyle from '../../CSS-styles/ReviewStyles.module.css'

function CardAuthor(props) {
  return (
    <div className={ReviewStyle.UserandUserType}>
        <h3 className={ReviewStyle.User}>{props.author}</h3>
        <span className={ReviewStyle.UserType}>{props.user}</span>
    </div>
  )
}

export default CardAuthor