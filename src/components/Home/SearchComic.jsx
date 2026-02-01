import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchComic = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // Live search dengan debouncing
    useEffect(() => {
        // Bersihkan hasil jika query kosong
        if (!searchQuery.trim()) {
            setSearchResults([])
            setError(null)
            return
        }

        // Set loading state
        setLoading(true)
        setError(null)

        // Debounce: tunggu 500ms setelah user berhenti mengetik
        const debounceTimer = setTimeout(async () => {
            try {
                const response = await axios.get(`https://www.sankavollerei.com/comic/search?q=${encodeURIComponent(searchQuery)}`)

                // Process the search results
                const processedResults = response.data.data.map(comic => {
                    const slug = comic.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-+|-+$/g, '')

                    return {
                        ...comic,
                        processedLink: comic.href,
                        slug: slug
                    }
                })

                setSearchResults(processedResults)
            } catch (err) {
                setError('Terjadi kesalahan saat mencari komik')
            } finally {
                setLoading(false)
            }
        }, 500) // 500ms delay

        // Cleanup function untuk cancel request sebelumnya
        return () => {
            clearTimeout(debounceTimer)
            setLoading(false)
        }
    }, [searchQuery])

    const handleComicDetail = (comic) => {
        // Format processedLink dengan benar
        const processedLink = comic.href.replace('/detail-komik/', '')
        
        navigate(`/detail-comic/${comic.slug}`, {
            state: {
                comic: {
                    title: comic.title,
                    image: comic.thumbnail,
                    chapter: comic.description || 'Chapter Terbaru',
                    source: comic.type,
                    link: comic.href,
                    popularity: comic.genre || '-'
                },
                processedLink: processedLink
            }
        })
    }

    return (
        <div className="w-full max-w-7xl mx-auto mb-12">
            {/* Search Box - Industrial Style */}
            <div className="relative max-w-3xl mx-auto mb-10">
                <div className="relative flex items-center bg-white dark:bg-gray-900 border-2 border-gray-800 dark:border-gray-700 overflow-hidden">
                    <svg className="w-5 h-5 text-gray-400 dark:text-gray-600 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari komik berdasarkan judul..."
                        className="flex-1 px-4 py-4 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-600 focus:outline-none text-sm font-medium"
                    />
                    {loading && (
                        <div className="px-4">
                            <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-700 border-t-gray-800 dark:border-t-gray-400 rounded-full animate-spin"></div>
                        </div>
                    )}
                    {searchQuery && !loading && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="px-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
                            title="Clear search"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="max-w-3xl mx-auto mb-6">
                    <div className="border-2 border-gray-800 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-bold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                {error}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
                <div className="mt-12">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-800 dark:border-gray-700">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight">
                                Hasil Pencarian
                            </h2>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">
                                {searchResults.length} Komik Ditemukan
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setSearchResults([])
                                setSearchQuery('')
                            }}
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                            title="Clear results"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {searchResults.map((comic, index) => (
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
                                        src={comic.thumbnail}
                                        alt={comic.title}
                                        width="300"
                                        height="450"
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300x450?text=Comic+Cover'
                                        }}
                                    />
                                    
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <button
                                            className="bg-gray-800 text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-900 transition-all"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleComicDetail(comic)
                                            }}
                                        >
                                            Lihat Detail
                                        </button>
                                    </div>
                                    
                                    {/* Type Badge */}
                                    <div className="absolute top-2 right-2 bg-gray-800 dark:bg-gray-700 text-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider">
                                        {comic.type}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-3 border-t border-gray-200 dark:border-gray-800">
                                    <h3 className="font-bold text-[11px] uppercase tracking-wide line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors min-h-[2.2rem] leading-tight">
                                        {comic.title}
                                    </h3>
                                    
                                    {/* Genre Tag */}
                                    {comic.genre && (
                                        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                                            <span className="text-[9px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest line-clamp-1">
                                                {comic.genre}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Bottom border accent on hover */}
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 dark:bg-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* No Results Message */}
            {searchQuery && !loading && searchResults.length === 0 && !error && (
                <div className="max-w-3xl mx-auto mt-12">
                    <div className="border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800 dark:text-gray-200 mb-2">
                            Tidak Ada Hasil
                        </h3>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                            Tidak ditemukan komik dengan kata kunci "<span className="font-bold">{searchQuery}</span>"
                        </p>
                    </div>
                </div>
            )}

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
            `}</style>
        </div>
    )
}

export default SearchComic
