# super-app-showcase

> 🟦 Monorepo React Native con arquitectura de super app, Module Federation y módulos independientes.

## ✨ Qué incluye

- `host`: app principal que orquesta navegación, auth y módulos remotos.
- `dashboard`: vista de entrada con composición de widgets.
- `auth`, `booking`, `shopping`, `sell`: módulos funcionales aislados.
- `sdk`: código compartido entre host y mini-apps.
- `mprocs`: comandos para levantar el entorno local.

## 🎯 Idea base

Cada mini-app debe poder correr sola y también exponer sus pantallas al `host` en runtime. El objetivo es mantener independencia por dominio sin perder una experiencia unificada.

## 🧭 Mapa rápido

| Zona | Rol |
| --- | --- |
| `packages/host` | Shell principal de la super app |
| `packages/dashboard` | Entrada visual y agregación de contenido |
| `packages/auth` | Inicio de sesión y flujo de acceso |
| `packages/booking` | Flujo de reservas |
| `packages/shopping` | Experiencia de compra |
| `packages/sdk` | Primitivas compartidas |

## 🚀 Scripts

- `pnpm start`: levanta el host con `mprocs`.
- `pnpm start:dashboard`: levanta el dashboard.
- `pnpm run:host:android`: ejecuta host en Android.
- `pnpm run:host:ios`: ejecuta host en iOS.
- `pnpm lint`: valida estilo en todo el monorepo.
- `pnpm test`: corre la suite de tests.
- `pnpm typecheck`: valida tipos.

## 📁 Estructura mínima

```text
packages/
├── auth/
├── booking/
├── dashboard/
├── host/
├── sdk/
└── shopping/

patches/
mprocs/
```

## 🧩 Nota de diseño

El README está pensado como portada breve. La documentación detallada debería vivir junto a cada paquete, para que el monorepo siga siendo fácil de escanear.

_______________________________________________________________________________
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
