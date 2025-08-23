/**
 * Loads and organizes gallery images with all available sizes and metadata.
 * 
 * - Uses import.meta.glob to eagerly import all images in the gallery folder.
 * - Groups images by their base name (e.g., "camp", "business") and collects all available sizes (e.g., 400, 800, 1200, original).
 * - Merges in alt text and link metadata from manifest.json.
 * - Exports an array of image objects, each with id, sizes, alt, and optional link.
 */

import imageMetadata from './manifest.json'

// Represents a single imported image module (from import.meta.glob)
interface ImageModule {
    default: string;
}

// Represents the JSON metadata for each image in manifest.json
interface ImageMetadata {
    [key: string]: {
        alt?: string;
        link?: string;
    };
}

// Eagerly import all images in the gallery folder
const imageModules = import.meta.glob('../../assets/images/team/gallery/*', { eager: true }) as Record<string, ImageModule>;

// Group images by base name and collect all available sizes for each group
const imageGroups: { [base: string]: { [size: string]: string } } = {};

Object.entries(imageModules).forEach(([path, module]) => {
    const fileName = path.split('/').pop() || '';
    // Match: baseName + optional size (e.g., 400, 800, 1200) + extension
    const match = fileName.match(/^([a-zA-Z0-9]+?)(\d{3,4})?\.([a-z]+)$/);
    if (!match) return;
    const base = match[1]; // e.g., "camp"
    const size = match[2] || 'original'; // e.g., "1200" or "original"
    if (!imageGroups[base]) imageGroups[base] = {};
    imageGroups[base][size] = module.default;
});

// Build the final array of image objects with metadata
const loadImages = Object.entries(imageGroups).map(([base, sizes]) => ({
    id: base, // Unique id for the image group
    sizes,    // All available sizes for this image
    alt: (imageMetadata as ImageMetadata)[base]?.alt || `Image ${base}`,
    link: (imageMetadata as ImageMetadata)[base]?.link
}));

export default loadImages;

