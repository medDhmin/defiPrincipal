import React from 'react';
import { useGame } from './GameContext';
import Map from './Map';
import SalleInformatique from './puzzles/SalleInformatique';
import BureauProviseur from './puzzles/BureauProviseur';
import SalleProfs from './puzzles/SalleProfs';
import LocalServeur from './puzzles/LocalServeur';
import CourLycee from './puzzles/CourLycee';

const GameContainer = () => {
  const { currentStage, role } = useGame();

  // If no role selected, we shouldn't be here, but just in case
  if (!role) return <div>Veuillez sélectionner un rôle.</div>;

  switch (currentStage) { 
    case 0: return <Map />;
    case 1: return <SalleInformatique />;
    case 2: return <BureauProviseur />;
    case 3: return <SalleProfs />;
    case 4: return <LocalServeur />;
    case 5: return <CourLycee />;
    default: return <Map />;

  }
};

export default GameContainer;

