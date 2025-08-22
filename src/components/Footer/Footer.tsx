import styles from './Footer.module.css';
import logo from '../../assets/images/logos/logo_glow.png'
import uniLogo from '../../assets/images/logos/cardiffUniWhite.jpg'
import linkedin from '../../assets/images/icons/linkedin.svg'
import instagram from '../../assets/images/icons/instagram.svg'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import handleSameClick from '../../utils/handleSameClick';
import React from 'react';

function Footer () {
    const navigate = useNavigate();
    const location = useLocation();

    const handleJoinClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (location.pathname === "/") {
            // Already on homepage
            const el = document.getElementById("join");
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
            // Navigate home, then scroll after render
            navigate("/", { replace: false });
            setTimeout(() => {
                const el = document.getElementById("join");
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100); // Delay to allow page to render
        }
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                
                <div className={styles.brandSection}>
                    <span className={styles.copyright}>© 2025 Cardiff Autonomous Racing</span>
                    <span className={styles.tagline}>Student led innovation in autonomous systems</span>
                </div>
                
                <nav className={styles.navigation}>
                    <h4>Quick Links</h4>
                    <div className = {styles.links}>
                    <Link to="/" className={styles.navLink} onClick={(e) => handleSameClick(e, location, '/')}>Home</Link>
                    <button onClick={handleJoinClick} className={styles.navLink} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                        Join the team
                    </button>
                    <Link to="contact" className={styles.navLink} onClick={(e) => handleSameClick(e, location, '/contact')}>Contact</Link>
                    <Link to="sponsorship" className={styles.navLink} onClick={(e) => handleSameClick(e, location, '/sponsorship')}>Sponsorships</Link>
                    </div>

                <div className={styles.socialSection}>
                    <a href="https://uk.linkedin.com/company/cardiff-uni-autonomous-racing" target="_blank" rel="noopener noreferrer">
                        <img src={linkedin} alt="LinkedIn" className={styles.socialIcon} />
                    </a>
                    <a href="https://www.instagram.com/cardiff_autonomous_racing/" target="_blank" rel="noopener noreferrer">
                        <img src={instagram} alt="Instagram" className={styles.socialIcon} />
                    </a>
                </div>
                </nav>
                
                <div className={styles.logoSection}>
                    <img src={uniLogo} alt="Cardiff University" className={styles.uniLogo} />
                    <img src={logo} alt="Cardiff Autonomous Racing logo" className={styles.teamLogo} />
                </div>
            
            </div>
        </footer>
    )
}

export default Footer