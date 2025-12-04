import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    closeMobileMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <span className="logo-icon">🛡️</span>
          <span className="logo-text">NIRD</span>
        </div>
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu} 
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`} id="nav-menu">
          <li>
            <a 
              href="#accueil" 
              className={`nav-link ${activeSection === 'accueil' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('accueil'); }}
            >
              Accueil
            </a>
          </li>
          <li>
            <a 
              href="#parcours" 
              className={`nav-link ${activeSection === 'parcours' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('parcours'); }}
            >
              Parcours
            </a>
          </li>
          <li>
            <a 
              href="#simulateur" 
              className={`nav-link ${activeSection === 'simulateur' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('simulateur'); }}
            >
              Simulateur
            </a>
          </li>
          <li>
            <a 
              href="#guides" 
              className={`nav-link ${activeSection === 'guides' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('guides'); }}
            >
              Guides
            </a>
          </li>
          <li>
            <a 
              href="#communaute" 
              className={`nav-link ${activeSection === 'communaute' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('communaute'); }}
            >
              Communauté
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

