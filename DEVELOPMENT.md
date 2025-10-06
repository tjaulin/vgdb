# 📚 Guide de développement - Video Games Database

## 🎯 Standards de développement

### **Conventions de nommage**
```typescript
// Fichiers et dossiers
src/components/GameCard.tsx        // PascalCase pour composants
src/lib/igdb.ts                   // camelCase pour services
src/app/game/[id]/page.tsx        // kebab-case pour routes

// Variables et fonctions  
const gameTitle = "...";          // camelCase
const IGDB_BASE_URL = "...";      // SCREAMING_SNAKE_CASE pour constantes
function getRandomGames() {}      // camelCase pour fonctions
interface GameProps {}            // PascalCase pour interfaces
```

### **Structure des composants**
```typescript
// Template type pour composants
interface ComponentNameProps {
  // Props avec types explicites
  game: Game;
  onSelect?: (id: number) => void;
}

export default function ComponentName({ game, onSelect }: ComponentNameProps) {
  // 1. Hooks en premier
  const [state, setState] = useState();
  
  // 2. Fonctions utilitaires
  const handleClick = () => {
    // logique
  };
  
  // 3. Rendu conditionnel si nécessaire
  if (!game) return <div>Loading...</div>;
  
  // 4. JSX principal
  return (
    <div className="...">
      {/* Contenu */}
    </div>
  );
}
```

## 🔧 Workflow de développement

### **1. Ajout d'une nouvelle fonctionnalité**
```bash
# 1. Créer une branche
git checkout -b feature/nom-fonctionnalite

# 2. Développement avec hot reload
npm run dev

# 3. Tests et validation
npm run build          # Vérifier compilation
npm run lint           # Vérifier code style

# 4. Commit et push
git add .
git commit -m "feat: description de la fonctionnalité"
git push origin feature/nom-fonctionnalite
```

### **2. Ajout d'un nouveau composant**
```typescript
// 1. Créer le fichier src/components/NewComponent.tsx
'use client'; // Si interactivité requise

import { ComponentProps } from '@/types'; // Si types personnalisés

interface NewComponentProps {
  // Définir les props
}

export default function NewComponent(props: NewComponentProps) {
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}

// 2. Exporter dans src/components/index.ts (optionnel)
export { default as NewComponent } from './NewComponent';

// 3. Utiliser dans les pages
import NewComponent from '@/components/NewComponent';
```

### **3. Ajout d'une nouvelle page**
```typescript
// 1. Créer src/app/nouvelle-route/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Titre de la page',
  description: 'Description pour SEO',
};

export default function NouvellePage() {
  return (
    <div>
      {/* Contenu de la page */}
    </div>
  );
}

// 2. Optionnel: loading.tsx, error.tsx, not-found.tsx
```

## 🎨 Guide de design

### **Classes Tailwind couramment utilisées**
```css
/* Layout et spacing */
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8    /* Container principal */
grid grid-cols-1 md:grid-cols-2 gap-6      /* Grilles responsive */
flex items-center justify-between           /* Flex alignment */

/* Couleurs thème VGDb */
text-gray-900                               /* Texte principal */
text-gray-600                               /* Texte secondaire */
bg-blue-600 hover:bg-blue-700              /* Boutons primaires */
bg-white shadow-lg                          /* Cartes */

/* États interactifs */
hover:shadow-lg transition-shadow duration-300
group-hover:scale-105 transition-transform
focus:ring-2 focus:ring-blue-500

/* Typography */
text-4xl font-bold                          /* Titres principaux */
text-xl text-gray-600                       /* Sous-titres */
text-sm px-2 py-1 rounded                  /* Badges */
```

### **Breakpoints responsive**
```css
/* Mobile first */
grid-cols-1              /* Base: mobile */
sm:grid-cols-2           /* ≥640px: small tablet */  
md:grid-cols-3           /* ≥768px: tablet */
lg:grid-cols-4           /* ≥1024px: laptop */
xl:grid-cols-5           /* ≥1280px: desktop */
```

## 🌐 Intégration API IGDB

### **Ajouter un nouveau endpoint**
```typescript
// Dans src/lib/igdb.ts
class IGDBService {
  async getNewEndpoint(params: ParamType): Promise<ReturnType> {
    const query = `
      fields nom_des_champs;
      where condition;
      limit ${params.limit};
    `;
    
    return this.makeRequest('endpoint', query);
  }
}

// Usage dans composant/page
const data = await igdbService.getNewEndpoint({ limit: 10 });
```

