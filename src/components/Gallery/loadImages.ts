import imageMetadata from './manifest.json'

interface ImageModule {
    default: string;
}

interface ImageMetadata {
    [key: string]: {
        alt?: string;
        link?: string;
    };
}

const imageModules = import.meta.glob('../../assets/images/team/gallery/*', { eager: true }) as Record<string, ImageModule>
const seenIds = new Set<string>();

const loadImages = Object.entries(imageModules).map(([path, module]) => {
    const id = path.split('/').pop()?.split('.')[0] || '';
    
    if (id.startsWith('big')) {
        seenIds.add(id.slice(3));
    }

    return {
        id: id,
        img: module.default,
        alt: (imageMetadata as ImageMetadata)[id]?.alt || `Image ${id}`,
        link: (imageMetadata as ImageMetadata)[id]?.link
    }
    // Only use the big version of duplicate images
    }).filter(image => {
        if (seenIds.has(image.id)) {
            return image.id.startsWith('big');
        }
        return true
    })

export default loadImages;

