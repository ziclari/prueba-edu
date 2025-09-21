import './App.css'
import OnBoarding from './components/onBoarding';
import Button from "./components/button";
import useLocalStorage from './hooks/useLocalStorage';

const SAVED_KEYS = {
  showOnboarding: 'showOnboarding',
}

function App() {
  const [showOnboarding, setShowOnboarding] = useLocalStorage(
    SAVED_KEYS.showOnboarding,
    true
  );

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
