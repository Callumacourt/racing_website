import styles from './image.module.css'
import closeIcn from '../../assets/images/icons/whiteX.svg'
import { motion } from 'motion/react'
import { useEffect } from 'react'

function ExpandedImg ({src, alt, id, onClose}) {

    useEffect(() => {
        if (src) {
            document.body.style.overflow = 'hidden'
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
                transition={{ duration: 0.2, exit: { duration: 0.15 } }}
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