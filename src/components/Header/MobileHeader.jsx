import styles from './Header.module.css'

function MobileHeader() {
    return (
        <header className={styles.mobileHeader}>
            <nav className={styles.mobileNav}>
                <button>☰</button>
                <img src="" alt="Logo" />
            </nav>
        </header>
    )
}

export default MobileHeader;