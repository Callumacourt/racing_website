import styles from './Gallery.module.css';
import { Image } from './Image';
import ExpandedImg from './ExpandedImg';
import loadImages from './loadImages';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import 'masonry-css';


/**
 * Displays a grid of images with responsive sources and opens an expanded modal on click.
 * Uses framer-motion for animation and disables background scroll when modal is open.
 */

/**
 * ImageData represents a gallery image with all available sizes and metadata.
 */
interface ImageData {
  id: string;
  sizes: Record<string, string>;
  alt: string;
  link?: string;
}

const images: ImageData[] = loadImages;

function Gallery() {
  // Index (id) of currently expanded index
  const [expandedIndex, setExpandedIndex] = useState<string | null>(null);

  // Opens expanded modal for the clicked image
  const handleImageClick = (index: string) => {
    setExpandedIndex(index);
  };

  // Closes expanded model
  const onClose = () => {
    setExpandedIndex(null);
  };

  // Get the data for the expanded image if there is any
  const expandedImgData = expandedIndex
    ? images.find((img) => img.id === expandedIndex) || null
    : null;

  return (
    <main className={styles.galleryWrapper}>
      <section className={styles.bentoGrid}>
        {images.map((image: ImageData) => (
          <Image
            handleImageClick={handleImageClick}
            id={image.id}
            key={image.id}
            sizes={image.sizes}
            alt={image.alt}
            link={image.link}
          />
        ))}
      </section>

      <AnimatePresence>
        {expandedImgData && (
          <ExpandedImg
            src={
              expandedImgData.sizes['1200'] ||
              expandedImgData.sizes['800'] ||
              expandedImgData.sizes['400'] ||
              expandedImgData.sizes['original']
            }
            key={expandedImgData.id}
            alt={expandedImgData.alt}
            id={expandedImgData.id}
            onClose={onClose}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

export default Gallery;
