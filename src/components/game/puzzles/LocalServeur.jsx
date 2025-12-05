import React, { useState, useEffect } from 'react';
import { useGame } from '../GameContext';
import { Server, Network, Cable, Wifi } from 'lucide-react';

const LocalServeur = () => {
  const { completeStage, goToMap } = useGame();
  
  // 0: Up, 1: Right, 2: Down, 3: Left
  const TILE_TYPES = {
      STRAIGHT: { exits: [0, 2] }, // Top-Bottom default
      CORNER: { exits: [1, 2] },   // Right-Bottom default
      T: { exits: [1, 2, 3] },     // Right-Bottom-Left default
      CROSS: { exits: [0, 1, 2, 3] } // All directions
  };

  // 4x4 Grid Configuration
  // Path designed:
  // (0,0) -> (0,1) -> (1,1) -> (1,2) -> (2,2) -> (2,1) -> (3,1) -> (3,2) -> (3,3)
  // S -> R -> D -> R -> D -> L -> D -> R -> R -> E
  
  const INITIAL_GRID = [
      // Row 0
      { type: 'STRAIGHT', rotation: 90, id: 0 },   // (0,0) L-R (In from Left server, Out Right)
      { type: 'CORNER', rotation: 90, id: 1 },     // (0,1) L-D (In Left, Out Down)
      { type: 'STRAIGHT', rotation: 0, id: 2 },    // (0,2) Filler (Up-Down)
      { type: 'CORNER', rotation: 180, id: 3 },    // (0,3) Filler
      
      // Row 1
      { type: 'T', rotation: 0, id: 4 },           // (1,0) Filler
      { type: 'CORNER', rotation: 0, id: 5 },      // (1,1) U-R (In Up, Out Right)
      { type: 'CORNER', rotation: 90, id: 6 },     // (1,2) L-D (In Left, Out Down)
      { type: 'STRAIGHT', rotation: 90, id: 7 },   // (1,3) Filler
      
      // Row 2
      { type: 'STRAIGHT', rotation: 0, id: 8 },    // (2,0) Filler
      { type: 'CORNER', rotation: 270, id: 9 },    // (2,1) R-D (In Right, Out Down)
      { type: 'CORNER', rotation: 180, id: 10 },   // (2,2) U-L (In Up, Out Left)
      { type: 'T', rotation: 180, id: 11 },        // (2,3) Filler
      
      // Row 3
      { type: 'CORNER', rotation: 0, id: 12 },     // (3,0) Filler
      { type: 'CORNER', rotation: 0, id: 13 },     // (3,1) U-R (In Up, Out Right)
      { type: 'STRAIGHT', rotation: 90, id: 14 },  // (3,2) L-R (In Left, Out Right)
      { type: 'STRAIGHT', rotation: 90, id: 15 },  // (3,3) L-R (In Left, Out Right to Exit)
  ];
  
  // Start Point: Enters (0,0) from Left (Direction 3)
  // End Point: Exits (3,3) to Right (Direction 1)

  const [grid, setGrid] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
      // Initialize with random rotations
      setGrid(INITIAL_GRID.map(t => ({ ...t, rotation: Math.floor(Math.random() * 4) * 90 })));
      setIsInitialized(true);
  }, []);

  const getExits = (tile) => {
      const baseExits = TILE_TYPES[tile.type].exits;
      // Rotate exits
      const rotIndex = (tile.rotation / 90) % 4;
      return baseExits.map(e => (e + rotIndex) % 4);
  };

  const hasExit = (tile, direction) => {
      return getExits(tile).includes(direction);
  };

  const checkConnection = () => {
      if (!isInitialized) return;

      // BFS from Start (Entry at 0 from Left side)
      // We consider 0 "connected" if it has an opening to Left (3)
      const startTile = grid[0];
      if (!hasExit(startTile, 3)) {
          setIsConnected(false);
          return;
      }

      const queue = [0];
      const visited = new Set([0]);
      
      // 0: Up (-4), 1: Right (+1), 2: Down (+4), 3: Left (-1)
      const getNeighbor = (index, dir) => {
          let nextIndex = -1;
          if (dir === 0) nextIndex = index - 4;
          if (dir === 1 && index % 4 !== 3) nextIndex = index + 1;
          if (dir === 2) nextIndex = index + 4;
          if (dir === 3 && index % 4 !== 0) nextIndex = index - 1;
          
          if (nextIndex >= 0 && nextIndex < 16) return nextIndex;
          return -1;
      };
      
      const opposite = (dir) => (dir + 2) % 4;

      let reachedEnd = false;

      while (queue.length > 0) {
          const currIdx = queue.shift();
          
          // Check if we reached the end tile (15)
          if (currIdx === 15) {
              // Must exit to Right (1)
              if (hasExit(grid[currIdx], 1)) {
                  reachedEnd = true;
              }
          }
          
          const currTile = grid[currIdx];
          const exits = getExits(currTile);
          
          exits.forEach(dir => {
              const neighborIdx = getNeighbor(currIdx, dir);
              if (neighborIdx !== -1) {
                  const neighborTile = grid[neighborIdx];
                  // Check if neighbor connects back
                  if (hasExit(neighborTile, opposite(dir))) {
                      if (!visited.has(neighborIdx)) {
                          visited.add(neighborIdx);
                          queue.push(neighborIdx);
                      }
                  }
              }
          });
      }
      
      setIsConnected(reachedEnd);
  };

  useEffect(() => {
      checkConnection();
  }, [grid]);

  const rotateTile = (index) => {
      if (isConnected) return; 
      const newGrid = [...grid];
      newGrid[index].rotation = (newGrid[index].rotation + 90) % 360;
      setGrid(newGrid);
  };

  if (!isInitialized) return <div>Chargement du serveur...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-xl min-h-[600px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary-600">Étape 4 : Local Serveur</h2>
          <button onClick={goToMap} className="text-sm text-gray-500 hover:text-gray-700">Retour Carte</button>
      </div>

      <p className="text-center mb-8 text-gray-600">
          Le réseau est coupé ! <strong>Rétablissez la connexion entre le serveur principal et le switch du lycée.</strong>
          <br/><span className="text-sm text-gray-400">Le signal part du serveur (Haut-Gauche) et doit arriver au lycée (Bas-Droite).</span>
      </p>

      <div className="flex flex-col items-center flex-grow justify-center">
          <div className="relative p-6 bg-slate-900 rounded-2xl shadow-2xl border-4 border-slate-700">
              
              {/* Server Icon (Start) */}
              <div className="absolute -left-20 top-4 flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transition-all ${isConnected ? 'bg-green-900 shadow-green-500/50' : 'bg-slate-800'}`}>
                      <Server size={32} className="text-green-400 animate-pulse" />
                  </div>
                  <span className="text-xs font-bold mt-2 text-slate-600">SERVEUR</span>
                  {/* Cable to grid */}
                  <div className="absolute top-8 -right-6 w-6 h-2 bg-green-500"></div>
              </div>
              
              {/* Network Icon (End) */}
              <div className="absolute -right-20 bottom-4 flex flex-col items-center">
                   {/* Cable from grid */}
                  <div className={`absolute top-8 -left-6 w-6 h-2 transition-colors ${isConnected ? 'bg-green-500' : 'bg-slate-700'}`}></div>
                  
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transition-all ${isConnected ? 'bg-blue-600 shadow-blue-500/50 scale-110' : 'bg-slate-800'}`}>
                      <Wifi size={32} className={`transition-colors ${isConnected ? 'text-white animate-bounce' : 'text-slate-600'}`} />
                  </div>
                  <span className="text-xs font-bold mt-2 text-slate-600">LYCÉE</span>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-4 gap-1 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] bg-slate-800 p-1 rounded-lg">
                  {grid.map((tile, idx) => {
                      // Determine if tile is part of the active path (visual polish - advanced feature, skipped for now, simple blue is fine)
                      return (
                        <div 
                            key={idx}
                            onClick={() => rotateTile(idx)}
                            className={`bg-slate-700/50 relative cursor-pointer hover:bg-slate-600 transition-all duration-200 overflow-hidden rounded-sm border border-slate-600/30`}
                        >
                            <div 
                                className={`absolute inset-0 transition-transform duration-300 ease-in-out p-2`}
                                style={{ transform: `rotate(${tile.rotation}deg)` }}
                            >
                                {tile.type === 'STRAIGHT' && (
                                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                                        <line x1="50" y1="-10" x2="50" y2="110" stroke={isConnected ? "#10b981" : "#3b82f6"} strokeWidth="24" strokeLinecap="square" />
                                        <line x1="50" y1="-10" x2="50" y2="110" stroke="rgba(255,255,255,0.2)" strokeWidth="6" strokeLinecap="square" />
                                    </svg>
                                )}
                                {tile.type === 'CORNER' && (
                                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                                        <path d="M 50 110 L 50 50 Q 50 50 110 50" fill="none" stroke={isConnected ? "#10b981" : "#3b82f6"} strokeWidth="24" strokeLinecap="square" />
                                        <path d="M 50 110 L 50 50 Q 50 50 110 50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" strokeLinecap="square" />
                                    </svg>
                                )}
                                {tile.type === 'T' && (
                                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                                        <path d="M 50 110 L 50 50 L 110 50 M 50 50 L -10 50" fill="none" stroke={isConnected ? "#10b981" : "#3b82f6"} strokeWidth="24" strokeLinecap="square" />
                                    </svg>
                                )}
                                {/* Center Hub for visual flair */}
                                <circle cx="50%" cy="50%" r="12%" fill="#1e293b" stroke={isConnected ? "#10b981" : "#3b82f6"} strokeWidth="2" />
                            </div>
                        </div>
                      );
                  })}
              </div>
          </div>

          {isConnected && (
              <div className="mt-8 text-center animate-bounceIn">
                  <div className="flex items-center justify-center gap-2 text-green-600 font-bold text-xl mb-4">
                      <CheckCircle2Icon /> Connexion Établie !
                  </div>
                  <button 
                      onClick={() => completeStage(4)}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105 w-full max-w-xs"
                  >
                      Activer le Réseau →
                  </button>
              </div>
          )}
      </div>
    </div>
  );
};

const CheckCircle2Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
);

export default LocalServeur;
