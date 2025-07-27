import styles from './MobileHeader.module.css'
import MobileDropdown from './MobileDropdown';
import { useState } from 'react';
import { useEffect } from 'react';

function MobileHeader() {
    const [isActive, setIsActive] = useState(false)
    const [isExiting, setIsExiting] = useState(false)

    // Stop scroll when modal active

    useEffect (() => {
        if (isActive) {
            document.body.style.overflow = 'hidden'
            document.documentElement.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
        }
    }, [isActive])

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