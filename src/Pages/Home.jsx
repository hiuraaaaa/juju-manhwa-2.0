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
      
      <div className="bg-white dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
        
        {/* Hero Section - Industrial Banner Style */}
        <div className="pt-6 pb-4 px-4 md:pt-10 md:pb-6">
          <div className="max-w-7xl mx-auto">
            {/* Industrial Banner */}
            <div className="relative bg-white dark:bg-gray-900 border-2 border-gray-800 dark:border-gray-700 p-6 md:p-8 mb-6">
              {/* Corner Dots */}
              <div className="absolute w-1.5 h-1.5 bg-gray-800 dark:bg-gray-700 -top-0.5 -left-0.5"></div>
              <div className="absolute w-1.5 h-1.5 bg-gray-800 dark:bg-gray-700 -top-0.5 -right-0.5"></div>
              <div className="absolute w-1.5 h-1.5 bg-gray-800 dark:bg-gray-700 -bottom-0.5 -left-0.5"></div>
              <div className="absolute w-1.5 h-1.5 bg-gray-800 dark:bg-gray-700 -bottom-0.5 -right-0.5"></div>

              <div className="flex items-center gap-2 mb-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-gray-500 transition-colors" style={{ fontSize: '11px' }}>
                  <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="font-medium">KanataToon Platform</span>
                </a>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight leading-tight">
                Baca Komik Online<br />Gratis & Terlengkap
              </h1>

              <p className="text-[11px] text-gray-700 dark:text-gray-400 mb-8 leading-relaxed max-w-md">
                Akses koleksi komik terbaru dan terpopuler dalam bahasa Indonesia. 
                Nikmati ribuan judul dari berbagai genre favoritmu tanpa biaya apapun.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/pustaka" 
                  className="bg-gray-800 dark:bg-gray-700 text-white px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-900 dark:hover:bg-gray-600 transition-all flex items-center gap-2"
                >
                  Jelajahi Sekarang
                  <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                </Link>
                <Link 
                  to="/trending" 
                  className="border-2 border-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-300 px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-900 transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                  </svg>
                  Trending
                </Link>
              </div>
            </div>

            {/* Search Component */}
            <SearchComic />
          </div>
        </div>

        {/* Terbaru Section */}
        <div className="py-6 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 md:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b-2 border-gray-800 dark:border-gray-700">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 uppercase tracking-tight">
                    Terbaru
                  </h2>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">
                    Update Harian
                  </p>
                </div>
                <Link 
                  to="/terbaru"
                  className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-bold text-[11px] uppercase tracking-widest transition-colors group"
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
        <div className="py-6 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 md:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b-2 border-gray-800 dark:border-gray-700">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 uppercase tracking-tight">
                    Trending
                  </h2>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">
                    Paling Populer
                  </p>
                </div>
                <Link 
                  to="/trending"
                  className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-bold text-[11px] uppercase tracking-widest transition-colors group"
                >
                  Lihat Semua
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <CardTrendingComic />
          </div>
        </div>

        {/* Pustaka CTA - Industrial Style */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Main CTA */}
            <div className="border-2 border-gray-800 dark:border-gray-700 p-6 md:p-8 bg-white dark:bg-gray-900 relative hover:border-gray-900 dark:hover:border-gray-600 transition-all group">
              <div className="bg-gray-100 dark:bg-gray-800 p-2 inline-block mb-4 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                <FontAwesomeIcon icon={faBookOpen} className="text-gray-600 dark:text-gray-400 text-xl" />
              </div>
              <h3 className="font-bold text-lg uppercase tracking-wide mb-2 text-gray-900 dark:text-gray-50">
                Pustaka Lengkap
              </h3>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Jelajahi ribuan judul komik dari berbagai genre. Temukan favoritmu dan baca gratis selamanya.
              </p>
              <Link
                to="/pustaka"
                className="inline-flex items-center gap-2 bg-gray-800 dark:bg-gray-700 text-white px-6 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-900 dark:hover:bg-gray-600 transition-all"
              >
                Buka Pustaka
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </div>

            {/* Info Cards */}
            <div className="grid grid-rows-2 gap-4">
              <div className="border border-gray-300 dark:border-gray-700 p-6 bg-white dark:bg-gray-900 hover:border-gray-800 dark:hover:border-gray-600 transition-all">
                <div className="bg-gray-50 dark:bg-gray-800 p-2 inline-block mb-3">
                  <span className="text-xl">⚡</span>
                </div>
                <h4 className="font-bold text-sm uppercase tracking-wide mb-2 text-gray-800 dark:text-gray-200">
                  Update Cepat
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Chapter baru setiap hari dengan kecepatan update tercepat.
                </p>
              </div>

              <div className="border border-gray-300 dark:border-gray-700 p-6 bg-white dark:bg-gray-900 hover:border-gray-800 dark:hover:border-gray-600 transition-all">
                <div className="bg-gray-50 dark:bg-gray-800 p-2 inline-block mb-3">
                  <span className="text-xl">🔓</span>
                </div>
                <h4 className="font-bold text-sm uppercase tracking-wide mb-2 text-gray-800 dark:text-gray-200">
                  100% Gratis
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Tidak ada biaya berlangganan. Semua komik dapat diakses gratis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Industrial Style */}
        <footer className="mt-10 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="border-t-2 border-gray-800 dark:border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="text-[10px] text-gray-400 dark:text-gray-600 font-bold tracking-[0.4em] uppercase">
                  © 2024 KanataToon • All Rights Reserved
                </span>
                <div className="flex items-center gap-6">
                  <a href="#" className="text-[10px] text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold uppercase tracking-wider transition-colors">
                    Privacy
                  </a>
                  <a href="#" className="text-[10px] text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold uppercase tracking-wider transition-colors">
                    Terms
                  </a>
                  <a href="#" className="text-[10px] text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold uppercase tracking-wider transition-colors">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home
