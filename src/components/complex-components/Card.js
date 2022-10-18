import React from 'react'
import ReviewStyle from '../../CSS-styles/ReviewStyles.module.css'
import CardAuthor from './CardAuthor'
import CardImage from './CardImage'
import CardStars from './CardStars'
import CardText from './CardText'
function Card(props) {
  return (

    <div className={`${ReviewStyle.Card}`  /*${ReviewStyle.RightToLeft}  ${ReviewStyle.LeftToRight} */}>
        <CardImage imgsource={props.imgsource}/>
        <CardAuthor author={props.author} user={props.user} />
        <CardStars />
        <CardText text={props.text} />
    </div>
  )
}

export default Card