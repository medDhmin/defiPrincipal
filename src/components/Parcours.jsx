import React, { useState, useEffect } from 'react';

const roleContents = {
    eleve: {
        step1: {
            title: "Défi : Identifier le Goliath",
            description: "Teste tes connaissances sur les dépendances numériques",
            question: "Combien d'ordinateurs l'État a-t-il dû jeter à cause de l'obsolescence de Windows 10 ?"
        },
        step2: {
            title: "Découvrir la Potion Magique",
            description: "Linux, le logiciel libre qui prolonge la vie de tes PC",
            content: "En tant qu'élève, tu peux participer à la transition de ton école ! Linux permet de faire fonctionner des ordinateurs anciens avec des performances modernes. Tu peux même tester Linux sur ton ordinateur personnel pour découvrir ses avantages."
        },
        step3: {
            title: "Construire le Village",
            description: "Comment toi, en tant qu'élève, peux agir",
            actions: [
                { num: 1, title: "Sensibiliser", desc: "Parle de NIRD à tes camarades et professeurs" },
                { num: 2, title: "Tester", desc: "Essaie Linux sur un vieux PC ou en mode live USB" },
                { num: 3, title: "Participer", desc: "Rejoins le club informatique ou propose un projet NIRD" }
            ]
        },
        step4: {
            title: "Rejoindre la Résistance",
            description: "Félicitations ! Tu es prêt à agir en tant qu'élève",
            badge: "Élève Résistant Numérique"
        }
    },
    enseignant: {
        step1: {
            title: "Défi : Identifier le Goliath",
            description: "Teste tes connaissances sur les dépendances numériques",
            question: "Combien d'ordinateurs l'État a-t-il dû jeter à cause de l'obsolescence de Windows 10 ?"
        },
        step2: {
            title: "Découvrir la Potion Magique",
            description: "Linux, le logiciel libre qui prolonge la vie de tes PC",
            content: "En tant qu'enseignant, tu es un acteur clé de la transition ! Linux offre tous les outils pédagogiques nécessaires (LibreOffice, GIMP, etc.) et permet de former tes élèves à un numérique responsable et souverain."
        },
        step3: {
            title: "Construire le Village",
            description: "Les 3 étapes pour adopter NIRD dans ton établissement",
            actions: [
                { num: 1, title: "Mobilisation", desc: "Sensibilise ta direction, présente les économies possibles" },
                { num: 2, title: "Expérimentation", desc: "Teste Linux sur quelques machines avec tes élèves" },
                { num: 3, title: "Intégration", desc: "Généralise avec reconditionnement et formation de l'équipe" }
            ]
        },
        step4: {
            title: "Rejoindre la Résistance",
            description: "Félicitations ! Tu es prêt à guider ta communauté",
            badge: "Enseignant Résistant Numérique"
        }
    },
    collectivite: {
        step1: {
            title: "Défi : Identifier le Goliath",
            description: "Teste tes connaissances sur les dépendances numériques",
            question: "Combien d'ordinateurs l'État a-t-il dû jeter à cause de l'obsolescence de Windows 10 ?"
        },
        step2: {
            title: "Découvrir la Potion Magique",
            description: "Linux, le logiciel libre qui prolonge la vie de tes PC",
            content: "En tant que collectivité, NIRD vous permet d'économiser des milliers d'euros tout en protégeant les données de vos citoyens. Les données restent en Europe, conformément au RGPD, et vous réduisez votre dépendance aux Big Tech."
        },
        step3: {
            title: "Construire le Village",
            description: "Les 3 étapes pour adopter NIRD dans votre collectivité",
            actions: [
                { num: 1, title: "Évaluation", desc: "Auditez vos équipements et calculez les économies potentielles" },
                { num: 2, title: "Pilotage", desc: "Lancez un projet pilote dans quelques établissements" },
                { num: 3, title: "Déploiement", desc: "Généralisez avec reconditionnement et formation des agents" }
            ]
        },
        step4: {
            title: "Rejoindre la Résistance",
            description: "Félicitations ! Vous êtes prêt à libérer votre collectivité",
            badge: "Collectivité Résistante Numérique"
        }
    },
    famille: {
        step1: {
            title: "Défi : Identifier le Goliath",
            description: "Teste tes connaissances sur les dépendances numériques",
            question: "Combien d'ordinateurs l'État a-t-il dû jeter à cause de l'obsolescence de Windows 10 ?"
        },
        step2: {
            title: "Découvrir la Potion Magique",
            description: "Linux, le logiciel libre qui prolonge la vie de tes PC",
            content: "En tant que famille, vous pouvez comprendre les enjeux et soutenir l'école de vos enfants. NIRD permet aux écoles d'économiser de l'argent qui peut être réinvesti dans l'éducation, tout en formant vos enfants à un numérique responsable."
        },
        step3: {
            title: "Construire le Village",
            description: "Comment vous, en tant que famille, pouvez soutenir NIRD",
            actions: [
                { num: 1, title: "Comprendre", desc: "Informez-vous sur les enjeux du numérique responsable" },
                { num: 2, title: "Soutenir", desc: "Soutenez l'école dans sa démarche NIRD lors des conseils" },
                { num: 3, title: "Participer", desc: "Proposez votre aide pour le reconditionnement des PC" }
            ]
        },
        step4: {
            title: "Rejoindre la Résistance",
            description: "Félicitations ! Vous êtes prêt à soutenir l'école",
            badge: "Famille Résistante Numérique"
        }
    }
};

