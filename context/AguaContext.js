import React, { createContext, useState } from 'react';

export const AguaContext = createContext();

export const AguaProvider = ({ children }) => {
  const [aguaConsumida, setAguaConsumida] = useState(0);
  const [retosCompletados, setRetosCompletados] = useState(0);
  const [retosDisponibles] = useState(5);

  const registrarConsumo = (litros) => {
    setRetosCompletados(prev => prev + 1);
    setAguaConsumida(prev => prev + litros);
  };

  return (
    <AguaContext.Provider value={{ aguaConsumida, retosCompletados, retosDisponibles, registrarConsumo }}>
      {children}
    </AguaContext.Provider>
  );
};
