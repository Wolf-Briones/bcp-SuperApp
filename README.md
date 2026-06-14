Antes de entrar en carpetas, vale la pena separar dos conceptos que en Callstack usan con nombres distintos pero que tú estás juntando bajo "shell", porque definen estructuras distintas:

El "shell" como componente raíz del host: es justo el App.tsx que tienes abierto — el punto de entrada que monta providers globales, decide qué navegador renderizar según el estado de auth, y orquesta la carga de los módulos federados.
El "shell app" como paquete independiente: en el super-app-showcase original, shell es una app ligera, espejo de host, que cada equipo de mini-app usa para probar su módulo de forma aislada sin tener que levantar todo el super app.

Para una banca, normalmente quieres ambos. Te dejo cómo organizaría el monorepo y luego cómo evolucionaría tu App.tsx.
Estructura de carpetas (monorepo)
super-app-banking/
├── packages/
│   ├── host/                    # Super app real (la que va a producción)
│   ├── shell/                   # Espejo ligero de host, para que cada equipo
│   │                             # pruebe su mini-app en aislamiento
│   │
│   ├── auth/                    # Login, onboarding, biometría, PIN
│   ├── accounts/                # Cuentas, saldos, movimientos, extractos
│   ├── transfers/                # Transferencias, pagos, SPEI/PSE/ACH, QR
│   ├── cards/                    # Gestión de tarjetas (bloqueo, límites, virtuales)
│   ├── investments/               # Inversiones / fondos (si aplica)
│   ├── support/                   # Chat, ayuda, FAQs
│   │
│   └── sdk/                       # Código compartido entre host y mini-apps
│       ├── design-system/           # Theming, componentes UI (Paper themeado)
│       ├── navigation-contracts/     # Tipos de rutas/params compartidos
│       ├── api-client/                # Cliente HTTP, interceptores, refresh token
│       ├── session/                   # Auth context, almacenamiento seguro de tokens
│       ├── security/                  # App lock, detección de jailbreak/root, biometría
│       ├── feature-flags/
│       └── analytics/
│
├── shared/                       # JSON de dependencias compartidas (Module Federation)
├── patches/
└── mprocs/
La idea es la misma que ya tienes (auth/booking/dashboard/shopping), solo que renombrada al dominio bancario. Lo importante: cada mini-app (accounts, transfers, cards...) debe poder compilarse y correr standalone, y exponer sus pantallas vía Module Federation para que host las consuma en runtime.
Estructura interna de host/src
packages/host/src/
├── App.tsx                      # El "shell" raíz
├── providers/
│   ├── SessionProvider.tsx       # Token, refresh, logout — viene de sdk/session
│   ├── SecurityProvider.tsx       # App lock por inactividad, biometría al reanudar
│   ├── ThemeProvider.tsx
│   └── NetworkProvider.tsx        # Estado de conexión, banner offline
│
├── navigation/
│   ├── RootNavigator.tsx          # Decide: Auth stack vs Tabs principales vs Lock screen
│   ├── MainTabs.tsx                # Bottom tabs: Inicio, Cuentas, Transferir, Tarjetas, Más
│   └── linking.ts                  # Deep links (ej. abrir "Transferencias" desde notificación)
│
├── federation/
│   ├── remotes.ts                  # URLs de los remotos por entorno (dev/stage/prod)
│   ├── loadRemote.tsx              # wrapper con retry + fallback si el remoto falla
│   └── ModuleBoundary.tsx          # ErrorBoundary específico por mini-app
│
├── components/
│   ├── SplashScreen.tsx
│   ├── AppLockScreen.tsx           # Pantalla de PIN/huella al abrir/reanudar
│   ├── ErrorBoundary.tsx
│   └── ModuleFallback.tsx          # UI de "módulo no disponible"
│
└── screens/
    └── Home/                       # Dashboard que compone widgets de varias mini-apps
El shell (App.tsx) para banca
Tu App.tsx actual ya tiene la base correcta: ErrorBoundary + Suspense + AuthProvider decidiendo entre SplashScreen, SignInScreen o MainNavigator. Para banca yo agregaría dos capas más, ambas críticas por compliance/seguridad:
1. Capa de bloqueo de app (App Lock). Un banco no puede dejar la sesión "abierta" indefinidamente. El shell debe envolver MainNavigator con un SecurityProvider que escuche el ciclo de vida de la app (AppState) y, si pasó X tiempo en background, fuerce re-autenticación (PIN o biometría) antes de mostrar cualquier pantalla con datos sensibles.
2. Aislamiento de fallos por mini-app. Si transfers o investments fallan al cargar su bundle remoto (por una mala publicación, por ejemplo), eso no debe tumbar todo el super app. Cada React.lazy(() => import('mini-app/Screen')) debería ir envuelto en su propio ModuleBoundary, no solo en el ErrorBoundary global.
Así quedaría conceptualmente:
tsxconst App = () => {
  return (
    <ErrorBoundary name="AppShell">
      <React.Suspense fallback={<SplashScreen />}>
        <SessionProvider>
          {(session) => {
            if (session.isLoading) return <SplashScreen />;

            if (!session.isSignedIn) {
              return (
                <React.Suspense fallback={<SplashScreen />}>
                  <SignInScreen />
                </React.Suspense>
              );
            }

            return (
              <SecurityProvider>
                {(security) =>
                  security.isLocked ? (
                    <AppLockScreen onUnlock={security.unlock} />
                  ) : (
                    <NavigationContainer
                      onReady={() => RNBootSplash.hide({ fade: true })}
                    >
                      <RootNavigator />
                    </NavigationContainer>
                  )
                }
              </SecurityProvider>
            );
          }}
        </SessionProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
};
Y dentro de RootNavigator, cada tab que apunta a una mini-app remota va así:
tsxconst AccountsScreen = React.lazy(() => import('accounts/AccountsHome'));

<ModuleBoundary moduleName="accounts" fallback={<ModuleFallback />}>
  <React.Suspense fallback={<ScreenLoader />}>
    <AccountsScreen />
  </React.Suspense>
</ModuleBoundary>
Por qué esta separación importa en banca
El SessionProvider y el api-client deben vivir en sdk y declararse como dependencia compartida (singleton) en la configuración de Module Federation de cada paquete. Así, cuando accounts o transfers hacen una llamada a la API, usan el mismo token y el mismo interceptor de refresh que el host — evitas que cada mini-app maneje su propia sesión (riesgo de tokens desincronizados o expirados).
El shell (paquete espejo) te permite a tu equipo de transfers, por ejemplo, desarrollar y probar su pantalla de "enviar dinero" sin depender de que host esté funcionando, simplemente mockeando SessionProvider con un usuario/token de prueba.
Si quieres, puedo ayudarte a definir el rspack.config.ts de una mini-app nueva (por ejemplo transfers) siguiendo el patrón de Module Federation que ya usa host, o a esbozar el SecurityProvider/AppLockScreen con más detalle.