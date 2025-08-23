import styles from './image.module.css'
import closeIcn from '../../assets/images/icons/whiteX.svg'
import { motion } from 'motion/react'
import { useEffect } from 'react'

/**
 * Modal for displaying an expanded gallery image
 * @param src - Route to the image
 * @param alt - Alt value for the image
 * @param id - Image name without size and file type i.e. camp1200.webp = camp
 * @param onClose - Function ran to close image expansion state (sets expanded index to null)
 * @returns JSX for an expanded image, shown when an image is clicked in the gallery 
 */
function ExpandedImg ({src, alt, id, onClose} : {src: string, alt: string, id: string, onClose: () => void}) {

    // Prevents background from scrolling when there's an expanded image open
    useEffect(() => {
        // If expanded disable scroll
        if (src) {
            document.body.style.overflow = 'hidden'
        // Re-enable scroll
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [src])

    return (
        <div onClick={onClose} className={styles.backdrop}>
            <motion.div 
                className={styles.expandedImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <button 
                    onClick={onClose} 
                    className={styles.closeButton}>
                    <img aria-label='Close expanded image' src={closeIcn} alt='X'/>
                </button>
                <motion.img 
                    src={src} 
                    alt={alt}
                    layoutId={id}
                    onClick={(e) => e.stopPropagation()}
                />
            </motion.div>
        </div>
    )
}

export default ExpandedImg;