# Guide de Démarrage - Générateur de Mèmes

## Prérequis

- **Node.js** v16+ installé
- **Backend** du générateur de mèmes actif sur `http://localhost:3001`

## Installation

### Backend (si nécessaire)

```bash
cd ../generateur_meme_backend  # Naviguer vers le dossier backend
npm install
npm run dev  # Démarre sur http://localhost:3001
```

### Frontend

```bash
cd generateur_meme_frontend
npm install
npm run dev  # Démarre sur http://localhost:5173
```

## Démarrage en Développement

### Terminal 1 - Backend
```bash
cd generateur_meme_backend
npm run dev
# ✓ Serveur démarré sur http://localhost:3001
```

### Terminal 2 - Frontend
```bash
cd generateur_meme_frontend
npm run dev
# ✓ Vite ready in XXXms
# ➜ http://localhost:5173/
```

## Vérifier la Connexion

1. Ouvrir http://localhost:5173/
2. Cliquer sur **"Créer un mème"**
3. **Uploader une image**
4. **Ajouter du texte**
5. Cliquer sur **"Enregistrer dans la galerie"**

✅ Si le mème apparaît dans la galerie, l'intégration fonctionne !

---

## Construction pour la Production

```bash
npm run build
# dist/ contiendra les fichiers optimisés
```

## Commandes Disponibles

```bash
npm run dev      # Démarre le serveur de développement
npm run build    # Compile pour la production
npm run lint     # Vérifie le code avec ESLint
npm run preview  # Prévisualise le build de production
```

---

## Troubleshooting

### "Cannot connect to API"
- ✓ Vérifier que le backend est actif : `curl http://localhost:3001/api/memes`
- ✓ Vérifier les logs du backend pour les erreurs

### "Images not loading"
- ✓ Vérifier que le dossier `/uploads` existe sur le backend
- ✓ Vérifier que `API_BASE_URL` dans `storageService.ts` est correct

### "Port 5173 already in use"
```bash
npm run dev -- --port 3000  # Utiliser un port différent
```

---

## Architecture

```
generateur_meme_frontend/
├── src/
│   ├── App.tsx                 # Composant principal
│   ├── types.ts               # Types TypeScript
│   ├── components/            # Composants React
│   │   ├── MemeCanvas.tsx     # Affichage du mème
│   │   ├── TextControls.tsx   # Contrôles de texte
│   │   ├── UploadZone.tsx     # Upload d'image
│   │   ├── DownloadButtons.tsx # Téléchargement
│   │   └── GalleryCard.tsx    # Carte de galerie
│   └── services/
│       ├── storageService.ts  # Appels API
│       └── shareService.ts    # Partage réseaux sociaux
├── vite.config.ts             # Configuration Vite
└── tsconfig.json              # Configuration TypeScript
```

---

## Endpoints Disponibles

Voir [API_INTEGRATION.md](./API_INTEGRATION.md) pour la documentation complète des endpoints.

---

## Support

Pour les problèmes, consultez les logs du navigateur (F12 → Console) et du serveur de développement.
