import styles from './Attribution.module.css'

function Attribution ({link} : {link: string}) {
    return (
        <span className = {styles.attributionContainer}>
            {/* All other images are sourced from pexels or ourselves so don't require attribution */}
            <a href={link}>IMechE Formula Student</a>
        </span>
    )
}

export default Attribution