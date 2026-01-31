import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SkeletonLoader from '../SkeletonLoader'

const CardTerbaruComic = () => {
    const [comics, setComics] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const fetchComics = async () => {
        try {
            const response = await axios.get('https://www.sankavollerei.com/comic/terbaru')
            const rawComics = response.data.comics || []
            const filteredComics = rawComics.filter(item => 
                !item.title.toLowerCase().includes('apk') && 
                !item.chapter.toLowerCase().includes('download')
            )
            
            const processedComics = filteredComics.map(comic => {
                const slug = comic.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');

                const link = comic.link.replace('/manga/', '/').replace('/plus/', '/');

                const imageUrl = comic.image && !comic.image.includes('lazy.jpg')
                    ? comic.image
                    : 'https://via.placeholder.com/300x450?text=Cover+Terbaru';
                
                return {
                    ...comic,
                    image: imageUrl,
                    processedLink: link,
                    slug: slug,
                    source: 'Terbaru', 
                    popularity: 'N/A'   
                }
            })

            setComics(processedComics)
            setLoading(false)

        } catch (err) {
            setError(err)
            setLoading(false)
            console.error("Error fetching terbaru comics:", err)
        }
    }

    useEffect(() => {
        fetchComics()
    }, [])

    const handleComicDetail = (comic) => {
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

    if (loading) {
        return <SkeletonLoader count={12} type="card" />
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[400px] p-4">
                <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-2 border-red-200 dark:border-red-800/50 rounded-2xl p-8 text-center max-w-md backdrop-blur-sm">
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-rose-500/5 to-red-500/5 animate-pulse"></div>
                    
                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Terjadi Kesalahan</h2>
                        <p className="text-red-500 dark:text-red-300 text-sm">{error.message}</p>
                        <button 
                            onClick={fetchComics}
                            className="mt-4 px-6 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Coba Lagi
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
            {comics.map((comic, index) => (
                <div
                    key={`${comic.slug}-${index}`}
                    className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 hover:-translate-y-1 cursor-pointer"
                    onClick={() => handleComicDetail(comic)}
                    style={{ 
                        animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`
                    }}
                >
                    {/* Image Container */}
                    <div className="relative aspect-[2/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                            src={comic.image}
                            alt={comic.title}
                            width="300"
                            height="450"
                            loading={index < 6 ? "eager" : "lazy"}
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x450?text=Comic+Cover'
                            }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Chapter Badge */}
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm flex items-center gap-1.5 transform group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                            </svg>
                            <span className="leading-none">{comic.chapter}</span>
                        </div>

                        {/* NEW Badge */}
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-lg backdrop-blur-sm animate-pulse">
                            NEW
                        </div>
                        
                        {/* Hover Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <button
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2.5 px-4 rounded-xl font-semibold text-sm shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleComicDetail(comic)
                                }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Baca Sekarang
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-3">
                        <h3 className="font-bold text-sm line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 min-h-[2.5rem] leading-tight">
                            {comic.title}
                        </h3>
                        
                        {/* Source Tag */}
                        <div className="mt-2 flex items-center gap-2">
                            <span className="inline-flex items-center text-[10px] font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                                </svg>
                                Baru
                            </span>
                        </div>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                </div>
            ))}

            {/* Custom Keyframes */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
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

export default CardTerbaruComic
