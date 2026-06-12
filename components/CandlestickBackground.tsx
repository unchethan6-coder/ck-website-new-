'use client'

import { useEffect, useRef } from 'react'

export function CandlestickBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1
    canvas.width *= dpr
    canvas.height *= dpr
    ctx.scale(dpr, dpr)

    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += 0.016 // ~60fps
      const t = time % 8 // 8-second loop

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)

      const centerX = canvas.width / dpr / 2
      const centerY = canvas.height / dpr * 0.65

      // Glowing light waves
      const waveProgress = (t / 8) % 1
      const waveX = -canvas.width / dpr * 0.2 + waveProgress * canvas.width / dpr * 1.4
      const waveGradient = ctx.createLinearGradient(
        waveX - 200,
        0,
        waveX + 200,
        0
      )
      waveGradient.addColorStop(0, 'rgba(255, 215, 0, 0)')
      waveGradient.addColorStop(0.5, `rgba(255, 215, 0, ${0.3 * Math.sin(t * Math.PI / 8)})`)
      waveGradient.addColorStop(1, 'rgba(255, 215, 0, 0)')

      ctx.fillStyle = waveGradient
      ctx.fillRect(waveX - 200, centerY + 80, 400, 120)

      // Ambient glow pulse
      const glowIntensity = 0.4 + 0.2 * Math.sin((t / 8) * Math.PI * 2)
      const glowGradient = ctx.createRadialGradient(
        centerX,
        centerY - 100,
        0,
        centerX,
        centerY - 100,
        400
      )
      glowGradient.addColorStop(0, `rgba(255, 215, 0, ${0.4 * glowIntensity})`)
      glowGradient.addColorStop(0.5, `rgba(255, 215, 0, ${0.1 * glowIntensity})`)
      glowGradient.addColorStop(1, 'rgba(255, 215, 0, 0)')

      ctx.fillStyle = glowGradient
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr)

      // Floating particles
      for (let i = 0; i < 8; i++) {
        const particlePhase = (t * 0.5 + i) % 8
        const particleX = centerX - 200 + (i % 4) * 100 + Math.sin(particlePhase / 8 * Math.PI * 2) * 50
        const particleY = centerY - 200 + Math.cos((particlePhase + i * 0.5) / 8 * Math.PI * 2) * 80
        const particleSize = 1.5 * (0.5 + 0.5 * Math.sin(particlePhase / 8 * Math.PI * 2))
        const particleOpacity = 0.4 * Math.sin(particlePhase / 8 * Math.PI * 2)

        ctx.fillStyle = `rgba(255, 215, 0, ${particleOpacity})`
        ctx.beginPath()
        ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      animate()
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden perspective" style={{ perspective: '1000px' }}>
      {/* Canvas for glowing effects and particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* 3D Candlestick Scene with CSS 3D Transforms */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1200px',
        }}
      >
        {/* Scene container with breathing animation */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            animation: 'breathing-scale 8s ease-in-out infinite',
          }}
        >
          {/* Back Candlestick - Glossy Glass */}
          <div
            className="absolute"
            style={{
              width: '100px',
              height: '320px',
              left: '30%',
              top: '50%',
              transform: 'translate(-50%, -50%) translateZ(0px)',
              transformStyle: 'preserve-3d',
              animation: 'float-back 8s ease-in-out infinite, drift-left 8s ease-in-out infinite',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
                animation: 'stretch-back 5s ease-in-out infinite',
              }}
            >
              {/* Glossy glass body with gradient */}
              <div
                style={{
                  width: '60px',
                  height: '240px',
                  margin: '0 auto',
                  position: 'relative',
                  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.7), rgba(255, 237, 92, 0.5), rgba(255, 215, 0, 0.6))',
                  borderRadius: '12px 12px 20px 20px',
                  boxShadow: 'inset -8px 0 16px rgba(255, 255, 255, 0.4), inset 8px 0 16px rgba(255, 215, 0, 0.3), 0 16px 32px rgba(255, 215, 0, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  transform: 'rotateX(15deg)',
                }}
              >
                {/* Left highlight (glass shine) */}
                <div
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '20px',
                    width: '12px',
                    height: '80px',
                    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0))',
                    borderRadius: '50%',
                    filter: 'blur(4px)',
                  }}
                />
                {/* Right shadow (glass depth) */}
                <div
                  style={{
                    position: 'absolute',
                    right: '6px',
                    top: '30px',
                    width: '10px',
                    height: '60px',
                    background: 'linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15))',
                    borderRadius: '50%',
                    filter: 'blur(3px)',
                  }}
                />
              </div>

              {/* Wick */}
              <div
                style={{
                  width: '3px',
                  height: '40px',
                  margin: '-8px auto 0',
                  background: 'linear-gradient(180deg, #FFD700 0%, rgba(255, 215, 0, 0.8) 100%)',
                  boxShadow: '0 0 8px rgba(255, 215, 0, 0.8), inset 0 0 4px rgba(255, 255, 255, 0.5)',
                  animation: 'wick-flicker-back 3s ease-in-out infinite',
                }}
              />
            </div>
          </div>

          {/* Front Candlestick - More Prominent */}
          <div
            className="absolute"
            style={{
              width: '120px',
              height: '360px',
              right: '28%',
              top: '50%',
              transform: 'translate(50%, -50%) translateZ(40px)',
              transformStyle: 'preserve-3d',
              animation: 'float-front 8s ease-in-out infinite, drift-right 8s ease-in-out infinite',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
                animation: 'stretch-front 5.5s ease-in-out infinite',
              }}
            >
              {/* Premium glossy glass body */}
              <div
                style={{
                  width: '70px',
                  height: '280px',
                  margin: '0 auto',
                  position: 'relative',
                  background: 'linear-gradient(135deg, rgba(255, 229, 92, 0.8), rgba(255, 235, 59, 0.6), rgba(255, 215, 0, 0.7))',
                  borderRadius: '14px 14px 24px 24px',
                  boxShadow: 'inset -10px 0 20px rgba(255, 255, 255, 0.5), inset 10px 0 20px rgba(255, 215, 0, 0.4), 0 20px 40px rgba(255, 215, 0, 0.25), 0 0 60px rgba(255, 215, 0, 0.15)',
                  backdropFilter: 'blur(12px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.4)',
                  transform: 'rotateX(12deg)',
                }}
              >
                {/* Left highlight reflection */}
                <div
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '15px',
                    width: '16px',
                    height: '100px',
                    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.1))',
                    borderRadius: '50%',
                    filter: 'blur(5px)',
                    animation: 'shimmer 2.5s ease-in-out infinite',
                  }}
                />
                {/* Center internal light */}
                <div
                  style={{
                    position: 'absolute',
                    left: '15px',
                    top: '60px',
                    width: '8px',
                    height: '40px',
                    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4), transparent)',
                    borderRadius: '50%',
                    filter: 'blur(3px)',
                    animation: 'shimmer 3s ease-in-out infinite 0.5s',
                  }}
                />
                {/* Right shadow edge */}
                <div
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '25px',
                    width: '12px',
                    height: '80px',
                    background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.2))',
                    borderRadius: '50%',
                    filter: 'blur(4px)',
                  }}
                />
              </div>

              {/* Wick with glow */}
              <div
                style={{
                  width: '4px',
                  height: '50px',
                  margin: '-10px auto 0',
                  position: 'relative',
                  background: 'linear-gradient(180deg, #FFD700 0%, rgba(255, 215, 0, 0.9) 100%)',
                  boxShadow: '0 0 12px rgba(255, 215, 0, 1), inset 0 0 6px rgba(255, 255, 255, 0.6), 0 0 24px rgba(255, 215, 0, 0.6)',
                  animation: 'wick-flicker-front 2.5s ease-in-out infinite',
                }}
              />

              {/* Wick flame glow halo */}
              <div
                style={{
                  position: 'absolute',
                  top: '-60px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '30px',
                  height: '60px',
                  background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.4), transparent)',
                  borderRadius: '50%',
                  filter: 'blur(8px)',
                  animation: 'flame-glow 2s ease-in-out infinite',
                }}
              />
            </div>
          </div>

          {/* Reflective surface beneath candlesticks */}
          <div
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '500px',
              height: '120px',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 215, 0, 0.08))',
              borderRadius: '50%',
              filter: 'blur(20px)',
              animation: 'surface-glow 6s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes float-front {
          0% { transform: translate(50%, -50%) translateZ(40px) translateY(0); }
          25% { transform: translate(50%, -50%) translateZ(40px) translateY(-20px); }
          50% { transform: translate(50%, -50%) translateZ(40px) translateY(-32px); }
          75% { transform: translate(50%, -50%) translateZ(40px) translateY(-16px); }
          100% { transform: translate(50%, -50%) translateZ(40px) translateY(0); }
        }

        @keyframes float-back {
          0% { transform: translate(-50%, -50%) translateZ(0px) translateY(8px); }
          25% { transform: translate(-50%, -50%) translateZ(0px) translateY(-12px); }
          50% { transform: translate(-50%, -50%) translateZ(0px) translateY(-24px); }
          75% { transform: translate(-50%, -50%) translateZ(0px) translateY(-8px); }
          100% { transform: translate(-50%, -50%) translateZ(0px) translateY(8px); }
        }

        @keyframes drift-left {
          0% { transform: translate(-50%, -50%) translateX(0); }
          50% { transform: translate(-50%, -50%) translateX(-15px); }
          100% { transform: translate(-50%, -50%) translateX(0); }
        }

        @keyframes drift-right {
          0% { transform: translate(50%, -50%) translateX(0); }
          50% { transform: translate(50%, -50%) translateX(15px); }
          100% { transform: translate(50%, -50%) translateX(0); }
        }

        @keyframes stretch-front {
          0% { transform: scaleY(0.95); }
          50% { transform: scaleY(1.08); }
          100% { transform: scaleY(0.95); }
        }

        @keyframes stretch-back {
          0% { transform: scaleY(0.92); }
          50% { transform: scaleY(1.05); }
          100% { transform: scaleY(0.92); }
        }

        @keyframes wick-flicker-front {
          0% { height: 50px; opacity: 0.9; box-shadow: 0 0 12px rgba(255, 215, 0, 1), inset 0 0 6px rgba(255, 255, 255, 0.6), 0 0 24px rgba(255, 215, 0, 0.6); }
          25% { height: 45px; opacity: 0.7; box-shadow: 0 0 10px rgba(255, 215, 0, 0.8), inset 0 0 4px rgba(255, 255, 255, 0.4), 0 0 18px rgba(255, 215, 0, 0.4); }
          50% { height: 52px; opacity: 1; box-shadow: 0 0 14px rgba(255, 215, 0, 1), inset 0 0 7px rgba(255, 255, 255, 0.7), 0 0 28px rgba(255, 215, 0, 0.7); }
          75% { height: 47px; opacity: 0.8; box-shadow: 0 0 11px rgba(255, 215, 0, 0.9), inset 0 0 5px rgba(255, 255, 255, 0.5), 0 0 22px rgba(255, 215, 0, 0.5); }
          100% { height: 50px; opacity: 0.9; box-shadow: 0 0 12px rgba(255, 215, 0, 1), inset 0 0 6px rgba(255, 255, 255, 0.6), 0 0 24px rgba(255, 215, 0, 0.6); }
        }

        @keyframes wick-flicker-back {
          0% { height: 40px; opacity: 0.8; }
          50% { height: 36px; opacity: 0.6; }
          100% { height: 40px; opacity: 0.8; }
        }

        @keyframes shimmer {
          0% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 0.7; transform: translateY(20px); }
          100% { opacity: 0.3; transform: translateY(40px); }
        }

        @keyframes flame-glow {
          0% { transform: translateX(-50%) scaleY(0.9); opacity: 0.3; }
          50% { transform: translateX(-50%) scaleY(1.1); opacity: 0.5; }
          100% { transform: translateX(-50%) scaleY(0.9); opacity: 0.3; }
        }

        @keyframes surface-glow {
          0% { opacity: 0.1; filter: blur(20px); }
          50% { opacity: 0.3; filter: blur(24px); }
          100% { opacity: 0.1; filter: blur(20px); }
        }

        @keyframes breathing-scale {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}
