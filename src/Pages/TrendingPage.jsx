import React from 'react'
import CardTrendingComic from '../components/Home/CardTrendingComic'
import SEO from '../components/SEO'

const TrendingPage = () => {
    return (
        <>
            <SEO
                title="Komik Trending - KanataToon"
                description="Komik paling populer dan banyak dibaca minggu ini. Temukan komik trending terbaik di Kanata-Toon."
                keywords="komik trending, komik populer, komik terpopuler, komik hits"
                url="https://juju-manhwa-2-0.vercel.app/trending"
            />
            
            <div className="bg-white dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 transition-colors">
                {/* Page Header */}
                <div className="border-b-2 border-gray-800 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-gray-800 dark:bg-gray-700 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 uppercase tracking-tight">
                                    Trending
                                </h1>
                            </div>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Komik Paling Populer Minggu Ini
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <CardTrendingComic />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrendingPage
