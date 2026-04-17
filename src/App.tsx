import { useEffect, useRef, useState } from 'react'
import { UploadZone } from './components/UploadZone'
import { MemeCanvas } from './components/MemeCanvas'
import { TextControls } from './components/TextControls'
import { DownloadButtons } from './components/DownloadButtons'
import { GalleryCard } from './components/GalleryCard'
import { addMeme, loadGallery, removeMeme } from './services/storageService'
import type { MemeData, MemeText } from './types'
import './App.css'

const defaultText = (id: string): MemeText => ({
  id,
  content: 'Mon texte',
  x: 0.5,
  y: 0.15,
  fontSize: 36,
  color: '#ffffff',
  strokeColor: '#000000',
  fontFamily: 'Impact',
  textAlign: 'center',
  bold: true,
  italic: false,
})

function App() {
  const [page, setPage] = useState<'home' | 'editor' | 'gallery'>('home')
  const [gallery, setGallery] = useState<MemeData[]>([])
  const [title, setTitle] = useState('Mon mème')
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [texts, setTexts] = useState<MemeText[]>([])
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadGallery()
        setGallery(data)
      } catch (error) {
        console.error('Erreur chargement galerie:', error)
        setGallery([])
      }
    }
    loadData()
  }, [])

  const hasMeme = Boolean(imageSrc && texts.length)

  function showMessage(message: string) {
    setFeedback(message)
    window.setTimeout(() => setFeedback(null), 2500)
  }

  function handleImageUpload(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageSrc(reader.result)
        setImageFile(file)
        showMessage('Image chargée avec succès')
      }
    }
    reader.readAsDataURL(file)
  }

  function handleAddText() {
    const id = crypto.randomUUID?.() ?? `${Date.now()}`
    const text = defaultText(id)
    setTexts((current) => [...current, text])
    setSelectedTextId(id)
  }

  function handleUpdateText(updated: MemeText) {
    setTexts((items) => items.map((item) => (item.id === updated.id ? updated : item)))
  }

  function handleRemoveText(id: string) {
    const nextTexts = texts.filter((item) => item.id !== id)
    setTexts(nextTexts)
    if (selectedTextId === id) {
      setSelectedTextId(nextTexts[0]?.id ?? null)
    }
  }

  async function handleSaveMeme() {
    if (!imageSrc || !imageFile) {
      showMessage('Ajoutez une image avant d\'enregistrer')
      return
    }

    try {
      // Créer le blob du canvas (image finale avec texte)
      const canvasBlob = await new Promise<Blob | null>((resolve) => {
        canvasRef.current?.toBlob((blob) => resolve(blob), 'image/png')
      })

      if (!canvasBlob) {
        showMessage('Erreur lors de la création du mème')
        return
      }

      // Créer le File du canvas pour pouvoir l'envoyer au backend
      const canvasFile = new File([canvasBlob], `meme-${Date.now()}.png`, { type: 'image/png' })

      const meme: MemeData = {
        id: crypto.randomUUID?.() ?? `${Date.now()}`,
        title: title || 'Mon mème',
        image: '', // Sera rempli par le serveur
        texts,
        createdAt: new Date().toISOString(),
      }

      // Envoyer au backend avec le fichier canvas
      const createdMeme = await addMeme(meme, canvasFile)
      setGallery((items) => [createdMeme, ...items])
      showMessage('Mème enregistré dans la galerie')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inconnue'
      console.error(error)
      showMessage(`Erreur: ${message}`)
    }
  }

  

  function handleOpenMeme(item: MemeData) {
    setPage('editor')
    setTitle(item.title)
    setImageSrc(item.image)
    setTexts(item.texts)
    setSelectedTextId(item.texts[0]?.id ?? null)
  }

  async function handleDeleteMeme(id: string) {
    try {
      await removeMeme(id)
      setGallery((items) => items.filter((item) => item.id !== id))
      showMessage('Mème supprimé')
    } catch (error) {
      console.error(error)
      showMessage('Erreur lors de la suppression')
    }
  }

  function handleResetEditor() {
    setTitle('Mon mème')
    setImageSrc(null)
    setImageFile(null)
    setTexts([])
    setSelectedTextId(null)
  }

  function renderHome() {
    return (
      <section className="page page-home">
        <div className="hero-panel">
          <div>
            <p className="eyebrow">Générateur de mèmes</p>
            <h1>Créez votre mème en quelques clics</h1>
            <p className="hero-copy">
              Importez une image, ajoutez du texte, visualisez le résultat et téléchargez votre création.
            </p>
            <div className="hero-actions">
              <button className="button-primary" onClick={() => setPage('editor')}>
                Créer un mème
              </button>
              <button className="button-secondary" onClick={() => setPage('gallery')}>
                Voir la galerie
              </button>
            </div>
          </div>
          <div className="hero-preview">
            <div className="preview-box">
              {gallery.length > 0 ? (
                <img src={gallery[0].image} alt={gallery[0].title} />
              ) : (
                <span>Aperçu de la galerie</span>
              )}
            </div>
          </div>
        </div>

        <div className="feature-grid">
          <article>
            <h2>Téléchargez une image</h2>
            <p>JPG, PNG ou WEBP avec aperçu instantané.</p>
          </article>
          <article>
            <h2>Ajoutez du texte</h2>
            <p>Position, couleur, police et taille en direct.</p>
          </article>
          <article>
            <h2>Sauvegardez votre travail</h2>
            <p>La galerie conserve vos créations localement.</p>
          </article>
        </div>
      </section>
    )
  }

  function renderEditor() {
    return (
      <section className="page page-editor">
        <div className="editor-grid">
          <div className="editor-column">
            <UploadZone onImageUpload={handleImageUpload} />
            <MemeCanvas imageSrc={imageSrc} texts={texts} canvasRef={canvasRef} />
            <DownloadButtons canvasRef={canvasRef} onSave={handleSaveMeme} disabled={!hasMeme} />
            {feedback ? <p className="feedback">{feedback}</p> : null}
          </div>
          <div className="editor-column sidebar">
            <TextControls
              title={title}
              texts={texts}
              selectedTextId={selectedTextId}
              onTitleChange={setTitle}
              onAddText={handleAddText}
              onSelectText={setSelectedTextId}
              onUpdateText={handleUpdateText}
              onRemoveText={handleRemoveText}
            />
            <button className="button-secondary full-width" type="button" onClick={handleResetEditor}>
              Réinitialiser l’éditeur
            </button>
          </div>
        </div>
      </section>
    )
  }

  function renderGallery() {
    return (
      <section className="page page-gallery">
        <div className="gallery-header">
          <div>
            <p className="eyebrow">Galerie</p>
            <h1>Vos mèmes enregistrés</h1>
          </div>
          <button className="button-primary" onClick={() => setPage('editor')}>
            Créer un nouveau mème
          </button>
        </div>

        {gallery.length === 0 ? (
          <div className="empty-state-card">
            <p>Aucun mème enregistré pour le moment.</p>
            <button className="button-primary" onClick={() => setPage('editor')}>
              Créer un premier mème
            </button>
          </div>
        ) : (
          <div className="gallery-grid">
            {gallery.map((item) => (
              <GalleryCard key={item.id} item={item} onEdit={handleOpenMeme} onDelete={handleDeleteMeme} />
            ))}
          </div>
        )}
      </section>
    )
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <span className="brand">MemeLab</span>
          <nav>
            <button type="button" onClick={() => setPage('home')}>
              Accueil
            </button>
            <button type="button" onClick={() => setPage('editor')}>
              Éditeur
            </button>
            <button type="button" onClick={() => setPage('gallery')}>
              Galerie
            </button>
          </nav>
        </div>
      </header>

      <main className="content">
        {page === 'home' && renderHome()}
        {page === 'editor' && renderEditor()}
        {page === 'gallery' && renderGallery()}
      </main>
    </div>
  )
}

export default App
