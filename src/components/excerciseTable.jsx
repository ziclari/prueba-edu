import formatCurrency from '../helpers/formatCurrency';

export default function AccountingTable({data, setData, validation}) {

  const handleChange = (index, field, value) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    const newData = [...data];
    newData[index][field] = numericValue;
    setData(newData);
  };

  return (<>
    <table className="mt-6 w-full border-separate border border-gray-400 border-spacing-0 rounded-2xl overflow-hidden shadow-sm font-primary">
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
                validation ? validation?.results?.[i]?.cargoCorrect ? "bg-green-100" : "bg-red-100"
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
                validation ? validation?.results?.[i]?.abonoCorrect ? "bg-green-100" : "bg-red-100"
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
    </>
  );
}
