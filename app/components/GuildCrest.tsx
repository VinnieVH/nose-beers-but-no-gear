'use client'

import React from 'react'
import { WowFaction as WowFactionEnum } from '@/app/shared/enums'

interface RgbaColor {
  r: number
  g: number
  b: number
  a: number
}

interface GuildCrestProps {
  emblemUrl: string | null
  borderUrl: string | null
  backgroundColor: RgbaColor | null
  borderColor: RgbaColor | null
  emblemColor: RgbaColor | null
  size?: number
  faction: WowFactionEnum
}

const rgbaToCss = (color: RgbaColor | null): string => {
  if (!color) return 'transparent'
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
}

export const GuildCrest = ({
  emblemUrl,
  borderUrl,
  backgroundColor,
  borderColor,
  emblemColor,
  size = 64,
}: GuildCrestProps): React.JSX.Element => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  const drawTintedImage = React.useCallback(
    async (
      context: CanvasRenderingContext2D,
      url: string,
      dx: number,
      dy: number,
      dw: number,
      dh: number,
      tint: RgbaColor | null
    ): Promise<void> => {
      return new Promise((resolve) => {
        const image = new Image()
        image.crossOrigin = 'anonymous'
        image.onload = () => {
          try {
            const offCanvas = document.createElement('canvas')
            offCanvas.width = dw
            offCanvas.height = dh
            const offCtx = offCanvas.getContext('2d')
            if (!offCtx) return resolve()

            offCtx.clearRect(0, 0, dw, dh)
            offCtx.drawImage(image, 0, 0, dw, dh)

            if (tint) {
              offCtx.globalCompositeOperation = 'source-in'
              offCtx.fillStyle = rgbaToCss(tint)
              offCtx.fillRect(0, 0, dw, dh)
              offCtx.globalCompositeOperation = 'source-over'
            }

            context.drawImage(offCanvas, dx, dy, dw, dh)
            resolve()
          } catch (err) {
            console.error('Error drawing tinted image:', err)
            resolve()
          }
        }
        image.onerror = () => resolve()
        image.src = url
      })
    },
    []
  )

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
    const logicalSize = size
    const pixelSize = Math.floor(logicalSize * dpr)
    canvas.width = pixelSize
    canvas.height = pixelSize
    canvas.style.width = `${logicalSize}px`
    canvas.style.height = `${logicalSize}px`

    // Clear
    ctx.clearRect(0, 0, pixelSize, pixelSize)

    // Background circle
    const center = pixelSize / 2
    const radius = Math.floor(pixelSize * 0.48)
    ctx.beginPath()
    ctx.arc(center, center, radius, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fillStyle = rgbaToCss(backgroundColor)
    ctx.fill()

    // Emblem (inner)
    const emblemSize = Math.floor(pixelSize * 0.66)
    if (emblemUrl) {
      void drawTintedImage(
        ctx,
        emblemUrl,
        center - emblemSize / 2,
        center - emblemSize / 2,
        emblemSize,
        emblemSize,
        emblemColor
      )
    }

    // Border (outer)
    const borderSize = Math.floor(pixelSize * 0.92)
    if (borderUrl) {
      void drawTintedImage(
        ctx,
        borderUrl,
        center - borderSize / 2,
        center - borderSize / 2,
        borderSize,
        borderSize,
        borderColor
      )
    }
  }, [backgroundColor, borderColor, emblemColor, borderUrl, emblemUrl, drawTintedImage, size])

  return (
    <canvas
      ref={canvasRef}
      aria-label="Guild Crest"
    />
  )
}

export default GuildCrest


