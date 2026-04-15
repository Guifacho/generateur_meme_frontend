import { useMemo, useState } from 'react'

const MAX_SIZE_BYTES = 10 * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

type Props = {
  onImageUpload: (file: File) => void
}

export function UploadZone({ onImageUpload }: Props) {
  const [error, setError] = useState<string | null>(null)

  const accept = useMemo(() => ACCEPTED_TYPES.join(','), [])

  function handleFile(file: File) {
    setError(null)
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Format invalide. Utilisez JPG, PNG ou WEBP.')
      return
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError('Le fichier dépasse 10 Mo.')
      return
    }
    onImageUpload(file)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  return (
    <div className="upload-zone">
      <label className="upload-card" htmlFor="meme-file-input">
        <span>Importer une image</span>
        <span className="upload-subtitle">JPG, PNG ou WEBP — max 10 Mo</span>
        <input
          id="meme-file-input"
          type="file"
          accept={accept}
          onChange={handleChange}
        />
      </label>
      <div className="drop-zone" onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
        Glisser-déposer une image ici
      </div>
      {error ? <p className="field-error">{error}</p> : null}
    </div>
  )
}
