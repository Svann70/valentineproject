import { useEffect, useRef, useState } from 'react';
import './ClosingSection.css';

const ClosingSection = ({ onRevisitLetter }) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="closing-section" id="closing">
            {/* Floating Hearts */}
            <div className="closing-hearts">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="floating-heart-closing"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${8 + Math.random() * 4}s`,
                            opacity: 0.08 + Math.random() * 0.15,
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>
                ))}
            </div>

            <div className="container">
                <div className={`closing-content ${isVisible ? 'visible' : ''}`}>
                    {/* Main Icon */}
                    <div className="closing-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="closing-title">
                        A Valentine Made Just for You
                    </h2>

                    {/* Divider */}
                    <div className="closing-divider">
                        <span className="divider-line"></span>
                        <span className="divider-heart">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </span>
                        <span className="divider-line"></span>
                    </div>

                    {/* Subtitle */}
                    <p className="closing-subtitle">
                        Created with love
                    </p>

                    {/* Button */}
                    <button className="btn btn-primary closing-btn" onClick={onRevisitLetter}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Revisit the Letter
                    </button>

                    {/* Footer */}
                    <div className="closing-footer">
                        <p className="footer-text">Happy Valentine's Day</p>
                        <p className="footer-year">2026</p>
                    </div>
                </div>
            </div>

            {/* Background Gradient */}
            <div className="closing-bg">
                <div className="bg-radial"></div>
            </div>
        </section>
    );
};

export default ClosingSection;