const Parcours = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [quizAnswer, setQuizAnswer] = useState(null); // null, 'correct', 'incorrect'
    
    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setCurrentStep(1);
        setQuizAnswer(null);
        setTimeout(() => {
            const element = document.getElementById('parcours-content');
            if(element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleQuizAnswer = (isCorrect) => {
        if (quizAnswer !== null) return; // Prevent multiple clicks

        setQuizAnswer(isCorrect ? 'correct' : 'incorrect');
        
        if (isCorrect) {
            setTimeout(() => {
                setCurrentStep(2);
                setQuizAnswer(null);
            }, 1500);
        } else {
            setTimeout(() => {
                setQuizAnswer(null);
            }, 2000);
        }
    };

    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const content = selectedRole ? roleContents[selectedRole] : null;

    return (
        <section className="parcours-section" id="parcours">
            <div className="container">
                <h2 className="section-title">Choisis ton Personnage</h2>
                <p className="section-subtitle">Quel rôle souhaites-tu jouer dans la résistance ?</p>
                
                <div className="role-selector">
                    {['eleve', 'enseignant', 'collectivite', 'famille'].map((role) => (
                        <div 
                            key={role}
                            className={`role-card ${selectedRole === role ? 'selected' : ''}`}
                            onClick={() => handleRoleSelect(role)}
                            data-role={role}
                        >
                            <div className="role-icon">
                                {role === 'eleve' && '🎓'}
                                {role === 'enseignant' && '👨‍🏫'}
                                {role === 'collectivite' && '🏛️'}
                                {role === 'famille' && '👨‍👩‍👧‍👦'}
                            </div>
                            <h3>
                                {role === 'eleve' && 'Élève'}
                                {role === 'enseignant' && 'Enseignant'}
                                {role === 'collectivite' && 'Collectivité'}
                                {role === 'famille' && 'Famille'}
                            </h3>
                            <p>
                                {role === 'eleve' && 'Je veux agir dans mon école'}
                                {role === 'enseignant' && 'Je veux former mes élèves'}
                                {role === 'collectivite' && 'Je gère des équipements'}
                                {role === 'famille' && 'Je veux soutenir l\'école'}
                            </p>
                        </div>
                    ))}
                </div>
                
                {selectedRole && content && (
                    <div className="parcours-content" id="parcours-content">
                        <div className="parcours-steps">
                            {/* Step 1: Quiz */}
                            {currentStep === 1 && (
                                <div className="step active" data-step="1">
                                    <div className="step-number">1</div>
                                    <div className="step-content">
                                        <h3>{content.step1.title}</h3>
                                        <p>{content.step1.description}</p>
                                        
                                        <div className="quiz-container">
                                            <div className="quiz-question">
                                                <p><strong>Question 1 :</strong> {content.step1.question}</p>
                                                <div className="quiz-options">
                                                    <button 
                                                        className={`quiz-option ${quizAnswer === 'incorrect' ? 'incorrect' : ''}`}
                                                        onClick={() => handleQuizAnswer(false)}
                                                        disabled={quizAnswer !== null}
                                                    >
                                                        Environ 10 000
                                                    </button>
                                                    <button 
                                                        className={`quiz-option ${quizAnswer === 'incorrect' ? 'incorrect' : ''}`}
                                                        onClick={() => handleQuizAnswer(false)}
                                                        disabled={quizAnswer !== null}
                                                    >
                                                        Environ 100 000
                                                    </button>
                                                    <button 
                                                        className={`quiz-option ${quizAnswer === 'correct' ? 'correct' : ''}`}
                                                        onClick={() => handleQuizAnswer(true)}
                                                        disabled={quizAnswer !== null}
                                                    >
                                                        Plus de 200 millions (dans le monde)
                                                    </button>
                                                </div>
                                                {quizAnswer === 'incorrect' && <p className="error-msg" style={{color: 'var(--danger-color)', marginTop: '10px'}}>Ce n'est pas la bonne réponse, réessaie !</p>}
                                                {quizAnswer === 'correct' && <p className="success-msg" style={{color: 'var(--secondary-color)', marginTop: '10px'}}>Bravo ! C'est énorme n'est-ce pas ?</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Step 2: Potion Magique */}
                            {currentStep === 2 && (
                                <div className="step active" data-step="2">
                                    <div className="step-number">2</div>
                                    <div className="step-content">
                                        <h3>{content.step2.title}</h3>
                                        <p>{content.step2.description}</p>
                                        
                                        <div className="info-card">
                                            <div className="info-icon">🧪</div>
                                            <div className="info-text">
                                                <h4>Linux à la rescousse</h4>
                                                <p>{content.step2.content}</p>
                                            </div>
                                        </div>
                                        
                                        <button className="next-step-btn" onClick={nextStep}>
                                            Passer à l'action
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            {/* Step 3: Construction */}
                            {currentStep === 3 && (
                                <div className="step active" data-step="3">
                                    <div className="step-number">3</div>
                                    <div className="step-content">
                                        <h3>{content.step3.title}</h3>
                                        <p>{content.step3.description}</p>
                                        
                                        <div className="etapes-nird">
                                            {content.step3.actions.map((action, index) => (
                                                <div className="etape-card" key={index}>
                                                    <div className="etape-number">{action.num}</div>
                                                    <h4>{action.title}</h4>
                                                    <p>{action.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <button className="next-step-btn" onClick={nextStep}>
                                            Obtenir mon badge
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            {/* Step 4: Badge */}
                            {currentStep === 4 && (
                                <div className="step active" data-step="4">
                                    <div className="step-number">4</div>
                                    <div className="step-content">
                                        <h3>{content.step4.title}</h3>
                                        <p>{content.step4.description}</p>
                                        
                                        <div className="badge-container">
                                            <div className="badge">
                                                <div className="badge-icon">🎖️</div>
                                                <div className="badge-text">
                                                    <h4>{content.step4.badge}</h4>
                                                    <p>Bienvenue dans la résistance numérique !</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="action-buttons">
                                            <a href="#communaute" className="action-btn primary" onClick={(e) => { e.preventDefault(); document.getElementById('communaute').scrollIntoView({behavior: 'smooth'}) }}>Rejoindre la communauté</a>
                                            <a href="#guides" className="action-btn" onClick={(e) => { e.preventDefault(); document.getElementById('guides').scrollIntoView({behavior: 'smooth'}) }}>Télécharger le kit</a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Parcours;

