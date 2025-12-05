import React, { useRef, useEffect, useState } from 'react';
import { useGame } from './GameContext';
import { Monitor, Users, Server, GraduationCap, Briefcase, Lock, CheckCircle2, ArrowRight, Info } from 'lucide-react';

const Map = () => {
  const { goToStage, completedStages, role } = useGame();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const getCoords = (xPercent, yPercent) => {
    return {
      x: (parseFloat(xPercent) / 100) * dimensions.width,
      y: (parseFloat(yPercent) / 100) * dimensions.height
    };
  };

  const stages = [
    { id: 1, name: 'Salle Informatique', icon: <Monitor size={32} />, x: '15%', y: '25%', delay: '0s' },
    { id: 2, name: 'Bureau du Proviseur', icon: <Briefcase size={32} />, x: '85%', y: '25%', delay: '0.2s' },
    { id: 3, name: 'Salle des Profs', icon: <Users size={32} />, x: '25%', y: '75%', delay: '0.4s' },
    { id: 4, name: 'Local Serveur', icon: <Server size={32} />, x: '75%', y: '75%', delay: '0.6s' },
    { id: 5, name: 'Cour du Lycée (Final)', icon: <GraduationCap size={40} />, x: '50%', y: '50%', delay: '0.8s' },
  ];

  const getPathD = (index) => {
    if (dimensions.width === 0) return "";
    
    const current = stages[index];
    const next = stages[index + 1];
    
    const p1 = getCoords(current.x, current.y);
    const p2 = getCoords(next.x, next.y);

    if (index === 0) {
      return `M ${p1.x} ${p1.y} Q ${dimensions.width * 0.5} ${dimensions.height * 0.1} ${p2.x} ${p2.y}`;
    } else if (index === 1) {
      return `M ${p1.x} ${p1.y} Q ${dimensions.width * 0.95} ${dimensions.height * 0.5} ${p2.x} ${p2.y}`;
    } else if (index === 2) {
      return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
    } else if (index === 3) {
      return `M ${p1.x} ${p1.y} Q ${dimensions.width * 0.5} ${dimensions.height * 0.6} ${p2.x} ${p2.y}`;
    }
    return "";
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto"> {/* Increased max-width */}
      
      {/* Intro Modal */}
      {showIntro && (
  <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm rounded-3xl">
    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-8 border-4 border-blue-500 
                    flex flex-col  items-center justify-center relative p-8">
      
      {/* Bouton fermeture - bien positionné sans décaler le contenu */}
      <button
        onClick={() => setShowIntro(false)}
        className="absolute top-4 right-4 w-10  rounded-full bg-white/80 hover:bg-white 
                   flex items-center justify-center text-gray-500 hover:text-gray-700 
                   shadow-md transition-all z-10"
      >
        ✕
      </button>

      {/* Icône info */}
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
        <Info size={36} />
      </div>
        <br></br>
        
      <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 font-fredoka text-center">
        Mission : Libérer le Lycée
      </h3>

      <p className="text-gray-600 mb-8 leading-relaxed text-center max-w-md">
        Bienvenue, Agent du Libre !<br /><br />
        Votre objectif est de transformer le lycée en un modèle de numérique responsable. 
        Pour cela, vous devez accomplir <strong>5 missions</strong> dans différentes salles.
      </p>
      <br></br>

      <div className="space-y-4 text-left mb-10 bg-slate-50 p-6 rounded-xl text-base w-full max-w-sm">
        <p className="flex items-center gap-3"><span className="font-bold text-blue-500 text-lg">1.</span> Réparez les PC obsolètes.</p>
        <p className="flex items-center gap-3"><span className="font-bold text-blue-500 text-lg">2.</span> Trouvez des alternatives libres.</p>
        <p className="flex items-center gap-3"><span className="font-bold text-blue-500 text-lg">3.</span> Convainquez l'équipe pédagogique.</p>
        <p className="flex items-center gap-3"><span className="font-bold text-blue-500 text-lg">4.</span> Rétablissez le réseau sécurisé.</p>
      </div>
      <br></br>

      <button
        onClick={() => setShowIntro(false)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 w-34 h-12 px-10 rounded-full 
                   shadow-xl transition-all transform hover:scale-105 active:scale-95"
      >
        C'est parti !
      </button>
      <br></br>
    </div>
  </div>
)}
  <div ref={containerRef} className="relative w-full h-[700px] bg-slate-50 rounded-3xl border-8 border-slate-200 shadow-2xl overflow-hidden p-4 select-none">
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 border-b border-slate-200 z-20 shadow-sm flex flex-col md:flex-row justify-between items-center px-8 gap-4  ">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 font-fredoka flex items-center gap-2">
                  Plan du Lycée <button onClick={() => setShowIntro(true)} className="text-blue-400 hover:text-blue-600 transition-colors"><Info size={20} /></button>
              </h2>
              <p className="text-sm text-slate-500">Rôle : <span className="font-bold text-blue-600">{role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Résistant'}</span></p>
            </div>
            <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Progression</span>
                <div className="w-32 h-3 bg-slate-300 rounded-full overflow-hidden">
                    <div  
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500 ease-out" 
                      style={{ width: `${(completedStages.length / 5) * 100}%` }}
                    ></div>
                </div>
                <span className="text-sm font-bold text-slate-700">{Math.round((completedStages.length / 5) * 100)}%</span>
            </div>
        </div>
        
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* Connection Path SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 filter drop-shadow-md">
          <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
              </marker>
          </defs>
          
          {dimensions.width > 0 && (
            <>
              <path d={getPathD(0)} fill="none" stroke={completedStages.includes(1) ? "#10b981" : "#cbd5e1"} strokeWidth="4" strokeDasharray="8 4" className="transition-colors duration-1000" />
              <path d={getPathD(1)} fill="none" stroke={completedStages.includes(2) ? "#10b981" : "#cbd5e1"} strokeWidth="4" strokeDasharray="8 4" className="transition-colors duration-1000" />
              <path d={getPathD(2)} fill="none" stroke={completedStages.includes(3) ? "#10b981" : "#cbd5e1"} strokeWidth="4" strokeDasharray="8 4" className="transition-colors duration-1000" />
              <path d={getPathD(3)} fill="none" stroke={completedStages.includes(4) ? "#10b981" : "#cbd5e1"} strokeWidth="4" strokeDasharray="8 4" className="transition-colors duration-1000" />
            </>
          )}
        </svg>

        {stages.map((stage) => {
          const isCompleted = completedStages.includes(stage.id);
          const isLocked = stage.id !== 1 && !completedStages.includes(stage.id - 1);
          const isNext = !isCompleted && !isLocked;

          return (
            <button
              key={stage.id}
              onClick={() => goToStage(stage.id)}
              disabled={isLocked}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-1 transition-all duration-500 z-10 group outline-none
                ${isLocked ? 'cursor-not-allowed opacity-60 grayscale' : 'cursor-pointer hover:scale-110'}
              `}
              style={{ 
                  left: stage.x, 
                  top: stage.y, 
                  animation: isNext ? 'float 3s ease-in-out infinite' : 'none',
                  animationDelay: stage.delay 
              }}
            >
              {/* Card Container */}
              <div className={`relative w-44 h-36 rounded-2xl border-4 flex flex-col items-center justify-center gap-2 shadow-xl overflow-hidden transition-colors duration-300
                  ${isCompleted ? 'bg-green-50 border-green-500' : 
                    isNext ? 'bg-white border-blue-500 shadow-blue-200' : 
                    'bg-slate-100 border-slate-300'}
              `}>
                  
                  {/* Status Badge */}
                  {isCompleted && (
                      <div className="absolute top-2 right-2 text-green-500 bg-white rounded-full p-1 shadow-sm">
                          <CheckCircle2 size={16} />
                      </div>
                  )}
                  {isLocked && (
                      <div className="absolute inset-0 bg-slate-200/50 backdrop-blur-[2px] flex items-center justify-center z-20">
                          <Lock size={24} className="text-slate-400" />
                      </div>
                  )}

                  {/* Icon */}
                  <div className={`p-3 rounded-full transition-colors duration-300
                      ${isCompleted ? 'bg-green-100 text-green-600' : 
                        isNext ? 'bg-blue-100 text-blue-600' : 
                        'bg-slate-200 text-slate-500'}
                  `}>
                      {stage.icon}
                  </div>
                  
                  {/* Label */}
                  <span className={`text-xs font-bold text-center px-2 leading-tight
                      ${isCompleted ? 'text-green-700' : isNext ? 'text-blue-700' : 'text-slate-500'}
                  `}>
                      {stage.name}
                  </span>

                  {/* Pulse effect for current task */}
                  {isNext && (
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 animate-pulse"></span>
                  )}
              </div>

              {/* "Start" Label for next step */}
              {isNext && (
                  <div className="absolute -bottom-8 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce flex items-center gap-1">
                      Commencer <ArrowRight size={12} />
                  </div>
              )}
            </button>
          );
        })}

        <style>{`
          @keyframes float {
              0%, 100% { transform: translate(-50%, -50%) translateY(0); }
              50% { transform: translate(-50%, -50%) translateY(-10px); }
          }
          @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.9); }
              to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Map;
