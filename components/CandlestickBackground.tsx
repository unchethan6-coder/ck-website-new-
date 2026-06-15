'use client'

import { useEffect, useRef } from 'react'

export function CandlestickBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let disposed = false
    let rafId = 0
    let waveTimeout: ReturnType<typeof setTimeout> | undefined
    let renderer: any = null
    let resizeObserver: ResizeObserver | null = null
    let onResize: (() => void) | null = null
    let gsap: any = null
    const targets: any[] = []

    const host = containerRef.current
    if (!host) return

    ;(async () => {
      const THREE: any = await import('three')
      const gsapMod: any = await import('gsap')
      gsap = gsapMod.gsap || gsapMod.default
      if (disposed || !containerRef.current) return

      const getSize = () => ({
        w: host.clientWidth || window.innerWidth,
        h: host.clientHeight || window.innerHeight,
      })
      let { w, h } = getSize()

      const scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x0a0902, 0.12)

      const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
      camera.position.set(0, 0, 8)

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setClearColor(0x0a0902, 1)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.4
      host.appendChild(renderer.domElement)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      renderer.domElement.style.display = 'block'

      // Lights
      scene.add(new THREE.AmbientLight(0x221f10, 1.5))
      const keyLight = new THREE.DirectionalLight(0xfffdf0, 3)
      keyLight.position.set(5, 10, 7)
      scene.add(keyLight)
      const rimLight = new THREE.DirectionalLight(0xfff4b0, 4)
      rimLight.position.set(-3, -3, -4)
      scene.add(rimLight)
      const goldLight = new THREE.DirectionalLight(0xd4af37, 2)
      goldLight.position.set(0, -5, 3)
      scene.add(goldLight)

      // Candlestick ring
      const candlestickGroup = new THREE.Group()
      scene.add(candlestickGroup)
      const numCandles = 24
      const radius = 2.5
      const candlesArray: any[] = []
      for (let i = 0; i < numCandles; i++) {
        const angle = (i / numCandles) * Math.PI * 2
        const holder = new THREE.Group()

        const bodyGeo = new THREE.BoxGeometry(0.25, 0.8, 0.15)
        const bodyMat = new THREE.MeshStandardMaterial({
          color: 0x1c1a12,
          roughness: 0.12,
          metalness: 0.95,
          emissive: new THREE.Color(0x000000),
          emissiveIntensity: 0,
        })
        const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat)
        holder.add(bodyMesh)

        const wickGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.2, 16)
        const wickMat = new THREE.MeshStandardMaterial({ color: 0x8c7633, metalness: 0.9, roughness: 0.1 })
        const topWick = new THREE.Mesh(wickGeo, wickMat)
        topWick.position.y = 0.5
        holder.add(topWick)
        const bottomWick = new THREE.Mesh(wickGeo, wickMat)
        bottomWick.position.y = -0.5
        holder.add(bottomWick)

        holder.position.x = Math.cos(angle) * radius
        holder.position.y = Math.sin(angle) * radius
        holder.rotation.z = angle + Math.PI / 2
        candlestickGroup.add(holder)
        candlesArray.push({ material: bodyMat })
      }
      candlestickGroup.rotation.x = -0.3
      candlestickGroup.rotation.y = 0.2

      // Floating gold particles
      const particleGeo = new THREE.BufferGeometry()
      const particleCount = 200
      const posArray = new Float32Array(particleCount * 3)
      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 12
        posArray[i + 1] = (Math.random() - 0.5) * 12
        posArray[i + 2] = (Math.random() - 0.5) * 10
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
      const particleMat = new THREE.PointsMaterial({
        size: 0.035,
        color: 0xfff4b0,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      })
      const particles = new THREE.Points(particleGeo, particleMat)
      scene.add(particles)

      // Animations
      targets.push(candlestickGroup.rotation, camera.position)
      gsap.to(candlestickGroup.rotation, { z: '-=' + Math.PI * 2, duration: 14, ease: 'none', repeat: -1 })
      gsap.to(camera.position, { z: 5.6, duration: 9, ease: 'power2.out' })

      const hexYellow = new THREE.Color('#FFF4B0')
      const hexGold = new THREE.Color('#D4AF37')
      const hexDark = new THREE.Color('#1c1a12')
      let waveIndex = 0

      const triggerWaveStep = () => {
        if (disposed) return
        const t = candlesArray[waveIndex]
        targets.push(t.material, t.material.color, t.material.emissive)
        const tl = gsap.timeline()
        tl.to(t.material.color, { r: hexYellow.r, g: hexYellow.g, b: hexYellow.b, duration: 0.18 })
          .to(t.material.emissive, { r: hexYellow.r, g: hexYellow.g, b: hexYellow.b, duration: 0.18 }, 0)
          .to(t.material, { emissiveIntensity: 3.0, roughness: 0.02, duration: 0.18 }, 0)
        tl.to(t.material.color, { r: hexGold.r, g: hexGold.g, b: hexGold.b, duration: 0.5, ease: 'power1.inOut' })
          .to(t.material.emissive, { r: hexGold.r, g: hexGold.g, b: hexGold.b, duration: 0.5 }, '-=0.5')
          .to(t.material, { emissiveIntensity: 1.2, roughness: 0.005, duration: 0.5 }, '-=0.5')
        tl.to(t.material.color, { r: hexDark.r, g: hexDark.g, b: hexDark.b, duration: 1.4, ease: 'power3.out' })
          .to(t.material.emissive, { r: 0, g: 0, b: 0, duration: 1.4 }, '-=1.4')
          .to(t.material, { emissiveIntensity: 0, roughness: 0.12, duration: 1.4 }, '-=1.4')
        waveIndex = (waveIndex + 1) % numCandles
        waveTimeout = setTimeout(triggerWaveStep, 140)
      }
      triggerWaveStep()

      const clock = new THREE.Clock()
      const animate = () => {
        if (disposed) return
        rafId = requestAnimationFrame(animate)
        const elapsed = clock.getElapsedTime()
        particles.rotation.y = elapsed * 0.025
        particles.rotation.x = elapsed * 0.008
        renderer.render(scene, camera)
      }
      animate()

      onResize = () => {
        if (!renderer) return
        const s = getSize()
        camera.aspect = s.w / s.h
        camera.updateProjectionMatrix()
        renderer.setSize(s.w, s.h)
      }
      window.addEventListener('resize', onResize)
      resizeObserver = new ResizeObserver(onResize)
      resizeObserver.observe(host)
    })()

    return () => {
      disposed = true
      if (rafId) cancelAnimationFrame(rafId)
      if (waveTimeout) clearTimeout(waveTimeout)
      if (onResize) window.removeEventListener('resize', onResize)
      if (resizeObserver) resizeObserver.disconnect()
      try {
        if (gsap) targets.forEach((t) => gsap.killTweensOf(t))
      } catch {}
      try {
        if (renderer) {
          renderer.dispose?.()
          const c = renderer.domElement
          if (c && c.parentNode) c.parentNode.removeChild(c)
        }
      } catch {}
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden" suppressHydrationWarning />
}
