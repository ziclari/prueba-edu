import { solutionData } from "../data/accountingSolutions";

export function validateAnswers(answers) {
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
