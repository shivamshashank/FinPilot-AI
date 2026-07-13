import { AppProvider, useApp } from './components/AppContext';
import { ThemeProvider } from './components/ThemeContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Layout from './components/Layout';

function AppRouter() {
  const { authStep } = useApp();

  switch (authStep) {
    case 'landing':
      return <LandingPage />;
    case 'signin':
    case 'otp':
    case 'success':
      return <AuthPage />;
    case 'authenticated':
      return <Layout />;
    default:
      return <LandingPage />;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </ThemeProvider>
  );
}
