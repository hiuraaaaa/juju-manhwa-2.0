import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import SearchComic from '../components/Home/SearchComic'
import CardTerbaruComic from '../components/Home/CardTerbaruComic'
import CardTrendingComic from '../components/Home/CardTrendingComic'
import SEO from '../components/SEO'

const Home = () => {
  return (
    <>
      <SEO
        title="Kanata-Toon - Baca Komik Gratis Bahasa Indonesia Terbaru"
        description="Baca komik online gratis di Kanata-Toon. Koleksi lengkap komik terbaru, trending, dan populer dalam bahasa Indonesia. Update setiap hari!"
        keywords="komik indonesia, baca komik gratis, komik online, manga indonesia, manhwa indonesia"
        url="https://juju-manhwa-2-0.vercel.app/"
      />
      <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
        
        {/* Hero Section with Enhanced Search */}
        <div className="pt-12 pb-6 px-4 md:pt-20 md:pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 md:mb-14 text-center">
              <div className="inline-block mb-4">
                <span className="px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-200/50 dark:border-blue-500/30 rounded-full text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Platform Baca Komik Terbaik
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-gray-900 dark:text-gray-50 tracking-tight leading-tight">
                Baca Komik <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Gratis</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Koleksi lengkap komik terbaru, trending, dan populer dalam bahasa Indonesia
              </p>
            </div>
            <SearchComic />
          </div>
        </div>

        {/* Terbaru Section */}
        <div className="py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 md:mb-10">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                    Terbaru
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-base">
                    Update komik terbaru setiap hari
                  </p>
                </div>
                <Link 
                  to="/terbaru"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm group transition-colors"
                >
                  Lihat Semua
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <CardTerbaruComic />
          </div>
        </div>

        {/* Trending Section */}
        <div className="py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 md:mb-10">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                    Trending
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-base">
                    Komik paling populer minggu ini
                  </p>
                </div>
                <Link 
                  to="/trending"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm group transition-colors"
                >
                  Lihat Semua
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <CardTrendingComic />
          </div>
        </div>

        {/* Enhanced Pustaka CTA */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-[2px] shadow-2xl group">
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-10 md:p-16 text-center h-full">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon icon={faBookOpen} className="text-3xl text-white" />
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50">
                  Jelajahi Pustaka Komik
                </h2>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Temukan koleksi lengkap dengan ribuan judul komik dari berbagai genre favoritmu
                </p>

                {/* CTA Button */}
                <Link
                  to="/pustaka"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <span>Lihat Semua Koleksi</span>
                  <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 dark:border-gray-800 pt-10">
              <div className="text-center space-y-3">
                <p className="text-gray-700 dark:text-gray-300 text-base font-semibold">
                  KanataToon
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Platform baca komik online terbaik di Indonesia
                </p>
                <p className="text-gray-400 dark:text-gray-600 text-xs">
                  © 2024 KanataToon. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home
