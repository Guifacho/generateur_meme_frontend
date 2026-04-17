import type { MemeData } from '../types'

// Point vers le backend API
const API_BASE_URL = 'http://localhost:3001/api/memes'
const UPLOADS_URL = 'http://localhost:3001/uploads'

export async function loadGallery(): Promise<MemeData[]> {
  try {
    const response = await fetch(API_BASE_URL)
    if (!response.ok) throw new Error('Erreur API')
    const data = await response.json()
    
    
    return data.map((item: any) => ({
      ...item,
      image: `${UPLOADS_URL}/${item.image}`, 
    }))
  } catch (error) {
    console.warn('Erreur chargement galerie:', error)
    return []
  }
}

export async function saveGallery(): Promise<void> {
  
  console.warn('saveGallery non implémenté avec API')
}

/**
 * Ajoute un nouveau mème au backend
 * @param meme Les données du mème
 * @param imageFile Le fichier image à uploader (obligatoire pour le backend)
 */
export async function addMeme(meme: MemeData, imageFile: File): Promise<MemeData> {
  try {
    // Créer FormData pour le multipart/form-data
    const formData = new FormData()
    formData.append('title', meme.title)
    formData.append('image', imageFile)
    // Les texts doivent être envoyés en JSON stringifié selon la doc du backend
    formData.append('texts', JSON.stringify(meme.texts))

    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Erreur HTTP ${response.status}: ${errorText}`)
    }
    
    const createdMeme = await response.json()
    // Ajouter l'URL complète de l'image
    return {
      ...createdMeme,
      image: `${UPLOADS_URL}/${createdMeme.image}`,
    }
  } catch (error) {
    console.error('Erreur ajout mème:', error)
    throw error
  }
}

/**
 * Met à jour un mème existant (titre et/ou textes uniquement)
 */
export async function updateMeme(id: string, title: string, texts: any[]): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, texts }),
    })
    if (!response.ok) throw new Error('Erreur mise à jour mème')
  } catch (error) {
    console.error('Erreur mise à jour mème:', error)
    throw error
  }
}

export async function removeMeme(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Erreur suppression mème')
  } catch (error) {
    console.error('Erreur suppression mème:', error)
    throw error
  }
}
