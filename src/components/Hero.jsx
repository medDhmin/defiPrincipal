import React, { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const [stats, setStats] = useState({
    computers: 0,
    schools: 0,
    money: 0
  });
  
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated.current) {
        animateStats();
        hasAnimated.current = true;
      }
    }, { threshold: 0.5 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const animateStats = () => {
    const duration = 2000;
    const targets = {
      computers: 15000,
      schools: 450,
      money: 2000000
    };

    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setStats({
        computers: Math.floor(progress * targets.computers),
        schools: Math.floor(progress * targets.schools),
        money: Math.floor(progress * targets.money)
      });

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M€';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k';
    }
    return num.toString();
  };

  return (
    <section className="hero-section" id="accueil" ref={sectionRef}>
        <div className="hero-content">
            <div className="hero-text">
                <div className="hero-title">
                    <span className="title-main">Résister à l'obsolescence</span>
                    <span className="title-sub">Construire le numérique de demain</span>
                </div>
                <p className="hero-description">
                    Rejoignez le village NIRD pour libérer nos écoles et nos collectivités de la dépendance aux géants du numérique. Ensemble, prolongeons la vie de nos équipements et reprenons le contrôle.
                </p>
                
                <div className="hero-stats">
                    <div className="stat-card">
                        <div className="stat-number" data-target="15000">{formatNumber(stats.computers)}</div>
                        <div className="stat-label">PC Sauvés</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number" data-target="450">{formatNumber(stats.schools)}</div>
                        <div className="stat-label">Écoles Libérées</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number" data-target="2000000">{formatNumber(stats.money)}</div>
                        <div className="stat-label">Économisés</div>
                    </div>
                </div>
                
                <button className="cta-button" onClick={() => document.getElementById('parcours').scrollIntoView({ behavior: 'smooth' })}>
                    Rejoindre la Résistance
                </button>
            </div>
            
            <div className="hero-illustration">
                <div className="village-scene">
                    <div className="hut hut-1">🏠</div>
                    <div className="hut hut-2">🏫</div>
                    <div className="hut hut-3">🏛️</div>
                    <div className="shield">🛡️</div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Hero;

