import styles from './MobileHeader.module.css'
import MobileDropdown from './MobileDropdown';
import { useState } from 'react';

function MobileHeader() {
    const [isActive, setIsActive] = useState(false)
    const [isExiting, setIsExiting] = useState(false)

    const handleToggle = () => {
        if (isActive) {
            // Start exit animation
            setIsExiting(true)
            setTimeout(() => {
                setIsActive(false)
                setIsExiting(false)
            }, 300) // Match animation duration
        } else {
            setIsActive(true)
        }
    }

    const handleClose = () => {
        setIsExiting(true)
        setTimeout(() => {
            setIsActive(false)
            setIsExiting(false)
        }, 300)
    }

    return (
        <>
            <header className={styles.mobileHeader}>
                <nav className={styles.mobileNav}>
                    <button onClick={handleToggle}>☰</button>
                </nav>
            </header>
            {isActive && <MobileDropdown setIsActive={handleClose} isExiting={isExiting} />}
        </>
    )
}

export default MobileHeader;