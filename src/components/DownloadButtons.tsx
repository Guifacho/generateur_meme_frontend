import type { RefObject } from 'react'

type Props = {
  canvasRef: RefObject<HTMLCanvasElement | null>
  onSave: () => void
  disabled: boolean
}

export function DownloadButtons({ canvasRef, onSave, disabled }: Props) {
  function downloadMeme(format: 'png' | 'jpeg') {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const mime = format === 'png' ? 'image/png' : 'image/jpeg'
    const url = canvas.toDataURL(mime)
    const link = document.createElement('a')
    link.href = url
    link.download = `meme-${Date.now()}.${format}`
    link.click()
  }

  function copyImageLink() {
    const canvas = canvasRef.current
    if (!canvas || !navigator.clipboard) {
      return
    }

    const url = canvas.toDataURL('image/png')
    navigator.clipboard.writeText(url)
  }

  return (
    <div className="download-panel">
      <button type="button" className="button-primary" onClick={onSave} disabled={disabled}>
        Enregistrer dans la galerie
      </button>
      <button type="button" className="button-secondary" onClick={() => downloadMeme('png')} disabled={disabled}>
        Télécharger PNG
      </button>
      <button type="button" className="button-secondary" onClick={() => downloadMeme('jpeg')} disabled={disabled}>
        Télécharger JPG
      </button>
      <button type="button" className="button-secondary" onClick={copyImageLink} disabled={disabled || !navigator.clipboard}>
        Copier le lien image
      </button>
    </div>
  )
}
