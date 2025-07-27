import styles from './image.module.css'
import {motion} from 'motion/react'

export function Image ({handleImageClick, id, src, alt}) {
    
    return (
        <>
        <div className={styles.imgContainer}>
            <motion.img 
                onClick={() => handleImageClick(id)} 
                src={src} 
                alt={alt}
                layoutId = {id}
            />
        </div>
        </>
    )
}