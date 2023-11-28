// app/components/ui/MainContainer.tsx
import * as React from 'react';

interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
    return (
      <main className="flex flex-col items-center justify-center p-8">
        {children}
      </main>
    );
  };
  
