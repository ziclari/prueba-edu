import { useState } from 'react';
import formatCurrency from '../helpers/formatCurrency';
import ValidationResults from './validationResults';

const initialData = () => [
    { id: 0, name: 'Bancos', cargo: '', abono: '' },
    { id: 1, name: 'Pago proveedor Inmobiliaria SA', cargo: '', abono: '' },
    { id: 2, name: 'Cobro cheque por Maquina Envasadora', cargo: '', abono: '' },
    { id: 3, name: 'Pago de Zaza SA', cargo: '', abono: '' },
    { id: 4, name: 'Viáticos a Monterrey', cargo: '', abono: '' }
]

const solutionData = () =>  [
    { id: 0, name: 'Bancos', cargo: '850000', abono: '' },
    { id: 1, name: 'Pago proveedor Inmobiliaria SA', cargo: '', abono: '17700' },
    { id: 2, name: 'Cobro cheque por Maquina Envasadora', cargo: '120000', abono: '' },
    { id: 3, name: 'Pago de Zaza SA', cargo: '25000', abono: '' },
    { id: 4, name: 'Viáticos a Monterrey', cargo: '', abono: '70000' }
]

function validateAnswers(answers) {
    const solutions = solutionData();

    let totalCargo = 0;
    let totalAbono = 0;

  const results = answers.map((answer, index) => {
    const solution = solutions[index];
    const answerCargo = parseFloat(answer.cargo) || 0;
    const answerAbono = parseFloat(answer.abono) || 0;
    
    const cargoCorrect = answerCargo === parseFloat(solution.cargo) || 0;
    const abonoCorrect = answerAbono === parseFloat(solution.abono) || 0;
    
    totalCargo += answerCargo;
    totalAbono += answerAbono;
    
    return {
      id: answer.id,
      name: answer.name,
      cargoCorrect,
      abonoCorrect,
      isRowComplete: cargoCorrect && abonoCorrect,
      cargoExpected: solution.cargo,
      abonoExpected: solution.abono,
      cargoActual: answerCargo,
      abonoActual: answerAbono
    };
  });
  
  const totalCorrect = results.filter(r => r.isRowComplete).length;
  const totalQuestions = results.length * 2;
  const correctAnswers = results.reduce((acc, r) => 
    acc + (r.cargoCorrect ? 1 : 0) + (r.abonoCorrect ? 1 : 0), 0
  );
  
  return {
    results,
    summary: {
      totalCargo,
      totalAbono,
      saldoFinal: totalCargo-totalAbono,
      totalCorrect,
      correctAnswers,
      totalQuestions,
      percentage: Math.round((correctAnswers / totalQuestions) * 100),
    }
  };
}

export default function AccountingTable() {
  const [data, setData] = useState(initialData);
  const [validation, setValidation] = useState(null);
  const [showValidation, setShowValidation] = useState(false);

  const handleChange = (index, field, value) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    const newData = [...data];
    newData[index][field] = numericValue;
    setData(newData);
  };

   const handleValidate = () => {
    const validationResult = validateAnswers(data);
    setValidation(validationResult);;
    setShowValidation(true);
  };

   const handleReset = () => {
    setData(initialData);
    setValidation(null);
    setShowValidation(false);
  };

  return (<>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Cargo</th>
          <th>Abono</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td>{row.name}</td>
            <td>
              <input
                type="text"
                value={row.cargo}
                onChange={(e) => handleChange(i, 'cargo', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={row.abono}
                onChange={(e) => handleChange(i, 'abono', e.target.value)}
              />
            </td>
          </tr>
        ))}

        <tr>
          <td>Totales</td>
          <td>{validation?.summary?.totalCargo ? formatCurrency(validation?.summary?.totalCargo): ''}</td>
          <td>{validation?.summary?.totalAbono ? formatCurrency(validation?.summary?.totalAbono): ''}</td>
        </tr>
        <tr>
          <td>Saldo final</td>
          <td>{validation?.summary?.saldoFinal ? formatCurrency(validation?.summary?.saldoFinal): ''}</td>
        </tr>
      </tbody>
    </table>
    {showValidation && validation&& 
    <ValidationResults validation={validation}/>}
    <button onClick={handleReset} className='bg-red-200'>
        Resetear
    </button>
    <button onClick={handleValidate}>
        Validar
    </button>
    </>
  );
}
