export type SharePlatform = 'facebook' | 'twitter' | 'whatsapp' | 'copy'

export function getShareUrl(platform: SharePlatform, memeId: string, memeTitle: string): string {
  
  const baseUrl = window.location.origin
  const shareLink = `${baseUrl}?meme=${memeId}`
  const encodedLink = encodeURIComponent(shareLink)
  const encodedTitle = encodeURIComponent(`Découvrez mon mème: ${memeTitle}`)
  const text = `${encodedTitle} ${encodedLink}`

  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?quote=${text}&hashtag=%23meme`
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedLink}&hashtags=meme`
    case 'whatsapp':
      return `https://wa.me/?text=${text}`
    case 'copy':
      return shareLink
    default:
      return ''
  }
}

export async function copyToClipboard(text: string): Promise<void> {
  if (!navigator.clipboard) {
    throw new Error('Clipboard API not available')
  }
  await navigator.clipboard.writeText(text)
}

export function openShareWindow(url: string, title: string, width: number = 600, height: number = 400): void {
  const left = window.screenX + (window.outerWidth - width) / 2
  const top = window.screenY + (window.outerHeight - height) / 2
  window.open(url, title, `width=${width},height=${height},left=${left},top=${top}`)
}
