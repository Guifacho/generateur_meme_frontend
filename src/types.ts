export type MemeText = {
  id: string
  content: string
  x: number
  y: number
  fontSize: number
  color: string
  strokeColor: string
  fontFamily: string
  textAlign: 'center' | 'left' | 'right'
  bold: boolean
  italic: boolean
}

export type MemeData = {
  id: string
  title: string
  image: string
  texts: MemeText[]
  createdAt: string
}
