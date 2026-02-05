import { useState, useRef } from 'react';
import './EnvelopeScreen.css';

const EnvelopeScreen = ({ onOpenComplete, onStartMusic }) => {
    const [isOpening, setIsOpening] = useState(false);
    const [isLetterVisible, setIsLetterVisible] = useState(false);
    const [showEnterButton, setShowEnterButton] = useState(false);

    const handleEnvelopeClick = () => {
        if (isOpening) return;

        setIsOpening(true);

        // Start playing music (handled by parent App.jsx)
        if (onStartMusic) {
            onStartMusic();
        }

        // Reveal letter after envelope opens
        setTimeout(() => {
            setIsLetterVisible(true);
        }, 1500);

        // Show enter button
        setTimeout(() => {
            setShowEnterButton(true);
        }, 3500);
    };

    const handleEnterExperience = () => {
        // Music keeps playing - just transition to main
        onOpenComplete();
    };

    return (
        <div className="envelope-screen">
            {/* Background Particles */}
            <div className="envelope-particles">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="envelope-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: 0.2 + Math.random() * 0.3,
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="envelope-content">
                {/* Title */}
                <h1 className={`envelope-title ${isOpening ? 'fade-up' : ''}`}>
                    A Letter for You
                </h1>

                {/* Envelope Container */}
                <div
                    className={`envelope-container ${isOpening ? 'opening' : ''}`}
                    onClick={handleEnvelopeClick}
                >
                    {/* Envelope Body */}
                    <div className="envelope">
                        {/* Back Flap */}
                        <div className="envelope-back-flap"></div>

                        {/* Front */}
                        <div className="envelope-front">
                            {/* Wax Seal */}
                            <div className={`wax-seal ${isOpening ? 'cracking' : ''}`}>
                                <div className="seal-inner">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Top Flap */}
                        <div className={`envelope-flap ${isOpening ? 'open' : ''}`}>
                            <div className="flap-inner"></div>
                        </div>
                    </div>

                    {/* Hover Hint */}
                    {!isOpening && (
                        <p className="envelope-hint">Click to open</p>
                    )}
                </div>

                {/* Letter Content */}
                <div className={`letter-container ${isLetterVisible ? 'visible' : ''}`}>
                    <div className="letter">
                        <div className="letter-decoration top-left"></div>
                        <div className="letter-decoration top-right"></div>
                        <div className="letter-decoration bottom-left"></div>
                        <div className="letter-decoration bottom-right"></div>

                        <h2 className="letter-title">To My Valentine</h2>

                        <div className="letter-body">
                            <p>In every moment, in every heartbeat, you make life feel warmer.</p>
                            <p>This Valentine, I wanted to create something just for you —</p>
                            <p>not merely a gift, but an experience of love.</p>
                        </div>

                        <div className="letter-signature">
                            With all my heart
                        </div>
                    </div>

                    {/* Enter Button */}
                    {showEnterButton && (
                        <button
                            className="enter-experience-btn"
                            onClick={handleEnterExperience}
                        >
                            <span>Enter the Experience</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Ambient Glow */}
            <div className="ambient-glow"></div>
        </div>
    );
};

export default EnvelopeScreen;
