import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showGifs, setShowGifs] = useState(true);
  const [showEgg, setShowEgg] = useState(false);
  const eggAudioRef = useRef(new Audio("./confess.mp3")); 
  const audioRef = useRef(null);

  const playlist = [
    { title: "CaramelDancer", artist: "Caramella Girls", duration: "5:2:56", src: "./caramel.mp3", cover: "./dance.jpeg" },
    { title: "Careless Whisper", artist: "George Michael", duration: "5:03", src: "./Careless_Whisper.mp3", cover: "./careless.jpg" },
    { title: "Thalassophobia", artist: "Aphøtic", duration: "5:38", src: "./hardtekka.mp3", cover: "./tekk.jpg" },
    { title: "Not Alone", artist: "Micheal Jackson", duration: "2:01", src: "./Not_alone.mp3", cover: "./horror.jpg" },
    { title: "som1callsomebody", artist: "surauh0ly", duration: "2:14", src: "./somebody.mp3", cover: "./someone.jpeg" },
    { title: "Trunks (From Highest 2 Lowest)", artist: "A$AP Rocky", duration: "3:46", src: "./trunk.mp3", cover: "./travy.png" }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    const setAudioData = () => setDuration(audio.duration);
    const setAudioTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying, currentSong]);

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw', overflow: 'hidden', position: 'fixed',
      top: 0, left: 0, backgroundColor: isDarkMode ? '#020617' : playlist[currentSong].theme, transition: 'all 1s ease', fontFamily: 'Segoe UI, Roboto, sans-serif'}}>
      <audio ref={audioRef} src={playlist[currentSong].src} onEnded={() => setCurrentSong((c) => (c + 1) % playlist.length)} />
          {isPlaying && showGifs && (
          <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
            <img src="./dance2.gif" style={{ position: 'absolute', top: '7%', left: '20%', width: '220px' }} alt="dance" />
            <img src="./dance2.gif" style={{ position: 'absolute', top: '3%', left: '30%', width: '220px' }} alt="dance" />
            <img src="./drogon.gif" style={{ position: 'absolute', bottom: '10%', right: '25%', width: '450px' }} alt="dance" />
          </div>
    )}
    <img src="./anime1.gif"  style={{ position: 'absolute', top: '15%', right: '15%', width: '200px',transform: `rotate(${currentTime * 20}deg)`, transition: 'transform 0.1s linear' }} alt="spinning-vibe" />
    <img src="./rat1.gif"  style={{ position: 'absolute', top: '50%', left: '5%', width: '300px',transform: `rotate(${currentTime * 60}deg)`, transition: 'transform 0.1s linear' }} alt="spinning-vibe" />

      <div style={{ width: '360px', backgroundColor: '#1e293b', color: 'white', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)' }}>


{/* Header */}
<div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155' }}>
  <span style={{ fontWeight: '600', fontSize: '11px', letterSpacing: '2px', color: '#94a3b8' }}>NOW PLAYING</span>
    <button onClick={() => {setIsPlaying(false); setShowEgg(true); eggAudioRef.current.volume = 0.4; eggAudioRef.current.play();}}style={{ background: 'none', border: 'none', cursor: 'help', opacity: 0.5 }}>✨</button>
      <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#94a3b8' }}>{isDarkMode ? '☀️' : '🌙'}</button>
        {showEgg && (
      <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',backgroundColor: 'rgba(2, 6, 23, 0.95)', display: 'flex', alignItems: 'center',justifyContent: 'center', zIndex: 100, padding: '20px', textAlign: 'center'}}>
        <div style={{ maxWidth: '500px', color: 'white', fontFamily: 'monospace' }}>
          <img src="./dev.jpg" style={{ width: '350px', borderRadius: '15px', marginBottom: '20px', border: '2px solid #f472b6' }} alt="The Dev" />
            <p style={{ lineHeight: '1.6', fontSize: '14px', letterSpacing: '1px' }}>
              <p>To the dearest who ever is reading this.</p> <p>This is done on a Saturday Night at 4am (It's already Monday).</p> 
              <p>I had too much energy and coded this thanks for witnessing my abomination. Enjoy your day, and here’s a cool picture of me, the developer!</p>
              <p> Thanks again!</p>
            </p>
              <button onClick={() => {setShowEgg(false); eggAudioRef.current.pause(); eggAudioRef.current.currentTime = 0; setIsPlaying(true);}} style={{ marginTop: '30px', background: '#f472b6', border: 'none', padding: '10px 20px', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: 'bold'}}>
          Close & Continue Vibing </button>
      </div>
  </div>
)}
      </div>
        <div style={{ padding: '30px' }}>
          {/* Main Cover Art */}
          <div style={{ width: '200px', height: '200px', margin: '0 auto 25px', borderRadius: '20px', overflow: 'hidden',transform: isPlaying ? 'scale(1.02)' : 'scale(1)',transition: 'transform 0.5s ease'}}>
            <img src={playlist[currentSong].cover} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }}onError={(e) => { e.target.src = "https://via.placeholder.com/200?text=Vibes"; }}/>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <h2 style={{ margin: '0 0 5px', fontSize: '18px' }}>{playlist[currentSong].title}</h2>
            <p style={{ margin: '0', color: '#94a3b8', fontSize: '14px' }}>{playlist[currentSong].artist}</p>
          </div>

          {/* Progress Section */}
          <div style={{ marginBottom: '20px' }}>
            <input type="range" min="0" max={duration || 0} value={currentTime} onChange={(e) => { audioRef.current.currentTime = e.target.value; }}style={{ width: '100%', accentColor: '#ec4899', height: '4px', cursor: 'pointer', appearance: 'none', background: '#334155', borderRadius: '2px' }}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '8px' }}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration) || playlist[currentSong].duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '25px', marginBottom: '25px' }}>
            <SkipBack size={28} onClick={() => setCurrentSong((c) => (c - 1 + playlist.length) % playlist.length)} style={{ cursor: 'pointer', fill: 'white' }} />
            <button onClick={() => setIsPlaying(!isPlaying)} style={{ background: '#f472b6', border: 'none', borderRadius: '50%', width: '60px', height: '60px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isPlaying ? <Pause size={30} fill="white" color="white" /> : <Play size={30} fill="white" color="white" style={{ marginLeft: '4px' }} />}
            </button>
            <SkipForward size={28} onClick={() => setCurrentSong((c) => (c + 1) % playlist.length)} style={{ cursor: 'pointer', fill: 'white' }} />
          </div>

          {/* Volume Control */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))}style={{ width: '80px', accentColor: '#f472b6', cursor: 'pointer' }}/>
          </div>
        </div>

        {/* Minimal Playlist */}
        <div style={{ backgroundColor: '#0f172a', padding: '10px', maxHeight: '120px', overflowY: 'auto' }}>
          {playlist.map((song, index) => (
            <div key={index} onClick={() => { setCurrentSong(index); setIsPlaying(true); }} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px', borderRadius: '15px', cursor: 'pointer', backgroundColor: currentSong === index ? '#1e293b' : 'transparent' }}>
              <span style={{ fontSize: '13px', color: currentSong === index ? '#f472b6' : '#94a3b8' }}>{song.title}</span>
              <span style={{ fontSize: '11px', color: '#475569' }}>{song.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}