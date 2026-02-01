import React from 'react'
import CardTerbaruComic from '../components/Home/CardTerbaruComic'
import SEO from '../components/SEO'

const TerbaruPage = () => {
    return (
        <>
            <SEO
                title="Komik Terbaru - KanataToon"
                description="Daftar komik terbaru yang baru saja update. Baca komik online gratis dengan update terbaru setiap hari di Kanata-Toon."
                keywords="komik terbaru, komik baru, update komik, komik hari ini"
                url="https://juju-manhwa-2-0.vercel.app/terbaru"
            />
            
            <div className="bg-white dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 transition-colors">
                {/* Page Header */}
                <div className="border-b-2 border-gray-800 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-gray-800 dark:bg-gray-700 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 uppercase tracking-tight">
                                    Terbaru
                                </h1>
                            </div>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Update Komik Terbaru Setiap Hari
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <CardTerbaruComic />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TerbaruPage
