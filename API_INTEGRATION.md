# Intégration API Backend - Générateur de Mèmes

## 📋 Résumé des changements

Le frontend a été adapté pour communiquer correctement avec l'API backend `http://localhost:3001/api/memes`.

### Modifications Principales

#### 1. **src/services/storageService.ts**

**Changements:**
- Configuration des URLs de l'API
  ```typescript
  const API_BASE_URL = 'http://localhost:3001/api/memes'
  const UPLOADS_URL = 'http://localhost:3001/uploads'
  ```

- **`loadGallery()`** : Récupère la liste des mèmes avec POST /api/memes
  - Transforme les noms d'images en URLs complètes

- **`addMeme(meme: MemeData, imageFile: File)`** : Crée un nouveau mème
  - Utilise `multipart/form-data`
  - Envoie: `title`, `image` (fichier), `texts` (JSON stringifié)
  - Retourne le MemeData avec l'image URL du serveur

- **`updateMeme(id: string, title: string, texts: any[])`** : Met à jour un mème (titre/textes)
  - Appelle PUT /api/memes/:id

- **`removeMeme(id: string)`** : Supprime un mème
  - Appelle DELETE /api/memes/:id

#### 2. **src/App.tsx**

**Changements:**
- Ajout d'un state `imageFile: File | null` pour conserver le fichier original
- **`handleImageUpload(file: File)`** 
  - Stocke le fichier en addition au base64 pour l'envoi au backend

- **`handleSaveMeme()`** 
  - Convertit le canvas en Blob, puis en File
  - Appelle `addMeme(meme, canvasFile)` avec le fichier du canvas
  - Reçoit le MemeData créé depuis le serveur

- **`handleResetEditor()`**
  - Réinitialise aussi le state `imageFile`

---

## 🔌 Routes API Implémentées

| Méthode | Route | Fonction | Implémentation |
|---------|-------|----------|-----------------|
| GET | `/api/memes` | Récupérer tous les mèmes | ✅ `loadGallery()` |
| POST | `/api/memes` | Créer un mème | ✅ `addMeme()` |
| PUT | `/api/memes/:id` | Mettre à jour un mème | ✅ `updateMeme()` |
| DELETE | `/api/memes/:id` | Supprimer un mème | ✅ `removeMeme()` |
| GET | `/api/memes/:id` | Récupérer un mème spécifique | ⚠️ À implémenter si nécessaire |
| GET | `/uploads/:filename` | Accéder aux images | ✅ Utilisé dans loadGallery() |

---

## 🚀 Structure de données API

### Request: Créer un mème (POST /api/memes)
```
Method: POST
Content-Type: multipart/form-data

Form fields:
- title: string ("Mon Mème")
- image: File (image.png)
- texts: string (JSON) ('[{"content":"Hello","x":50,"y":50}]')
```

### Response: Créer un mème (200 OK)
```json
{
  "id": "7b4e879a-573a-4911-90da-a9e174b8fb16",
  "title": "Mon Mème",
  "image": "1776297629045-593143285.png",
  "texts": [{"content": "Hello", "x": 50, "y": 50}],
  "createdAt": "2026-04-16T00:00:29.082Z"
}
```

### Response: Récupérer tous les mèmes (GET /api/memes)
```json
[
  {
    "id": "7b4e879a-573a-4911-90da-a9e174b8fb16",
    "title": "Test Reussi",
    "image": "1776297629045-593143285.png",
    "texts": [{"content": "Enfin !", "x": 50, "y": 50}],
    "createdAt": "2026-04-16T00:00:29.082Z"
  }
]
```

---

## ⚙️ Configuration

### Frontend URL
- **Base API**: `http://localhost:3001/api/memes`
- **Images**: `http://localhost:3001/uploads/{filename}`

### Prérequis
- Backend doit être actif sur `http://localhost:3001`
- Le backend doit accepter les requêtes multipart/form-data pour POST

---

## ✅ Tests à effectuer

1. **Créer un mème**
   - Uploader une image
   - Ajouter du texte
   - Sauvegarder → Vérifier que l'image est sauvegardée sur le serveur

2. **Charger la galerie**
   - Au démarrage de l'app
   - Les images doivent s'afficher avec les URLs du serveur

3. **Supprimer un mème**
   - Supprimer depuis la galerie → Vérifier la suppression sur le serveur

4. **Éditer un mème**
   - Cliquer sur un mème → Éditeur → Modifier et enregistrer
   - Le PUT /api/memes/:id doit être appelé

---

## 🔄 Flux de travail complet

```
1. Utilisateur charge une image
   └─ handleImageUpload() → setImageSrc + setImageFile

2. Utilisateur ajoute du texte et clique "Enregistrer"
   └─ handleSaveMeme() 
      └─ Canvas → Blob → File
      └─ addMeme(meme, canvasFile)
         └─ FormData avec: title, image, texts
         └─ POST /api/memes
         └─ Reçoit MemeData avec image URL du serveur
         └─ Galerie mise à jour

3. Page galerie chargée
   └─ loadGallery()
      └─ GET /api/memes
      └─ Transforme image en URL complète
      └─ Affiche dans GalleryCard

4. Utilisateur supprime un mème
   └─ handleDeleteMeme()
      └─ removeMeme(id)
      └─ DELETE /api/memes/:id
      └─ Galerie mise à jour localement
```

---

## 📝 Notes importantes

- Le field `texts` est envoyé au backend en tant que string (JSON.stringify)
- Les images retournées par le backend contiennent juste le nom de fichier, qui est transformé en URL complète (`http://localhost:3001/uploads/...`)
- Le canvas du mème avec le texte rendu est envoyé comme image PNG au backend
- Le frontend recalcule les positions du texte (x, y) en pourcentages (0-1) pour la flexibilité

---

## 🐛 Dépannage

### L'API ne répond pas
→ Vérifier que le backend est actif sur `http://localhost:3001`

### Les images ne s'affichent pas
→ Vérifier que `UPLOADS_URL` est correctement configuré
→ Vérifier que le dossier `/uploads` existe sur le serveur

### Le formulaire de création échoue
→ Vérifier que le backend accepte multipart/form-data
→ Vérifier que le field `texts` est bien JSON.stringify()

