import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Background from './Background';
import './index.css';

// Asset Imports
import pick from './assets/pic.jpeg';
import sic from './assets/sic.jpeg';

function App() {
  const [stage, setStage] = useState('gift'); 
  const [showGreeting, setShowGreeting] = useState(false);

  const openGift = () => {
    const end = Date.now() + 3 * 1000;
    
    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }
      confetti({ 
        startVelocity: 30, 
        spread: 360, 
        ticks: 60, 
        zIndex: 0, 
        particleCount: 40, 
        origin: { x: Math.random(), y: Math.random() - 0.2 } 
      });
    }, 200);

    // Smooth transition to main content
    setTimeout(() => setStage('main'), 600);
  };

  return (
    <>
      <div className="bg-fix">
        <Background />
      </div>
      
      <div className="app-container">
        <AnimatePresence mode="wait">
          {stage === 'gift' ? (
            <motion.div 
              key="gift" 
              className="gift-stage"
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              exit={{ scale: 2, opacity: 0 }}
              onClick={openGift}
            >
              <motion.div 
                className="gift-box-size" 
                animate={{ y: [0, -25, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
              >
                🎁
              </motion.div>
              <p className="tap-hint">TAP TO OPEN</p>
            </motion.div>
          ) : (
            <motion.div 
              key="main" 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1 }}
            >
              <div className="birthday-box-container">
                <div className="birthday-banner">
                  <h1 className="big-title">HAPPY BIRTHDAY<br/>CHANDRBHAAN</h1>
                </div>
              </div>

              <div className="gallery">
                <motion.div 
                  className="card" 
                  initial={{ opacity: 0, x: -50 }} 
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <img src={pick} alt="Memory 1" />
                  <p className="caption">Partners in crime! 💥</p>
                </motion.div>

                <motion.div 
                  className="card" 
                  initial={{ opacity: 0, x: 50 }} 
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <img src={sic} alt="Memory 2" />
                  <p className="caption">Collecting moments. 📸</p>
                </motion.div>
              </div>

              <div className="cake-stage" onClick={() => setShowGreeting(true)}>
                <motion.div 
                  className="cake-box-size" 
                  animate={{ rotate: [0, 5, -5, 0] }} 
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  🎂
                </motion.div>
                <p className="hint">Tap the cake to light up his day...</p>
                
                {showGreeting && (
                  <motion.div 
                    className="message-box" 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                  >
                    <p>"Life is Melody and Beautiful when u are around"</p>
                    <p>"You light up every room you enter. Your Smile is literally contagious"</p>
                  </motion.div>
                )}
              </div>
              
              <footer className="footer">MADE WITH ❤️ FOR CHANDRBHAAN</footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
