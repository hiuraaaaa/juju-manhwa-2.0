import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faPlay } from '@fortawesome/free-solid-svg-icons'

const HeroBannerCompact = ({ comics = [] }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const navigate = useNavigate()

    // Auto-play carousel
    useEffect(() => {
        if (!isAutoPlaying || comics.length === 0) return

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % comics.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [isAutoPlaying, comics.length])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % comics.length)
        setIsAutoPlaying(false)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + comics.length) % comics.length)
        setIsAutoPlaying(false)
    }

    const goToSlide = (index) => {
        setCurrentSlide(index)
        setIsAutoPlaying(false)
    }

    const handleReadComic = (comic) => {
        navigate(`/detail-comic/${comic.slug}`, {
            state: {
                comic: {
                    title: comic.title,
                    image: comic.image,
                    chapter: comic.chapter,
                    source: comic.source,
                    popularity: comic.popularity
                },
                processedLink: comic.processedLink
            }
        })
    }

    if (!comics || comics.length === 0) {
        return null
    }

    const currentComic = comics[currentSlide]

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-black group border-2 border-gray-800 dark:border-gray-700 overflow-hidden">
                {/* Corner Dots - Industrial Style */}
                <div className="absolute w-1.5 h-1.5 bg-gray-800 dark:bg-gray-700 -top-0.5 -left-0.5 z-20"></div>
                <div className="absolute w-1.5 h-1.5 bg-gray-800 dark:bg-gray-700 -top-0.5 -right-0.5 z-20"></div>
                <div className="absolute w-1.5 h-1.5 bg-gray-800 dark:bg-gray-700 -bottom-0.5 -left-0.5 z-20"></div>
                <div className="absolute w-1.5 h-1.5 bg-gray-800 dark:bg-gray-700 -bottom-0.5 -right-0.5 z-20"></div>

                {/* 21:9 Aspect Ratio Container (More Compact) */}
                <div className="relative w-full" style={{ paddingBottom: '42.85%' }}> {/* 21:9 = 42.85% */}
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src={currentComic.image}
                            alt={currentComic.title}
                            className="w-full h-full object-cover transition-opacity duration-500"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/1920x823?text=Banner'
                            }}
                        />
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full px-6 md:px-8 lg:px-12">
                            <div className="max-w-xl">
                                {/* Badge */}
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="bg-white text-gray-900 px-2 py-1 text-[9px] font-bold uppercase tracking-widest">
                                        Featured
                                    </div>
                                    <div className="bg-gray-800/80 text-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider border border-white/20">
                                        {currentComic.chapter}
                                    </div>
                                </div>

                                {/* Title */}
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 uppercase tracking-tight leading-tight line-clamp-2">
                                    {currentComic.title}
                                </h2>

                                {/* CTA Button */}
                                <button
                                    onClick={() => handleReadComic(currentComic)}
                                    className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2 font-bold text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all mt-3"
                                >
                                    <FontAwesomeIcon icon={faPlay} className="text-xs" />
                                    Baca
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    {comics.length > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                            >
                                <FontAwesomeIcon icon={faChevronLeft} className="text-white text-sm" />
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                            >
                                <FontAwesomeIcon icon={faChevronRight} className="text-white text-sm" />
                            </button>
                        </>
                    )}

                    {/* Dots Indicator */}
                    {comics.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {comics.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-1.5 h-1.5 transition-all ${
                                        index === currentSlide
                                            ? 'bg-white w-6'
                                            : 'bg-white/50 hover:bg-white/75'
                                    }`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Slide Counter */}
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider border border-white/30">
                        {currentSlide + 1}/{comics.length}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBannerCompact
