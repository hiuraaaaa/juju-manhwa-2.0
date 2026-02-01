import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlay, faBookOpen, faClock, faStar } from '@fortawesome/free-solid-svg-icons'
import SkeletonLoader from '../SkeletonLoader'

const DetailComic = () => {
    const navigate = useNavigate()
    const { slug } = useParams()
    const location = useLocation()
    const locationState = location.state || {}
    
    const [comic, setComic] = useState(locationState.comic || null)
    const [processedLink, setProcessedLink] = useState(locationState.processedLink || slug)
    const [comicDetail, setComicDetail] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [history, setHistory] = useState(null)
    const [recommendations, setRecommendations] = useState([])

    useEffect(() => {
        const fetchComicDetail = async () => {
            try {
                const linkToFetch = processedLink || slug
                const cleanProcessedLink = linkToFetch?.startsWith('/') 
                    ? linkToFetch.substring(1) 
                    : linkToFetch

                const response = await axios.get(
                    `https://www.sankavollerei.com/comic/comic/${cleanProcessedLink}`
                )

                if (!response.data) {
                    throw new Error('Tidak ada data komik yang ditemukan')
                }

                setComicDetail(response.data)
                
                if (!comic && response.data.title) {
                    setComic({
                        title: response.data.title || 'Unknown Title',
                        image: response.data.image || response.data.thumbnail || 'https://via.placeholder.com/300x450?text=No+Image',
                        chapter: response.data.latest_chapter || response.data.chapters?.[0]?.chapter || '-',
                        source: response.data.source || response.data.type || '-',
                        link: linkToFetch,
                    })
                }
                
                setLoading(false)
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Terjadi kesalahan saat mengambil detail komik')
                setLoading(false)
            }
        }

        fetchComicDetail()
    }, [slug, processedLink])

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get('https://www.sankavollerei.com/comic/recommendations')
                
                const processedRecommendations = response.data.recommendations.map(item => {
                    const itemSlug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                    const link = item.link.replace('/manga/', '').replace('/detail-komik/', '')
                    
                    return {
                        ...item,
                        slug: itemSlug,
                        processedLink: link,
                        source: item.reason || '-',
                        popularity: item.recommendation_score ? item.recommendation_score.toFixed(2) : '-',
                        image: item.image.includes('lazy.jpg') ? 'https://via.placeholder.com/300x450?text=Recomendasi' : item.image,
                    }
                })
                
                const filteredRecommendations = processedRecommendations.filter(item =>
                    !item.title.toLowerCase().includes('apk') && !item.chapter.toLowerCase().includes('download')
                )

                setRecommendations(filteredRecommendations.filter(r => r.slug !== slug).slice(0, 8))
            } catch (err) {
                console.error("Error fetching recommendations:", err)
            }
        }

        fetchRecommendations()
    }, [slug])

    useEffect(() => {
        const loadHistory = () => {
            try {
                const historyData = JSON.parse(localStorage.getItem('comicHistory'))
                if (historyData && historyData[slug]) {
                    setHistory(historyData[slug])
                }
            } catch (e) {
                console.error("Error loading history", e)
            }
        }
        loadHistory()
    }, [slug])

    const handleReadComic = (chapterData = null) => {
        let chapterToRead = chapterData || (comicDetail?.chapters?.[0])
        
        if (!chapterToRead) {
            alert('No chapters available')
            return
        }
        
        navigate(`/read-comic/${slug}/chapter-${chapterToRead.chapter}`, {
            state: {
                chapterLink: chapterToRead.link,
                comicTitle: comic?.title || comicDetail?.title,
                chapterNumber: chapterToRead.chapter,
                comicDetailState: { comic: comic || { title: comicDetail?.title, image: comicDetail?.image || comicDetail?.thumbnail }, processedLink: processedLink || slug },
            }
        })
    }

    const handleContinueReading = () => {
        if (history) {
            handleReadComic({ link: history.lastChapterLink, chapter: history.lastChapter })
        }
    }

    const handleRecommendationDetail = (item) => {
        window.scrollTo(0, 0)
        navigate(`/detail-comic/${item.slug}`, {
            state: {
                comic: { title: item.title, image: item.image, chapter: item.chapter, source: item.source, link: item.link, popularity: item.popularity },
                processedLink: item.processedLink
            }
        })
    }

    const displayComic = comic || {
        title: comicDetail?.title || 'Unknown Title',
        image: comicDetail?.image || comicDetail?.thumbnail || 'https://via.placeholder.com/300x450?text=No+Image',
        chapter: comicDetail?.latest_chapter || comicDetail?.chapters?.[0]?.chapter || '-',
        source: comicDetail?.source || comicDetail?.type || '-',
    }

    const isLatestChapter = history?.lastChapter === displayComic?.chapter

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-950 min-h-screen py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SkeletonLoader count={8} type="card" />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-gray-950 min-h-screen flex items-center justify-center p-4">
                <div className="border-2 border-gray-800 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 text-center max-w-md">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800 dark:text-gray-200 mb-2">Terjadi Kesalahan</h2>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-4">{error}</p>
                    <button onClick={() => navigate('/')} className="bg-gray-800 dark:bg-gray-700 text-white px-6 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-900 dark:hover:bg-gray-600 transition-all">
                        Kembali ke Home
                    </button>
                </div>
            </div>
        )
    }

    if (!comic && !comicDetail) {
        return (
            <div className="bg-white dark:bg-gray-950 min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Komik tidak ditemukan</p>
                    <button onClick={() => navigate('/')} className="bg-gray-800 text-white px-6 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-900 transition-all">
                        Kembali ke Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Content */}
                    <div className="lg:w-2/3 space-y-6">
                        {/* Hero Banner - Industrial Style */}
                        <div className="relative border-2 border-gray-800 dark:border-gray-700 overflow-hidden">
                            {/* Corner Dots */}
                            <div className="absolute w-1.5 h-1.5 bg-gray-800 dark:bg-gray-700 -top-0.5 -left-0.5 z-20"></div>
                            <div className="absolute w-1.5 h-1.5 bg-gray-800 dark:bg-gray-700 -top-0.5 -right-0.5 z-20"></div>
                            <div className="absolute w-1.5 h-1.5 bg-gray-800 dark:bg-gray-700 -bottom-0.5 -left-0.5 z-20"></div>
                            <div className="absolute w-1.5 h-1.5 bg-gray-800 dark:bg-gray-700 -bottom-0.5 -right-0.5 z-20"></div>

                            <div className="relative h-96">
                                <img src={displayComic.image} alt={displayComic.title} className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://via.placeholder.com/1200x500?text=No+Image'} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                                
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                    <h1 className="text-2xl md:text-3xl font-bold mb-4 text-white uppercase tracking-tight">{displayComic.title}</h1>
                                    
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <div className="bg-gray-800/80 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider border border-white/20">
                                            <FontAwesomeIcon icon={faBookOpen} className="mr-1" />
                                            {displayComic.chapter}
                                        </div>
                                        {displayComic.source && (
                                            <div className="bg-gray-800/80 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider border border-white/20">
                                                <FontAwesomeIcon icon={faStar} className="mr-1" />
                                                {displayComic.source}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <button onClick={() => handleReadComic()} className="bg-gray-800 text-white px-6 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center gap-2">
                                            <FontAwesomeIcon icon={faPlay} />
                                            Baca Dari Awal
                                        </button>
                                        <button onClick={() => navigate('/')} className="border-2 border-white text-white px-6 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all flex items-center gap-2">
                                            <FontAwesomeIcon icon={faHome} />
                                            Home
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Synopsis */}
                        <div className="border-2 border-gray-800 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100 mb-3 pb-3 border-b border-gray-200 dark:border-gray-800">Synopsis</h3>
                            <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                                {comicDetail?.synopsis || "Synopsis tidak tersedia."}
                            </p>
                        </div>

                        {/* Continue Reading */}
                        {history && !isLatestChapter && (
                            <div className="border-2 border-gray-800 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <FontAwesomeIcon icon={faClock} className="text-gray-600 dark:text-gray-400" />
                                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-white">Lanjutkan Membaca</h3>
                                </div>
                                <p className="text-[11px] text-gray-600 dark:text-gray-400 mb-4">
                                    Chapter Terakhir: <span className="font-bold text-gray-900 dark:text-white">Chapter {history.lastChapter}</span>
                                </p>
                                <button onClick={handleContinueReading} className="bg-gray-800 text-white px-6 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center gap-2">
                                    <FontAwesomeIcon icon={faPlay} />
                                    Lanjutkan Chapter {history.lastChapter}
                                </button>
                            </div>
                        )}

                        {/* Chapter List */}
                        <div className="border-2 border-gray-800 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b border-gray-200 dark:border-gray-800">Daftar Chapter</h3>
                            {comicDetail?.chapters && comicDetail.chapters.length > 0 ? (
                                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                                    {comicDetail.chapters.map((chapter, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleReadComic(chapter)}
                                            className={`p-2 text-center text-[11px] font-bold uppercase tracking-wider transition-all ${
                                                String(chapter.chapter) === String(history?.lastChapter)
                                                    ? 'bg-gray-800 text-white border-2 border-gray-900 dark:border-gray-600'
                                                    : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-800 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                                            }`}
                                        >
                                            {chapter.chapter}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 text-center py-4">Belum ada chapter tersedia</p>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Recommendations */}
                    {recommendations.length > 0 && (
                        <div className="lg:w-1/3">
                            <div className="sticky top-20 border-2 border-gray-800 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b border-gray-200 dark:border-gray-800">Rekomendasi</h2>
                                <div className="space-y-3">
                                    {recommendations.map((item, index) => (
                                        <div
                                            key={index}
                                            className="group border border-gray-300 dark:border-gray-700 hover:border-gray-800 dark:hover:border-gray-600 cursor-pointer transition-all overflow-hidden"
                                            onClick={() => handleRecommendationDetail(item)}
                                        >
                                            <div className="flex gap-3">
                                                <div className="w-20 h-28 flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => e.target.src = 'https://via.placeholder.com/80x112?text=Rec'} />
                                                </div>
                                                <div className="flex-1 p-2 min-w-0">
                                                    <h3 className="font-bold text-[11px] uppercase tracking-wide line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors mb-2 leading-tight">
                                                        {item.title}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-1">
                                                        <span className="text-[9px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold uppercase border border-gray-200 dark:border-gray-700">
                                                            Ch {item.chapter.split(' ').pop()}
                                                        </span>
                                                        <span className="text-[9px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold uppercase border border-gray-200 dark:border-gray-700">
                                                            ★ {item.popularity}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Bottom accent line */}
                                            <div className="h-0.5 bg-gray-800 dark:bg-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DetailComic
