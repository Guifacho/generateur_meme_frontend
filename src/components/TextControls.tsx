import type { MemeText } from '../types'

type Props = {
  title: string
  texts: MemeText[]
  selectedTextId: string | null
  onTitleChange: (title: string) => void
  onAddText: () => void
  onSelectText: (id: string) => void
  onUpdateText: (updated: MemeText) => void
  onRemoveText: (id: string) => void
}

const defaultFonts = ['Impact', 'Arial', 'Montserrat', 'Comic Sans MS']

export function TextControls({
  title,
  texts,
  selectedTextId,
  onTitleChange,
  onAddText,
  onSelectText,
  onUpdateText,
  onRemoveText,
}: Props) {
  const selectedText = texts.find((item) => item.id === selectedTextId) ?? texts[0]

  return (
    <div className="controls-panel">
      <div className="panel-section">
        <label>
          Nom du mème
          <input value={title} onChange={(event) => onTitleChange(event.target.value)} />
        </label>
      </div>

      <div className="panel-section panel-actions">
        <h3>Blocs de texte</h3>
        <button type="button" className="button-secondary" onClick={onAddText}>
          Ajouter un bloc
        </button>
      </div>

      <div className="text-list">
        {texts.map((text) => (
          <button
            key={text.id}
            type="button"
            className={text.id === selectedText?.id ? 'text-item selected' : 'text-item'}
            onClick={() => onSelectText(text.id)}
          >
            {text.content || 'Nouveau texte'}
          </button>
        ))}
      </div>

      {selectedText ? (
        <div className="panel-section">
          <h4>Modifier le texte</h4>
          <label>
            Contenu
            <textarea
              rows={3}
              value={selectedText.content}
              onChange={(event) => onUpdateText({ ...selectedText, content: event.target.value })}
            />
          </label>

          <label>
            Taille
            <input
              type="number"
              min={16}
              max={120}
              value={selectedText.fontSize}
              onChange={(event) => onUpdateText({ ...selectedText, fontSize: Number(event.target.value) || 24 })}
            />
          </label>

          <label>
            Couleur du texte
            <input
              type="color"
              value={selectedText.color}
              onChange={(event) => onUpdateText({ ...selectedText, color: event.target.value })}
            />
          </label>

          <label>
            Couleur du contour
            <input
              type="color"
              value={selectedText.strokeColor}
              onChange={(event) => onUpdateText({ ...selectedText, strokeColor: event.target.value })}
            />
          </label>

          <label>
            Police
            <select
              value={selectedText.fontFamily}
              onChange={(event) => onUpdateText({ ...selectedText, fontFamily: event.target.value })}
            >
              {defaultFonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </label>

          <label>
            Alignement
            <select
              value={selectedText.textAlign}
              onChange={(event) => onUpdateText({ ...selectedText, textAlign: event.target.value as 'center' | 'left' | 'right' })}
            >
              <option value="center">Centré</option>
              <option value="left">Gauche</option>
              <option value="right">Droite</option>
            </select>
          </label>

          <div className="inline-fields">
            <label>
              X (%)
              <input
                type="number"
                min={0}
                max={100}
                value={Math.round(selectedText.x * 100)}
                onChange={(event) => onUpdateText({ ...selectedText, x: Number(event.target.value) / 100 })}
              />
            </label>
            <label>
              Y (%)
              <input
                type="number"
                min={0}
                max={100}
                value={Math.round(selectedText.y * 100)}
                onChange={(event) => onUpdateText({ ...selectedText, y: Number(event.target.value) / 100 })}
              />
            </label>
          </div>

          <div className="checkbox-row">
            <label>
              <input
                type="checkbox"
                checked={selectedText.bold}
                onChange={(event) => onUpdateText({ ...selectedText, bold: event.target.checked })}
              />
              Gras
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedText.italic}
                onChange={(event) => onUpdateText({ ...selectedText, italic: event.target.checked })}
              />
              Italique
            </label>
          </div>

          <button type="button" className="button-secondary" onClick={() => onRemoveText(selectedText.id)}>
            Supprimer ce texte
          </button>
        </div>
      ) : (
        <p className="empty-state">Ajoutez un bloc de texte pour commencer.</p>
      )}
    </div>
  )
}
