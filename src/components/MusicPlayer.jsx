import { useState, useEffect } from 'react';
import './MusicPlayer.css';

const MusicPlayer = ({ audioRef }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(0.3);
    const [showVolume, setShowVolume] = useState(false);

    useEffect(() => {
        // Sync with actual audio state
        const audio = audioRef?.current;
        if (audio) {
            setIsPlaying(!audio.paused);
            setVolume(audio.volume);
        }
    }, [audioRef]);

    const togglePlay = () => {
        const audio = audioRef?.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(console.log);
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);

        const audio = audioRef?.current;
        if (audio) {
            audio.volume = newVolume;
        }
    };

    return (
        <div className="music-player">
            {/* Play/Pause Button */}
            <button className="music-toggle" onClick={togglePlay} aria-label={isPlaying ? 'Pause music' : 'Play music'}>
                {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7L8 5z" />
                    </svg>
                )}
            </button>

            {/* Volume Control */}
            <div className="volume-wrapper">
                <button
                    className="volume-toggle"
                    onClick={() => setShowVolume(!showVolume)}
                    aria-label="Volume control"
                >
                    {volume === 0 ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        </svg>
                    )}
                </button>

                {showVolume && (
                    <div className="volume-slider-container">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="volume-slider"
                        />
                    </div>
                )}
            </div>

            {/* Visualizer */}
            <div className="music-visualizer">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className={`visualizer-bar ${isPlaying ? 'playing' : ''}`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                    />
                ))}
            </div>
        </div>
    );
};

export default MusicPlayer;
