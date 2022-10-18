import React from "react";
import FeedbackStyle from "./CSS-styles/FeedbackStyles.module.css"

export default function Feedback(props) {
    React.useEffect(()=> {
        setTimeout(()=> {
            if (props.feedback !== undefined /* && 
                (props.feedbackEdit === undefined && props.feedbackShipped === undefined) */) {
                props.setFeedback(undefined)
            } else if( props.feedbackEdit !== undefined || props.feedbackShipped !== undefined) {
            props.setFeedbackEdit(undefined) 
            props.setFeedbackShipped(undefined)
        } 
            console.log("Feedback Komponens useEffect")
        },3000)
    }, [props.feedbackEdit, props.feedbackShipped])

    return (
        <div className={FeedbackStyle.Box}>
            {props.message ?
                <div className={FeedbackStyle.MessageTrue}>
                    <p>{props.text}</p>
                </div>
                :
                <div className={FeedbackStyle.MessageFalse}>
                    <p>{props.text}</p>
                </div>
            }
        </div>
    );
}