import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faNewspaper, faFire, faBookOpen, faChartLine, faHistory, faInfinity } from '@fortawesome/free-solid-svg-icons'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()

    // Detect scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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

    return (
        <>
            <nav 
                className={`
                    sticky top-0 z-50 transition-all duration-300
                    ${isScrolled 
                        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg' 
                        : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md'
                    }
                    border-b border-gray-200/50 dark:border-gray-800/50
                `}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                                {/* Icon container */}
                                <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-2.5 rounded-xl transform group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-300">
                                    KanataToon
                                </h1>
                            </div>
                        </Link>

                        {/* Desktop Navigation & Theme Toggle */}
                        <div className="flex items-center gap-2">
                            <div className="hidden md:flex items-center gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`
                                            relative px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 group
                                            ${isActive(link.path)
                                                ? 'text-white shadow-lg'
                                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                                            }
                                        `}
                                    >
                                        {/* Active background gradient */}
                                        {isActive(link.path) && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl animate-gradient"></div>
                                        )}
                                        
                                        {/* Hover gradient (only for inactive links) */}
                                        {!isActive(link.path) && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-pink-600/5 rounded-xl transition-all duration-300"></div>
                                        )}
                                        
                                        <span className="relative flex items-center gap-2">
                                            <FontAwesomeIcon 
                                                icon={link.icon} 
                                                className={`text-sm ${isActive(link.path) ? 'animate-pulse-slow' : ''}`}
                                            />
                                            {link.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>

                            {/* Theme Toggle */}
                            {!isUnlimitedPage && (
                                <div className="ml-2">
                                    <ThemeToggle />
                                </div>
                            )}

                            {/* Enhanced Mobile menu button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ml-2"
                                aria-label="Toggle menu"
                            >
                                <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                                    <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                                    <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                                    <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu with enhanced animation */}
                <div 
                    className={`
                        md:hidden overflow-hidden transition-all duration-300 ease-in-out
                        ${isMenuOpen ? 'max-h-[calc(100vh-4rem)] opacity-100' : 'max-h-0 opacity-0'}
                    `}
                >
                    <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                        <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`
                                        block px-4 py-3.5 rounded-xl font-semibold transition-all duration-300
                                        ${isActive(link.path)
                                            ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg transform scale-[1.02]'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95'
                                        }
                                    `}
                                    style={{
                                        animationDelay: `${index * 50}ms`
                                    }}
                                >
                                    <span className="flex items-center gap-3">
                                        <div className={`
                                            w-10 h-10 flex items-center justify-center rounded-lg
                                            ${isActive(link.path) 
                                                ? 'bg-white/20' 
                                                : 'bg-gray-100 dark:bg-gray-800'
                                            }
                                        `}>
                                            <FontAwesomeIcon 
                                                icon={link.icon} 
                                                className={`text-lg ${isActive(link.path) ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}
                                            />
                                        </div>
                                        <span className="text-base">{link.name}</span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ top: '4rem' }}
                ></div>
            )}

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }

                .animate-pulse-slow {
                    animation: pulse-slow 2s ease-in-out infinite;
                }
            `}</style>
        </>
    )
}

export default Navbar
