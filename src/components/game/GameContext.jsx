import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [currentStage, setCurrentStage] = useState(0); // 0 = Map, 1-5 = Puzzles
  const [completedStages, setCompletedStages] = useState([]); // Array of stage IDs (numbers)
  const [role, setRole] = useState(null);

  const startGame = (selectedRole) => {
    setRole(selectedRole);
    setCurrentStage(0); // Start at map
  };

  const goToStage = (stageId) => {
    // Stage 1 is always open.
    // Stage N (where N > 1) requires Stage N-1 to be in completedStages.
    const isAccessible = stageId === 1 || completedStages.includes(stageId - 1);
    
    if (isAccessible) {
        setCurrentStage(stageId);
    } else {
        // In a real game we might show a locked animation
        console.log("Stage locked");
    }
  };
  
  const goToMap = () => {
      setCurrentStage(0);
  };

  const completeStage = (stageId) => {
      if (!completedStages.includes(stageId)) {
          setCompletedStages(prev => [...prev, stageId]);
      }
      // After completion, return to map to choose next destination (or we could auto-route)
      // The prompt says "Une pièce est accessible uniquement si la précédente est résolue", implying a map choice or linear flow.
      // A map hub feels more "Escape Game".
      setTimeout(() => {
          setCurrentStage(0);
      }, 1500); // Small delay to show success message in component
  };

  return (
    <GameContext.Provider value={{ 
        currentStage, 
        completedStages, 
        role, 
        startGame, 
        goToStage, 
        completeStage,
        goToMap
    }}>
      {children}
    </GameContext.Provider>
  );
};

