import styles from './Gallery.module.css';
import { Image } from './Image';
import ExpandedImg from './ExpandedImg';
import loadImages from './loadImages';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import 'masonry-css';

interface ImageData {
  id: string;
  img: string;
  alt: string;
  link?: string;
}

const images: ImageData[] = loadImages;

function Gallery() {
  const [expandedIndex, setExpandedIndex] = useState<string | null>(null);

  const handleImageClick = (index: string) => {
    setExpandedIndex(index);
  };

  const onClose = () => {
    setExpandedIndex(null);
  };

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
            src={image.img}
            alt={image.alt}
            link = {image.link}
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
            onClose={onClose}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

export default Gallery;
