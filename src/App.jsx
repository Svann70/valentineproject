import { useState, useRef, useEffect } from 'react';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import EnvelopeScreen from './components/EnvelopeScreen';
import MusicPlayer from './components/MusicPlayer';
import HeroSection from './components/HeroSection';
import LoveCards from './components/LoveCards';
import MessageSection from './components/MessageSection';
import MemoryGallery from './components/MemoryGallery';
import ClosingSection from './components/ClosingSection';

function App() {
  const [currentScreen, setCurrentScreen] = useState('loading');
  const [isMusicStarted, setIsMusicStarted] = useState(false);
  const audioRef = useRef(null);
  const mainContentRef = useRef(null);

  // Initialize audio on mount
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio('/pandangan.mp3');
      audio.loop = true;
      audio.volume = 0.3;
      audio.preload = 'auto';
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleLoadingComplete = () => {
    setCurrentScreen('envelope');
  };

  const handleStartMusic = () => {
    if (audioRef.current && !isMusicStarted) {
      audioRef.current.play().catch(console.log);
      setIsMusicStarted(true);
    }
  };

  const handleEnvelopeOpen = () => {
    // Music continues playing - no need to do anything
    setCurrentScreen('main');
  };

  const handleBeginJourney = () => {
    const cardsSection = document.getElementById('cards');
    if (cardsSection) {
      cardsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRevisitLetter = () => {
    setCurrentScreen('envelope');
    window.scrollTo(0, 0);
  };

  return (
    <div className="app">
      {/* Loading Screen */}
      {currentScreen === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* Envelope Screen */}
      {currentScreen === 'envelope' && (
        <EnvelopeScreen
          onOpenComplete={handleEnvelopeOpen}
          onStartMusic={handleStartMusic}
        />
      )}

      {/* Main Experience */}
      {currentScreen === 'main' && (
        <>
          {/* Music Player */}
          <MusicPlayer audioRef={audioRef} />

          {/* Background Particles - Minimal */}
          <div className="bg-particles">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="bg-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <main ref={mainContentRef} className="main-content">
            <HeroSection onBeginJourney={handleBeginJourney} />
            <LoveCards />
            <MessageSection />
            <MemoryGallery audioRef={audioRef} />
            <ClosingSection onRevisitLetter={handleRevisitLetter} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
