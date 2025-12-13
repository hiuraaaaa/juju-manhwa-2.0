import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBookOpen, 
  faFire, 
  faRocket, 
  faStar, 
  faHeart,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import SearchComic from '../components/Home/SearchComic'
import CardTerbaruComic from '../components/Home/CardTerbaruComic'
import CardTrendingComic from '../components/Home/CardTrendingComic'
import SEO from '../components/SEO'

const Home = () => {
  const categories = [
    { name: 'Action', color: 'bg-red-500/10', text: 'text-red-600 dark:text-red-400' },
    { name: 'Romance', color: 'bg-pink-500/10', text: 'text-pink-600 dark:text-pink-400' },
    { name: 'Fantasy', color: 'bg-purple-500/10', text: 'text-purple-600 dark:text-purple-400' },
    { name: 'Comedy', color: 'bg-yellow-500/10', text: 'text-yellow-600 dark:text-yellow-400' },
    { name: 'Drama', color: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400' },
    { name: 'Horror', color: 'bg-gray-800/20', text: 'text-gray-700 dark:text-gray-300' },
  ]

  const features = [
    {
      icon: faRocket,
      title: 'Update Harian',
      desc: 'Komik baru ditambahkan setiap hari',
      color: 'text-blue-500 dark:text-blue-400'
    },
    {
      icon: faStar,
      title: 'Kualitas Terbaik',
      desc: 'Terjemahan berkualitas tinggi',
      color: 'text-yellow-500 dark:text-yellow-400'
    },
    {
      icon: faHeart,
      title: 'Favorit Pengguna',
      desc: 'Rekomendasi berdasarkan rating',
      color: 'text-pink-500 dark:text-pink-400'
    }
  ]

  return (
    <>
      <SEO
        title="NekoToon - Baca Manga & Manhwa Gratis Bahasa Indonesia"
        description="Baca manga dan manhwa online gratis di NekoToon. Koleksi lengkap komik terbaru, trending, dan populer dalam bahasa Indonesia. Update setiap hari!"
        keywords="manga indonesia, manhwa indonesia, baca komik gratis, komik online, webtoon indonesia"
        url="https://nekotoon.vercel.app/"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30 dark:from-blue-950/10 dark:to-purple-950/10" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
          
          <div className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-30"></div>
                  <div className="relative px-4 py-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                    <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      🐱 SELAMAT DATANG DI NEKO TOON 🐱
                    </span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                  Baca Manga & Manhwa
                </span>
                <br />
                <span className="text-gray-800 dark:text-gray-100">Gratis Bahasa Indonesia</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Nikmati ribuan judul manga dan manhwa populer dengan terjemahan berkualitas tinggi, 
                update harian, dan tanpa iklan mengganggu.
              </p>
            </div>

            {/* Search Section */}
            <div className="max-w-3xl mx-auto mb-12">
              <SearchComic />
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">Populer:</span>
                {['Solo Leveling', 'Lookism', 'Tower of God', 'One Piece', 'Naruto'].map((item, idx) => (
                  <Link
                    key={idx}
                    to={`/search?q=${item}`}
                    className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { label: 'Judul Komik', value: '10K+' },
                { label: 'Update Harian', value: '50+' },
                { label: 'Pengguna Aktif', value: '100K+' },
                { label: 'Rating', value: '4.8' }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-800/50 text-center"
                >
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Jelajahi Kategori
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Temukan komik favoritmu berdasarkan genre
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map((category, idx) => (
              <Link
                key={idx}
                to={`/kategori/${category.name.toLowerCase()}`}
                className={`${category.color} ${category.text} rounded-lg p-4 text-center hover:scale-[1.02] transition-all duration-200 border border-gray-200/50 dark:border-gray-800/50`}
              >
                <div className="font-semibold">{category.name}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Terbaru Section */}
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faRocket} className="text-blue-500" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                  Update Terbaru
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Komik yang baru saja dirilis atau diperbarui
              </p>
            </div>
            <Link
              to="/terbaru"
              className="group flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Lihat Semua
              <FontAwesomeIcon icon={faChevronRight} className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <CardTerbaruComic />
        </div>

        {/* Trending Section */}
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50/50 dark:bg-gray-900/50 rounded-2xl mx-4 md:mx-0">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faFire} className="text-orange-500" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                  Trending Minggu Ini
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Komik paling populer dan banyak dibaca
              </p>
            </div>
            <Link
              to="/trending"
              className="group flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium"
            >
              Lihat Semua
              <FontAwesomeIcon icon={faChevronRight} className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <CardTrendingComic />
        </div>

        {/* Features Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Kenapa Memilih NekoToon?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Platform baca manga dan manhwa terbaik dengan berbagai keunggulan
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-800/50 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 mb-4">
                  <FontAwesomeIcon icon={feature.icon} className={`text-xl ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 p-8 md:p-12">
            <div className="relative z-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Siap Mulai Membaca?
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Bergabung dengan ribuan pembaca lainnya dan nikmati pengalaman baca yang luar biasa
              </p>
              <Link
                to="/pustaka"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <FontAwesomeIcon icon={faBookOpen} />
                Jelajahi Pustaka
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <span className="text-xl font-bold text-gray-800 dark:text-gray-100">NekoToon</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  Platform baca manga & manhwa online terbaik
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/tentang" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm">
                  Tentang
                </Link>
                <Link to="/kontak" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm">
                  Kontak
                </Link>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm">
                  Privacy
                </Link>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm">
                  Terms
                </Link>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-6 text-center">
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} NekoToon. All rights reserved.
              </p>
              <p className="text-gray-400 dark:text-gray-600 text-xs mt-1">
                Made with ❤️ for manga & manhwa lovers
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home                        Lihat Semua
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

