import { useState, useEffect } from 'react';
import styles from './Header.module.css'
import TeamLogo from '../../assets/images/logos/logo_glow.png'
import MobileHeader from './MobileHeader';
import InstaLogo from '../../assets/images/icons/instagramWhite.svg'
import LinkedinLogo from '../../assets/images/icons/linkedinWhite.svg'
import { Link } from 'react-router-dom';
import handleSameClick from '../../utils/handleSameClick';
import { useLocation } from 'react-router-dom';

function Header () {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isMobile) {
        return <MobileHeader />;
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <img className = {styles.teamLogo} src={TeamLogo} alt="Cardiff University Team Logo" />
                <div className={styles.links}>
                    <Link to='/' onClick={(e) => handleSameClick(e, location, '/')}>Home</Link>
                    <Link to='/teamhistory' onClick={(e) => handleSameClick(e, location, '/teamhistory')}>Team History</Link>
                    <Link to='/gallery' onClick={(e) => handleSameClick(e, location, '/gallery')}>Gallery</Link>
                    <Link to='/sponsorship' onClick={(e) => handleSameClick(e, location, '/sponsorship')} >Sponsorship</Link>
                    <Link to='/contact' onClick={(e) => handleSameClick(e, location, '/contact')}>Contact</Link>
                </div>
                <div className={styles.logos}>
                    <a href="https://www.instagram.com/cardiff_autonomous_racing/" target="_blank" rel="noopener noreferrer">
                        <img src={InstaLogo} alt="Instagram logo" />
                    </a>
                    <a href="https://uk.linkedin.com/company/cardiff-uni-autonomous-racing" target="_blank" rel="noopener noreferrer">
                        <img src={LinkedinLogo} alt="LinkedIn logo" />
                    </a>
                </div>
            </nav>
        </header>
    ) 
}

export default Header;