# 📚 Documentation - Générateur de Mèmes

Bienvenue dans la documentation du frontend du générateur de mèmes. Cette documentation couvre l'intégration complète avec l'API backend.

---

## 🚀 Quick Start (5 minutes)

1. **Démarrer le backend** (si nécessaire)
   ```bash
   cd ../generateur_meme_backend && npm run dev
   ```

2. **Démarrer le frontend**
   ```bash
   npm install && npm run dev
   ```

3. **Ouvrir** http://localhost:5173

4. **Tester** : Créer → Uploader image → Ajouter texte → Enregistrer

✅ **C'est prêt !** Les mèmes sont sauvegardés sur le backend.

---

## 📖 Documentation Complète

### Pour les Développeurs
- **[GETTING_STARTED.md](./GETTING_STARTED.md)** 
  - Installation et démarrage
  - Commandes disponibles
  - Troubleshooting

- **[API_INTEGRATION.md](./API_INTEGRATION.md)**
  - Endpoints API détaillés
  - Formats requête/réponse
  - Flux complet de travail
  - Tests à effectuer

- **[TECHNICAL_SPECS.md](./TECHNICAL_SPECS.md)**
  - Changements techniques détaillés
  - Avant/Après comparaison
  - Optimisations de performance
  - Considérations de sécurité

### Pour les Administrateurs
- **[CHANGES_SUMMARY.md](./CHANGES_SUMMARY.md)**
  - Liste des fichiers modifiés
  - Statistiques
  - Checklist d'intégration
  - Prérequis

---

## 🔗 Architecture

```
┌─────────────────────┐
│   Frontend (5173)   │
│  React + TypeScript │
└──────────┬──────────┘
           │ HTTP
           ↓
┌─────────────────────┐
│   Backend API (3001)│
│  Node.js + Express  │
│                     │
│  POST   /api/memes  │
│  GET    /api/memes  │
│  PUT    /api/memes/:id
│  DELETE /api/memes/:id
│  GET    /uploads/*  │
└─────────────────────┘
           │
           ↓
    ┌────────────────┐
    │  /uploads/     │
    │  (Image files) │
    └────────────────┘
```

---

## 📋 Fichiers Modifiés

| Fichier | Type | Changement |
|---------|------|-----------|
| `src/services/storageService.ts` | Code | ✅ Intégration API FormData |
| `src/App.tsx` | Code | ✅ Canvas → Blob → File |
| `API_INTEGRATION.md` | Doc | ✨ Nouveau |
| `GETTING_STARTED.md` | Doc | ✨ Nouveau |
| `TECHNICAL_SPECS.md` | Doc | ✨ Nouveau |
| `CHANGES_SUMMARY.md` | Doc | ✨ Nouveau |

---

## 🎯 Fonctionnalités Implémentées

- [x] **Créer un mème** - Upload image + texte → Backend
- [x] **Afficher la galerie** - Récupère depuis le backend
- [x] **Supprimer un mème** - DELETE depuis la galerie
- [x] **Adapter pour API** - FormData + File upload
- [x] **Transformer URLs** - Images du backend affichables

## 🔜 Fonctionnalités Futures (Optionnel)

- [ ] Éditer un mème existant
- [ ] Récupérer un mème spécifique
- [ ] Recherche/filtrage
- [ ] Pagination
- [ ] Export avancé (GIF, etc.)

---

## ✅ Vérifications

- [x] **TypeScript** - 0 erreurs
- [x] **Build** - 210 KB production
- [x] **API** - Tous les endpoints
- [x] **Documentation** - Complète

---

## 🔧 Configuration

### URLs d'API
```
Base:   http://localhost:3001/api/memes
Images: http://localhost:3001/uploads
```

### Variables d'Environnement
Aucune nécessaire (configurées dans le code).

### Prérequis
- Node.js 16+
- Backend actif sur :3001

---

## 🆘 Besoin d'Aide ?

