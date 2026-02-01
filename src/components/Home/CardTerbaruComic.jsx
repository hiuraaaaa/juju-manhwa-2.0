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
                <div className="border-2 border-gray-800 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 text-center max-w-md">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800 dark:text-gray-200 mb-2">Terjadi Kesalahan</h2>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-4">{error.message}</p>
                    <button
                        onClick={fetchComics}
                        className="bg-gray-800 dark:bg-gray-700 text-white px-6 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-900 dark:hover:bg-gray-600 transition-all"
                    >
                        Coba Lagi
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {comics.map((comic, index) => (
                <div
                    key={`${comic.slug}-${index}`}
                    className="group relative bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 overflow-hidden hover:border-gray-800 dark:hover:border-gray-600 transition-all duration-300 cursor-pointer"
                    onClick={() => handleComicDetail(comic)}
                    style={{ 
                        animation: `fadeInUp 0.4s ease-out ${index * 0.03}s both`
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
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x450?text=Comic+Cover'
                            }}
                        />
                        
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button
                                className="bg-gray-800 text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center gap-2"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleComicDetail(comic)
                                }}
                            >
                                <span className="material-icons text-sm" style={{ fontFamily: 'Material Icons' }}>
                                    ▶
                                </span>
                                Baca Sekarang
                            </button>
                        </div>
                        
                        {/* Chapter Badge - Top Right */}
                        <div className="absolute top-2 right-2 bg-gray-800 dark:bg-gray-700 text-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider">
                            {comic.chapter}
                        </div>

                        {/* NEW Badge - Top Left */}
                        <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider border border-gray-800 dark:border-gray-600">
                            NEW
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-3 border-t border-gray-200 dark:border-gray-800">
                        <h3 className="font-bold text-[11px] uppercase tracking-wide line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors min-h-[2.2rem] leading-tight">
                            {comic.title}
                        </h3>
                        
                        {/* Source Tag */}
                        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                            <span className="text-[9px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
                                {comic.source}
                            </span>
                        </div>
                    </div>

                    {/* Bottom border accent on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 dark:bg-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
            ))}

            {/* Custom Keyframes */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
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
