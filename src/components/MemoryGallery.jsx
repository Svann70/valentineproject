import { useEffect, useRef, useState } from 'react';
import './MemoryGallery.css';

// Gallery items - 9 photos + 1 video
// Replace the src values with your actual photos/video paths
const galleryItems = [
    // First row - 3 photos
    { id: 1, type: 'photo', src: "/images/memory-1.png", alt: "Memory 1" },
    { id: 2, type: 'photo', src: "/images/memory-2.png", alt: "Memory 2" },
    { id: 3, type: 'photo', src: "/images/memory-3.png", alt: "Memory 3" },

    // Second row - 3 photos
    { id: 4, type: 'photo', src: "/images/memory-4.png", alt: "Memory 4" },
    { id: 5, type: 'photo', src: "/images/memory-5.png", alt: "Memory 5" },
    { id: 6, type: 'photo', src: "/images/memory-6.png", alt: "Memory 6" },

    // Third row - Video (full width) 
    {
        id: 7,
        type: 'video',
        src: "/images/video.mp4",
        poster: "/images/video-poster.png",
        alt: "Our Special Video"
    },

    // Fourth row - 3 photos
    { id: 8, type: 'photo', src: "/images/memory-7.png", alt: "Memory 7" },
    { id: 9, type: 'photo', src: "/images/memory-8.png", alt: "Memory 8" },
    { id: 10, type: 'photo', src: "/images/memory-9.png", alt: "Memory 9" },
];

const MemoryGallery = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
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

    const handleVideoPlay = () => {
        if (videoRef.current) {
            if (isVideoPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsVideoPlaying(!isVideoPlaying);
        }
    };

    const closeLightbox = () => {
        setActiveItem(null);
        setIsVideoPlaying(false);
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
                                onClick={() => setActiveItem(item)}
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
                                onClick={() => setActiveItem(item)}
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
                            <div className="video-container" onClick={() => setActiveItem(videoItem)}>
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
                                onClick={() => setActiveItem(item)}
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

                {/* Hint */}
                <div className={`gallery-hint ${isVisible ? 'visible' : ''}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <p>Replace with your own special photos and video</p>
                </div>
            </div>

            {/* Lightbox Modal */}
            {activeItem && (
                <div className="lightbox" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
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
