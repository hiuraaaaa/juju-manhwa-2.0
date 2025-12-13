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
        <div className="relative">
          {/* Hero Section with Glassmorphism */}
          <div className="pt-8 pb-6 px-4 md:pt-12 md:pb-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-10 md:mb-16 text-center">
                <div className="mb-6">
                  <h1 className="text-3xl md:text-4xl font-semibold mb-4 dark:text-white tracking-tight leading-tight">
                    Baca Komik Gratis
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                    Koleksi lengkap komik terbaru, trending, dan populer dalam bahasa Indonesia
                  </p>
                </div>
                <div className="relative max-w-2xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl opacity-20"></div>
                  <div className="relative">
                    <SearchComic />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terbaru Section */}
          <div className="pb-8 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-semibold dark:text-white">
                      Terbaru
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                      Update komik terbaru setiap hari
                    </p>
                  </div>
                </div>
                <CardTerbaruComic />
              </div>
            </div>
          </div>

          {/* Trending Section with Glass Card */}
          <div className="pb-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
                <div className="relative backdrop-blur-sm bg-white/5 dark:bg-black/10 border border-gray-200/20 dark:border-white/10 rounded-2xl p-6 md:p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-semibold dark:text-white mb-3">
                      Trending
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Komik paling populer minggu ini
                    </p>
                  </div>
                  <CardTrendingComic />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Section with Premium Glass Card */}
          <div className="max-w-7xl mx-auto px-4 pb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 dark:text-white">
                Jelajahi Lebih Banyak
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-base max-w-md mx-auto">
                Temukan koleksi komik lengkap di pustaka kami
              </p>
            </div>

            <div className="flex justify-center">
              <Link
                to="/pustaka"
                className="group block w-full max-w-md active:scale-[0.98] transition-all duration-200 transform-gpu"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-gray-200/30 dark:border-white/10 shadow-2xl shadow-blue-500/5 dark:shadow-purple-500/5 group-hover:shadow-3xl group-hover:shadow-blue-500/10 dark:group-hover:shadow-purple-500/10 transition-all duration-300">
                    <div className="p-8">
                      <div className="mb-6 flex justify-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-white/10 group-hover:scale-105 transition-transform duration-300">
                          <FontAwesomeIcon 
                            icon={faBookOpen} 
                            className="text-2xl text-gray-700 dark:text-gray-300" 
                          />
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold mb-4 text-center dark:text-white">
                        Pustaka Komik
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 text-center leading-relaxed">
                        Jelajahi koleksi lengkap pustaka komik dengan ribuan judul
                      </p>

                      <div className="flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors mr-2">
                          Lihat Semua
                        </span>
                        <svg 
                          className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-200" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 pb-10">
            <div className="max-w-7xl mx-auto px-4">
              <div className="border-t border-gray-200/20 dark:border-white/10 pt-8">
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    KanataToon - Platform baca komik online terbaik
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs mt-3">
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
