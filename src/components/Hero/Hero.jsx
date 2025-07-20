import carImg from '../../assets/carimg.jpg'
import styles from './Hero.module.css'

function Hero () {
    return (
        <>
            <div className={styles.imgContainer}>
                <img 
                className={styles.heroImg} 
                src={carImg} 
                alt="An image of an autonmous race car" 
                />
            </div>
        </>
    )
}

export default Hero;