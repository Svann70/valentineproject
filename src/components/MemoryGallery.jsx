import { useEffect, useRef, useState } from 'react';
import './MemoryGallery.css';

// Gallery items - 9 photos + 1 video
// Replace the src values with your actual photos/video paths
const galleryItems = [
    // First row - 3 photos
    { id: 1, type: 'photo', src: "/images/1.jpeg", alt: "Memory 1" },
    { id: 2, type: 'photo', src: "/images/2.jpeg", alt: "Memory 2" },
    { id: 3, type: 'photo', src: "/images/3.jpeg", alt: "Memory 3" },

    // Second row - 3 photos
    { id: 4, type: 'photo', src: "/images/4.jpeg", alt: "Memory 4" },
    { id: 5, type: 'photo', src: "/images/5.jpeg", alt: "Memory 5" },
    { id: 6, type: 'photo', src: "/images/6.jpeg", alt: "Memory 6" },

    // Third row - Video (full width) 
    // Untuk thumbnail: tambahkan file thumbnail.jpg ke folder public/images/
    {
        id: 7,
        type: 'video',
        src: "/images/vid1.mp4",
        poster: "/images/thumbnail.png",
        alt: "Our Special Video"
    },

    // Fourth row - 3 photos
    { id: 8, type: 'photo', src: "/images/7.jpeg", alt: "Memory 7" },
    { id: 9, type: 'photo', src: "/images/8.jpeg", alt: "Memory 8" },
    { id: 10, type: 'photo', src: "/images/9.jpeg", alt: "Memory 9" },
];

const MemoryGallery = ({ audioRef }) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [wasPlaying, setWasPlaying] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Handle opening video - pause background music
    const handleOpenVideo = (item) => {
        if (item.type === 'video' && audioRef?.current) {
            // Remember if music was playing
            setWasPlaying(!audioRef.current.paused);
            // Pause background music
            audioRef.current.pause();
        }
        setActiveItem(item);
    };

    // Handle closing lightbox - resume music if it was playing
    const closeLightbox = () => {
        // If it was a video and music was playing before, resume
        if (activeItem?.type === 'video' && wasPlaying && audioRef?.current) {
            audioRef.current.play().catch(console.log);
        }
        setActiveItem(null);
        setWasPlaying(false);
    };

    // Separate photos and video for layout
    const photoRows = [
        galleryItems.filter(item => item.id >= 1 && item.id <= 3),
        galleryItems.filter(item => item.id >= 4 && item.id <= 6),
        galleryItems.filter(item => item.id >= 8 && item.id <= 10),
    ];
    const videoItem = galleryItems.find(item => item.type === 'video');

    return (
        <section ref={sectionRef} className="gallery-section" id="gallery">
            <div className="container">
                {/* Section Header */}
                <div className={`gallery-header ${isVisible ? 'visible' : ''}`}>
                    <span className="section-label">Our Story</span>
                    <h2 className="section-title">Moments We Carry</h2>
                    <p className="section-subtitle">
                        Each memory a treasure, each moment a gift
                    </p>
                </div>

                {/* Gallery Layout */}
                <div className="gallery-layout">
                    {/* First Row - 3 Photos */}
                    <div className="gallery-row photos-row">
                        {photoRows[0].map((item, index) => (
                            <div
                                key={item.id}
                                className={`gallery-item photo-item ${isVisible ? 'visible' : ''}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={() => handleOpenVideo(item)}
                            >
                                <div className="gallery-image">
                                    <img src={item.src} alt={item.alt} loading="lazy" />
                                    <div className="image-overlay">
                                        <span className="overlay-text">View</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Second Row - 3 Photos */}
                    <div className="gallery-row photos-row">
                        {photoRows[1].map((item, index) => (
                            <div
                                key={item.id}
                                className={`gallery-item photo-item ${isVisible ? 'visible' : ''}`}
                                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                                onClick={() => handleOpenVideo(item)}
                            >
                                <div className="gallery-image">
                                    <img src={item.src} alt={item.alt} loading="lazy" />
                                    <div className="image-overlay">
                                        <span className="overlay-text">View</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Video Row - Full Width */}
                    {videoItem && (
                        <div className={`gallery-row video-row ${isVisible ? 'visible' : ''}`}
                            style={{ animationDelay: '0.6s' }}>
                            <div className="video-container" onClick={() => handleOpenVideo(videoItem)}>
                                <video
                                    poster={videoItem.poster}
                                    muted
                                    loop
                                    playsInline
                                >
                                    <source src={videoItem.src} type="video/mp4" />
                                </video>
                                <div className="video-overlay">
                                    <div className="play-button">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7L8 5z" />
                                        </svg>
                                    </div>
                                    <span className="video-label">Play Our Video</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Third Row - 3 Photos */}
                    <div className="gallery-row photos-row">
                        {photoRows[2].map((item, index) => (
                            <div
                                key={item.id}
                                className={`gallery-item photo-item ${isVisible ? 'visible' : ''}`}
                                style={{ animationDelay: `${(index + 7) * 0.1}s` }}
                                onClick={() => handleOpenVideo(item)}
                            >
                                <div className="gallery-image">
                                    <img src={item.src} alt={item.alt} loading="lazy" />
                                    <div className="image-overlay">
                                        <span className="overlay-text">View</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>

            {/* Lightbox Modal */}
            {activeItem && (
                <div className="lightbox" onClick={closeLightbox}>
                    <div
                        className={`lightbox-content ${activeItem.type === 'video' ? 'video-mode' : ''}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <button className="lightbox-close" onClick={closeLightbox}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        {activeItem.type === 'photo' ? (
                            <div className="lightbox-image">
                                <img src={activeItem.src} alt={activeItem.alt} />
                            </div>
                        ) : (
                            <div className="lightbox-video">
                                <video
                                    ref={videoRef}
                                    controls
                                    autoPlay
                                    playsInline
                                    poster={activeItem.poster}
                                >
                                    <source src={activeItem.src} type="video/mp4" />
                                </video>
                            </div>
                        )}

                        <p className="lightbox-caption">{activeItem.alt}</p>
                    </div>
                </div>
            )}

            {/* Background */}
            <div className="gallery-bg">
                <div className="bg-pattern"></div>
            </div>
        </section>
    );
};

export default MemoryGallery;
