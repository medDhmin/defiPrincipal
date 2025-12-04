import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Parcours from './components/Parcours';
import Simulateur from './components/Simulateur';
import Guides from './components/Guides';
import Communaute from './components/Communaute';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Parcours />
      <Simulateur />
      <Guides />
      <Communaute />
      <Footer />
    </>
  );
}

export default App;

