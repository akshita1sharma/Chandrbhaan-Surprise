import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function Background() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        interactivity: {
          events: { 
            onHover: { enable: true, mode: "grab" } 
          },
          modes: { 
            grab: { distance: 150, links: { opacity: 0.5 } } 
          },
        },
        particles: {
          color: { value: "#ffffff" },
          links: { 
            color: "#ffffff", 
            distance: 150, 
            enable: true, 
            opacity: 0.2, 
            width: 1 
          },
          move: { 
            enable: true, 
            speed: 1.5, 
            random: true 
          },
          number: { value: 120 },
          opacity: { value: 0.5 },
          size: { value: { min: 1, max: 3 } },
        },
      }}
    />
  );
}
