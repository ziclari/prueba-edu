import './App.css'
import OnBoarding from './components/onBoarding';
import AccountingTable from './components/excerciseTable';
import Excercise from './components/excercise';
import Button from "./components/button";
import useLocalStorage from './hooks/useLocalStorage';
import { useState } from 'react';
import { validateAnswers } from './helpers/validateAnswers';
import { initialData } from './data/accountingInitialData';
import { SAVED_KEYS } from './data/localSavedKeys';
import { accountingProblem } from './data/accountingProblem';
import ValidationModal from './components/validationModal';
import InstruccionsModal from './components/instructionsModal';

function App() {
  const [data, setData] = useState(initialData);
  const [validation, setValidation] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showOnboarding, setShowOnboarding] = useLocalStorage(
    SAVED_KEYS.showOnboarding,
    false
  );
  
  
  const handleValidate = () => {
    const validationResult = validateAnswers(data);
    setValidation(validationResult);
  };

   const handleReset = () => {
    setData(initialData);
    setValidation(null);
  };

  return (
    <>
    <span className="block w-full p-2 bg-primary mb-2"></span>

    <div className="max-w-3xl mx-auto p-4">
      <h1 className='text-3xl font-bold text-center font-header mb-2'>{accountingProblem.title}</h1>
      <div className='inline-flex gap-2 flex-wrap justify-center w-full'>
        <Button
          onClick={() => setShowInstructions(true)}
          title="Cómo llenar la tabla"
          type="helper"
          icon="mdi:information-outline"
          iconPosition="left"
          textSize='text-md'
        />
        <Button
          onClick={() => setShowOnboarding(true)}
          title="Ver bienvenida"
          type="helper"
          icon="mdi:star-outline"
          iconPosition="left"
          textSize='text-md'
        />
      </div>
      <hr className='text-gray-300 mb-4'/>

      <Excercise problem={accountingProblem}>
        <AccountingTable data={data} setData={setData} validation={validation}/>
      </Excercise>
      
      {validation && <ValidationModal validation={validation}/>}

      <div className='fixed inset-x-0 bottom-0 bg-white border border-gray-300 py-4 px-8 inline-flex justify-end gap-4'>
        <Button
          onClick={handleReset}
          title="Limpiar"
          type='secondary'
          textSize='justify-center'
        />
        <Button
          onClick={handleValidate}
          title="Revisar"
          textSize='text-xl w-sm justify-center'
        />
      </div>
      
      {showOnboarding && <OnBoarding onClose={() => setShowOnboarding(false)} />}
      { showInstructions && <InstruccionsModal onClose={() => setShowInstructions(false)} /> }
    </div>
    </>
  )
}

export default App
