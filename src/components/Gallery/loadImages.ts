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

const imageModules = import.meta.glob('../../assets/images/team/gallery/*', { eager: true }) as Record<string, ImageModule>;

// Group images by base name and collect all sizes
const imageGroups: { [base: string]: { [size: string]: string } } = {};

Object.entries(imageModules).forEach(([path, module]) => {
    const fileName = path.split('/').pop() || '';
    // Match: baseName + optional size + extension
    const match = fileName.match(/^([a-zA-Z0-9]+?)(\d{3,4})?\.([a-z]+)$/);
    if (!match) return;
    const base = match[1];
    const size = match[2] || 'original';
    if (!imageGroups[base]) imageGroups[base] = {};
    imageGroups[base][size] = module.default;
});

const loadImages = Object.entries(imageGroups).map(([base, sizes]) => ({
    id: base,
    sizes,
    alt: (imageMetadata as ImageMetadata)[base]?.alt || `Image ${base}`,
    link: (imageMetadata as ImageMetadata)[base]?.link
}));

export default loadImages;

