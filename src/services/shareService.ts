export type SharePlatform = 'facebook' | 'twitter' | 'whatsapp' | 'copy'

export function getShareUrl(platform: SharePlatform, text: string): string {
  const encodedText = encodeURIComponent(text)

  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}`
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodedText}%20%23meme`
    case 'whatsapp':
      return `https://wa.me/?text=${encodedText}`
    case 'copy':
      return text
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