### **Gestion d'erreurs API**
```typescript
// Pattern recommandé pour pages
export default async function Page() {
  let data = [];
  let error: string | null = null;

  try {
    data = await igdbService.getData();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Erreur inconnue';
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return <SuccessComponent data={data} />;
}
```

## 🧪 Tests et qualité

### **Tests manuels recommandés**
```bash
# 1. Build test
npm run build

# 2. Développement test
npm run dev

# 3. Navigation test
# - Page d'accueil -> cartes cliquables
# - Recherche -> résultats affichés  
# - Page détail -> informations complètes
# - Navigation -> boutons fonctionnels

# 4. Responsive test
# - Mobile (375px)
# - Tablet (768px) 
# - Desktop (1280px+)
```

### **Checklist avant commit**
- [ ] `npm run build` sans erreurs
- [ ] `npm run lint` propre
- [ ] Tests navigation manuelle
- [ ] Responsive vérifié
- [ ] Images chargent correctement
- [ ] Types TypeScript corrects
- [ ] Messages d'erreur appropriés

## 🚀 Déploiement

### **Préparation pour Vercel**
```bash
# 1. Build de production
npm run build

# 2. Vérifier variables d'environnement
# - IGDB_CLIENT_ID
# - IGDB_ACCESS_TOKEN 
# - CLIENT_SECRET

# 3. Configuration Vercel
# Dans vercel.json ou dashboard
{
  "env": {
    "IGDB_CLIENT_ID": "@igdb-client-id",
    "IGDB_ACCESS_TOKEN": "@igdb-access-token"  
  }
}
```

### **Variables d'environnement production**
```env
# Production (.env.production)
IGDB_CLIENT_ID=prod_client_id
IGDB_ACCESS_TOKEN=prod_access_token
NEXT_PUBLIC_SITE_URL=https://vgdb.vercel.app
```

## 🐛 Debugging et dépannage

### **Erreurs courantes et solutions**

#### **1. "Event handlers cannot be passed to Client Component props"**
```typescript
// ❌ Incorrect - Server Component avec onClick
export default function ServerPage() {
  return <button onClick={() => {}}>Click</button>;
}

// ✅ Correct - Séparer en Client Component
'use client';
export default function ClientButton() {
  return <button onClick={() => {}}>Click</button>;  
}
```

#### **2. "Images failing to load"**
```typescript
// ❌ URL incorrecte avec double extension
getImageUrl("image.jpg") // -> image.jpg.jpg

// ✅ Nettoyer l'extension d'abord  
getImageUrl(url.replace('.jpg', '')) // -> image.jpg
```

#### **3. "API credentials not configured"**
```bash
# Vérifier les variables d'environnement
echo $IGDB_CLIENT_ID
echo $IGDB_ACCESS_TOKEN

# Redémarrer le serveur de dev après changement .env
npm run dev
```

### **Logs de debug utiles**
```typescript
// Debug API calls
console.log('API Request:', { endpoint, query });
console.log('API Response:', response);

// Debug composant props
console.log('Component props:', props);

// Debug environnement
console.log('Env check:', {
  hasClientId: !!process.env.IGDB_CLIENT_ID,
  hasToken: !!process.env.IGDB_ACCESS_TOKEN  
});
```

## 📈 Performance et optimisation

### **Métriques à surveiller**
```bash
# Bundle analyzer
npx @next/bundle-analyzer

# Core Web Vitals
# - LCP (Largest Contentful Paint): <2.5s
# - FID (First Input Delay): <100ms  
# - CLS (Cumulative Layout Shift): <0.1
```

### **Optimisations recommandées**
```typescript
// 1. Images optimisées
import Image from 'next/image';
<Image
  src={imageUrl}
  alt="Description"
  width={300}
  height={400}
  priority={false} // true pour above-the-fold
/>

// 2. Lazy loading composants
import dynamic from 'next/dynamic';
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});

// 3. Memoization si nécessaire
import { useMemo } from 'react';
const expensiveValue = useMemo(() => computeValue(data), [data]);
```

---

*Guide mis à jour le 6 octobre 2025*