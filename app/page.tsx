"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
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
      const scrollPosition = window.scrollY + 100

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
        window.scrollTo({
          top: ref.current.offsetTop - 80,
          behavior: isPrefersReducedMotion ? "auto" : "smooth",
        })
      }
    }

  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(6, 182, 212, 0.1)",
      border: "1px solid rgba(6, 182, 212, 0.3)",
      transition: {
        type: "tween",
        ease: "linear",
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
        type: "tween",
        ease: "linear",
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

  // Optimized floating particles component - fully CSS-based
  const OptimizedParticles = () => {
    // Pre-calculate particle positions to avoid re-renders
    const particles = Array.from({ length: 12 }).map((_, i) => {
      const size = Math.floor(Math.random() * 6) + 4 // Larger particles
      const duration = Math.random() * 15 + 20
      const startX = Math.random() * 100
      const startY = Math.random() * 100
      const delay = Math.random() * 5

      return {
        id: i,
        size,
        duration,
        startX,
        startY,
        delay,
        opacity: 0.4 + Math.random() * 0.3, // Higher opacity
      }
    })

    return (
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-cyan-400/30 will-change-transform"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: `${particle.startY}%`,
              left: `${particle.startX}%`,
              opacity: particle.opacity,
              animation: `staticFloat ${particle.duration}s infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
    className={`min-h-screen bg-gradient-to-b from-black to-gray-900 text-white ${isMounted && !isPrefersReducedMotion && window.innerWidth >= 768 ? "cursor-none" : ""}`}
    >
      {/* Custom Cursor - Only on desktop and when not preferring reduced motion */}
      {isMounted && !isPrefersReducedMotion && window.innerWidth >= 768 && (
        <motion.div
          className="fixed top-0 left-0 z-50 rounded-full pointer-events-none hidden md:block"
          variants={cursorVariants}
          animate={cursorVariant}
        />
      )}

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

          {/* Optimized floating particles */}
          {!isPrefersReducedMotion && <OptimizedParticles />}

          <motion.div className="container mx-auto px-4 z-10" style={{ opacity, scale }}>
            <div className="max-w-3xl mx-auto text-left md:ml-12 lg:ml-24">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
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
          </motion.div>
        </section>

        {/* Education Section */}
        <section ref={educationRef} className="py-20 bg-black/50 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
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
                  className="mb-12 relative pl-8 border-l border-gray-800 group"
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
        <section ref={projectsRef} className="py-20 bg-gradient-to-b from-black/50 to-gray-900/50 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
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
                    "Created Smart Glasses for Blind People to Scanning Money and Voice Output Based on Artificial Intelligence used HuskeyLens and Arduino Nano.",
                  tags: ["AI", "HuskyLens", "Arduino"],
                  link: "https://cdn.discordapp.com/attachments/970587419080540210/1267524110309654538/Laporan_Penelitian_Tunanetra.pdf?ex=67f6a4d1&is=67f55351&hm=6a597578b4fb6cb0f83b385e03cff6ec6135e506214ff58c57d01bc32dc57004&",
                  status: "Done",
                },
                {
                  title: "Attendance System Based SMS Gateway.",
                  description:
                    "Attendance System for School using RFID/Fingerprint and Send SMS to Parent for Notification.",
                  tags: ["SMS", "Arduino", "Student", "Attendance"],
                  link: "#",
                  status: "Done",
                },
                {
                  title: "Virtual Event Check-in.",
                  description:
                    "Attendance System for Virtual Event, helping Event Organizer for recapitulation an participants who attended the event, and Automatic generate Sertificate for participant.",
                  tags: ["PHP", "HTML", "CSS", "JavaScript", "MySQL", "Fpdf",],
                  link: "https://pbl.polibatam.ac.id/pamerin/detail.php?title=aplikasi-absensi-peserta-acara-online&id=MjU1NQ==&ta=NQ==&id_tim=Mjg1Mg==",
                  status: "Done",
                },
                {
                  title: "Tracer Study Polibatam",
                  description:
                    "RPolibatam Tracer Study System is a web-based application used to track the career development of alumni of Batam State Polytechnic (Polibatam) after graduation. This system functions as an evaluation tool to assess the relationship between the curriculum taught and the needs of the world of work.",
                  tags: ["Laravel", "Tailwind", "MySQL"],
                  link: "#",
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
        <section ref={skillsRef} className="py-20 bg-black/50 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
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
                <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
                  {[
                    { name: "Git", icon: <GitBranch className="h-8 w-8 text-cyan-400" /> },
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
      `}</style>
    </div>
  )
}
