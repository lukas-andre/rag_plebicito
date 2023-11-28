import * as React from 'react';

export const DisclaimerSection = () => {
  return (
    <section className="bg-white p-4 rounded-lg shadow my-4 text-center">
      <h2 className="text-2xl font-bold mb-2">Nueva Constitución</h2>
      <p className="mb-4">
        Esta herramienta es de código abierto y fue creada con fines educativos. 
        Todas las respuestas generadas deben ser verificadas con los documentos oficiales 
        o consultadas con expertos para confirmar su precisión.
      </p>
      <p>
        El código fuente de esta aplicación está disponible para ser examinado y contribuir 
        a su mejora. Recuerda que la información aquí proporcionada podría no ser correcta y 
        es esencial consultar las fuentes oficiales.
      </p>
    </section>
  );
};
