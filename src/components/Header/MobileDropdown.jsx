import styles from './MobileHeader.module.css'
import closeButton from '../../assets/images/icons/x.svg'
import { Link } from 'react-router-dom'

function MobileDropdown ({ setIsActive, isExiting }) {
    const dropdownClass = isExiting 
        ? `${styles.mobileDropdown} ${styles.mobileDropdownExit}`
        : styles.mobileDropdown

    const handleLinkClick = () => {
        setIsActive()
    }

    return ( 
    <section className={dropdownClass}>
        <img src={closeButton} alt="X" onClick={() => setIsActive()} />
        <nav>
        <Link onClick={handleLinkClick} to = '/'>Home</Link>
        <Link onClick={handleLinkClick} to = '/teamhistory'>Team History</Link>
        <Link onClick={handleLinkClick} to = '/gallery'>Gallery</Link>
        <Link onClick={handleLinkClick} to = '/sponsorship'>Sponsorship</Link>
        <Link onClick={handleLinkClick} to = '/contact'>Contact</Link>
        </nav>
    </section>
    )
}

export default MobileDropdown