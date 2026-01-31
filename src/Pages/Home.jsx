import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faFire, faClock, faStar } from '@fortawesome/free-solid-svg-icons'
import SearchComic from '../components/Home/SearchComic'
import CardTerbaruComic from '../components/Home/CardTerbaruComic'
import CardTrendingComic from '../components/Home/CardTrendingComic'
import SEO from '../components/SEO'

const Home = () => {
  const [stats, setStats] = useState({
    totalComics: 0,
    dailyUpdates: 0,
    readers: 0
  })

  // Simulate stats loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalComics: 5000,
        dailyUpdates: 50,
        readers: 10000
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <SEO
        title="Kanata-Toon - Baca Komik Gratis Bahasa Indonesia Terbaru"
        description="Baca komik online gratis di Kanata-Toon. Koleksi lengkap komik terbaru, trending, dan populer dalam bahasa Indonesia. Update setiap hari!"
        keywords="komik indonesia, baca komik gratis, komik online, manga indonesia, manhwa indonesia"
        url="https://juju-manhwa-2-0.vercel.app/"
      />
      
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Hero Section with Industrial Banner */}
        <div className="pt-10 pb-6 px-4 md:pt-16 md:pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Industrial Banner */}
            <div className="relative bg-white dark:bg-gray-900 border-2 border-gray-800 dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(31,41,55,1)] dark:shadow-[8px_8px_0px_0px_rgba(55,65,81,1)] p-8 md:p-12 mb-8 overflow-hidden">
              {/* Corner Dots */}
              <div className="absolute w-3 h-3 bg-gray-800 dark:bg-gray-700 rounded-full -top-1.5 -left-1.5"></div>
              <div className="absolute w-3 h-3 bg-gray-800 dark:bg-gray-700 rounded-full -top-1.5 -right-1.5"></div>
              <div className="absolute w-3 h-3 bg-gray-800 dark:bg-gray-700 rounded-full -bottom-1.5 -left-1.5"></div>
              <div className="absolute w-3 h-3 bg-gray-800 dark:bg-gray-700 rounded-full -bottom-1.5 -right-1.5"></div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>

              <div className="relative z-10">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-gray-800 dark:bg-gray-700 text-white text-[10px] font-bold px-3 py-1.5 tracking-widest uppercase">
                    Platform #1
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Online
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-gray-900 dark:text-gray-50 tracking-tight leading-tight">
                  Baca Komik<br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Gratis
                  </span>
                </h1>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed mb-6">
                  Koleksi lengkap komik terbaru, trending, dan populer dalam bahasa Indonesia. Update setiap hari dengan kualitas terbaik.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
                      {stats.totalComics.toLocaleString()}+
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mt-1">
                      Komik
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
                      {stats.dailyUpdates}+
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mt-1">
                      Update/Hari
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
                      {stats.readers.toLocaleString()}+
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mt-1">
                      Pembaca
                    </div>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                    © 2024 KanataToon • Free Comic Platform
                  </span>
                </div>
              </div>
            </div>

            {/* Search Component */}
            <SearchComic />
          </div>
        </div>

        {/* Terbaru Section */}
        <div className="pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 md:mb-8">
              {/* Section Header dengan Industrial Style */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <FontAwesomeIcon icon={faClock} className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
                    Terbaru
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold">
                    Latest Updates
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm ml-13 leading-relaxed">
                Update komik terbaru setiap hari dengan chapter terlengkap
              </p>
            </div>
            <CardTerbaruComic />
          </div>
        </div>

        {/* Trending Section */}
        <div className="pb-10 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 md:mb-8">
              {/* Section Header dengan Industrial Style */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                  <FontAwesomeIcon icon={faFire} className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
                    Trending
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold">
                    Popular Now
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm ml-13 leading-relaxed">
                Komik paling populer dan banyak dibaca minggu ini
              </p>
            </div>
            <CardTrendingComic />
          </div>
        </div>

        {/* Quick Links Section - Enhanced Industrial Style */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <FontAwesomeIcon icon={faStar} className="text-white text-sm" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-gray-50">
              Jelajahi Lebih Banyak
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider font-semibold">
              Explore Collections
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              to="/pustaka"
              className="group block w-full max-w-md"
            >
              {/* Industrial Card */}
              <div className="relative bg-white dark:bg-gray-900 border-2 border-gray-800 dark:border-gray-700 shadow-[6px_6px_0px_0px_rgba(31,41,55,1)] dark:shadow-[6px_6px_0px_0px_rgba(55,65,81,1)] hover:shadow-[8px_8px_0px_0px_rgba(31,41,55,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(55,65,81,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 p-8 md:p-10 overflow-hidden">
                {/* Corner Dots */}
                <div className="absolute w-2 h-2 bg-gray-800 dark:bg-gray-700 rounded-full -top-1 -left-1"></div>
                <div className="absolute w-2 h-2 bg-gray-800 dark:bg-gray-700 rounded-full -top-1 -right-1"></div>
                <div className="absolute w-2 h-2 bg-gray-800 dark:bg-gray-700 rounded-full -bottom-1 -left-1"></div>
                <div className="absolute w-2 h-2 bg-gray-800 dark:bg-gray-700 rounded-full -bottom-1 -right-1"></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 dark:bg-gray-700 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300 shadow-lg">
                      <FontAwesomeIcon 
                        icon={faBookOpen} 
                        className="text-2xl text-white" 
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-center text-gray-900 dark:text-gray-50">
                    Pustaka Komik
                  </h3>

                  {/* Badge */}
                  <div className="flex justify-center mb-4">
                    <span className="text-[10px] font-bold bg-gray-800 dark:bg-gray-700 text-white px-3 py-1 uppercase tracking-widest">
                      Full Collection
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-6 text-center leading-relaxed">
                    Jelajahi koleksi lengkap pustaka komik dengan ribuan judul dari berbagai genre
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-center min-h-[44px] pt-4 border-t border-gray-200 dark:border-gray-800">
                    <span className="text-base font-bold text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mr-2 uppercase tracking-wider text-sm">
                      Lihat Semua
                    </span>
                    <svg 
                      className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-2 transition-all duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
            <div className="border-t-2 border-gray-800 dark:border-gray-700 pt-8 md:pt-10">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">
                  KanataToon - Platform Baca Komik Online Terbaik
                </p>
                <p className="text-gray-400 dark:text-gray-600 text-[10px] uppercase tracking-widest font-semibold">
                  &copy; 2024 KanataToon. All rights reserved.
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
