import Attribution from '../Attribution/Attribution'
import styles from './image.module.css'
import {motion} from 'motion/react'

export function Image (
    {handleImageClick, id, src, alt, link} : 
    {handleImageClick : (id : string) => void, id: string, src: string, alt: string, link?: string}) {
    
    return (
        <>
        <div className={styles.imgContainer}>
            <motion.img 
                onClick={() => handleImageClick(id)} 
                src={src} 
                alt={alt}
                layoutId = {id}
            />
            {/* Attribution required images have a link vaue in json */}
            {link && (<Attribution link={link}/>)}
        </div>
        </>
    )
}