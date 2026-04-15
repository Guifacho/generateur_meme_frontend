import { useState, useRef, useEffect } from 'react'
import type { MemeData } from '../types'
import { copyToClipboard, getShareUrl, openShareWindow } from '../services/shareService'

type Props = {
  item: MemeData
  onEdit: (item: MemeData) => void
  onDelete: (id: string) => void
}

export function GalleryCard({ item, onEdit, onDelete }: Props) {
  const [showShare, setShowShare] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowShare(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleShare(platform: 'facebook' | 'twitter' | 'whatsapp' | 'copy' | 'download') {
    if (platform === 'copy') {
      copyToClipboard(item.image)
        .then(() => {
          alert('Lien copié dans le presse-papiers!')
          setShowShare(false)
        })
        .catch(() => {
          alert('Erreur lors de la copie')
        })
    } else if (platform === 'download') {
      const link = document.createElement('a')
      link.href = item.image
      link.download = `${item.title}-${Date.now()}.png`
      link.click()
      setShowShare(false)
    } else {
      const text = `Découvrez mon mème : ${item.title}`
      const url = getShareUrl(platform, text)
      openShareWindow(url, `Share-${platform}`)
      setShowShare(false)
    }
  }
  return (
    <article className="gallery-card" ref={containerRef}>
      <img src={item.image} alt={item.title} />
      <div className="gallery-meta">
        <div>
          <h3>{item.title}</h3>
          <p>{new Date(item.createdAt).toLocaleString()}</p>
        </div>
        <div className="gallery-actions-wrapper">
          <div className="gallery-actions">
            <button type="button" className="button-primary" onClick={() => onEdit(item)}>
              Ouvrir
            </button>
            <div className="share-dropdown-container">
              <button type="button" className="button-secondary" onClick={() => setShowShare(!showShare)}>
                Partager
              </button>
              {showShare && (
                <div className="share-dropdown">
                  <button type="button" onClick={() => handleShare('facebook')}>
                    Facebook
                  </button>
                  <button type="button" onClick={() => handleShare('twitter')}>
                    X / Twitter
                  </button>
                  <button type="button" onClick={() => handleShare('whatsapp')}>
                    WhatsApp
                  </button>
                  <button type="button" onClick={() => handleShare('download')}>
                    Télécharger
                  </button>
                  <button type="button" onClick={() => handleShare('copy')}>
                    Copier le lien
                  </button>
                </div>
              )}
            </div>
            <button type="button" className="button-secondary" onClick={() => onDelete(item.id)}>
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
