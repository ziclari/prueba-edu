import { useState } from 'react';
import formatCurrency from '../helpers/formatCurrency';

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
        const solutionCargo = parseFloat(solution.cargo) || 0;
        const solutionAbono = parseFloat(solution.abono) || 0;

        const cargoCorrect = answerCargo === solutionCargo;
        const abonoCorrect = answerAbono === solutionAbono;

        totalCargo += answerCargo;
        totalAbono += answerAbono;

        return {
            id: answer.id,
            name: answer.name,
            cargoCorrect,
            abonoCorrect,
            isRowComplete: cargoCorrect && abonoCorrect,
            cargoExpected: solutionCargo,
            abonoExpected: solutionAbono,
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
    <table className="mt-6 w-full border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm font-primary">
    <thead>
        <tr>
            <th className='bg-gray-100 border-b-2 border-gray-300'></th>
            <th className="py-3 px-4 text-center font-semibold border-b-2 border-gray-400">Cargo</th>
            <th className="py-3 px-4 text-center font-semibold border-b-2 border-gray-400">Abono</th>
        </tr>
    </thead>
    <tbody>
    {data.map((row, i) => (
        <tr key={i} className="hover:bg-gray-50 transition-colors">
            <td className="py-3 px-4 border-b border-gray-400 font-bold">{row.name}</td>
            <td className={`py-3 px-4 border-b border-blue-400 ${
                showValidation ? validation.results[i].cargoCorrect ? "bg-green-100" : "bg-red-100"
                : row.cargo ? "bg-white": "bg-accent/50"
                }`}>
                <input
                    type="text"
                    value={row.cargo ? formatCurrency(row.cargo) : ''}
                    onChange={(e) => handleChange(i, "cargo", e.target.value)}
                    className="w-full px-3 py-2 outline-none hover:bg-white/60 focus:bg-white focus:ring-2 focus:ring-blue-400 transition-all"
                />
                {/*showValidation && !validation.results[i].cargoCorrect && (
                    <div className="text-sm text-red-600 mt-1">
                    Esperado: {validation.results[i].cargoExpected}
                    </div>
                )*/}
            </td>

            <td className={`py-3 px-4 border-b border-blue-400 ${
                showValidation ? validation.results[i].abonoCorrect ? "bg-green-100" : "bg-red-100"
                : row.abono ? "bg-white": "bg-accent/70"
                }`}>
                <input
                    type="text"
                    value={row.abono ? formatCurrency(row.abono) : ''}
                    onChange={(e) => handleChange(i, 'abono', e.target.value)}
                    className="w-full rounded-md px-3 py-2 outline-none hover:bg-white/60 focus:bg-white focus:ring-2 focus:ring-blue-400 transition-all"
                />
            </td>
        </tr>
    ))}

    <tr className="bg-gray-50 font-semibold">
        <td className="py-3 px-4 border-t border-gray-400 text-right">Totales</td>
        <td className="py-3 px-4 border-t border-gray-400 text-center">
        {validation?.summary?.totalCargo
            ? formatCurrency(validation?.summary?.totalCargo)
            : ''}
        </td>
        <td className="py-3 px-4 border-t border-gray-400 text-center">
        {validation?.summary?.totalAbono
            ? formatCurrency(validation?.summary?.totalAbono)
            : ''}
        </td>
    </tr>

    <tr className="bg-gray-100 font-semibold">
        <td className="py-3 px-4 border-t border-gray-400 text-right">Saldo final</td>
        <td className="py-3 px-4 border-t border-gray-400 text-center">
        {validation?.summary?.saldoFinal
            ? formatCurrency(validation?.summary?.saldoFinal)
            : ''}
        </td>
        <td className="py-3 px-4 border-t border-gray-400"></td>
    </tr>
    </tbody>
    </table>

    {showValidation && validation&& 
    <p>
        Aciertos: {validation.summary.correctAnswers} / {validation.summary.totalQuestions}
        ({validation.summary.percentage}%)
    </p>}
    <button onClick={handleReset} className='bg-red-200'>
        Resetear
    </button>
    <button onClick={handleValidate}>
        Validar
    </button>
    </>
  );
}
