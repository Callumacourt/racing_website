import imageMetadata from './manifest.json'

interface ImageModule {
    default: string;
}

interface ImageMetadata {
    [key: string]: {
        alt?: string;
    };
}

const imageModules = import.meta.glob('../../assets/images/team/gallery/*', { eager: true }) as Record<string, ImageModule>

const loadImages = Object.entries(imageModules).map(([path, module]) => {
    const id = path.split('/').pop()?.split('.')[0] || '';
    return {
        id: id,
        img: module.default,
        alt: (imageMetadata as ImageMetadata)[id]?.alt || `Image ${id}`
    }
})

export default loadImages;

