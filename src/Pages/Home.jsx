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
      <div className="bg-white dark:bg-[#0a0a0a] min-h-screen text-gray-900 dark:text-gray-100 transition-colors">
        {/* Content */}
        <div className="relative">
          {/* Hero Section with Search */}
          <div className="pt-6 pb-2 px-4 md:pt-8 md:pb-4">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 md:mb-12">
                <h1 className="text-2xl md:text-3xl font-semibold text-center mb-3 dark:text-gray-50">
                  Baca Komik Gratis
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-center text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                  Koleksi lengkap komik terbaru, trending, dan populer dalam bahasa Indonesia
                </p>
              </div>
              <SearchComic />
            </div>
          </div>

          {/* Terbaru Section */}
          <div className="pb-6 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="mb-5 md:mb-6">
                <h2 className="text-xl md:text-2xl font-semibold dark:text-gray-50">
                  Terbaru
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Update komik terbaru setiap hari
                </p>
              </div>
              <CardTerbaruComic />
            </div>
          </div>

          {/* Trending Section */}
          <div className="pb-8 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="mb-5 md:mb-6">
                <h2 className="text-xl md:text-2xl font-semibold dark:text-gray-50">
                  Trending
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Komik paling populer minggu ini
                </p>
              </div>
              <CardTrendingComic />
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-12">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-xl md:text-2xl font-semibold mb-2 dark:text-gray-50">
                Jelajahi Lebih Banyak
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
                Temukan koleksi komik lengkap di pustaka kami
              </p>
            </div>

            <div className="flex justify-center">
              <Link
                to="/pustaka"
                className="group block w-full max-w-md active:scale-[0.98] transition-transform duration-150"
              >
                <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200">
                  {/* Content */}
                  <div className="relative p-6 md:p-8">
                    {/* Icon */}
                    <div className="mb-5 md:mb-6 flex justify-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-50 dark:group-hover:bg-gray-800/80 transition-colors duration-200">
                        <FontAwesomeIcon 
                          icon={faBookOpen} 
                          className="text-xl md:text-2xl text-gray-700 dark:text-gray-300" 
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-semibold mb-3 text-center dark:text-gray-50">
                      Pustaka Komik
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mb-5 md:mb-6 text-center leading-relaxed">
                      Jelajahi koleksi lengkap pustaka komik dengan ribuan judul
                    </p>

                    {/* CTA */}
                    <div className="flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors mr-2">
                        Lihat Semua
                      </span>
                      <svg 
                        className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 group-hover:translate-x-1 transition-all duration-200" 
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
          <footer className="mt-8 md:mt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="border-t border-gray-100 dark:border-gray-800 pt-8">
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    KanataToon - Platform baca komik online terbaik
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
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
