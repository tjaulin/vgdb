# 🏗️ Architecture du projet - Video Games Database

## 📐 Vue d'ensemble de l'architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Video Games Database (VGDb)                  │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │   Frontend      │    │     Backend     │    │   External   │ │
│  │   (Next.js)     │◄──►│  (API Routes)   │◄──►│  (IGDB API)  │ │
│  └─────────────────┘    └─────────────────┘    └──────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 Principes architecturaux

### 1. **Server-First Architecture**
- **Server Components** par défaut pour les performances
- **Client Components** uniquement quand nécessaire (`'use client'`)
- **SSR (Server-Side Rendering)** pour SEO et vitesse

### 2. **API-First Design**  
- **Service Layer** (`igdb.ts`) pour abstraction API
- **Type Safety** complet avec TypeScript
- **Error Handling** centralisé et robuste

### 3. **Component-Driven Development**
- **Composants atomiques** réutilisables
- **Separation of Concerns** claire
- **Props typing** strict avec interfaces

## 📂 Structure détaillée des dossiers

```
src/
├── 📁 app/                          # App Router Next.js 14
│   ├── 📄 globals.css              # Styles globaux + Tailwind
│   ├── 📄 layout.tsx               # Layout racine avec Navigation
│   ├── 📄 page.tsx                 # Page d'accueil (SSR)
│   ├── 📄 not-found.tsx            # Page 404 personnalisée
│   │
│   ├── 📁 game/[id]/               # Routes dynamiques jeux
│   │   └── 📄 page.tsx             # Page détail jeu (SSR)
│   │
│   └── 📁 search/                  # Route recherche
│       └── 📄 page.tsx             # Page résultats (SSR)
│
├── 📁 components/                   # Composants React réutilisables
│   ├── 📄 GameCard.tsx             # Carte d'affichage jeu
│   ├── 📄 GameDetails.tsx          # Vue détaillée jeu
│   ├── 📄 Navigation.tsx           # Barre navigation (Client)
│   ├── 📄 RefreshButton.tsx        # Bouton reload (Client)
│   ├── 📄 BackButton.tsx           # Bouton retour (Client)
│   └── 📄 ThemeToggle.tsx          # Basculement thème (Client)
│
├── 📁 contexts/                     # Contexts React
│   └── 📄 ThemeContext.tsx         # Gestion état thème global
│
└── 📁 lib/                         # Logique métier et services
    └── 📄 igdb.ts                  # Service API IGDB + Types
```

## 🔄 Flux de données

### 1. **Page d'accueil**
```mermaid
graph TD
    A[User accède à /] --> B[Server Component page.tsx]
    B --> C[igdbService.getRandomGames(50)]
    C --> D[API IGDB]
    D --> E[Données jeux récupérées]
    E --> F[Rendu SSR des GameCard]
    F --> G[HTML envoyé au client]
    G --> H[Hydratation côté client]
```

### 2. **Navigation et recherche**
```mermaid
graph TD
    A[User tape dans recherche] --> B[Client Component Navigation]
    B --> C[État React local]
    C --> D[Soumission vers /search]
    D --> E[Server Component search/page.tsx]
    E --> F[igdbService.searchGames()]
    F --> G[Rendu SSR résultats]
```

### 3. **Page détail jeu**
```mermaid
graph TD
    A[User clique GameCard] --> B[Navigation vers /game/[id]]
    B --> C[Server Component game/[id]/page.tsx]
    C --> D[igdbService.getGameById()]
    C --> E[igdbService.getSimilarGames()]
    D --> F[API IGDB - Détails]
    E --> G[API IGDB - Similaires]
    F --> H[Rendu SSR page complète]
    G --> H
```

## 🧩 Architecture des composants

### **Server Components**
```typescript
// src/app/page.tsx
export default async function HomePage() {
  // Logique serveur - pas d'état React
  const games = await igdbService.getRandomGames(50);
  return (
    <div>
      <RefreshButton count={games.length} /> {/* Client Component */}
      {games.map(game => <GameCard key={game.id} game={game} />)}
    </div>
  );
}
```

### **Client Components** 
```typescript
// src/components/Navigation.tsx
'use client';
export default function Navigation() {
  // État React + event handlers
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e) => { /* logique */ };
  return (/* JSX avec onClick, onChange, etc. */);
}
```

## 🔐 Sécurité et authentification

### **Variables d'environnement**
```env
# .env.local (non versionné)
IGDB_CLIENT_ID=***         # Public - ID application Twitch
IGDB_ACCESS_TOKEN=***      # Privé - Token Bearer API
CLIENT_SECRET=***          # Privé - Secret Twitch
```

### **Validation côté serveur**
```typescript
// Validation des paramètres
const gameId = parseInt(params.id);
if (isNaN(gameId)) {
  notFound(); // Renvoi 404 si ID invalide
}
```

## 🎨 Architecture CSS et styling

### **Configuration Tailwind avec thème jour/nuit**
```typescript
// tailwind.config.ts
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Activation du mode sombre
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fefce8',   // Palette jaune principale
          500: '#eab308',  // Couleur de base
          900: '#713f12',  // Couleur foncée
        },
        dark: {
          50: '#f8fafc',   // Palette pour mode sombre
          800: '#1e293b',  // Arrière-plans foncés
          900: '#0f172a',  // Arrière-plan principal sombre
        }
      },
    },
  },
  plugins: [],
};
```

### **Système de thème avec Context React**
```typescript
// src/contexts/ThemeContext.tsx
'use client';
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Mode nuit par défaut
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Chargement depuis localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  };
};
```

### **Composant de basculement thème**
```typescript
// src/components/ThemeToggle.tsx
'use client';
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? (
        <MoonIcon />  // Icône lune pour passer en mode sombre
      ) : (
        <SunIcon />   // Icône soleil pour passer en mode clair
      )}
    </button>
  );
}
```

### **Classes CSS adaptatives**
```css
/* Exemple d'utilisation des classes dark: */
<div className="bg-white dark:bg-dark-800 text-gray-900 dark:text-white">
  <h1 className="text-primary-500 dark:text-primary-400">Titre</h1>
  <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300">
    Badge
  </span>
</div>
```

### **Styles globaux**
```css
/* src/app/globals.css */
@tailwind base;
@tailwind components; 
@tailwind utilities;

@layer utilities {
  .line-clamp-2 {
    /* Styles personnalisés */
  }
}
```

## 🔧 Configuration outils de développement

### **TypeScript strict**
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "moduleResolution": "bundler",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

### **ESLint minimal**
```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals"]
}
```

### **Next.js optimisé**
```javascript
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'images.igdb.com',
      pathname: '/igdb/image/upload/**',
    }],
  },
};
```

## 📊 Performance et optimisations

### **Métriques actuelles**
- **First Load JS**: ~87.1 kB (excellent)
- **Page sizes**: 137-193 B (optimal)
- **SSR**: Toutes les pages
- **Images**: Optimisation automatique Next.js

### **Optimisations appliquées**
1. **Server Components** pour réduire le JS côté client
2. **Image optimization** avec Next.js Image
3. **Code splitting** automatique par route
4. **Prefetching** des liens avec Next.js Link

---

*Architecture documentée le 6 octobre 2025*