import React, { useState, useEffect } from 'react';

const Simulateur = () => {
    const [inputs, setInputs] = useState({
        nbPC: 50,
        agePC: 8,
        licences: 5000
    });

    const [results, setResults] = useState({
        coutRachat: 0,
        coutLicences: 0,
        totalActuel: 0,
        coutReconditionnement: 0,
        totalNird: 0,
        economies: 0,
        pcSauves: 0,
        pcRemplaces: 0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: parseInt(value) || 0
        }));
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    useEffect(() => {
        const calculateSavings = () => {
            const { nbPC, agePC, licences } = inputs;
            
            const prixPCNeuf = 800;
            const dureeViePC = 10; 
            
            const ageDans5Ans = agePC + 5; // age des PC dans 5 ans
            const pourcentageARemplacer = Math.min(100, Math.max(0, (ageDans5Ans / dureeViePC) * 100));
            const nbPCARemplacer = Math.ceil(nbPC * (pourcentageARemplacer / 100));
            const nbPCSauves = nbPC - nbPCARemplacer;
            
            // depends on the age
            let prixReconditionnementParPC;
            if (agePC <= 5) {
                prixReconditionnementParPC = 30; 
            } else if (agePC <= 8) {
                prixReconditionnementParPC = 50; 
            } else if (agePC <= 12) {
                prixReconditionnementParPC = 80; 
            } else {
                prixReconditionnementParPC = 120; 
            }
            
            // Scénario Actuel
            const coutRachat = nbPCARemplacer * prixPCNeuf;
            const coutLicences5ans = licences * 5;
            const totalActuel = coutRachat + coutLicences5ans;
            
            // Scénario NIRD
            const coutReconditionnement = nbPC * prixReconditionnementParPC;
            const totalNIRD = coutReconditionnement;
            
            const economies = totalActuel - totalNIRD;

            setResults({
                coutRachat,
                coutLicences: coutLicences5ans,
                totalActuel,
                coutReconditionnement,
                totalNird: totalNIRD,
                economies,
                pcSauves: nbPCSauves,
                pcRemplaces: nbPCARemplacer
            });
        };

        calculateSavings();
    }, [inputs]);

    return (
        <section className="simulateur-section" id="simulateur">
            <div className="container">
                <h2 className="section-title">Simulateur d'Économies</h2>
                <p className="section-subtitle">Calculez combien votre établissement pourrait économiser</p>
                
                <div className="simulator-container">
                    <div className="simulator-inputs">
                        <div className="input-group">
                            <label htmlFor="nb-pc">Nombre de PC</label>
                            <input 
                                type="number" 
                                id="nb-pc" 
                                name="nbPC" 
                                min="1" 
                                value={inputs.nbPC} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="age-pc">Âge moyen des PC (ans)</label>
                            <input 
                                type="number" 
                                id="age-pc" 
                                name="agePC" 
                                min="0" 
                                max="20" 
                                value={inputs.agePC} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="licences">Coût annuel licences (€)</label>
                            <input 
                                type="number" 
                                id="licences" 
                                name="licences" 
                                min="0" 
                                value={inputs.licences} 
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    
                    <div className="simulator-results">
                        <div className="result-card">
                            <h3>Scénario Actuel (5 ans)</h3>
                            <div className="result-item">
                                <span className="result-label">Rachat matériel</span>
                                <span className="result-value" id="cout-rachat">{formatCurrency(results.coutRachat)}</span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">Licences logicielles</span>
                                <span className="result-value" id="cout-licences">{formatCurrency(results.coutLicences)}</span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">Impact matériel</span>
                                <span className="result-value" id="pc-remplaces">{results.pcRemplaces} PC remplacés</span>
                            </div>
                            <div className="result-item total">
                                <span className="result-label">Total</span>
                                <span className="result-value" id="total-actuel">{formatCurrency(results.totalActuel)}</span>
                            </div>
                        </div>
                        
                        <div className="result-card">
                            <h3>Avec NIRD (5 ans)</h3>
                            <div className="result-item">
                                <span className="result-label">Reconditionnement</span>
                                <span className="result-value success" id="cout-reconditionnement">{formatCurrency(results.coutReconditionnement)}</span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">Logiciels Libres</span>
                                <span className="result-value success">0 €</span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">Impact matériel</span>
                                <span className="result-value success" id="pc-sauves">{results.pcSauves} PC sauvés</span>
                            </div>
                            <div className="result-item total">
                                <span className="result-label">Total</span>
                                <span className="result-value success" id="total-nird">{formatCurrency(results.totalNird)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ marginTop: '2rem' }}>
                        <div className="economies-card">
                            <div className="economies-icon">💰</div>
                            <div className="economies-content">
                                <h3>Économies Potentielles</h3>
                                <div className="economies-amount" id="economies">{formatCurrency(results.economies)}</div>
                                <p className="economies-detail">sur 5 ans pour votre établissement</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Simulateur;

