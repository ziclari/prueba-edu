import './App.css'
import OnBoarding from './components/onBoarding';
import Button from "./components/button";
import { useState } from 'react';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <>
      <Button
        onClick={() => setShowOnboarding(true)}
        title="Ver bienvenida de nuevo"
        type="helper"
        icon="mdi:star-outline"
        iconPosition="left"
      />
      {showOnboarding && <OnBoarding onClose={() => setShowOnboarding(false)} />}
    </>
  )
}

export default App
