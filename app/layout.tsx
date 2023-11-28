import { Header } from './components/Header';
import { MainContainer } from './components/MainContainer';
import './globals.css';

export const metadata = {
  title: 'Consulta Constitucional',
  description: 'Consulta Constitucional',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Header />
        <MainContainer>{children}</MainContainer>
      </body>
    </html>
  );
}