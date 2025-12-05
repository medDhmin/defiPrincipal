import React, { useState } from 'react';
import { GameProvider, useGame } from './game/GameContext';
import GameContainer from './game/GameContainer';

const ParcoursContent = () => {
    const { startGame, role } = useGame();
    
    const handleRoleSelect = (selectedRole) => {
        startGame(selectedRole);
        setTimeout(() => {
            const element = document.getElementById('game-container');
            if(element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    return (
        <section className="parcours-section " id="parcours">
            <div className="container  ">
                <h2 className="section-title">Choisis ton Personnage</h2>
                <p className="section-subtitle">Quel rôle souhaites-tu jouer dans la résistance ?</p>
                
                <div className="role-selector bg-">
                    {['eleve', 'enseignant', 'collectivite', 'famille'].map((r) => (
                        <div 
                            key={r}
                            className={`role-card ${role === r ? 'selected' : ''}`}
                            onClick={() => handleRoleSelect(r)}
                        >
                            <div className="role-icon">
                                {r === 'eleve' && '🎓'}
                                {r === 'enseignant' && '👨‍🏫'}
                                {r === 'collectivite' && '🏛️'}
                                {r === 'famille' && '👨‍👩‍👧‍👦'}
                            </div>
                            <h3>
                                {r === 'eleve' && 'Élève'}
                                {r === 'enseignant' && 'Enseignant'}
                                {r === 'collectivite' && 'Collectivité'}
                                {r === 'famille' && 'Famille'}
                            </h3>
                            <p>
                                {r === 'eleve' && 'Je veux agir dans mon école'}
                                {r === 'enseignant' && 'Je veux former mes élèves'}
                                {r === 'collectivite' && 'Je gère des équipements'}
                                {r === 'famille' && 'Je veux soutenir l\'école'}
                            </p>
                        </div>
                    ))}
                </div>
                
                {role && (
                    <div id="game-container" className="mt-12  h-[900px] p-9 animate-fadeIn">
                        <GameContainer />
                    </div>
                )}
            </div>
        </section>
    );
};

const Parcours = () => {
    return (
        <GameProvider>
            <ParcoursContent />
        </GameProvider>
    );
};

export default Parcours;
