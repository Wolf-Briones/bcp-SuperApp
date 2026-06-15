/* import React from 'react';
import SplashScreen from './components/SplashScreen';
import RootNavigator from './navigation/RootNavigator';

// Carga de Microfrontends Federados
const AuthProvider = React.lazy(() => import('auth/AuthProvider'));
const AuthApp = React.lazy(() => import('auth/SignInScreen')); 

const ShellOrchestrator = () => {
  return (
    <React.Suspense fallback={<SplashScreen />}>
      <AuthProvider>
        {(authData: {isSignout: boolean; isLoading: boolean}) => {
          
          if (authData.isLoading) {
            return <SplashScreen />;
          }

          if (authData.isSignout) {
            // Monta el Microfrontend de Autenticación
            return (
              <React.Suspense fallback={<SplashScreen />}>
                <AuthApp /> 
              </React.Suspense>
            );
          }

          // Monta el flujo principal del Super App
          return <RootNavigator />;
        }}
      </AuthProvider>
    </React.Suspense>
  );
};

export default ShellOrchestrator; */