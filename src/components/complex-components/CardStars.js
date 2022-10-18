import React from 'react'
import ReviewStyle from '../../CSS-styles/ReviewStyles.module.css'

function CardStars() {
    return (
        <div>
            <div class={ReviewStyle.Star}></div>
            <div class={ReviewStyle.Star}></div>
            <div class={ReviewStyle.Star}></div>
            <div class={ReviewStyle.Star}></div>
            <div class={ReviewStyle.Star}></div>
        </div>
    )
}

export default CardStars