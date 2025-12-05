import React, { useState, useEffect } from 'react';
import { useGame } from '../GameContext';
import { Check, X } from 'lucide-react';

const BureauProviseur = () => {
  const { completeStage, goToMap } = useGame();
  
  // Data structure for the matching game
  const proprietaryApps = [
    { id: 'word', name: 'Microsoft Word', icon: '📝', matchId: 'writer' },
    { id: 'photoshop', name: 'Adobe Photoshop', icon: '🎨', matchId: 'gimp' },
    { id: 'ie', name: 'Google Chrome', icon: '🌐', matchId: 'firefox' },
    { id: 'outlook', name: 'Outlook', icon: '📧', matchId: 'thunderbird' },
    { id: 'excel', name: 'Microsoft Excel', icon: '📊', matchId: 'calc' },
    { id: 'ppt', name: 'PowerPoint', icon: '📽️', matchId: 'impress' },
    { id: 'whatsapp', name: 'WhatsApp', icon: '💬', matchId: 'signal' },
    { id: 'drive', name: 'Google Drive', icon: '☁️', matchId: 'nextcloud' },
  ];

  const freeApps = [
    { id: 'gimp', name: 'GIMP', icon: '🐧', matchId: 'photoshop' },
    { id: 'writer', name: 'LibreOffice Writer', icon: '📄', matchId: 'word' },
    { id: 'thunderbird', name: 'Thunderbird', icon: '📨', matchId: 'outlook' },
    { id: 'firefox', name: 'Mozilla Firefox', icon: '🦊', matchId: 'ie' },
    { id: 'calc', name: 'LibreOffice Calc', icon: '📈', matchId: 'excel' },
    { id: 'impress', name: 'LibreOffice Impress', icon: '🎞️', matchId: 'ppt' },
    { id: 'signal', name: 'Signal', icon: '🔒', matchId: 'whatsapp' },
    { id: 'nextcloud', name: 'Nextcloud', icon: '💾', matchId: 'drive' },
  ];

  // Randomize order on mount
  const [shuffledProprietary, setShuffledProprietary] = useState([]);
  const [shuffledFree, setShuffledFree] = useState([]);

  useEffect(() => {
      setShuffledProprietary([...proprietaryApps].sort(() => Math.random() - 0.5));
      setShuffledFree([...freeApps].sort(() => Math.random() - 0.5));
  }, []);

  const [selectedProprietary, setSelectedProprietary] = useState(null);
  const [selectedFree, setSelectedFree] = useState(null);
  const [matches, setMatches] = useState([]); // Array of matched IDs
  const [feedback, setFeedback] = useState(null); // { type: 'success'|'error', message: '' }

  const handleProprietaryClick = (app) => {
    if (matches.includes(app.id)) return;
    setSelectedProprietary(app);
    setFeedback(null);
    
    if (selectedFree) {
        checkMatch(app, selectedFree);
    }
  };

  const handleFreeClick = (app) => {
    if (matches.includes(app.id)) return;
    setSelectedFree(app);
    setFeedback(null);

    if (selectedProprietary) {
        checkMatch(selectedProprietary, app);
    }
  };

  const checkMatch = (propApp, freeApp) => {
    if (propApp.matchId === freeApp.id) {
        // Match found
        setMatches([...matches, propApp.id, freeApp.id]);
        setFeedback({ type: 'success', message: `Excellent ! ${freeApp.name} est la bonne alternative.` });
        setSelectedProprietary(null);
        setSelectedFree(null);
    } else {
        // No match
        setFeedback({ type: 'error', message: `Non, ${freeApp.name} ne remplace pas ${propApp.name}. Réessaie !` });
        // Reset selection after short delay
        setTimeout(() => {
            setSelectedProprietary(null);
            setSelectedFree(null);
            setFeedback(null);
        }, 1000);
    }
  };

  const isComplete = matches.length === (proprietaryApps.length * 2);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-xl min-h-[800px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary-600">Étape 2 : Bureau du Proviseur</h2>
          <button onClick={goToMap} className="text-sm text-gray-500 hover:text-gray-700">Retour Carte</button>
      </div>

      <p className="text-center mb-8 text-gray-600">
          Le proviseur veut passer au libre mais il est perdu dans toutes ses applications.<br/>
          <strong>Aide-le à trouver les 8 équivalents libres !</strong>
          <br/><span className="text-sm text-gray-400">({matches.length / 2} / {proprietaryApps.length} paires trouvées)</span>
      </p>

      {feedback && (
          <div className={`p-3 rounded-lg text-center mb-6 font-bold animate-pulse sticky top-4 z-50 shadow-md ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {feedback.message}
          </div>
      )}

      <div className="flex flex-col md:flex-row gap-8 justify-center items-start flex-grow">
          
          {/* Proprietary Column */}
          <div className="flex-1 w-full bg-red-50 p-4 rounded-xl border border-red-100">
              <h3 className="text-center font-bold text-red-600 mb-4 text-lg flex items-center justify-center gap-2">
                  <span className="text-2xl">🏢</span> Logiciels Propriétaires
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {shuffledProprietary.map(app => {
                      const isMatched = matches.includes(app.id);
                      const isSelected = selectedProprietary?.id === app.id;
                      return (
                          <button
                              key={app.id}
                              onClick={() => handleProprietaryClick(app)}
                              disabled={isMatched}
                              className={`w-full p-3 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all h-28
                                  ${isMatched ? 'bg-gray-200 border-gray-300 opacity-40 scale-90' : 
                                    isSelected ? 'bg-white border-red-500 shadow-lg transform scale-105 ring-2 ring-red-200' : 
                                    'bg-white border-red-200 hover:border-red-400 hover:shadow-md'}
                              `}
                          >
                              <span className="text-3xl filter drop-shadow-sm">{app.icon}</span>
                              <span className="font-semibold text-sm text-center">{app.name}</span>
                              {isMatched && <Check className="text-green-600 absolute top-2 right-2 bg-white rounded-full p-0.5" size={20} />}
                          </button>
                      );
                  })}
              </div>
          </div>

          {/* Center Connector (Decoration) */}
          <div className="hidden md:flex flex-col items-center justify-center self-center text-gray-300">
              <div className="h-full border-l-2 border-dashed border-gray-300 my-4"></div>
              <div className="bg-white p-2 rounded-full border-2 border-gray-200 text-2xl">↔️</div>
              <div className="h-full border-l-2 border-dashed border-gray-300 my-4"></div>
          </div>

          {/* Free Column */}
          <div className="flex-1 w-full bg-green-50 p-4 rounded-xl border border-green-100">
              <h3 className="text-center font-bold text-green-600 mb-4 text-lg flex items-center justify-center gap-2">
                  <span className="text-2xl">🐧</span> Alternatives Libres
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {shuffledFree.map(app => {
                      const isMatched = matches.includes(app.id);
                      const isSelected = selectedFree?.id === app.id;
                      return (
                          <button
                              key={app.id}
                              onClick={() => handleFreeClick(app)}
                              disabled={isMatched}
                              className={`w-full p-3 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all h-28
                                  ${isMatched ? 'bg-gray-200 border-gray-300 opacity-40 scale-90' : 
                                    isSelected ? 'bg-white border-green-500 shadow-lg transform scale-105 ring-2 ring-green-200' : 
                                    'bg-white border-green-200 hover:border-green-400 hover:shadow-md'}
                              `}
                          >
                              <span className="text-3xl filter drop-shadow-sm">{app.icon}</span>
                              <span className="font-semibold text-sm text-center">{app.name}</span>
                              {isMatched && <Check className="text-green-600 absolute top-2 right-2 bg-white rounded-full p-0.5" size={20} />}
                          </button>
                      );
                  })}
              </div>
          </div>

      </div>

      {isComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] animate-fadeIn">
              <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md text-center transform animate-bounceIn">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">🏆</span>
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Migration Réussie !</h3>
                  <p className="text-gray-600 mb-6">
                      Le proviseur a maintenant tous les outils pour travailler librement.
                  </p>
                  <button 
                      onClick={() => completeStage(2)}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105 w-full"
                  >
                      Continuer vers la Salle des Profs →
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default BureauProviseur;
