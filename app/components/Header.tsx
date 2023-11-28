
  import * as React from 'react';
  import Image from 'next/image';
  import logo from '@/public/openai.png';
  import Link from 'next/link';
  
  export const Header = () => {
    return (
      <header className="bg-gradient-to-r from-blue-600 to-red-600 text-white p-4 flex justify-between items-center">
        <Image src={logo} alt="Logo" width={50} height={50} />
        <div>
          <h1 className="text-2xl font-bold">Consulta Constitucional</h1>
          <nav className="mt-2">
            <Link href="https://www.bcn.cl/portal/leyfacil/recurso/proceso-constitucional-2023"className="text-white hover:text-blue-200 mr-4">
              Proceso Constituyente
            </Link>
            <Link href="https://www.procesoconstitucional.cl/docs/Propuesta-Nueva-Constitucion.pdf" className="text-white hover:text-blue-200">
              Propuesta Nueva Constitución
            </Link>
          </nav>
        </div>
      </header>
    );
  };
  
  