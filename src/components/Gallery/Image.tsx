import Attribution from '../Attribution/Attribution'
import styles from './image.module.css'
import { motion } from 'motion/react'
import { useState } from 'react'

/**
 * 
 * @param handleImageClick - Function used for image expansion on click
 * @param id - Name of image file without size or file type
 * @param sizes - Object of image size name and the image for that size used for responsiveness
 * @param alt -  Alt value of the image
 * @param link - Link to the attribution source of an image - if needed
 * @returns JSX for an image used in the gallery
 */
export function Image (
    {handleImageClick, id, sizes, alt, link} : 
    {handleImageClick : (id : string) => void, id: string, sizes: Record<string, string>, alt: string, link?: string}) {

    const [loading, setLoading] = useState(true);

    return (
        <div className={styles.imgContainer}>
            <picture>
                {sizes['1200'] && (
                    <source srcSet={sizes['1200']} media="(min-width: 1200px)" />
                )}
                {sizes['800'] && (
                    <source srcSet={sizes['800']} media="(min-width: 800px)" />
                )}
                {sizes['400'] && (
                    <source srcSet={sizes['400']} media="(min-width: 400px)" />
                )}
                <motion.img 
                    onClick={() => handleImageClick(id)} 
                    src={sizes['original'] || sizes['1200'] || sizes['800'] || sizes['400']} 
                    alt={alt}
                    layoutId={id}
                    loading="lazy"
                    onLoad={() => setLoading(false)}
                    className={styles.galleryImg}
                />
            </picture>
            {loading && (
                <div className={styles.loadingOverlay}>
                    <div className={styles.spinner}></div>
                </div>
            )}
            {link && (<Attribution link={link}/>)}
        </div>
    )
}