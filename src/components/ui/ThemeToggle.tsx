"use client"

import { useTheme } from 'next-themes'
import { useEffect, useState, useRef } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isAnimating = useRef(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    // Prevent double-clicking during animation
    if (isAnimating.current) return
    isAnimating.current = true

    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    // Get exact button center position for ripple origin
    const rect = buttonRef.current?.getBoundingClientRect()
    const originX = rect
      ? ((rect.left + rect.width / 2) / window.innerWidth) * 100
      : 50
    const originY = rect
      ? ((rect.top + rect.height / 2) / window.innerHeight) * 100
      : 50

    // Create overlay
    const overlay = document.createElement('div')
    overlay.className = `theme-overlay ${
      theme === 'dark' ? 'dark-to-light' : 'light-to-dark'
    }`
    overlay.style.setProperty('--origin-x', `${originX}%`)
    overlay.style.setProperty('--origin-y', `${originY}%`)
    document.body.appendChild(overlay)

    // Trigger expand on next frame
    requestAnimationFrame(() => {
      overlay.classList.add('expanding')
    })

    // Switch theme at halfway point — hidden under overlay, zero lag
    setTimeout(() => {
      document.documentElement.classList.add('theme-switching')
      setTheme(nextTheme)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.documentElement.classList.remove('theme-switching')
        })
      })
    }, 275)

    // Start collapse after expand finishes
    setTimeout(() => {
      overlay.classList.remove('expanding')
      overlay.classList.add('collapsing')
    }, 550)

    // Remove overlay and unlock toggle
    setTimeout(() => {
      overlay.remove()
      isAnimating.current = false
    }, 900)
  }

  if (!mounted) return (
    <div style={{ width: 32, height: 32 }} />
  )

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      aria-label="Toggle theme"
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        border: '1px solid var(--card-border)',
        background: 'var(--card-bg)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'none',
        color: 'var(--text-muted)',
        transition: 'border-color 0.2s, color 0.2s',
      }}
    >
      {theme === 'dark'
        ? <Sun size={15} />
        : <Moon size={15} />
      }
    </button>
  )
}
