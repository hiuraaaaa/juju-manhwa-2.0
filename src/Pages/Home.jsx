import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
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
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Content */}
        <div className="relative">
          {/* Hero Section with Search */}
          <div className="pt-10 pb-4 px-4 md:pt-16 md:pb-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 md:mb-12">
                <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-3 text-gray-800 dark:text-gray-50 tracking-tight leading-snug">
                  Baca Komik Gratis
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg text-center max-w-2xl mx-auto leading-relaxed">
                  Koleksi lengkap komik terbaru, trending, dan populer dalam bahasa Indonesia
                </p>
              </div>
              <SearchComic />
            </div>
          </div>

          {/* Terbaru Section */}
          <div className="pb-8 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6 md:mb-8 flex items-end justify-between">
                <div className='flex flex-col'>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-50">
                    Terbaru
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Update komik terbaru setiap hari
                  </p>
                </div>
              </div>
              <CardTerbaruComic />
            </div>
          </div>

          {/* Trending Section */}
          <div className="pb-10 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6 md:mb-8 flex items-end justify-between">
                <div className='flex flex-col'>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-50">
                    Trending
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Komik paling populer minggu ini
                  </p>
                </div>
              </div>
              <CardTrendingComic />
            </div>
          </div>

          {/* Quick Links Section - GLASSMORPHISM APPLIED */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-gray-50">
                Jelajahi Lebih Banyak
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-base max-w-lg mx-auto leading-relaxed">
                Temukan koleksi komik lengkap di pustaka kami
              </p>
            </div>

            <div className="flex justify-center">
              <Link
                to="/pustaka"
                className="group block w-full max-w-md active:scale-[0.98] transition-transform duration-200"
              >
                <div className="relative overflow-hidden rounded-2xl p-0.5 shadow-lg dark:shadow-xl transition-all duration-300 transform group-hover:scale-[1.01] bg-gradient-to-br from-transparent via-gray-100/20 dark:via-gray-800/20 to-transparent">
                  <div className="relative p-6 md:p-10 rounded-2xl bg-white/5 dark:bg-gray-900/20 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 transition-all duration-300">
                    {/* Icon */}
                    <div className="mb-6 flex justify-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-100/70 dark:bg-gray-800/70 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors duration-200 ease-in-out shadow-inner">
                        <FontAwesomeIcon 
                          icon={faBookOpen} 
                          className="text-xl md:text-2xl text-gray-700 dark:text-gray-300" 
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-center text-gray-800 dark:text-gray-50">
                      Pustaka Komik
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-6 text-center leading-relaxed">
                      Jelajahi koleksi lengkap pustaka komik dengan ribuan judul
                    </p>

                    {/* CTA */}
                    <div className="flex items-center justify-center min-h-[44px]">
                      <span className="text-base font-semibold text-gray-700 dark:text-gray-300 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mr-2">
                        Lihat Semua
                      </span>
                      <svg 
                        className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:translate-x-1 transition-all duration-200 ease-in-out" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 md:mt-16 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="border-t border-gray-200 dark:border-gray-800 pt-8 md:pt-10">
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    KanataToon - Platform baca komik online terbaik
                  </p>
                  <p className="text-gray-400 dark:text-gray-600 text-xs mt-2">
                    &copy; 2024 KanataToon. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

export default Home
