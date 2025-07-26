import styles from './Footer.module.css';
import logo from '../../assets/images/logos/logo_glow.png'
import uniLogo from '../../assets/images/logos/cardiffUniWhite.jpg'
import linkedin from '../../assets/images/icons/linkedin.svg'
import instagram from '../../assets/images/icons/instagram.svg'
import { Link } from 'react-router-dom';

function Footer () {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <section className={styles.brandSection}>
                    <div className={styles.brandText}>
                        <span className={styles.copyright}>© 2025 Cardiff Autonomous Racing</span>
                        <br />
                        <span className={styles.tagline}>Student led innovation in autonomous systems</span>
                    </div>
                </section>
                
                <section className={styles.footerMiddle}>
                    <nav className={styles.footerNav}>
                        <p>Quick Links</p>
                        <Link to="/" className={styles.navLink}>Home</Link>
                        <Link to="/about" className={styles.navLink}>Join the team</Link>
                        <Link to="/contact" className={styles.navLink}>Contact</Link>
                        <Link to="/sponsorship" className={styles.navLink}>Sponsorships</Link>
                    </nav>
                    
                    <div className={styles.rightSection}>
                        <div className={styles.logoRow}>
                            <img src={uniLogo} alt="Cardiff University" className={styles.uniLogo} />
                            <img src={logo} alt="Cardiff Autonomous Racing logo" className={styles.teamLogo} />
                        </div>
                        
                        <div className={styles.socialSection}>
                            <a href="https://uk.linkedin.com/company/cardiff-uni-autonomous-racing" target="_blank" rel="noopener noreferrer">
                                <img src={linkedin} alt="LinkedIn" className={styles.socialIcon} />
                            </a>
                            <a href="https://www.instagram.com/cardiff_autonomous_racing/" target="_blank" rel="noopener noreferrer">
                                <img src={instagram} alt="Instagram" className={styles.socialIcon} />
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </footer>
    )
}

export default Footer