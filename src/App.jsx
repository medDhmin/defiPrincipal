import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Parcours from './components/Parcours';
import Simulateur from './components/Simulateur';
import Guides from './components/Guides';
import Communaute from './components/Communaute';
import Footer from './components/Footer';
import { Chatbot } from './components/Chatbot';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Parcours />
      <Simulateur />
      <Guides />
      <Communaute />

      <Chatbot
        title="Assistant Démo"
        greeting="Bonjour ! Je suis la version autonome du chatbot. Comment puis-je vous aider ?"
      />
      <Footer />
    </>
  );
}

export default App;

