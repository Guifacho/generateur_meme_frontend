import type { MemeData } from '../types'

const STORAGE_KEY = 'meme-gallery'

export function loadGallery(): MemeData[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return []
    }
    return JSON.parse(stored) as MemeData[]
  } catch {
    return []
  }
}

export function saveGallery(items: MemeData[]) {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function addMeme(item: MemeData) {
  const items = loadGallery()
  saveGallery([item, ...items])
}

export function removeMeme(id: string) {
  const items = loadGallery().filter((item) => item.id !== id)
  saveGallery(items)
}
