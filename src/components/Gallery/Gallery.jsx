import styles from './Gallery.module.css'
import { Image } from './Image'
import ExpandedImg from './ExpandedImg';
import loadImages from './loadImages'
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import 'masonry-css'

/* Please add a new alt text in manifest.json file when adding a new image*/

const images = loadImages;

function Gallery () {
    const [expandedIndex, setExpandedIndex] = useState('')

    const handleImageClick = (index) => {
        setExpandedIndex(index)
    }

    const onClose = () => {
        setExpandedIndex('')
    }

    const expandedImgData = expandedIndex
    ? images.find(img => img.id === expandedIndex)
    : null

    return (
        <>
        <main className={styles.galleryWrapper}>
            <section className={styles.bentoGrid}>
                {images.map((image) => (
                    <Image 
                        handleImageClick={handleImageClick}
                        id={image.id} 
                        key={image.id} 
                        src={image.img} 
                        alt={image.alt}
                    />
                ))}
            </section>
            
            <AnimatePresence>
                {expandedImgData && (
                    <ExpandedImg 
                        src={expandedImgData.img}
                        key={expandedImgData.id}
                        alt={expandedImgData.alt}
                        id={expandedImgData.id}
                        onClose = {onClose}
                    />
                )}
            </AnimatePresence>
        </main>
        </>
    )
}

export default Gallery