# Générateur de Meme - Frontend

Une application web interactive permettant de créer, personnaliser et partager des memes facilement. Cette application offre une interface intuitive pour générer des memes à partir de templates prédéfinis ou d'images personnalisées.

### Architecture générale

L'application fonctionne selon ce flux:

1. **Sélection/Upload** - L'utilisateur choisit un template ou upload une image
2. **Édition** - Interface interactive pour ajouter et modifier le texte
3. **Prévisualisation** - Affichage en temps réel du meme via Canvas
4. **Génération** - Conversion du Canvas en image téléchargeable

## 🎨 Traitement et génération des images

### Processus de génération

- **Canvas HTML5** - Utilisé pour dessiner l'image de base et le texte
- **Manipulation d'images** - Chargement des templates et images uploadées
- **Rendu du texte** - Application des styles (police, couleur, taille, position)
- **Export** - Conversion du Canvas en fichier image (PNG/JPEG) téléchargeable

### Fonctionnalités clés du frontend

- **Gestion des templates** - Chargement et affichage des templates prédéfinis
- **Upload d'images** - Permettre aux utilisateurs d'importer leurs propres images
- **Édition dynamique du texte** - Modification en temps réel des propriétés du texte
- **Prévisualisation instantanée** - Actualisation immédiate du Canvas lors des changements
- **Téléchargement** - Export de l'image générée au format image standard
## 🎯 Fonctionnalités

- Création de memes avec des templates prédéfinis
- Personnalisation du texte (polices, couleurs, positions)
- Upload d'images personnalisées
- Prévisualisation en temps réel
- Téléchargement des memes générés
- Interface responsive et conviviale

## 🚀 Démarrage rapide

### Prérequis
- Node.js 16+ installé
- npm ou yarn

### Installation et lancement

1. Clonez le projet ou naviguez dans le dossier du projet:
```bash
git clone...
```

2. Installez les dépendances:
```bash
npm install
```

3. Lancez le serveur de développement:
```bash
npm run dev
```

4. Ouvrez votre navigateur et accédez à `http://localhost:5173`

### Commandes disponibles

- `npm run dev` - Lance le serveur de développement avec HMR
- `npm run build` - Génère la version de production
- `npm run preview` - Prévisualise la version de production localement
- `npm run lint` - Exécute les vérifications ESLint

## 📱 Utilisation

1. Sélectionnez un template ou uploadez une image
2. Ajoutez du texte aux zones disponibles
3. Personnalisez la taille, couleur et position du texte
4. Prévisualisez votre meme en temps réel
5. Téléchargez votre création en cliquant sur "Télécharger"

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

// ...existing code...
