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
      <div className="min-h-screen bg-neutral-50 text-neutral-900 transition-colors duration-300 ease-in-out dark:bg-neutral-950 dark:text-neutral-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pt-8 pb-6 md:pt-16 md:pb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-50/30 via-transparent to-neutral-100/10 dark:from-neutral-900/40 dark:via-neutral-900/20" />
          <div className="relative mx-auto max-w-6xl">
            <div className="mb-10 text-center md:mb-14">
              <h1 className="mb-3 text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-50 md:text-4xl lg:text-5xl lg:leading-tight">
                Baca Komik{' '}
                <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent dark:from-neutral-100 dark:to-neutral-300">
                  Premium
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
                Koleksi lengkap komik terbaru, trending, dan populer dengan terjemahan bahasa Indonesia berkualitas
              </p>
            </div>
            <div className="relative mx-auto max-w-2xl">
              <div className="relative rounded-2xl border border-neutral-200/50 bg-white/40 p-0.5 backdrop-blur-xl transition-all duration-300 dark:border-neutral-800/50 dark:bg-neutral-900/30">
                <SearchComic />
              </div>
            </div>
          </div>
        </section>

        {/* Terbaru Section */}
        <section className="px-4 pb-12 md:pb-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 md:mb-12">
              <div className="mb-2 flex items-center">
                <div className="h-0.5 w-6 bg-neutral-300 dark:bg-neutral-700" />
                <span className="ml-2 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Update Terkini
                </span>
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-50 md:text-3xl">
                Terbaru
              </h2>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                Komik terbaru yang baru saja dirilis
              </p>
            </div>
            <CardTerbaruComic />
          </div>
        </section>

        {/* Trending Section */}
        <section className="px-4 pb-16 md:pb-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 md:mb-12">
              <div className="mb-2 flex items-center">
                <div className="h-0.5 w-6 bg-neutral-300 dark:bg-neutral-700" />
                <span className="ml-2 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Populer Minggu Ini
                </span>
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-50 md:text-3xl">
                Trending
              </h2>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                Yang paling banyak dibaca oleh komunitas
              </p>
            </div>
            <CardTrendingComic />
          </div>
        </section>

        {/* Pustaka CTA Section */}
        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-neutral-100/50 to-neutral-200/30 dark:from-neutral-900/30 dark:to-neutral-800/20" />
              <div className="relative rounded-2xl border border-neutral-200/60 bg-white/50 p-8 backdrop-blur-lg transition-all duration-300 hover:border-neutral-300/80 dark:border-neutral-800/60 dark:bg-neutral-900/40 dark:hover:border-neutral-700/80 md:p-12">
                <div className="text-center">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-neutral-200/50 bg-white/70 shadow-sm dark:border-neutral-800/50 dark:bg-neutral-800/50">
                    <FontAwesomeIcon
                      icon={faBookOpen}
                      className="text-xl text-neutral-700 dark:text-neutral-300"
                    />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-neutral-800 dark:text-neutral-50 md:text-3xl">
                    Jelajahi Pustaka
                  </h3>
                  <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                    Akses ribuan judul komik lengkap dari berbagai genre dalam koleksi terkurasi kami
                  </p>
                  <Link
                    to="/pustaka"
                    className="group inline-flex min-h-[44px] items-center justify-center rounded-full bg-neutral-800 px-8 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-neutral-700 active:scale-95 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                  >
                    <span className="mr-2">Lihat Semua Komik</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
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
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 pb-12 pt-8">
          <div className="mx-auto max-w-6xl">
            <div className="border-t border-neutral-200 pt-8 dark:border-neutral-800">
              <div className="flex flex-col items-center justify-between md:flex-row">
                <div className="mb-4 text-center md:mb-0 md:text-left">
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    KanataToon
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    Platform komik digital berkualitas
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">
                    &copy; {new Date().getFullYear()} KanataToon. All rights reserved.
                  </p>
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
