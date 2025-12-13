import React, { useState, useEffect, useRef } from 'react' // DITAMBAHKAN: Hooks untuk kontrol carousel
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import SearchComic from '../components/Home/SearchComic'
import CardTerbaruComic from '../components/Home/CardTerbaruComic'
import CardTrendingComic from '../components/Home/CardTrendingComic'
import SEO from '../components/SEO'

const Home = () => {
  // Data simulasi untuk Banner Carousel (di dunia nyata, ini dari API call)
  const banners = [
    { id: 1, title: "Solo Leveling", chapter: "Chapter 201 | Manhwa", color: "from-red-600 to-pink-500", imagePlaceholder: "bg-red-900/50" },
    { id: 2, title: "One Piece", chapter: "Chapter 1100 | Manga", color: "from-blue-600 to-cyan-500", imagePlaceholder: "bg-blue-900/50" },
    { id: 3, title: "Jujutsu Kaisen", chapter: "Chapter 250 | Manga", color: "from-yellow-600 to-orange-500", imagePlaceholder: "bg-yellow-900/50" },
    { id: 4, title: "Omniscient Reader", chapter: "Chapter 155 | Manhwa", color: "from-purple-600 to-indigo-500", imagePlaceholder: "bg-purple-900/50" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const intervalTime = 5000; // Auto-scroll setiap 5 detik

  // Logic Auto-scrolling
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setActiveIndex((current) => {
        const nextIndex = (current + 1) % banners.length;
        
        // Scroll secara fisik menggunakan DOM/Ref
        if (carouselRef.current) {
          const containerWidth = carouselRef.current.offsetWidth;
          
          carouselRef.current.scrollTo({
            left: nextIndex * containerWidth,
            behavior: 'smooth',
          });
        }
        
        return nextIndex;
      });
    }, intervalTime);

    return () => clearInterval(scrollInterval);
  }, [banners.length]);

  // Handle manual scroll untuk update activeIndex
  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const containerWidth = carouselRef.current.offsetWidth; 
      
      const index = Math.round(scrollLeft / containerWidth);
      setActiveIndex(index);
    }
  };

  return (
    <>
      <SEO
        title="Kanata-Toon - Baca Komik Gratis Bahasa Indonesia Terbaru"
        description="Baca komik online gratis di Kanata-Toon. Koleksi lengkap komik terbaru, trending, dan populer dalam bahasa Indonesia. Update setiap hari!"
        keywords="komik indonesia, baca komik gratis, komik online, manga indonesia, manhwa indonesia"
        url="https://juju-manhwa-2-0.vercel.app/"
      />
      {/* Root Container with Premium Palette (Near-black & Off-white) */}
      <div className="min-h-screen bg-neutral-50 text-neutral-900 transition-colors duration-300 ease-in-out dark:bg-neutral-950 dark:text-neutral-50">
        {/* Content Wrapper */}
        <div className="relative">
          {/* Top Branding Section (Minimal & Elegant - Stays sticky) */}
          <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-neutral-50/70 dark:bg-neutral-950/70 border-b border-neutral-100/50 dark:border-neutral-900/50">
            <div className="mx-auto max-w-7xl px-4 py-3 md:py-4">
              <div className="flex items-center justify-between">
                {/* Branding Left - KanataToon */}
                <Link to="/" className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
                  Kanata<span className="text-sky-600 dark:text-sky-400">Toon</span>
                </Link>
                
                {/* Right utility items (Icon + Tagline Pindah di Samping Kanan) */}
                <div className="flex items-center space-x-4">
                   {/* Teks Title/Tagline di Header (Pindah dari Hero/SEO) */}
                  <span className="hidden md:inline text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Baca Komik Gratis Bahasa Indonesia Terbaru
                  </span>
                  <div className="h-6 w-6 rounded-full bg-neutral-200 dark:bg-neutral-800"></div> {/* Example Icon/Utility Placeholder */}
                </div>
              </div>
            </div>
          </header>

          {/* Hero Section (Search & Dynamic Banner) */}
          <section className="relative px-4 pt-4 pb-8 md:pt-6 md:pb-12">
            <div className="mx-auto max-w-7xl">
              
              {/* Search Comic Repositioned: Glassmorphism */}
              <div className="relative z-20 -mt-2 mb-4 mx-auto max-w-2xl">
                <div className="relative rounded-2xl border border-neutral-200/50 bg-white/40 p-2 shadow-xl backdrop-blur-xl transition-all duration-300 dark:border-neutral-800/50 dark:bg-neutral-900/30 dark:shadow-2xl">
                  <SearchComic />
                </div>
              </div>
              
              {/* Dynamic Banner Carousel (Auto-scrolling) */}
              <div className="relative z-10 w-full overflow-hidden rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800">
                
                {/* Inner Carousel Container (Menggunakan ref dan onScroll untuk kontrol JS) */}
                <div 
                    ref={carouselRef}
                    onScroll={handleScroll}
                    className="flex h-[180px] md:h-[300px] overflow-x-scroll snap-x snap-mandatory scroll-smooth"
                    style={{ scrollbarWidth: 'none' }} // Hide scrollbar in Firefox
                >
                    {/* Hiding scrollbar for Webkit browsers (Chrome, Safari) */}
                    <style>{`
                      .flex::-webkit-scrollbar {
                        display: none;
                      }
                    `}</style>
                    
                    {banners.map((banner, index) => (
                      <Link 
                        to="/" 
                        key={banner.id} 
                        // Wajib: width: 100% agar snap-x berfungsi penuh pada mobile
                        className="flex-shrink-0 w-full snap-start group hover:opacity-95 transition-opacity duration-300"
                        style={{ minWidth: '100%' }} // Memastikan setiap item mengambil 100% lebar container
                      >
                        <div 
                          className={`relative h-full w-full bg-gradient-to-br ${banner.color} flex items-center justify-center transition-all duration-300`}
                        >
                          
                          {/* Visual Placeholder (Simulating Image/Content) */}
                          <div className={`absolute inset-0 ${banner.imagePlaceholder} opacity-30 dark:opacity-20`} />
                          <h1 className="text-xl md:text-3xl font-bold text-white/90 z-10 transform group-hover:scale-105 transition-transform duration-300">
                            {banner.title}
                          </h1>
                          
                          {/* Overlay Text */}
                          <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white/90 bg-gradient-to-t from-black/80 to-transparent w-full">
                            <h2 className="text-lg md:text-xl font-semibold">{banner.title}</h2>
                            <p className="text-xs md:text-sm text-white/80">{banner.chapter} | Update Terbaru</p>
                          </div>
                          
                        </div>
                      </Link>
                    ))}

                </div>
                
                {/* Pagination Dots (Aktif sesuai activeIndex) */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 p-1">
                    {banners.map((_, index) => (
                      <div 
                        key={index}
                        className={`w-2 h-2 rounded-full shadow-sm transition-all duration-300 ${
                          index === activeIndex 
                            ? 'bg-white/90 w-4' 
                            : 'bg-white/40'
                        } cursor-pointer`}
                        onClick={() => {
                           // Navigasi manual saat dot diklik
                           if (carouselRef.current) {
                              const containerWidth = carouselRef.current.offsetWidth;
                              carouselRef.current.scrollTo({
                                left: index * containerWidth,
                                behavior: 'smooth',
                              });
                              setActiveIndex(index);
                           }
                        }}
                      />
                    ))}
                </div>
              </div>

            </div>
          </section>

          {/* Core Content Grid Starts Here (Tidak ada perubahan di sini) */}
          <div className="mx-auto max-w-7xl px-4 pb-16 md:pb-24">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              
              {/* Column 1 (Primary: Terbaru) */}
              <div className="lg:col-span-8">
                <section className="pb-12 md:pb-16">
                  <div className="mb-8 md:mb-10">
                    <div className="mb-1 flex items-center">
                      <div className="h-0.5 w-6 rounded-full bg-sky-300 dark:bg-sky-700" />
                      <span className="ml-2 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                        Top Priority
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-50 md:text-4xl">
                      Rilisan Terbaru
                    </h2>
                    <p className="mt-1 text-base text-neutral-500 dark:text-neutral-400">
                      Komik yang baru saja di-update dalam 24 jam terakhir.
                    </p>
                  </div>
                  <CardTerbaruComic />
                </section>
              </div>

              {/* Column 2 (Secondary: Trending - Sidebar on desktop) */}
              <div className="lg:col-span-4">
                <section className="pt-8 pb-12 md:pt-0 md:pb-16 lg:sticky lg:top-24 lg:pt-0">
                  <div className="mb-8 md:mb-10">
                    <div className="mb-1 flex items-center">
                      <div className="h-0.5 w-6 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                      <span className="ml-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        Komunitas Membaca
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-50 md:text-3xl">
                      Trending
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      Paling populer minggu ini.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-neutral-100 dark:border-neutral-900 bg-white dark:bg-neutral-900 shadow-sm">
                    <CardTrendingComic />
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Pustaka CTA Section (Full-width Visual Break) */}
          <section className="px-4 py-16 md:py-24 bg-neutral-100 dark:bg-neutral-900 border-t border-b border-neutral-200 dark:border-neutral-800">
            <div className="mx-auto max-w-4xl">
              <Link
                to="/pustaka"
                className="group block transition-transform duration-200 active:scale-[0.99] hover:scale-[1.005]"
              >
                <div className="relative rounded-3xl border border-neutral-300/60 bg-white/70 p-8 shadow-2xl backdrop-blur-lg transition-all duration-300 dark:border-neutral-700/60 dark:bg-neutral-950/40 md:p-12">
                  <div className="text-center">
                    <div className="mb-6 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-neutral-300/70 bg-white/90 shadow-lg dark:border-neutral-700/70 dark:bg-neutral-800/70 h-16 w-16 md:h-20 md:w-20">
                      <FontAwesomeIcon
                        icon={faBookOpen}
                        className="text-2xl text-neutral-700 dark:text-neutral-300"
                      />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-neutral-800 dark:text-neutral-50 md:text-3xl">
                      Akses Seluruh Pustaka
                    </h3>
                    <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                      Jelajahi ribuan judul komik lengkap, dari manga klasik hingga manhwa terbaru.
                    </p>
                    <div className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-medium text-white transition-all duration-200 group-hover:bg-sky-700 active:scale-95 dark:bg-sky-500 dark:group-hover:bg-sky-600">
                      <span className="mr-2">Lihat Semua Koleksi</span>
                      <svg
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Footer - Minimalist */}
          <footer className="px-4 pb-8 pt-12 md:pb-12 md:pt-16">
            <div className="mx-auto max-w-7xl">
              <div className="border-t border-neutral-200/70 pt-8 dark:border-neutral-800/70">
                <div className="flex flex-col items-center justify-between md:flex-row">
                  <div className="mb-4 text-center md:mb-0 md:text-left">
                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      KanataToon
                    </p>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      Platform komik digital premium
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-neutral-400 dark:text-neutral-600">
                      &copy; {new Date().getFullYear()} KanataToon. All rights reserved.
                    </p>
                  </div>
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
                    <CardTrendingComic />
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Pustaka CTA Section (Full-width Visual Break) */}
          <section className="px-4 py-16 md:py-24 bg-neutral-100 dark:bg-neutral-900 border-t border-b border-neutral-200 dark:border-neutral-800">
            <div className="mx-auto max-w-4xl">
              <Link
                to="/pustaka"
                className="group block transition-transform duration-200 active:scale-[0.99] hover:scale-[1.005]"
              >
                <div className="relative rounded-3xl border border-neutral-300/60 bg-white/70 p-8 shadow-2xl backdrop-blur-lg transition-all duration-300 dark:border-neutral-700/60 dark:bg-neutral-950/40 md:p-12">
                  <div className="text-center">
                    <div className="mb-6 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-neutral-300/70 bg-white/90 shadow-lg dark:border-neutral-700/70 dark:bg-neutral-800/70 h-16 w-16 md:h-20 md:w-20">
                      <FontAwesomeIcon
                        icon={faBookOpen}
                        className="text-2xl text-neutral-700 dark:text-neutral-300"
                      />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-neutral-800 dark:text-neutral-50 md:text-3xl">
                      Akses Seluruh Pustaka
                    </h3>
                    <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                      Jelajahi ribuan judul komik lengkap, dari manga klasik hingga manhwa terbaru.
                    </p>
                    <div className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-medium text-white transition-all duration-200 group-hover:bg-sky-700 active:scale-95 dark:bg-sky-500 dark:group-hover:bg-sky-600">
                      <span className="mr-2">Lihat Semua Koleksi</span>
                      <svg
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Footer - Minimalist */}
          <footer className="px-4 pb-8 pt-12 md:pb-12 md:pt-16">
            <div className="mx-auto max-w-7xl">
              <div className="border-t border-neutral-200/70 pt-8 dark:border-neutral-800/70">
                <div className="flex flex-col items-center justify-between md:flex-row">
                  <div className="mb-4 text-center md:mb-0 md:text-left">
                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      KanataToon
                    </p>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      Platform komik digital premium
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-neutral-400 dark:text-neutral-600">
                      &copy; {new Date().getFullYear()} KanataToon. All rights reserved.
                    </p>
                  </div>
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
