import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import HeroBanner from '../components/HeroBanner'
import SearchComic from '../components/Home/SearchComic'
import CardTerbaruComic from '../components/Home/CardTerbaruComic'
import CardTrendingComic from '../components/Home/CardTrendingComic'
import SEO from '../components/SEO'

const Home = () => {
  const [featuredComics, setFeaturedComics] = useState([])

  // Fetch featured comics for banner
  useEffect(() => {
    const fetchFeaturedComics = async () => {
      try {
        // Ambil dari trending atau terbaru untuk featured banner
        const response = await axios.get('https://www.sankavollerei.com/comic/trending')
        const rawComics = response.data.trending || []
        
        // Ambil 5 komik pertama untuk banner
        const featured = rawComics.slice(0, 5).map(comic => {
          const slug = comic.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
          
          const link = comic.link.replace('/manga/', '/').replace('/plus/', '/')
          
          return {
            title: comic.title,
            image: comic.image,
            chapter: comic.chapter,
            source: comic.timeframe || 'Trending',
            popularity: comic.trending_score || 0,
            slug: slug,
            processedLink: link,
            description: `Chapter terbaru dari ${comic.title}` // Optional description
          }
        })
        
        setFeaturedComics(featured)
      } catch (error) {
        console.error('Error fetching featured comics:', error)
      }
    }

    fetchFeaturedComics()
  }, [])

  return (
    <>
      <SEO
        title="Kanata-Toon - Baca Komik Gratis Bahasa Indonesia Terbaru"
        description="Baca komik online gratis di Kanata-Toon. Koleksi lengkap komik terbaru, trending, dan populer dalam bahasa Indonesia. Update setiap hari!"
        keywords="komik indonesia, baca komik gratis, komik online, manga indonesia, manhwa indonesia"
        url="https://juju-manhwa-2-0.vercel.app/"
      />
      
      <div className="bg-white dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 transition-colors">
        
        {/* Hero Banner - 16:9 Carousel */}
        {featuredComics.length > 0 && (
          <div className="border-b-2 border-gray-800 dark:border-gray-700">
            <HeroBanner comics={featuredComics} />
          </div>
        )}

        {/* Search Section */}
        <div className="pt-6 pb-4 px-4">
          <div className="max-w-7xl mx-auto">
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
