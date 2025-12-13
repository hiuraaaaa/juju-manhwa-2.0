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
      {/* Root Container with Premium Palette (Near-black & Off-white) */}
      <div className="min-h-screen bg-neutral-50 text-neutral-900 transition-colors duration-300 ease-in-out dark:bg-neutral-950 dark:text-neutral-50">
        {/* Content Wrapper */}
        <div className="relative">
          {/* Hero Section with Search (Glassmorphism Accent) */}
          <section className="relative overflow-hidden px-4 pt-10 pb-6 md:pt-16 md:pb-8">
            {/* Subtle background gradient for depth ala Vercel */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/70 to-transparent dark:from-neutral-950/70" />
            <div className="relative mx-auto max-w-6xl">
              <div className="mb-10 text-center md:mb-14">
                <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-5xl lg:text-6xl lg:leading-tight">
                  Baca Komik{' '}
                  {/* Subtle Gradient Heading for Focus */}
                  <span className="bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent dark:from-sky-500 dark:to-sky-300">
                    Online
                  </span>
                </h1>
                <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
                  Koleksi lengkap komik terbaru, trending, dan populer dengan terjemahan bahasa Indonesia berkualitas
                </p>
              </div>
              <div className="relative mx-auto max-w-2xl">
                {/* Search Comic Wrapper - Premium Glassmorphism */}
                <div className="relative rounded-2xl border border-neutral-200/50 bg-white/40 p-2 shadow-lg backdrop-blur-xl transition-all duration-300 dark:border-neutral-800/50 dark:bg-neutral-900/30 dark:shadow-2xl">
                  <SearchComic />
                </div>
              </div>
            </div>
          </section>

          {/* Terbaru Section - Tightened Spacing, Clear Hierarchy */}
          <section className="px-4 pb-12 md:pb-16">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 md:mb-10">
                <div className="mb-1 flex items-center">
                  <div className="h-0.5 w-6 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  <span className="ml-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Update Terkini
                  </span>
                </div>
                {/* H2 Consistent Sizing */}
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-50 md:text-3xl">
                  Komik Terbaru
                </h2>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  Rilisan terkini yang baru saja kami tambahkan
                </p>
              </div>
              <CardTerbaruComic />
            </div>
          </section>

          {/* Trending Section - Tightened Spacing, Clear Hierarchy */}
          <section className="px-4 pb-16 md:pb-20">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 md:mb-10">
                <div className="mb-1 flex items-center">
                  <div className="h-0.5 w-6 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  <span className="ml-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Populer Minggu Ini
                  </span>
                </div>
                {/* H2 Consistent Sizing */}
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-50 md:text-3xl">
                  Trending
                </h2>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  Komik yang paling banyak dibaca oleh komunitas
                </p>
              </div>
              <CardTrendingComic />
            </div>
          </section>

          {/* Pustaka CTA Section - Premium Glassmorphism Card */}
          <section className="px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl">
              <Link
                to="/pustaka"
                className="group block transition-transform duration-200 active:scale-[0.99] hover:scale-[1.005]"
              >
                {/* Premium Glassmorphism Border & Backdrop-blur-xl */}
                <div className="relative rounded-3xl border border-neutral-200/50 bg-white/50 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 dark:border-neutral-800/50 dark:bg-neutral-900/30 dark:shadow-2xl md:p-12">
                  <div className="text-center">
                    {/* Icon - Touched up design */}
                    <div className="mb-6 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-neutral-200/70 bg-white/70 shadow-inner dark:border-neutral-800/70 dark:bg-neutral-800/60 h-16 w-16 md:h-20 md:w-20">
                      <FontAwesomeIcon
                        icon={faBookOpen}
                        className="text-2xl text-neutral-700 dark:text-neutral-300"
                      />
                    </div>
                    {/* H3 Consistent Sizing */}
                    <h3 className="mb-3 text-2xl font-bold text-neutral-800 dark:text-neutral-50 md:text-3xl">
                      Jelajahi Pustaka
                    </h3>
                    <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                      Akses ribuan judul komik lengkap dari berbagai genre dalam koleksi terkurasi kami
                    </p>
                    {/* CTA Button with Micro-interaction and Touch-friendly size */}
                    <div className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-all duration-200 group-hover:bg-sky-600 dark:bg-neutral-800 dark:group-hover:bg-sky-500">
                      <span className="mr-2">Lihat Semua Komik</span>
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

          {/* Footer - Cleaned up and minimalist */}
          <footer className="px-4 pb-8 pt-12 md:pb-12 md:pt-16">
            <div className="mx-auto max-w-6xl">
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