1. **Erreur de compilation** → Voir [GETTING_STARTED.md](./GETTING_STARTED.md#troubleshooting)
2. **Erreur API** → Voir [API_INTEGRATION.md](./API_INTEGRATION.md#-dépannage)
3. **Questions techniques** → Voir [TECHNICAL_SPECS.md](./TECHNICAL_SPECS.md)

---

## 📦 Build & Déploiement

### Développement
```bash
npm run dev
```

### Production
```bash
npm run build
# dist/ contient les fichiers prêts pour le déploiement
```

### Hébergement
Le frontend est une SPA (Single Page Application) statique. Il peut être hébergé sur:
- Vercel, Netlify, GitHub Pages
- AWS S3 + CloudFront
- Nginx / Apache
- Tout serveur web statique

**Condition:** Le backend doit être accessible depuis le navigateur.

---

## 📊 Ressources du Projet

```
generateur_meme_frontend/
├── src/
│   ├── App.tsx                    # Composant principal ✅ Modifié
│   ├── types.ts                   # Types TypeScript
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   ├── components/
│   │   ├── MemeCanvas.tsx         # Rendu du mème
│   │   ├── TextControls.tsx       # Contrôles de texte
│   │   ├── UploadZone.tsx         # Upload d'image
│   │   ├── DownloadButtons.tsx    # Téléchargement/Sauvegarde
│   │   └── GalleryCard.tsx        # Affichage galerie
│   └── services/
│       ├── storageService.ts      # API calls ✅ Modifié
│       └── shareService.ts        # Partage réseaux sociaux
├── vite.config.ts
├── tsconfig.json
├── package.json
├── README.md                       # (original)
├── DOCUMENTATION.md                # <-- Vous êtes ici
├── API_INTEGRATION.md              # Routes API ✨ Nouveau
├── GETTING_STARTED.md              # Guide démarrage ✨ Nouveau
├── TECHNICAL_SPECS.md              # Spécifications ✨ Nouveau
└── CHANGES_SUMMARY.md              # Résumé changements ✨ Nouveau
```

---

## 🎓 Formation Rapide

### Comment ça marche ?

1. **Upload d'image**
   ```
   Utilisateur upload → FileReader → setImageSrc + setImageFile
   ```

2. **Rendu du texte**
   ```
   Utilisateur ajoute texte → MemeCanvas le rend sur le canvas HTML5
   ```

3. **Sauvegarde**
   ```
   Utilisateur clique "Enregistrer"
   → Canvas toBlob() → createFile() 
   → FormData(title, image, texts) 
   → POST /api/memes 
   → Backend crée le fichier et retourne l'URL
   ```

4. **Affichage galerie**
   ```
   Page charge → loadGallery() 
   → GET /api/memes 
   → Transforme image: "file.png" → "http://localhost:3001/uploads/file.png"
   → Affiche dans GalleryCard
   ```

---

## 💡 Points Importants

> **FormData** - Le backend attend `multipart/form-data`, pas JSON
> 
> **File objects** - On envoie des vrais fichiers, pas du base64
>
> **Image storage** - Les images sont stockées sur le serveur, pas dans le navigateur
>
> **URLs** - Le backend retourne juste le nom, on construit l'URL complète

---

## 📞 Questions Fréquentes

**Q: Pourquoi FormData et pas JSON ?**
A: Le backend est conçu pour accepter des uploads de fichiers avec du texte. FormData est le standard pour ça.

**Q: Où sont stockées les images ?**
A: Sur le serveur backend dans `/uploads` (configurable).

**Q: Le frontend marche sans backend ?**
A: Non, le backend API est obligatoire. Mais vous pouvez utiliser un mock si nécessaire.

**Q: Je peux changer l'URL du backend ?**
A: Oui, modifiez `API_BASE_URL` dans `src/services/storageService.ts`.

---

## 🚀 Prochaines Étapes

1. ✅ **Lire [GETTING_STARTED.md](./GETTING_STARTED.md)** pour démarrer
2. ✅ **Consulter [API_INTEGRATION.md](./API_INTEGRATION.md)** pour les détails API
3. ✅ **Tester** en créant un mème
4. ✅ **Déployer** quand vous êtes prêt

---

**Dernière mise à jour:** 17 avril 2026  
**Version Frontend:** 0.0.0  
**Version Node:** 22.16.0  
**Version React:** 19.2.4
