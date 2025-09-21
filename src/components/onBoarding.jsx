import Button from "./button";
import { Icon } from "@iconify/react";
import flor from "../assets/flor.svg";

export default function OnBoarding({onClose}) {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <div className="relative bg-primary text-white rounded-2xl p-8 max-w-4xl max-h-[600px] w-full mx-4 shadow-xl flex flex-col justify-between">
           <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-white/80 cursor-pointer"
                >
                <Icon icon="mdi:close" width={24} height={24} />
            </button>
            <div className="w-full space-y-4 mt-8">
                <img src={flor} alt="flor" className="w-16 h-16"/>
                <h1 className="font-header text-5xl font-bold">Ejercitador de contabilidad</h1>
                <p className="font-primary text-2xl">Clasifica las operaciones en CARGO o ABONO.</p>
                <p className="font-primary text-lg italic font-bold text-white/70">Los cálculos totales se harán automáticamente</p>
            </div>
            <div className="w-full flex justify-end mb-4">
                <Button 
                    title="Entendido, Empezar" 
                    type="secondary" 
                    icon="mdi:arrow-right"
                    onClick={onClose}
                />
            </div>
        </div>
    </div>
  );
}