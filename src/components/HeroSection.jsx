import { useEffect, useRef, useState } from 'react';
import './HeroSection.css';

const HeroSection = ({ onBeginJourney }) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="hero-section" id="hero">
            {/* Floating Elements */}
            <div className="hero-floating-elements">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="floating-heart"
                        style={{
                            left: `${10 + Math.random() * 80}%`,
                            top: `${10 + Math.random() * 80}%`,
                            animationDelay: `${Math.random() * 4}s`,
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>
                ))}
            </div>

            <div className="container">
                {/* Centered Content Layout */}
                <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
                    {/* Illustration at Top */}
                    <div className="hero-illustration">
                        <div className="illustration-container">
                            <div className="illustration-glow"></div>
                            <div className="illustration-image-wrapper">
                                <img
                                    src="/images/abstract-heart.png"
                                    alt="Romantic heart"
                                    className="illustration-image"
                                    loading="eager"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Text Content - Centered */}
                    <div className="hero-text">
                        <h1 className="hero-title">
                            <span className="title-line">Your</span>
                            <span className="title-line accent">Valentine</span>
                            <span className="title-line">Experience</span>
                        </h1>

                        <p className="hero-subtitle">
                            A journey through memories, moments, and feelings that matter.
                        </p>

                        {/* Single Button */}
                        <button className="btn btn-primary" onClick={onBeginJourney}>
                            <svg viewBox="0 0 24 24" fill="currentColor" className="btn-icon">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            Begin the Journey
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Simple & Clean */}
            <a href="#cards" className="scroll-indicator">
                <svg className="scroll-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
            </a>
        </section>
    );
};

export default HeroSection;
