import styles from './MobileHeader.module.css'
import closeButton from '../../assets/x.svg'

function MobileDropdown ({ setIsActive, isExiting }) {
    const dropdownClass = isExiting 
        ? `${styles.mobileDropdown} ${styles.mobileDropdownExit}`
        : styles.mobileDropdown

    return ( 
    <section className={dropdownClass}>
        <img src={closeButton} alt="X" onClick={() => setIsActive()} />
        <nav>
        <p>Team History</p>
        <p>Gallery</p>
        <p>Sponsorship</p>
        <p>Contact</p>
        </nav>
    </section>
    )
}

export default MobileDropdown