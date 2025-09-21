import Button from "./button";
export default function OnBoarding() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white space-y-4">
      <h1 className="font-header text-5xl font-bold">Ejercitador de contabilidad</h1>
      <p className="font-primary text-2xl">Clasifica las operaciones en CARGO o ABONO.</p>
      <p className="font-primary text-lg italic">Los cálculos totales se harán automáticamente</p>
      <Button title="Entendido, Empezar" type="secondary" icon="mdi:arrow-right"/>
    </div>
  );
}