import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>NIRD</h4>
                    <p>Numérique Indépendant, Responsable et Durable</p>
                </div>
                
                <div className="footer-section">
                    <h4>Liens Utiles</h4>
                    <ul>
                        <li><a href="#accueil">Accueil</a></li>
                        <li><a href="#parcours">Parcours</a></li>
                        <li><a href="#simulateur">Simulateur</a></li>
                        <li><a href="#guides">Guides</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h4>Ressources</h4>
                    <ul>
                        <li><a href="#">Documentation</a></li>
                        <li><a href="#">GitHub</a></li>
                        <li><a href="#">Communauté</a></li>
                        <li><a href="#">Presse</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h4>Contact</h4>
                    <ul>
                        <li><a href="mailto:contact@nird.fr">contact@nird.fr</a></li>
                        <li><a href="#">Twitter / X</a></li>
                        <li><a href="#">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; 2025 NIRD - Tous droits réservés. Fait avec ❤️ pour la Nuit de l'Info.</p>
            </div>
        </footer>
    );
};

export default Footer;

