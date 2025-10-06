# 🎮 Video Games Database (VGDb)

Une application web moderne construite avec **Next.js 14**, **React**, **TypeScript** et **Tailwind CSS** pour explorer une vaste base de données de jeux vidéos alimentée par l'API IGDB.

## ✨ Fonctionnalités

- **Page d'accueil** : Affichage de 50 jeux vidéos aléatoires avec SSR
- **Pages détail** : Informations complètes sur chaque jeu (description, notes, screenshots, jeux similaires)
- **Recherche** : Système de recherche en temps réel
- **Design responsive** : Interface moderne optimisée pour tous les appareils
- **SEO optimisé** : Métadonnées dynamiques et rendu côté serveur
- **Performance** : Optimisation des images et chargement rapide

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

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Forker le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commiter vos changements (`git commit -m 'Add AmazingFeature'`)
4. Pousser sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [IGDB](https://www.igdb.com/) pour l'excellente API de données de jeux
- [Next.js](https://nextjs.org/) pour le framework React
- [Tailwind CSS](https://tailwindcss.com/) pour le système de design
- [Vercel](https://vercel.com/) pour l'hébergement et les outils de développement

---

**Créé avec ❤️ pour les passionnés de jeux vidéos**