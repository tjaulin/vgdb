# 🎮 Video Games Database (VGDb)

Une application web moderne construite avec **Next.js 14**, **React**, **TypeScript** et **Tailwind CSS** pour explorer une vaste base de données de jeux vidéos alimentée par l'API IGDB.

## 📋 Table des matières

- [✨ Fonctionnalités](#-fonctionnalités)
- [🏗️ Architecture](#️-architecture)
- [📁 Structure du projet](#-structure-du-projet)
- [🚀 Installation](#-installation)
- [🔧 Configuration](#-configuration)
- [🛠️ Développement](#️-développement)
- [📦 Composants](#-composants)
- [🌐 API IGDB](#-api-igdb)
- [🎨 Design et UX](#-design-et-ux)
- [📝 Documentation des changements](#-documentation-des-changements)
- [🚀 Déploiement](#-déploiement)
- [🐛 Dépannage](#-dépannage)

## ✨ Fonctionnalités

### 🏠 Page d'accueil (/)
- Affichage de **50 jeux vidéos aléatoires** récupérés via l'API IGDB
- **Server-Side Rendering (SSR)** pour un chargement instantané
- Informations par jeu : nom, image de couverture, date de sortie, plateformes, genres, notes
- **Bouton de rafraîchissement** pour charger de nouveaux jeux aléatoires
- Cartes cliquables menant aux pages détail
- Interface responsive avec grille adaptative (1-5 colonnes selon l'écran)

### 🎯 Page détail (/game/[id])
- **Informations complètes** du jeu sélectionné
- Données affichées : nom, description, notes (critiques + utilisateurs), genres, plateformes
- **Développeurs et éditeurs** avec badges colorés
- **Gallery de screenshots** (jusqu'à 6 images)
- **5 jeux similaires** en recommandation
- **Breadcrumb navigation** pour revenir à l'accueil
- SSR pour SEO et partage social optimisés

### 🔍 Page de recherche (/search)
- **Barre de recherche** intégrée dans la navigation
- Recherche en temps réel via l'API IGDB
- Affichage des résultats avec le même format que l'accueil
- Gestion des états : chargement, résultats vides, erreurs
- **Messages informatifs** et boutons de navigation

### 🧭 Navigation
- **Barre de navigation sticky** avec logo et titre
- **Champ de recherche central** avec icône et placeholder
- Navigation responsive avec menu adaptatif
- **Client Component** pour l'interactivité

## 🏗️ Architecture

### Stack technologique
```
Frontend:
├── Next.js 14 (App Router)
├── React 18
├── TypeScript 5
├── Tailwind CSS 3
└── ESLint + Prettier

Backend/API:
├── API Routes Next.js
├── IGDB API (Twitch)
└── Server Actions

Tooling:
├── npm (gestionnaire de paquets)
├── PostCSS + Autoprefixer
└── Next.js Image Optimization
```

### Patterns d'architecture
- **Server Components** par défaut pour les performances
- **Client Components** uniquement pour l'interactivité (`'use client'`)
- **Separation of Concerns** : services, composants, pages
- **TypeScript strict** pour la sécurité du code
- **Responsive Design** mobile-first

## 🚀 Installation

### Prérequis

- Node.js 18+ 
- npm, yarn, pnpm ou bun
- Un compte développeur Twitch (pour l'API IGDB)

### Configuration

1. **Clonez le projet** (si pas déjà fait) :
   ```bash
   git clone <repository-url>
   cd vgdb
   ```

2. **Installez les dépendances** :
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   # ou
   bun install
   ```

3. **Configuration de l'API IGDB** :

   a. Créez une application sur le [Twitch Developer Console](https://dev.twitch.tv/console/apps)
   
   b. Obtenez votre **Client ID**
   
   c. Générez un **Access Token** via cette requête :
   ```bash
   curl -X POST 'https://id.twitch.tv/oauth2/token' \
   -H 'Content-Type: application/x-www-form-urlencoded' \
   -d 'client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&grant_type=client_credentials'
   ```

4. **Variables d'environnement** :
   
   Modifiez le fichier `.env.local` avec vos vraies clés :
   ```env
   IGDB_CLIENT_ID=votre_client_id
   IGDB_ACCESS_TOKEN=votre_access_token
   ```

## 🛠️ Développement

### Lancer le serveur de développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Autres commandes :

```bash
# Build de production
npm run build

# Démarrer en mode production
npm run start

# Linting
npm run lint
```

## 📁 Structure du projet

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── globals.css        # Styles globaux Tailwind
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   ├── not-found.tsx      # Page 404 personnalisée
│   ├── game/
│   │   └── [id]/
│   │       └── page.tsx   # Page détail d'un jeu
│   └── search/
│       └── page.tsx       # Page de recherche
├── components/            # Composants React réutilisables
│   ├── GameCard.tsx       # Carte d'affichage d'un jeu
│   ├── GameDetails.tsx    # Composant détaillé d'un jeu
│   └── Navigation.tsx     # Barre de navigation
└── lib/
    └── igdb.ts           # Service API IGDB et types TypeScript
```

## 🌐 API IGDB

Cette application utilise l'[API IGDB](https://api-docs.igdb.com/) qui fournit :

- **Informations complètes** sur plus de 200,000 jeux
- **Images haute résolution** (couvertures, screenshots)
- **Métadonnées** (genres, plateformes, développeurs, éditeurs)
- **Notes et critiques** de la communauté
- **Relations entre jeux** (suites, jeux similaires)

### Endpoints utilisés :

- `GET /games` - Récupération des jeux avec filtres
- Les requêtes utilisent le langage de requête IGDB (similaire à SQL)

## 🎨 Design et UX

- **Framework CSS** : Tailwind CSS
- **Composants** : Design system cohérent avec cartes, boutons, navigation
- **Responsive** : Optimisé mobile-first
- **Accessibilité** : Respect des standards WCAG
- **Images** : Optimisation automatique via Next.js Image

## 🚀 Déploiement

### Vercel (recommandé)

1. Connectez votre repository GitHub à Vercel
2. Ajoutez vos variables d'environnement dans les settings Vercel
3. Déployez automatiquement

### Autres plateformes

L'application peut être déployée sur :
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Google Cloud Run

## 🔧 Configuration avancée

### Personnalisation des domaines d'images

Dans `next.config.mjs`, ajoutez d'autres domaines si nécessaire :

```javascript
const nextConfig = {
  images: {
    domains: ['images.igdb.com', 'autre-domaine.com'],
  },
};
```

### Variables d'environnement supplémentaires

```env
# Optionnel : Mode debug
NEXT_PUBLIC_DEBUG=false

# Optionnel : Limite de requêtes API
IGDB_REQUEST_LIMIT=50
```

## 🐛 Dépannage

### Erreur d'authentification IGDB

- Vérifiez que `IGDB_CLIENT_ID` et `IGDB_ACCESS_TOKEN` sont correctement définis
- Assurez-vous que l'access token n'a pas expiré (durée de vie ~60 jours)
- Vérifiez que votre application Twitch a les bonnes permissions

### Images ne s'affichent pas

- Vérifiez la configuration dans `next.config.mjs`
- Assurez-vous que le domaine `images.igdb.com` est autorisé

### Erreurs de build

```bash
# Nettoyer le cache Next.js
rm -rf .next

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

## 📈 Améliorations futures

- [ ] Système de favoris avec localStorage
- [ ] Filtres avancés (genre, plateforme, année)
- [ ] Pagination pour les résultats de recherche
- [ ] Mode sombre/clair
- [ ] Recommandations personnalisées
- [ ] Système de notation utilisateur
- [ ] Partage sur réseaux sociaux
- [ ] PWA (Progressive Web App)

## 📚 Documentation complète

Le projet est entièrement documenté avec les fichiers suivants :

- **[📋 CHANGELOG.md](./CHANGELOG.md)** - Historique complet de tous les changements
- **[🏗️ ARCHITECTURE.md](./ARCHITECTURE.md)** - Architecture détaillée du système
- **[📚 DEVELOPMENT.md](./DEVELOPMENT.md)** - Guide de développement et standards
- **[🎯 README.md](./README.md)** - Ce fichier (vue d'ensemble)

## 🔄 État du projet

### **✅ Fonctionnalités complétées**
- ✅ Architecture Next.js 14 avec App Router
- ✅ Intégration API IGDB complète et fonctionnelle  
- ✅ Pages SSR : accueil, détail, recherche, 404
- ✅ Composants UI responsive et interactifs
- ✅ System de navigation avec breadcrumbs
- ✅ Optimisation d'images et performances
- ✅ Gestion d'erreurs robuste
- ✅ Configuration TypeScript strict
- ✅ Documentation complète

### **📊 Métriques actuelles**
```
✅ Build Size: 87.1 kB First Load JS
✅ Pages: 137-193 B optimisées
✅ Images: Optimisation automatique
✅ SSR: 100% des pages
✅ TypeScript: 100% coverage
✅ Tests: Navigation manuelle validée
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Workflow recommandé :

1. **Fork** le projet sur GitHub
2. **Clone** votre fork localement
3. **Créer** une branche feature : `git checkout -b feature/nom-fonctionnalite`
4. **Développer** en suivant les standards dans [DEVELOPMENT.md](./DEVELOPMENT.md)
5. **Tester** avec `npm run build` et tests manuels
6. **Commiter** : `git commit -m 'feat: description'`
7. **Pousser** : `git push origin feature/nom-fonctionnalite`
8. **Ouvrir** une Pull Request avec description détaillée

## 📋 Checklist de contribution

- [ ] Code suit les conventions dans [DEVELOPMENT.md](./DEVELOPMENT.md)
- [ ] `npm run build` passe sans erreurs
- [ ] `npm run lint` est propre
- [ ] Tests manuels effectués (navigation, responsive)
- [ ] Documentation mise à jour si nécessaire
- [ ] Commit messages suivent le format conventionnel

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements et crédits

### **APIs et services**
- **[IGDB](https://www.igdb.com/)** - Excellente API de données de jeux vidéos
- **[Twitch Developer](https://dev.twitch.tv/)** - Authentification OAuth2 pour IGDB

### **Technologies et frameworks**
- **[Next.js](https://nextjs.org/)** - Framework React avec App Router
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitaire
- **[TypeScript](https://www.typescriptlang.org/)** - Types statiques pour JavaScript
- **[Vercel](https://vercel.com/)** - Plateforme de déploiement et outils

### **Développement et outils**
- **[ESLint](https://eslint.org/)** - Linting et qualité de code
- **[PostCSS](https://postcss.org/)** - Transformation CSS
- **[GitHub](https://github.com/)** - Hébergement du code source

---

**🎮 Créé avec ❤️ pour les passionnés de jeux vidéos**

*Projet développé en octobre 2025 - Documentation maintenue à jour*