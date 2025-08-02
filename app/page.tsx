"use client"

import type React from "react"

import { useEffect, useRef, useState, useMemo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowDown,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Twitter,
  Code,
  FileCode,
  Palette,
  Layout,
  Server,
  Database,
  Cloud,
  Box,
  GitBranch,
  PenTool,
  TestTube,
  Braces,
  Instagram,
  FileText,
} from "lucide-react"
import Link from "next/link"
import type { Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isPrefersReducedMotion, setIsPrefersReducedMotion] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const homeRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  // Check for reduced motion preference
  useEffect(() => {
    setIsMounted(true)
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setIsPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 50

      if (homeRef.current && scrollPosition < homeRef.current.offsetTop + homeRef.current.offsetHeight) {
        setActiveSection("home")
      } else if (
        educationRef.current &&
        scrollPosition < educationRef.current.offsetTop + educationRef.current.offsetHeight
      ) {
        setActiveSection("education")
      } else if (
        projectsRef.current &&
        scrollPosition < projectsRef.current.offsetTop + projectsRef.current.offsetHeight
      ) {
        setActiveSection("projects")
      } else if (skillsRef.current) {
        setActiveSection("skills")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Only track mouse position on desktop and when not preferring reduced motion
  useEffect(() => {
    if (window.innerWidth < 768 || isPrefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isPrefersReducedMotion])

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current) {
        ref.current.scrollIntoView({
          behavior: isPrefersReducedMotion ? "auto" : "smooth",
          block: "start",
          inline: "nearest"
        })
      }
    }

  // Scroll wheel handler for section-by-section scrolling
  useEffect(() => {
    let isScrolling = false
    const sections = [homeRef, educationRef, projectsRef, skillsRef]
    
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling || isPrefersReducedMotion) return
      
      e.preventDefault()
      isScrolling = true
      
      const currentSectionIndex = sections.findIndex(ref => {
        if (!ref.current) return false
        const rect = ref.current.getBoundingClientRect()
        return rect.top <= 50 && rect.bottom > 50
      })
      
      if (currentSectionIndex !== -1) {
        const direction = e.deltaY > 0 ? 1 : -1
        const nextIndex = currentSectionIndex + direction
        
        if (nextIndex >= 0 && nextIndex < sections.length) {
          scrollToSection(sections[nextIndex])
        }
      }
      
      setTimeout(() => {
        isScrolling = false
      }, 1000)
    }
    
    // Only enable section scrolling on desktop
    if (window.innerWidth >= 768) {
      window.addEventListener('wheel', handleWheel, { passive: false })
      return () => window.removeEventListener('wheel', handleWheel)
    }
  }, [isPrefersReducedMotion])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const sections = [homeRef, educationRef, projectsRef, skillsRef]
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        const currentIndex = sections.findIndex(ref => {
          if (!ref.current) return false
          const rect = ref.current.getBoundingClientRect()
          return rect.top <= 50 && rect.bottom > 50
        })
        
        if (currentIndex !== -1 && currentIndex < sections.length - 1) {
          scrollToSection(sections[currentIndex + 1])
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        const currentIndex = sections.findIndex(ref => {
          if (!ref.current) return false
          const rect = ref.current.getBoundingClientRect()
          return rect.top <= 50 && rect.bottom > 50
        })
        
        if (currentIndex > 0) {
          scrollToSection(sections[currentIndex - 1])
        }
      } else if (e.key === 'Home') {
        e.preventDefault()
        scrollToSection(homeRef)
      } else if (e.key === 'End') {
        e.preventDefault()
        scrollToSection(skillsRef)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  

  const cursorVariants: Variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(6, 182, 212, 0.1)",
      border: "1px solid rgba(6, 182, 212, 0.3)",
      transition: {
        type: "tween" as const,
        ease: "linear" as const,
        duration: 0.1,
      },
    },
    button: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(6, 182, 212, 0.2)",
      border: "1px solid rgba(6, 182, 212, 0.5)",
      transition: {
        type: "tween" as const,
        ease: "linear" as const,
        duration: 0.1,
      },
    },
  }

  const enterButton = () => setCursorVariant("button")
  const leaveButton = () => setCursorVariant("default")

  // Simplified background grid for better performance
  const SimpleGrid = ({ className = "", cols = 8, rows = 8 }) => (
    <div
      className={`grid h-full w-full ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: Math.min(cols * rows, 64) }).map((_, i) => (
        <div key={i} className="border-[0.5px] border-white/5"></div>
      ))}
    </div>
  )

  // Starfield particle system - memoized to prevent re-renders
  const StarfieldParticles = useMemo(() => {
    // Generate static particle data
    const generateParticles = () => {
      const starTypes = [
        { 
          type: 'small',
          count: 150,
          sizeRange: [1, 2],
          colors: ['white', 'cyan-100', 'blue-100', 'purple-100'],
          twinkleSpeed: [3, 6]
        },
        { 
          type: 'medium',
          count: 60,
          sizeRange: [2, 3],
          colors: ['white', 'cyan-200', 'blue-200', 'purple-200'],
          twinkleSpeed: [2, 4]
        },
        { 
          type: 'large',
          count: 25,
          sizeRange: [3, 4],
          colors: ['white', 'cyan-300', 'blue-300', 'purple-300'],
          twinkleSpeed: [1, 3]
        },
        { 
          type: 'bright',
          count: 15,
          sizeRange: [4, 6],
          colors: ['white', 'cyan-400', 'blue-400'],
          twinkleSpeed: [0.5, 2]
        }
      ]

      return starTypes.flatMap((starType, typeIndex) => 
        Array.from({ length: starType.count }).map((_, i) => {
          const size = Math.floor(Math.random() * (starType.sizeRange[1] - starType.sizeRange[0] + 1)) + starType.sizeRange[0]
          const x = Math.random() * 100
          const y = Math.random() * 100
          const color = starType.colors[Math.floor(Math.random() * starType.colors.length)]
          const twinkleSpeed = Math.random() * (starType.twinkleSpeed[1] - starType.twinkleSpeed[0]) + starType.twinkleSpeed[0]
          const delay = Math.random() * 5
          const opacity = 0.3 + Math.random() * 0.7

          return {
            id: `${typeIndex}-${i}`,
            type: starType.type,
            size,
            x,
            y,
            color,
            twinkleSpeed,
            delay,
            opacity,
          }
        })
      )
    }

    const generateConstellations = () => 
      Array.from({ length: 8 }).map((_, i) => {
        const x1 = Math.random() * 100
        const y1 = Math.random() * 100
        const x2 = x1 + (Math.random() - 0.5) * 20
        const y2 = y1 + (Math.random() - 0.5) * 20
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI
        const duration = 5 + Math.random() * 5
        const delay = Math.random() * 3

        return {
          id: `constellation-${i}`,
          x1,
          y1,
          length,
          angle,
          duration,
          delay
        }
      })

    const generateShootingStars = () =>
      Array.from({ length: 4 }).map((_, i) => ({
        id: `shooting-star-${i}`,
        top: Math.random() * 30,
        left: Math.random() * 100,
        duration: 6 + Math.random() * 4,
        delay: Math.random() * 15
      }))

    const generateNebulaClouds = () =>
      Array.from({ length: 3 }).map((_, i) => ({
        id: `nebula-${i}`,
        width: 150 + Math.random() * 200,
        height: 100 + Math.random() * 150,
        top: Math.random() * 100,
        left: Math.random() * 100,
        isBlue: i % 2 === 0,
        duration: 20 + Math.random() * 10,
        delay: Math.random() * 5
      }))

    const generateGalaxies = () =>
      Array.from({ length: 2 }).map((_, i) => ({
      id: `galaxy-${i}`,
      size: 120 + Math.random() * 80,
      top: Math.random() * 80 + 10,
      left: Math.random() * 80 + 10,
      rotation: Math.random() * 360,
      rotationSpeed: 80 + Math.random() * 40, // slowed down (was 40 + Math.random() * 20)
      delay: Math.random() * 10,
      isClockwise: i % 2 === 0
      }))

    const particles = generateParticles()
    const constellations = generateConstellations()
    const shootingStars = generateShootingStars()
    const nebulaClouds = generateNebulaClouds()
    const galaxies = generateGalaxies()

    return (
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {/* Background stars */}
        {particles.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full bg-${star.color}`}
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.y}%`,
              left: `${star.x}%`,
              opacity: star.opacity,
              animation: `starTwinkle ${star.twinkleSpeed}s infinite ease-in-out alternate`,
              animationDelay: `${star.delay}s`,
              boxShadow: star.type === 'bright' ? `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.5)` :
                         star.type === 'large' ? `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.3)` :
                         `0 0 ${star.size}px rgba(255, 255, 255, 0.2)`,
            }}
          />
        ))}

        {/* Constellation lines */}
        {constellations.map((constellation) => (
          <div
            key={constellation.id}
            className="absolute bg-white/10"
            style={{
              width: `${constellation.length}%`,
              height: '1px',
              top: `${constellation.y1}%`,
              left: `${constellation.x1}%`,
              transform: `rotate(${constellation.angle}deg)`,
              transformOrigin: '0 0',
              animation: `constellationPulse ${constellation.duration}s infinite ease-in-out`,
              animationDelay: `${constellation.delay}s`,
            }}
          />
        ))}

        {/* Shooting stars */}
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="absolute"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              animation: `shootingStar ${star.duration}s infinite linear`,
              animationDelay: `${star.delay}s`,
            }}
          >
            <div className="w-3 h-0.5 bg-gradient-to-l from-white to-transparent rounded-full opacity-90" />
            <div className="w-12 h-0.5 bg-gradient-to-l from-cyan-400/60 to-transparent rounded-full absolute top-0 left-0" />
            <div className="w-20 h-0.5 bg-gradient-to-l from-cyan-200/30 to-transparent rounded-full absolute top-0 left-0" />
          </div>
        ))}

        {/* Nebula clouds */}
        {nebulaClouds.map((nebula) => (
          <div
            key={nebula.id}
            className="absolute rounded-full opacity-5 pointer-events-none"
            style={{
              width: `${nebula.width}px`,
              height: `${nebula.height}px`,
              top: `${nebula.top}%`,
              left: `${nebula.left}%`,
              background: nebula.isBlue ? 
                'radial-gradient(ellipse, rgba(6, 182, 212, 0.3) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)' :
                'radial-gradient(ellipse, rgba(147, 51, 234, 0.3) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 100%)',
              animation: `nebulaDrift ${nebula.duration}s infinite ease-in-out alternate`,
              animationDelay: `${nebula.delay}s`,
            }}
          />
        ))}

        {/* Spiral Galaxies */}
        {galaxies.map((galaxy) => (
          <div
            key={galaxy.id}
            className="absolute pointer-events-none"
            style={{
              width: `${galaxy.size}px`,
              height: `${galaxy.size}px`,
              top: `${galaxy.top}%`,
              left: `${galaxy.left}%`,
              transform: `translate(-50%, -50%)`,
              animation: `galaxyRotate ${galaxy.rotationSpeed}s infinite linear ${galaxy.isClockwise ? '' : 'reverse'}`,
              animationDelay: `${galaxy.delay}s`,
            }}
          >
            {/* Galaxy base disk - subtle background */}
            <div 
              className="absolute inset-0 rounded-full opacity-10"
              style={{
                background: 'radial-gradient(ellipse 70% 20% at center, rgba(255, 255, 255, 0.05) 0%, rgba(6, 182, 212, 0.03) 30%, transparent 60%)',
              }}
            />
            
            {/* Central bulge - bright galactic center */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `${galaxy.size * 0.25}px`,
                height: `${galaxy.size * 0.15}px`,
                background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.4) 0%, rgba(255, 240, 200, 0.3) 30%, rgba(255, 200, 100, 0.2) 60%, rgba(255, 150, 50, 0.1) 80%, transparent 100%)',
                borderRadius: '50%',
                boxShadow: `0 0 ${galaxy.size * 0.15}px rgba(255, 255, 255, 0.3), 0 0 ${galaxy.size * 0.3}px rgba(255, 200, 100, 0.15)`,
              }}
            />
            
            {/* Spiral Arms - using SVG-like paths with CSS */}
            <div className="absolute inset-0" style={{ transform: 'rotate(0deg)' }}>
              {/* First major spiral arm */}
              <div 
                className="absolute opacity-35"
                style={{
                  width: `${galaxy.size}px`,
                  height: `${galaxy.size}px`,
                  background: `conic-gradient(from 30deg at center,
                    transparent 0deg,
                    rgba(255, 255, 255, 0.08) 15deg,
                    rgba(6, 182, 212, 0.12) 30deg,
                    rgba(255, 255, 255, 0.1) 45deg,
                    rgba(147, 51, 234, 0.08) 60deg,
                    rgba(255, 255, 255, 0.05) 75deg,
                    transparent 90deg,
                    transparent 270deg,
                    rgba(255, 255, 255, 0.04) 285deg,
                    rgba(6, 182, 212, 0.08) 300deg,
                    rgba(255, 255, 255, 0.06) 315deg,
                    rgba(147, 51, 234, 0.05) 330deg,
                    rgba(255, 255, 255, 0.03) 345deg,
                    transparent 360deg)`,
                  borderRadius: '50%',
                  maskImage: 'radial-gradient(ellipse 90% 90% at center, black 20%, transparent 70%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at center, black 20%, transparent 70%)',
                }}
              />
              
              {/* Second major spiral arm - offset by 180 degrees */}
              <div 
                className="absolute opacity-30"
                style={{
                  width: `${galaxy.size}px`,
                  height: `${galaxy.size}px`,
                  background: `conic-gradient(from 210deg at center,
                    transparent 0deg,
                    rgba(255, 255, 255, 0.06) 15deg,
                    rgba(6, 182, 212, 0.1) 30deg,
                    rgba(255, 255, 255, 0.08) 45deg,
                    rgba(147, 51, 234, 0.06) 60deg,
                    rgba(255, 255, 255, 0.04) 75deg,
                    transparent 90deg,
                    transparent 270deg,
                    rgba(255, 255, 255, 0.03) 285deg,
                    rgba(6, 182, 212, 0.06) 300deg,
                    rgba(255, 255, 255, 0.05) 315deg,
                    rgba(147, 51, 234, 0.04) 330deg,
                    rgba(255, 255, 255, 0.02) 345deg,
                    transparent 360deg)`,
                  borderRadius: '50%',
                  maskImage: 'radial-gradient(ellipse 90% 90% at center, black 20%, transparent 70%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at center, black 20%, transparent 70%)',
                }}
              />
              
              {/* Minor spiral arms for detail */}
              <div 
                className="absolute opacity-20"
                style={{
                  width: `${galaxy.size * 0.7}px`,
                  height: `${galaxy.size * 0.7}px`,
                  top: '15%',
                  left: '15%',
                  background: `conic-gradient(from 60deg at center,
                    transparent 0deg,
                    rgba(255, 255, 255, 0.04) 20deg,
                    rgba(6, 182, 212, 0.06) 40deg,
                    rgba(255, 255, 255, 0.03) 60deg,
                    transparent 80deg,
                    transparent 260deg,
                    rgba(255, 255, 255, 0.02) 280deg,
                    rgba(6, 182, 212, 0.04) 300deg,
                    rgba(255, 255, 255, 0.015) 320deg,
                    transparent 340deg)`,
                  borderRadius: '50%',
                }}
              />
            </div>
            
            {/* Star-forming regions - bright spots along arms */}
            <div className="absolute inset-0">
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 45) + (galaxy.id === 'galaxy-0' ? 0 : 90)
                const distance = 0.3 + (i % 3) * 0.15
                const x = 50 + Math.cos(angle * Math.PI / 180) * distance * 40
                const y = 50 + Math.sin(angle * Math.PI / 180) * distance * 40
                const size = 2 + Math.random() * 3
                
                return (
                  <div
                    key={i}
                    className="absolute rounded-full opacity-40"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      left: `${x}%`,
                      top: `${y}%`,
                      background: i % 3 === 0 ? 'rgba(255, 100, 100, 0.4)' : 
                                 i % 3 === 1 ? 'rgba(100, 150, 255, 0.4)' : 
                                 'rgba(255, 255, 255, 0.5)',
                      boxShadow: `0 0 ${size * 2}px currentColor`,
                      animation: `starTwinkle ${2 + Math.random() * 3}s infinite ease-in-out alternate`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  />
                )
              })}
            </div>
            
            {/* Dust lanes - dark regions */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: `conic-gradient(from 45deg at center,
                  transparent 0deg,
                  rgba(0, 0, 0, 0.15) 25deg,
                  transparent 35deg,
                  transparent 135deg,
                  rgba(0, 0, 0, 0.1) 160deg,
                  transparent 170deg,
                  transparent 225deg,
                  rgba(0, 0, 0, 0.12) 250deg,
                  transparent 260deg,
                  transparent 315deg,
                  rgba(0, 0, 0, 0.08) 340deg,
                  transparent 350deg)`,
                borderRadius: '50%',
                maskImage: 'radial-gradient(ellipse 80% 80% at center, black 25%, transparent 65%)',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at center, black 25%, transparent 65%)',
              }}
            />
            
            {/* Galactic halo - very faint outer glow */}
            <div 
              className="absolute inset-0 rounded-full opacity-5"
              style={{
                background: 'radial-gradient(circle, transparent 50%, rgba(6, 182, 212, 0.1) 70%, rgba(147, 51, 234, 0.05) 85%, transparent 100%)',
                transform: 'scale(1.4)',
              }}
            />
          </div>
        ))}
      </div>
    )
  }, []) // Empty dependency array - only calculate once

  return (
    <div
    className={`min-h-screen bg-gradient-to-b from-black to-gray-900 text-white scroll-smooth ${isMounted && !isPrefersReducedMotion && window.innerWidth >= 768 ? "cursor-none" : ""}`}
    style={{
      scrollBehavior: isPrefersReducedMotion ? 'auto' : 'smooth'
    }}
    >
      {/* Custom Cursor - Only on desktop and when not preferring reduced motion */}
      {isMounted && !isPrefersReducedMotion && window.innerWidth >= 768 && (
        <motion.div
          className="fixed top-0 left-0 z-50 rounded-full pointer-events-none hidden md:block"
          variants={cursorVariants}
          animate={cursorVariant}
        />
      )}

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Section Navigation Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col space-y-3">
          {[
            { id: "home", label: "Home", ref: homeRef },
            { id: "education", label: "Education", ref: educationRef },
            { id: "projects", label: "Projects", ref: projectsRef },
            { id: "skills", label: "Skills", ref: skillsRef },
          ].map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.ref)}
              onMouseEnter={!isPrefersReducedMotion ? enterButton : undefined}
              onMouseLeave={!isPrefersReducedMotion ? leaveButton : undefined}
              className={`group relative w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === item.id 
                  ? "bg-cyan-400 scale-125" 
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-xl font-bold tracking-tighter">
              <span className="text-cyan-400">Bima</span> Adhienirma
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {[
                { id: "home", label: "Home", ref: homeRef },
                { id: "education", label: "Education", ref: educationRef },
                { id: "projects", label: "Projects", ref: projectsRef },
                { id: "skills", label: "Skills", ref: skillsRef },
              ].map((item) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * ["home", "education", "projects", "skills"].indexOf(item.id) }}
                >
                  <button
                    onClick={() => scrollToSection(item.ref)}
                    onMouseEnter={!isPrefersReducedMotion ? enterButton : undefined}
                    onMouseLeave={!isPrefersReducedMotion ? leaveButton : undefined}
                    className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                      activeSection === item.id ? "text-cyan-400" : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-cyan-400">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black/90 backdrop-blur-xl border-gray-800">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-white">
                    <span className="text-cyan-400">Bima</span> Adhienirma
                  </SheetTitle>
                </SheetHeader>
                <div className="grid gap-6">
                  {[
                    { id: "home", label: "Home", ref: homeRef },
                    { id: "education", label: "Education", ref: educationRef },
                    { id: "projects", label: "Projects", ref: projectsRef },
                    { id: "skills", label: "Skills", ref: skillsRef },
                  ].map((item) => (
                    <SheetClose asChild key={item.id}>
                      <Button
                        variant="ghost"
                        onClick={() => scrollToSection(item.ref)}
                        className={`justify-start text-lg ${
                          activeSection === item.id ? "text-cyan-400" : "text-gray-400"
                        }`}
                      >
                        {item.label}
                      </Button>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="pt-20 relative z-10">
        {/* Hero Section */}
        <section ref={homeRef} className="min-h-screen flex items-center relative overflow-hidden">
          {/* Simplified background for better performance */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-black to-gray-900">
            {!isPrefersReducedMotion && <SimpleGrid cols={8} rows={8} />}
          </div>

          {/* Starfield particles - like outer space */}
          {!isPrefersReducedMotion && StarfieldParticles}

          <motion.div className="container mx-auto px-4 z-10" style={{ opacity, scale }}>
            <div className="max-w-6xl mx-auto">
              {/* Profile Photo - Mobile First (Top) */}
              <div className="md:hidden flex justify-center mb-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="flex-shrink-0"
                >
                  <div className="relative">
                    <img
                      src="/bima.png"
                      alt="Whelmyran Bima Adhienirma"
                      className="w-48 h-48 rounded-full border-4 border-cyan-400 shadow-lg object-cover bg-gray-800"
                      style={{ boxShadow: '0 8px 32px 0 rgba(6,182,212,0.3)' }}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 to-purple-500/20 animate-pulse"></div>
                  </div>
                </motion.div>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                {/* Content Section */}
                <div className="flex-1 text-center md:text-left md:ml-12 lg:ml-24">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                      Whelmyran Bima Adhienirma
                    </h1>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <h2 className="text-xl md:text-2xl text-gray-300 mb-8">Novice Developer</h2>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-12 text-gray-400 max-w-xl"
                  >
                    <p>
                    Hello, my name is Whelmyran Bima Adhienirma, I was born in Dumai on June 1, 2006, and now I am studying at Batam State Polytechnic, I like coding, watching, reading novels, and you.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="flex space-x-4 mb-12"
                  >
                    <Link href="https://instagram.com/bimaadinirma" target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="icon"
                        onMouseEnter={!isPrefersReducedMotion ? enterButton : undefined}
                        onMouseLeave={!isPrefersReducedMotion ? leaveButton : undefined}
                        className="rounded-full border-gray-700 hover:border-cyan-400 hover:bg-cyan-400/10"
                      >
                        <Instagram className="h-5 w-5" />
                        <span className="sr-only">Instagram</span>
                      </Button>
                    </Link>
                    <Link href="https://github.com/Bimaadhinirma" target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="icon"
                        onMouseEnter={!isPrefersReducedMotion ? enterButton : undefined}
                        onMouseLeave={!isPrefersReducedMotion ? leaveButton : undefined}
                        className="rounded-full border-gray-700 hover:border-cyan-400 hover:bg-cyan-400/10"
                      >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </Button>
                    </Link>
                    <Link href="https://www.linkedin.com/in/whelmyran-bima-adhinirma-502733294/" target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="icon"
                        onMouseEnter={!isPrefersReducedMotion ? enterButton : undefined}
                        onMouseLeave={!isPrefersReducedMotion ? leaveButton : undefined}
                        className="rounded-full border-gray-700 hover:border-cyan-400 hover:bg-cyan-400/10"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </Button>
                    </Link>
                    <Link href="mailto:bimaadhinirma@gmail.com">
                      <Button
                        variant="outline"
                        size="icon"
                        onMouseEnter={!isPrefersReducedMotion ? enterButton : undefined}
                        onMouseLeave={!isPrefersReducedMotion ? leaveButton : undefined}
                        className="rounded-full border-gray-700 hover:border-cyan-400 hover:bg-cyan-400/10"
                      >
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
                    <Button
                      onClick={() => scrollToSection(educationRef)}
                      onMouseEnter={!isPrefersReducedMotion ? enterButton : undefined}
                      onMouseLeave={!isPrefersReducedMotion ? leaveButton : undefined}
                      className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 relative overflow-hidden group"
                    >
                      <span className="relative z-10">Explore My Work</span>
                      <ArrowDown className="relative z-10 ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>

                {/* Profile Photo - Desktop Only (Right Side) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="hidden md:block flex-shrink-0"
                >
                  <div className="relative">
                    <img
                      src="/bima.png"
                      alt="Whelmyran Bima Adhienirma"
                      className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full border-4 border-cyan-400 shadow-lg object-cover bg-gray-800"
                      style={{ boxShadow: '0 8px 32px 0 rgba(6,182,212,0.3)' }}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 to-purple-500/20 animate-pulse"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Education Section */}
        <section ref={educationRef} className="min-h-screen py-4 md:py-6 bg-black/50 relative flex items-center justify-center">
          <div className="container mx-auto px-4 w-full max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                  Educational Journey
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                My academic background that has shaped my professional expertise
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {[
                {
                  years: "2012 - 2018",
                  degree: "Elementary school",
                  institution: "SD IT PLUS JAMIATUL MUSLIMIN",
                  description:
                    "Islamic elementary school.",
                },
                {
                  years: "2018 - 2021",
                  degree: "Junior high school",
                  institution: "SMP IT PLUS JAMIATUL MUSLIMIN",
                  description:
                    "Islamic junior high school.",
                },
                {
                  years: "2021 - 2024",
                  degree: "Senior High School",
                  institution: "SMA IT PLUS BAZMA BRILLIANT",
                  description:
                    "Islamic Senior High School.",
                },
                {
                  years: "2024",
                  degree: "S.Tr.Kom",
                  institution: "Batam State Polytechnic",
                  description:
                    "Web Developer, IT Developer, and IT Support.",
                },
              ].map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="mb-8 relative pl-8 border-l border-gray-800 group"
                  onMouseEnter={!isPrefersReducedMotion ? enterButton : undefined}
                  onMouseLeave={!isPrefersReducedMotion ? leaveButton : undefined}
                >
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-cyan-400"></div>
                  <div className="text-sm text-cyan-400 mb-1">{edu.years}</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{edu.degree}</h3>
                  <div className="text-gray-300 mb-2">{edu.institution}</div>
                  <p className="text-gray-400">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section ref={projectsRef} className="min-h-screen py-6 md:py-8 bg-gradient-to-b from-black/50 to-gray-900/50 relative flex items-center justify-center">
          <div className="container mx-auto px-4 w-full max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                  Project Showcase
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A selection of my most significant work and contributions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-0">
                {[
                {
                  title: "Smart Glasses Technology as a Visual Aid for the Blind in Recognizing Objects Based on Artificial Intelligence and Voice Instructions.",
                  description:
                  "Created Smart Glasses for the visually impaired to scan money and provide voice output based on Artificial Intelligence using HuskeyLens and Arduino Nano.",
                  tags: ["AI", "HuskyLens", "Arduino"],
                  link: "https://cdn.discordapp.com/attachments/970587419080540210/1267524110309654538/Laporan_Penelitian_Tunanetra.pdf?ex=67f6a4d1&is=67f55351&hm=6a597578b4fb6cb0f83b385e03cff6ec6135e506214ff58c57d01bc32dc57004&",
                  status: "Done",
                },
                {
                  title: "Attendance System Based on SMS Gateway.",
                  description:
                  "A school attendance system using RFID/Fingerprint that sends SMS notifications to parents.",
                  tags: ["SMS", "Arduino", "Student", "Attendance"],
                  link: "#",
                  status: "Done",
                },
                {
                  title: "Virtual Event Check-in.",
                  description:
                  "Attendance system for virtual events, helping event organizers recap participants who attended and automatically generate certificates for participants.",
                  tags: ["PHP", "HTML", "CSS", "JavaScript", "MySQL", "Fpdf"],
                  link: "https://pbl.polibatam.ac.id/pamerin/detail.php?title=aplikasi-absensi-peserta-acara-online&id=MjU1NQ==&ta=NQ==&id_tim=Mjg1Mg==",
                  status: "Done",
                },
                {
                  title: "Polibatam Tracer Study",
                  description:
                  "Polibatam Tracer Study System is a web-based application used to track the career development of Batam State Polytechnic (Polibatam) alumni after graduation. This system serves as an evaluation tool to assess the relationship between the curriculum taught and the needs of the workforce.",
                  tags: ["Laravel", "Tailwind", "JavaScript", "MySQL"],
                  link: "https://pbl.polibatam.ac.id/pamerin/detail.php?title=pengembangan-web-tracer-study-polibatam&id=MzEyNw==&ta=Ng==&id_tim=MzkxNA==",
                  status: "Done",
                },
                {
                  title: "Berdikari Talent Cerdas",
                  description:
                  "TalentCerdas.id is a modern job search platform using AI to match talents with suitable jobs and help companies find the best candidates. It features job fair tools like attendance check-in and job listings tailored for events.",
                  tags: ["AI", "Job Matching", "Jobfair", "Talent", "Recruitment"],
                  link: "https://talentcerdas.id",
                  status: "In Progress",
                },
                ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onMouseEnter={!isPrefersReducedMotion ? enterButton : undefined}
                  onMouseLeave={!isPrefersReducedMotion ? leaveButton : undefined}
                >
                  <Card className="bg-black/40 border-gray-800 hover:border-cyan-400/50 transition-all duration-300 h-full overflow-hidden group relative">
                  <div className="absolute top-2 right-2">
                  <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    project.status === "Done" ? "bg-transparent text-green-800" : 
                    project.status === "In Progress" ? "bg-transparent text-yellow-800" :
                    "bg-gray-100 text-gray-800"
                  }`}
                  >
                  {project.status}
                  </span>
                  </div>
                  <CardHeader>
                  <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                    key={tagIndex}
                    className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full group-hover:bg-cyan-900/30 transition-colors"
                    >
                    {tag}
                    </span>
                  ))}
                  </div>
                  <Link href={project.link} className="text-cyan-400 text-sm flex items-center hover:underline">
                  View Project <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                  </CardContent>
                  </Card>
                </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section ref={skillsRef} className="min-h-screen py-6 md:py-8 bg-black/50 relative flex items-center justify-center">
          <div className="container mx-auto px-4 w-full max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                  Technical Skillset
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                The technologies and methodologies I've mastered throughout my career
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-6 text-center">Frontend Development</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-3 gap-6">
                    {[
                      { name: "JavaScript", icon: <FileCode className="h-8 w-8 text-cyan-400" /> },
                      { name: "HTML5", icon: <Code className="h-8 w-8 text-cyan-400" /> },
                      { name: "CSS3", icon: <Palette className="h-8 w-8 text-cyan-400" /> },
                    ].map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                        onMouseEnter={!isPrefersReducedMotion ? enterButton : undefined}
                        onMouseLeave={!isPrefersReducedMotion ? leaveButton : undefined}
                      >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-3 border border-gray-800 hover:border-cyan-400 transition-colors group">
                          <div className="group-hover:scale-110 transition-transform relative z-10">{skill.icon}</div>
                        </div>
                        <span className="text-sm text-gray-300">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-6 text-center">Backend Development</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {[
                      { name: "Node.js", icon: <Server className="h-8 w-8 text-cyan-400" /> },
                      { name: "Python", icon: <Code className="h-8 w-8 text-cyan-400" /> },
                      { name: "PHP", icon: <Code className="h-8 w-8 text-cyan-400" /> },
                      { name: "MySQL", icon: <Database className="h-8 w-8 text-cyan-400" /> },
                      { name: "AWS", icon: <Cloud className="h-8 w-8 text-cyan-400" /> },
                      { name: "Azure", icon: <Cloud className="h-8 w-8 text-cyan-400" /> },
                    ].map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                        onMouseEnter={!isPrefersReducedMotion ? enterButton : undefined}
                        onMouseLeave={!isPrefersReducedMotion ? leaveButton : undefined}
                      >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-3 border border-gray-800 hover:border-cyan-400 transition-colors group">
                          <div className="group-hover:scale-110 transition-transform relative z-10">{skill.icon}</div>
                        </div>
                        <span className="text-sm text-gray-300">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-4 text-center">Tools & Frameworks</h3>
                <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
                  {[
                    { name: "Git", icon: <GitBranch className="h-8 w-8 text-cyan-400" /> },
                    { name: "Laravel", icon: <Code className="h-8 w-8 text-cyan-400" /> },
                    { name: "TailwindCss", icon: <Code className="h-8 w-8 text-cyan-400" /> },
                    { name: "Next.js", icon: <Code className="h-8 w-8 text-cyan-400" /> },
                    { name: "Figma", icon: <PenTool className="h-8 w-8 text-cyan-400" /> },
                    { name: "Fpdf", icon: <FileText className="h-8 w-8 text-cyan-400" /> },
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center"
                      onMouseEnter={!isPrefersReducedMotion ? enterButton : undefined}
                      onMouseLeave={!isPrefersReducedMotion ? leaveButton : undefined}
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-3 border border-gray-800 hover:border-cyan-400 transition-colors group">
                        <div className="group-hover:scale-110 transition-transform relative z-10">{skill.icon}</div>
                      </div>
                      <span className="text-sm text-gray-300">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-gray-800 bg-black relative z-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 mb-4">© {new Date().getFullYear()} Bima Adhienirma. All rights reserved.</p>
            <div className="flex justify-center space-x-4">
            <Link href="https://instagram.com/bimaadinirma" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    onMouseEnter={!isPrefersReducedMotion ? enterButton : undefined}
                    onMouseLeave={!isPrefersReducedMotion ? leaveButton : undefined}
                    className="rounded-full border-gray-700 hover:border-cyan-400 hover:bg-cyan-400/10"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Button>
                </Link>
                <Link href="https://github.com/Bimaadhinirma" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    onMouseEnter={!isPrefersReducedMotion ? enterButton : undefined}
                    onMouseLeave={!isPrefersReducedMotion ? leaveButton : undefined}
                    className="rounded-full border-gray-700 hover:border-cyan-400 hover:bg-cyan-400/10"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/whelmyran-bima-adhinirma-502733294/" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    onMouseEnter={!isPrefersReducedMotion ? enterButton : undefined}
                    onMouseLeave={!isPrefersReducedMotion ? leaveButton : undefined}
                    className="rounded-full border-gray-700 hover:border-cyan-400 hover:bg-cyan-400/10"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="mailto:bimaadhinirma@gmail.com">
                  <Button
                    variant="outline"
                    size="icon"
                    onMouseEnter={!isPrefersReducedMotion ? enterButton : undefined}
                    onMouseLeave={!isPrefersReducedMotion ? leaveButton : undefined}
                    className="rounded-full border-gray-700 hover:border-cyan-400 hover:bg-cyan-400/10"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
            </div>
          </motion.div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes staticFloat {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(30px, -30px);
          }
          50% {
            transform: translate(60px, 0);
          }
          75% {
            transform: translate(30px, 30px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes starTwinkle {
          0% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
        }

        @keyframes constellationPulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes shootingStar {
          0% {
            transform: translateX(calc(100vw + 100px)) translateY(0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateX(-200px) translateY(0) rotate(0deg);
            opacity: 0;
          }
        }

        @keyframes nebulaDrift {
          0% {
            transform: translateX(0) translateY(0) scale(1);
          }
          50% {
            transform: translateX(20px) translateY(-10px) scale(1.1);
          }
          100% {
            transform: translateX(0) translateY(0) scale(1);
          }
        }

        @keyframes galaxyRotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        @keyframes enhancedFloat {
          0% {
            transform: translate(0, 0) scale(1);
          }
          20% {
            transform: translate(40px, -30px) scale(1.1);
          }
          40% {
            transform: translate(-20px, -60px) scale(0.9);
          }
          60% {
            transform: translate(60px, -40px) scale(1.05);
          }
          80% {
            transform: translate(-30px, 20px) scale(0.95);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
        }

        @keyframes optimizedFloat {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(40px, -40px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        /* Remove pointer cursor from buttons when custom cursor is active */
        .cursor-none button, 
        .cursor-none a {
          cursor: none !important;
        }

        /* Smooth section scrolling */
        section {
          scroll-margin-top: 80px;
        }

        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #7c3aed);
        }

        /* Smooth focus transitions */
        *:focus {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  )
}
