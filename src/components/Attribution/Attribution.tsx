import styles from './Attribution.module.css'

/**
 * Renders a styled attribution link for IMechE Formula Student as we use a few of their images
 * @param link - The URL to link to.
 */
function Attribution ({link} : {link: string}) {
    return (
        <span className = {styles.attributionContainer}>
            <a href={link}>IMechE Formula Student</a>
        </span>
    )
}

export default Attribution