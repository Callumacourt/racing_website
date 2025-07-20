import { useState, useEffect } from 'react';
import styles from './Header.module.css'
import MobileHeader from './MobileHeader';

function Header () {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
                <img src="" alt="" />
                <span className={styles.links}>
                    <p>Home</p>
                    <p>Team History</p>
                    <p>Sponsorship</p>
                    <p>Contact</p>
                </span>
                <span className={styles.logos}>
                    <img src="" alt="" />
                    <img src="" alt="" />
                </span>
            </nav>
        </header>
    ) 
}

export default Header;