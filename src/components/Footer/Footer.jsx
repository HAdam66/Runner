import React from 'react';
import FooterStyles from "./Footer.module.css";
import { Link } from 'react-router-dom';
import { AiOutlineFacebook, AiOutlineInstagram } from 'react-icons/ai';

const Footer = ({ children }) => {
    return (
        <footer className={FooterStyles.footer}>
            {/* <div className={FooterStyles.FooterWrapper}> */}
                <div className={FooterStyles.Social}>
                    <AiOutlineFacebook />
                    <AiOutlineInstagram />
                </div>
                <div className={FooterStyles.Links}>
                    <Link to="#"> Adatvédelmi tájékoztató</Link>
                    <Link to="#"> Kapcsolat</Link>
                    <Link to="#">Impresszum</Link>
                </div>
                <div className={FooterStyles.Logo}>
                    <Link to="#">RnnR</Link>
                </div>

            {/* </div> */}
            {children}
        </footer>
    )
}

export default Footer;