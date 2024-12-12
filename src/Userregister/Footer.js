import React from "react";
import footerlogo from '../assets/image/footerlogo.png';

function Footer() {

    return (
        <div >
            <footer className="footer-sec">
                <div className="footer-content container">
                    <div className="footer-img">
                        <img src={footerlogo} alt="footer-img" />
                    </div>
                    <div className="footer-link">
                        <h4>Page Link</h4>
                        <ul className="link-list">
                            <li className="list-item">Home</li>
                            <li className="list-item">About</li>
                            <li className="list-item">Privacy Policy</li>
                            <li className="list-item">Contact</li>
                        </ul>
                    </div>
                    <div className="footer-address">
                        <h4>Address</h4>
                        <div className="about-address">
                            <spam className="Address">Address: Vill-Bisat Distt- Bijnor(UP)</spam>
                            <spam className="Address">Email: lambha0008@gmail.com</spam>
                            <spam className="Address">Phone: 9827441332</spam>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    )
}
export default Footer;