import imageMetadata from './manifest.json'
const imageModules = import.meta.glob('../../assets/images/team/gallery/*', { eager: true })

const loadImages = Object.entries(imageModules).map(([path, module]) => {
    const id = path.split('/').pop().split('.')[0]
    {console.log(module.default)}
    return {
        id: id,
        img: module.default,
        alt: imageMetadata[id]?.alt || `Image ${id}`
    }
})

export default loadImages;

