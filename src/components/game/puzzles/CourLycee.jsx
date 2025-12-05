import React, { useEffect, useState } from 'react';
import { useGame } from '../GameContext';
import { GraduationCap, Shield, Sun } from 'lucide-react';

const CourLycee = () => {
  const { completeStage, role } = useGame();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti animation on mount
    setShowConfetti(true);
    // Mark as complete after a delay to ensure it's registered if user leaves
    setTimeout(() => completeStage(5), 1000);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-2xl text-white overflow-hidden relative min-h-[600px] flex flex-col items-center justify-center text-center">
      
      {/* Background Rays */}
      <div className="absolute inset-0 animate-[spin_20s_linear_infinite] opacity-20 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_10deg,white_10deg_20deg,transparent_20deg_30deg,white_30deg_40deg,transparent_40deg_50deg,white_50deg_60deg,transparent_60deg_70deg,white_70deg_80deg,transparent_80deg_90deg,white_90deg_100deg,transparent_100deg_110deg,white_110deg_120deg,transparent_120deg_130deg,white_130deg_140deg,transparent_140deg_150deg,white_150deg_160deg,transparent_160deg_170deg,white_170deg_180deg,transparent_180deg_190deg,white_190deg_200deg,transparent_200deg_210deg,white_210deg_220deg,transparent_220deg_230deg,white_230deg_240deg,transparent_240deg_250deg,white_250deg_260deg,transparent_260deg_270deg,white_270deg_280deg,transparent_280deg_290deg,white_290deg_300deg,transparent_300deg_310deg,white_310deg_320deg,transparent_320deg_330deg,white_330deg_340deg,transparent_340deg_350deg,white_350deg_360deg)]"></div>
      </div>

      {/* Confetti (Simplified with CSS dots) */}
      {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(50)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-3 h-3 rounded-full animate-[fall_3s_linear_infinite]"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `-${Math.random() * 20}%`,
                        backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][Math.floor(Math.random() * 5)],
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 3}s`
                    }}
                  />
              ))}
          </div>
      )}

      <div className="z-10 animate-fadeInUp space-y-6">
          <div className="relative inline-block mb-6">
              <Shield size={120} className="text-yellow-300 filter drop-shadow-lg animate-pulse" />
              <GraduationCap size={60} className="absolute -top-4 -right-4 text-white transform rotate-12" />
          </div>

          <h1 className="text-4xl font-extrabold font-fredoka mb-4">
              MISSION ACCOMPLIE !
          </h1>
          
          <h2 className="text-2xl font-bold text-yellow-200 mb-8">
              Le Lycée est Libre !
          </h2>

          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl max-w-2xl mx-auto border border-white/30">
              <p className="text-xl leading-relaxed mb-4">
                  Bravo {role ? `chèr(e) ${role}` : 'Résistant(e)'}, grâce à toi :
              </p>
              <ul className="text-left space-y-2 mb-6 inline-block mx-auto">
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-green-400" /> Les vieux PC sont sauvés de la décharge</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-green-400" /> Le proviseur et les profs sont formés</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-green-400" /> Les données sont protégées en local</li>
              </ul>
              <p className="text-lg italic opacity-90">
                  "Le savoir, comme le logiciel, doit être libre pour grandir."
              </p>
          </div>

          <button 
              onClick={() => document.getElementById('guides').scrollIntoView({ behavior: 'smooth' })}
              className="mt-8 bg-yellow-400 text-blue-900 font-bold py-4 px-10 rounded-full text-xl shadow-lg hover:bg-yellow-300 hover:scale-105 transition-all"
          >
              Télécharger mon Kit Résistant
          </button>
      </div>

      <style>{`
        @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// Helper icon
const CheckCircle2 = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
);

export default CourLycee;

