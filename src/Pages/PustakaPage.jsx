import React, { useState } from 'react'
import CardNewComic from '../components/Home/CardNewComic'
import SEO from '../components/SEO'

const PustakaPage = () => {
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <>
            <SEO
                title="Pustaka Komik - KanataToon"
                description="Jelajahi koleksi lengkap pustaka komik dengan ribuan judul dari berbagai genre. Baca komik online gratis di Kanata-Toon."
                keywords="pustaka komik, koleksi komik, semua komik, daftar komik, komik lengkap"
                url="https://juju-manhwa-2-0.vercel.app/pustaka"
            />
            
            <div className="bg-white dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 transition-colors">
                {/* Page Header */}
                <div className="border-b-2 border-gray-800 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-gray-800 dark:bg-gray-700 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 uppercase tracking-tight">
                                    Pustaka
                                </h1>
                            </div>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Koleksi Lengkap Semua Komik
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <CardNewComic
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PustakaPage
