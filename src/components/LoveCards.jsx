import { useEffect, useRef, useState } from 'react';
import './LoveCards.css';

const cardsData = [
    {
        id: 1,
        title: "Your Love Mood",
        description: "Warm, thoughtful, and deeply sincere",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        ),
        gradient: 'linear-gradient(135deg, #8B1D2D 0%, #B83A4B 100%)',
    },
    {
        id: 2,
        title: "Your Valentine Style",
        description: "Soft, and meaningful",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3c-1.5 2-2 4.5-2 7s.5 5 2 7c1.5-2 2-4.5 2-7s-.5-5-2-7z" />
                <path d="M3 12c2-1.5 4.5-2 7-2s5 .5 7 2c-2 1.5-4.5 2-7 2s-5-.5-7-2z" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        ),
        gradient: 'linear-gradient(135deg, #B76E79 0%, #D4A5A5 100%)',
    },
    {
        id: 3,
        title: "How You Love",
        description: "Through presence, words, and shared moments",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 6L9 17l-5-5" />
                <circle cx="12" cy="12" r="10" />
            </svg>
        ),
        gradient: 'linear-gradient(135deg, #6A1523 0%, #8B1D2D 100%)',
    },
    {
        id: 4,
        title: "Your Valentine Gesture",
        description: "A crafted digital keepsake made with care",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="M12 15l-1.5 1.5L12 18l1.5-1.5L12 15z" />
            </svg>
        ),
        gradient: 'linear-gradient(135deg, #C9A962 0%, #E8D5A3 100%)',
    },
];

const LoveCards = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

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

    return (
        <section ref={sectionRef} className="love-cards-section" id="cards">
            <div className="container">
                {/* Section Header */}
                <div className={`cards-header ${isVisible ? 'visible' : ''}`}>
                    <span className="section-label">Wrapped in Love</span>
                    <h2 className="section-title">Your Love Story</h2>
                    <p className="section-subtitle">
                        Each moment tells a part of our beautiful journey together
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="cards-grid">
                    {cardsData.map((card, index) => (
                        <div
                            key={card.id}
                            className={`love-card ${isVisible ? 'visible' : ''}`}
                            style={{
                                animationDelay: `${index * 0.2}s`,
                                '--card-gradient': card.gradient
                            }}
                        >
                            <div className="card-glow"></div>
                            <div className="card-content">
                                <div className="card-icon">
                                    {card.icon}
                                </div>
                                <h3 className="card-title">{card.title}</h3>
                                <p className="card-description">{card.description}</p>

                                {/* Decorative Elements */}
                                <div className="card-decoration">
                                    <span className="deco-line"></span>
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="deco-heart">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                    <span className="deco-line"></span>
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className="card-overlay">
                                <div className="overlay-pattern"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Decoration */}
            <div className="cards-bg-decoration">
                <div className="bg-circle bg-circle-1"></div>
                <div className="bg-circle bg-circle-2"></div>
            </div>
        </section>
    );
};

export default LoveCards;
