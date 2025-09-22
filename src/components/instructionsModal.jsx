import Button from "./button";
import { Icon } from "@iconify/react";
import flor from "../assets/flor.svg";

import step1Img from "../assets/step1.png";
import step2Img from "../assets/step2.png";
import step3Img from "../assets/step3.png";

export default function InstruccionsModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <div className="relative bg-primary text-white rounded-2xl p-8 max-w-4xl max-h-[600px] w-full mx-4 shadow-xl flex flex-col justify-between">
          
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-white/80 cursor-pointer"
        >
          <Icon icon="mdi:close" width={24} height={24} />
        </button>

        <div className="overflow-y-auto scrollbar-hide flex-1 pr-2 font-primary">
          <div className="text-center mb-6">
            <img src={flor} alt="flor" className="w-16 h-16 mx-auto" />
            <h1 className="font-header text-5xl font-bold">Cómo resolver el ejercicio</h1>
          </div>

          <ol className="list-decimal list-inside space-y-6">
            <li className="text-lg"> Ingresa los valores en las celdas sombreadas.
              <p className="text-sm text-white/70 italic mt-1">
                Puedes hacer clic en la celda o usar la tecla <span className="font-mono">Tab</span> para moverte entre ellas.
              </p>
              <img src={step1Img} alt="Paso 1" className="mt-2 w-full rounded-lg border border-white/30" />
            </li>
            <li className="text-lg">Haz clic en "Revisar" para validar tus respuestas.
              <p className="text-sm text-white/70 italic mt-1">
                Esto calculará los totales y te mostrará los aciertos y errores.
              </p>
              <img src={step2Img} alt="Paso 2" className="mt-2 w-full rounded-lg border border-white/30" />
            </li>
            <li className="text-lg">Corrige tus errores y vuelve a intentarlo.
              <p className="text-sm text-white/70 italic mt-1">
                Revisa las celdas en rojo y ajusta los valores según lo indicado.
              </p>
              <img src={step3Img} alt="Paso 3" className="mt-2 w-full rounded-lg border border-white/30" />
            </li>
          </ol>
        </div>

        <div className="flex justify-end mt-8">
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
