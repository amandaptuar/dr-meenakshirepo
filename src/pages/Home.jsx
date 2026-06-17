import React from 'react';
import Hero from '../components/Hero';
import Transformations from '../components/Transformations';
import Services from '../components/Services';
import Benefits from '../components/Benefits';
import ObesityCrisis from '../components/ObesityCrisis';
import AIAssessment from '../components/AIAssessment';

const Home = () => {
  return (
    <>
      <Hero />
      <Transformations />
      <Services />
      <Benefits />
      <ObesityCrisis />
      <AIAssessment />
    </>
  );
};

export default Home;
