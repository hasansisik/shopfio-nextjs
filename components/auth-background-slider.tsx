"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const images = ["/authbg.jpeg", "/authbg1.jpeg", "/authbg2.jpeg"]

export function AuthBackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={src}
            alt="Authentication Background"
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
