import React, { useState } from 'react';
import { useGame } from '../GameContext';
import { Monitor, HardDrive, Disc, Cpu, Trash2, Wind, Wrench } from 'lucide-react';

const SalleInformatique = () => {
  const { completeStage, goToMap } = useGame();
  
  // Initial State: PC is dusty, slow (HDD), no OS, low RAM.
  const [pcState, setPcState] = useState({ 
      os: null, 
      storage: 'HDD', 
      ram: '4GB', 
      isDusty: true,
      isScrewLoose: true 
  });
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState("Ce vieux PC fait un bruit d'avion et rame... Diagnostic ?");
  const [messageType, setMessageType] = useState("info"); // info, error, success

  const items = [
    { id: 'spray', name: 'Air Sec', icon: <Wind className="text-cyan-400" />, type: 'tool', description: 'Nettoyer la poussière' },
    { id: 'screwdriver', name: 'Tournevis', icon: <Wrench className="text-orange-500" />, type: 'tool', description: 'Resserrer les composants' },
    { id: 'ssd', name: 'SSD 500Go', icon: <HardDrive className="text-gray-800" />, type: 'hardware', description: 'Remplacer le disque lent' },
    { id: 'ram', name: 'RAM 16Go', icon: <Cpu className="text-green-600" />, type: 'hardware', description: 'Augmenter la mémoire' },
    { id: 'linux', name: 'Clé Linux Mint', icon: <Disc className="text-green-500" />, type: 'software', description: 'Installer un OS léger' },
    { id: 'windows', name: 'DVD Windows 11', icon: <Disc className="text-blue-500" />, type: 'software', description: 'Installer un OS lourd' },
  ];

  const handleFinish = () => {
      completeStage(1);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setMessage(`Tu as l'outil : ${item.name}. ${item.description}.`);
    setMessageType("info");
  };

  const handlePcClick = () => {
    if (!selectedItem) {
        setMessage("Sélectionne d'abord un outil ou un composant !");
        setMessageType("error");
        return;
    }

    // LOGIC FLOW
    // 1. Clean Dust
    if (selectedItem.id === 'spray') {
        if (pcState.isDusty) {
            setPcState(prev => ({ ...prev, isDusty: false }));
            setMessage("Pchiit ! La poussière s'envole. Le PC respire mieux !");
            setMessageType("success");
        } else {
            setMessage("C'est déjà propre !");
            setMessageType("info");
        }
        return;
    }

    // 2. Fix Screws
    if (selectedItem.id === 'screwdriver') {
        if (pcState.isScrewLoose) {
            setPcState(prev => ({ ...prev, isScrewLoose: false }));
            setMessage("Clic, clac. Tout est bien fixé maintenant.");
            setMessageType("success");
        } else {
            setMessage("Rien à visser de plus.");
            setMessageType("info");
        }
        return;
    }

    // If dusty or loose, prevent upgrades
    if (pcState.isDusty || pcState.isScrewLoose) {
        setMessage("Impossible de travailler proprement : le PC est sale ou mal fixé ! Nettoie-le d'abord.");
        setMessageType("error");
        return;
    }

    // 3. Hardware Upgrades
    if (selectedItem.id === 'ssd') {
        setPcState(prev => ({ ...prev, storage: 'SSD' }));
        setMessage("SSD installé ! Adieu les chargements infinis.");
        setMessageType("success");
        setSelectedItem(null);
        return;
    }

    if (selectedItem.id === 'ram') {
        setPcState(prev => ({ ...prev, ram: '16GB' }));
        setMessage("RAM boostée à 16Go ! C'est fluide.");
        setMessageType("success");
        setSelectedItem(null);
        return;
    }

    // 4. Software
    if (selectedItem.id === 'windows') {
        setMessage("Windows 11 est trop lourd pour ce processeur ancien... Ça rame ! 🐢");
        setMessageType("error");
        return;
    }

    if (selectedItem.id === 'linux') {
        if (pcState.storage !== 'SSD') {
            setMessage("Conseil d'ami : installe le SSD d'abord pour profiter de la vitesse !");
            setMessageType("info");
            return;
        }
        setPcState(prev => ({ ...prev, os: 'Linux Mint' }));
        setMessage("Linux installé ! Démarrage en 10 secondes chrono. 🚀");
        setMessageType("success");
        setSelectedItem(null);
        return;
    }
  };

  const isComplete = !pcState.isDusty && !pcState.isScrewLoose && pcState.storage === 'SSD' && pcState.ram === '16GB' && pcState.os === 'Linux Mint';

  return (
    <div className="p-6 w-[1150px] mx-auto bg-white rounded-xl shadow-xl min-h-[600px] ">
      <div className="flex justify-between items-center mb-6">
        
          <h2 className="text-2xl font-bold text-primary-600">Étape 1 : Salle Informatique</h2>
          <button onClick={goToMap} className="text-sm text-gray-500 hover:text-gray-700">Retour Carte</button>
      </div>

      <br></br>

      <div className={`p-6 h-12 rounded-lg mb-6 flex items-center justify-center font-medium transition-colors duration-300 ${
          messageType === 'error' ? 'bg-red-100 text-red-700 border border-red-200' : 
          messageType === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 
          'bg-blue-100 text-blue-700 border border-blue-200'
      }`}>

          {message}

      </div>
      <br></br>

      <div className="flex flex-row  gap-8 items-start justify-center flex-grow ">
          
          {/* Inventory Panel */}
          <div className="w-[600px]  bg-slate-50 px-12 py-10 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold mb-8 text-center text-slate-700 flex items-center justify-center gap-2">
                  <Wrench size={20} /> Boîte à Outils
              </h3>
              <div className="grid grid-cols-2 gap-6">
                  {items.map(item => (
                      <button
                          key={item.id}
                          onClick={() => handleItemClick(item)}
                          className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all duration-200 relative overflow-hidden group
                              ${selectedItem?.id === item.id 
                                  ? 'border-blue-500 bg-blue-50 shadow-md scale-105' 
                                  : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm'
                              }
                          `}
                      >
                          <div className="z-10 flex flex-col items-center">
                              <span className="transform transition-transform group-hover:scale-110">{item.icon}</span>
                              <span className="text-xs font-bold mt-2 text-slate-700">{item.name}</span>
                          </div>
                      </button>
                  ))}
              </div>
              <div className="mt-6 text-xs text-slate-500 italic text-center">
                  Ordre conseillé : Nettoyage → Matériel → Logiciel
              </div>
          </div>

          {/* The PC View */}
          <div className="w-full relative">
              <div 
                  className="aspect-video bg-slate-800 rounded-2xl border-8 border-slate-700 relative flex flex-col items-center justify-center cursor-pointer shadow-2xl overflow-hidden group"
                  onClick={handlePcClick}
              >
                  {/* Screen Content */}
                  <div className="z-20 text-center p-4">
                      {pcState.os === 'Linux Mint' ? (
                          <div className="animate-pulse flex flex-col items-center">
                              <Monitor size={80} className="text-green-400 mb-2" />
                              <h2 className="text-green-400 font-mono text-2xl font-bold">SYSTEM READY</h2>
                              <p className="text-green-600 font-mono">Linux Mint 21.3</p>
                          </div>
                      ) : (
                          <div className="flex flex-col items-center opacity-50">
                              <Monitor size={80} className="text-slate-400 mb-2" />
                              <p className="text-slate-500 font-mono">No Signal / Slow Boot</p>
                          </div>
                      )}
                  </div>

                  {/* Visual Overlays for Status */}
                  {pcState.isDusty && (
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-40 pointer-events-none z-30"></div>
                  )}
                  {pcState.isDusty && (
                      <div className="absolute top-4 right-4 bg-yellow-500/80 text-black text-xs font-bold px-2 py-1 rounded animate-bounce z-30">
                          ⚠️ Poussière
                      </div>
                  )}
                  {pcState.isScrewLoose && (
                      <div className="absolute bottom-4 left-4 bg-orange-500/80 text-white text-xs font-bold px-2 py-1 rounded animate-pulse z-30">
                          🔧 Vis desserrées
                      </div>
                  )}

                  {/* Internal Components Visuals (Abstract) */}
                  <div className="absolute bottom-0 w-full h-1/3 bg-slate-900/80 backdrop-blur-sm  z-20 border-t border-slate-600 flex justify-around items-center px-4">
                      <div className={`flex flex-col items-center ${pcState.storage === 'SSD' ? 'text-green-400' : 'text-red-400'}`}>
                          <HardDrive size={24} />
                          <span className="text-[10px] font-mono mt-1">{pcState.storage}</span>
                      </div>
                      <div className={`flex flex-col items-center ${pcState.ram === '16GB' ? 'text-green-400' : 'text-yellow-400'}`}>
                          <Cpu size={24} />
                          <span className="text-[10px] font-mono mt-1">{pcState.ram}</span>
                      </div>
                      <div className={`flex flex-col items-center ${pcState.os ? 'text-green-400' : 'text-slate-500'}`}>
                          <Disc size={24} />
                          <span className="text-[10px] font-mono mt-1">{pcState.os || 'No OS'}</span>
                      </div>
                  </div>

                  {/* Hover interaction hint */}
                  {selectedItem && (
                      <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-40 pointer-events-none">
                          <div className="bg-black/80 text-white px-4 py-2 rounded-full transform scale-110">
                              Utiliser {selectedItem.name}
                          </div>
                      </div>
                  )}
              </div>
          </div>
      </div>

      {isComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] animate-fadeIn">
              <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md text-center transform animate-bounceIn">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Monitor size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Ordinateur Sauvé !</h3>
                  <p className="text-gray-600 mb-6">
                      De la décharge à la haute performance grâce au reconditionnement et au libre.
                  </p>
                  <button 
                      onClick={handleFinish}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105 w-full"
                  >
                      Continuer vers le Bureau du Proviseur →
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default SalleInformatique;
