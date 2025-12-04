import React from 'react';

const Guides = () => {
    return (
        <section className="guides-section" id="guides">
            <div className="container">
                <h2 className="section-title">Guides & Ressources</h2>
                <p className="section-subtitle">Tout ce dont vous avez besoin pour passer à l'action</p>
                
                <div className="guides-grid">
                    <div className="guide-card">
                        <div className="guide-icon">🐧</div>
                        <h3>Installer Linux</h3>
                        <p>Un guide pas à pas pour installer Linux Mint ou Ubuntu sur n'importe quel ordinateur.</p>
                        <a href="#" className="guide-link">Télécharger le PDF →</a>
                    </div>
                    
                    <div className="guide-card">
                        <div className="guide-icon">📋</div>
                        <h3>Argumentaire Direction</h3>
                        <p>Les arguments clés pour convaincre votre direction ou votre mairie de passer au libre.</p>
                        <a href="#" className="guide-link">Télécharger le Kit →</a>
                    </div>
                    
                    <div className="guide-card">
                        <div className="guide-icon">🛠️</div>
                        <h3>Atelier Réparation</h3>
                        <p>Comment organiser un atelier de reconditionnement avec les élèves.</p>
                        <a href="#" className="guide-link">Voir le tutoriel →</a>
                    </div>
                    
                    <div className="guide-card">
                        <div className="guide-icon">📢</div>
                        <h3>Kit de Communication</h3>
                        <p>Affiches, flyers et présentations pour sensibiliser votre établissement.</p>
                        <a href="#" className="guide-link">Télécharger les visuels →</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Guides;

