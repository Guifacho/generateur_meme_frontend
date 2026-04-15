import { useEffect, useRef, type RefObject } from 'react'
import type { MemeText } from '../types'

type Props = {
  imageSrc: string | null
  texts: MemeText[]
  width?: number
  height?: number
  canvasRef?: RefObject<HTMLCanvasElement | null>
}

const defaultWidth = 640
const defaultHeight = 480

export function MemeCanvas({ imageSrc, texts, width = defaultWidth, height = defaultHeight, canvasRef }: Props) {
  const internalRef = useRef<HTMLCanvasElement | null>(null)
  const combinedRef = canvasRef ?? internalRef

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    context.clearRect(0, 0, width, height)
    context.fillStyle = '#f4f4f4'
    context.fillRect(0, 0, width, height)

    if (!imageSrc) {
      context.fillStyle = '#6b6375'
      context.font = '18px sans-serif'
      context.fillText('Aucune image chargée', 24, 32)
      return
    }

    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = imageSrc
    image.onload = () => {
      const ratio = Math.min(width / image.width, height / image.height)
      const drawWidth = image.width * ratio
      const drawHeight = image.height * ratio
      const offsetX = (width - drawWidth) / 2
      const offsetY = (height - drawHeight) / 2

      context.clearRect(0, 0, width, height)
      context.fillStyle = '#111'
      context.fillRect(0, 0, width, height)
      context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight)

      texts.forEach((text) => {
        const fontStyle = `${text.italic ? 'italic ' : ''}${text.bold ? 'bold ' : ''}${text.fontSize}px ${text.fontFamily}`
        context.font = fontStyle
        context.textAlign = text.textAlign
        context.textBaseline = 'middle'
        context.fillStyle = text.color
        context.strokeStyle = text.strokeColor
        context.lineWidth = Math.max(2, Math.floor(text.fontSize / 12))

        const posX = offsetX + text.x * drawWidth
        const posY = offsetY + text.y * drawHeight
        context.strokeText(text.content, posX, posY)
        context.fillText(text.content, posX, posY)
      })
    }
  }, [imageSrc, texts, width, height])

  return (
    <div className="canvas-frame">
      <canvas ref={combinedRef} width={width} height={height} aria-label="Aperçu du mème" />
    </div>
  )
}
