export default function ValidationResults({ validation }) {
  return (
    <div className="mt-4 p-4 border rounded bg-gray-50">
      <h2 className="font-bold text-lg mb-2">Resultados</h2>

      <p>Total Cargo: {validation.summary.totalCargo}</p>
      <p>Total Abono: {validation.summary.totalAbono}</p>
      <p>Saldo Final: {validation.summary.saldoFinal}</p>

      <p>
        Aciertos: {validation.summary.correctAnswers} / {validation.summary.totalQuestions}
        ({validation.summary.percentage}%)
      </p>

      <table className="mt-4 w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2">Nombre</th>
            <th className="border px-2">Cargo</th>
            <th className="border px-2">Abono</th>
          </tr>
        </thead>
        <tbody>
          {validation.results.map((r) => (
            <tr key={r.id}>
              <td className="border px-2">{r.name}</td>
              <td
                className={`border px-2 ${
                  r.cargoCorrect ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {r.cargoActual} (esperado {r.cargoExpected})
              </td>
              <td
                className={`border px-2 ${
                  r.abonoCorrect ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {r.abonoActual} (esperado {r.abonoExpected})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
