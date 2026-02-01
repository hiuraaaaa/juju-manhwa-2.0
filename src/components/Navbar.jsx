import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faNewspaper, faFire, faBookOpen, faChartLine, faHistory, faInfinity } from '@fortawesome/free-solid-svg-icons'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false)
    }, [location.pathname])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMenuOpen])

    const navLinks = [
        { name: 'Home', path: '/', icon: faHome },
        { name: 'Terbaru', path: '/terbaru', icon: faNewspaper },
        { name: 'Trending', path: '/trending', icon: faFire },
        { name: 'Pustaka', path: '/pustaka', icon: faBookOpen },
        { name: 'All Comic', path: '/unlimited', icon: faInfinity },
        { name: 'Statistics', path: '/statistics', icon: faChartLine },
        { name: 'History', path: '/history', icon: faHistory },
    ].filter(link => {
        const isProduction = import.meta.env.PROD
        if (isProduction && link.path === '/statistics') {
            return false
        }
        return true
    })

    const isActive = (path) => location.pathname === path
    const isUnlimitedPage = location.pathname === '/unlimited'

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <>
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-gray-800 dark:bg-gray-900 shadow-sm border-b border-gray-700 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-8 h-8 bg-white dark:bg-gray-700 flex items-center justify-center transition-all duration-300 group-hover:bg-gray-100 dark:group-hover:bg-gray-600">
                                <svg className="w-5 h-5 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-sm font-bold text-white uppercase tracking-tighter">
                                    Kanata<span className="text-gray-400">Toon</span>
                                </h1>
                            </div>
                        </Link>

                        {/* Desktop Navigation & Theme Toggle */}
                        <div className="flex items-center gap-1">
                            <div className="hidden md:flex items-center gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`
                                            relative px-4 py-2 font-semibold text-[11px] uppercase tracking-wide transition-all duration-200
                                            ${isActive(link.path)
                                                ? 'bg-gray-900 dark:bg-gray-950 text-white'
                                                : 'text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white hover:bg-gray-700 dark:hover:bg-gray-800'
                                            }
                                        `}
                                    >
                                        <span className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={link.icon} className="text-xs" />
                                            {link.name}
                                        </span>
                                        {/* Active indicator line */}
                                        {isActive(link.path) && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
                                        )}
                                    </Link>
                                ))}
                            </div>

                            {/* Theme Toggle */}
                            {!isUnlimitedPage && (
                                <div className="ml-2 hidden md:block">
                                    <ThemeToggle />
                                </div>
                            )}

                            {/* Hamburger Button - Lumina Style */}
                            <button
                                onClick={toggleMenu}
                                className={`
                                    md:hidden w-10 h-10 flex items-center justify-center ml-2
                                    bg-white/10 hover:bg-white/15 transition-all duration-300
                                    ${isMenuOpen ? 'bg-red-500/20' : ''}
                                `}
                                aria-label="Toggle menu"
                            >
                                <div className="w-5 h-3.5 relative">
                                    <span className={`
                                        absolute left-0 h-0.5 bg-white transition-all duration-300
                                        ${isMenuOpen ? 'top-1.5 rotate-45 w-full' : 'top-0 w-full'}
                                    `}></span>
                                    <span className={`
                                        absolute left-0 top-1.5 h-0.5 bg-white transition-all duration-300
                                        ${isMenuOpen ? 'opacity-0 translate-x-[-20px] w-3/4' : 'opacity-1 translate-x-0 w-3/4'}
                                    `}></span>
                                    <span className={`
                                        absolute left-0 h-0.5 bg-white transition-all duration-300
                                        ${isMenuOpen ? 'top-1.5 -rotate-45 w-full' : 'top-3 w-full'}
                                    `}></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div 
                className={`
                    fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 md:hidden
                    ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
                `}
                onClick={toggleMenu}
            ></div>

            {/* Mobile Menu - Lumina Style */}
            <div 
                className={`
                    fixed top-16 right-0 w-80 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 
                    shadow-lg z-50 transition-all duration-300 ease-in-out overflow-y-auto md:hidden
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                <div className="p-6">
                    {/* Menu Header */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100 dark:border-gray-800">
                        <div className="w-10 h-10 bg-gray-800 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-white text-lg">☰</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight block">
                                Navigation
                            </span>
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                KanataToon
                            </span>
                        </div>
                    </div>

                    {/* Menu Links */}
                    <nav className="space-y-2">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`
                                    menu-item flex items-center gap-4 px-4 py-4 font-semibold text-sm uppercase tracking-wide 
                                    transition-all relative
                                    ${isActive(link.path)
                                        ? 'bg-gray-800 dark:bg-gray-950 text-white shadow-md'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }
                                `}
                            >
                                {/* Active indicator line */}
                                <div className={`
                                    absolute left-0 top-0 w-0.5 h-full bg-gray-800 dark:bg-gray-600 
                                    transform transition-transform duration-300
                                    ${isActive(link.path) ? 'scale-y-100' : 'scale-y-0'}
                                `}></div>

                                <div className={`
                                    w-8 h-8 flex items-center justify-center
                                    ${isActive(link.path) 
                                        ? 'bg-white/20' 
                                        : 'bg-gray-100 dark:bg-gray-800'
                                    }
                                `}>
                                    <FontAwesomeIcon 
                                        icon={link.icon} 
                                        className={`text-sm ${isActive(link.path) ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}
                                    />
                                </div>
                                <span>{link.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Theme Toggle in Mobile Menu */}
                    {!isUnlimitedPage && (
                        <div className="mt-6 pt-6 border-t-2 border-gray-100 dark:border-gray-800">
                            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                    Theme
                                </span>
                                <ThemeToggle />
                            </div>
                        </div>
                    )}

                    {/* Quick Info */}
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">ℹ️</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                Platform Info
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                            <div className="bg-white dark:bg-gray-900 p-2 border border-gray-200 dark:border-gray-700">
                                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">5K+</div>
                                <div className="text-[9px] text-gray-500 dark:text-gray-400 uppercase">Komik</div>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-2 border border-gray-200 dark:border-gray-700">
                                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">100%</div>
                                <div className="text-[9px] text-gray-500 dark:text-gray-400 uppercase">Gratis</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS */}
            <style jsx>{`
                .menu-item::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 3px;
                    background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
                    transform: scaleY(0);
                    transition: transform 0.3s ease;
                }

                .menu-item:hover::before {
                    transform: scaleY(1);
                }
            `}</style>
        </>
    )
}

export default Navbar
