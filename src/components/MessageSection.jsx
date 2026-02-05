import { useEffect, useRef, useState } from 'react';
import './MessageSection.css';

const MessageSection = () => {
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
        <section ref={sectionRef} className="message-section" id="message">
            <div className="container">
                <div className={`message-wrapper ${isVisible ? 'visible' : ''}`}>
                    {/* Decorative Frame */}
                    <div className="message-frame">
                        <div className="frame-corner top-left"></div>
                        <div className="frame-corner top-right"></div>
                        <div className="frame-corner bottom-left"></div>
                        <div className="frame-corner bottom-right"></div>

                        {/* Paper Texture Card */}
                        <div className="message-card">
                            <div className="card-texture"></div>

                            {/* Header */}
                            <div className="message-header">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="header-icon">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                <h2 className="message-title">A Message for You</h2>
                            </div>

                            {/* Divider */}
                            <div className="message-divider">
                                <span className="divider-line"></span>
                                <span className="divider-ornament">❦</span>
                                <span className="divider-line"></span>
                            </div>

                            {/* Message Content */}
                            <div className="message-content">
                                <p className="message-text">
                                    Every moment with you feels like a chapter worth remembering.
                                </p>
                                <p className="message-text">
                                    This is my way of turning that feeling into something you can see, feel, and revisit.
                                </p>
                                <p className="message-text">
                                    You are the reason my heart knows what home truly means.
                                </p>
                            </div>

                            {/* Signature */}
                            <div className="message-signature">
                                <span className="signature-text">Forever Yours</span>
                                <svg viewBox="0 0 24 24" fill="currentColor" className="signature-heart">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Floating Decorations */}
                    <div className="message-decorations">
                        <div className="decoration floating-rose">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M12 3c-1.5 2-2 4.5-2 7s.5 5 2 7c1.5-2 2-4.5 2-7s-.5-5-2-7z" />
                                <path d="M3 12c2-1.5 4.5-2 7-2s5 .5 7 2c-2 1.5-4.5 2-7 2s-5-.5-7-2z" />
                            </svg>
                        </div>
                        <div className="decoration floating-petals">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="petal"
                                    style={{
                                        animationDelay: `${i * 0.5}s`,
                                        left: `${20 + i * 15}%`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Elements */}
            <div className="message-bg">
                <div className="bg-gradient"></div>
            </div>
        </section>
    );
};

export default MessageSection;
