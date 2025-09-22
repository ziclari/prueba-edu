import './App.css'
import OnBoarding from './components/onBoarding';
import AccountingTable from './components/excerciseTable';
import Excercise from './components/excercise';
import Button from "./components/button";
import useLocalStorage from './hooks/useLocalStorage';
import { useState } from 'react';
import { validateAnswers } from './helpers/validateAnswers';
import { initialData } from './data/accInitialData';

const SAVED_KEYS = {
  showOnboarding: 'showOnboarding',
}

const problem ={
  title: "Ejercitador de Contabilidad",
  description: "La Comercializadora Central, registra las siguientes operaciones de su primer mes. La cuenta a afectar es Banco.",
  steps: [
    "El saldo inicial es de 850,000",
    "Se pagó al proveedor INMOBILIARIA SA la cantidad de $17,700",
    "Se vendió una máquina envasadora por la cantidad de $120,000",
    "Se entregó viáticos por viaje a Monterrey al vendedor Javier Barrera por $70,000",
    "El cliente ZAZA SA pagó por un servicio la cantidad de $25,000"
  ]
}

function App() {
  const [showOnboarding, setShowOnboarding] = useLocalStorage(
    SAVED_KEYS.showOnboarding,
    true
  );
  
  const [data, setData] = useState(initialData);
  const [validation, setValidation] = useState(null);

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
      <h1 className='text-3xl font-bold text-center font-header mb-2'>{problem.title}</h1>
      <div className='text-md'>
        <Button
          onClick={() => setShowOnboarding(true)}
          title="Ver bienvenida de nuevo"
          type="helper"
          icon="mdi:star-outline"
          iconPosition="left"
          textSize='md'
        />
      </div>
      <hr className='text-gray-300 mb-4'/>

      <Excercise problem={problem}>
        <AccountingTable data={data} setData={setData} validation={validation}/>
      </Excercise>
      

    {validation&& 
    <p>
        Aciertos: {validation.summary.correctAnswers} / {validation.summary.totalQuestions}
        ({validation.summary.percentage}%)
    </p>}
    

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
    </div>
    </>
  )
}

export default App
