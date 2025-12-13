import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronLeft, faChevronRight, faHome, faBookOpen, faExpand } from '@fortawesome/free-solid-svg-icons';

const ReadComic = () => {
    const navigate = useNavigate();
    const { slug, chapterSlug } = useParams();
    const location = useLocation();
    
    const { 
        chapterLink, 
        comicTitle, 
        chapterNumber,
        comicDetailState
    } = location.state || {};
    
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentChapters, setCurrentChapters] = useState([]);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [navigation, setNavigation] = useState({
        previousChapter: null,
        nextChapter: null,
    });
    const [isFullscreen, setIsFullscreen] = useState(false);
    const comicContainerRef = useRef(null);

    const saveHistory = (comicData) => {
        try {
            const history = JSON.parse(localStorage.getItem('comicHistory')) || {};
            
            history[slug] = {
                title: comicData.comicTitle,
                image: comicDetailState?.comic?.image,
                lastChapter: comicData.chapterNumber,
                lastChapterLink: comicData.chapterLink,
                lastChapterSlug: chapterSlug,
                readDate: new Date().toISOString(),
                comicDataForDetail: comicDetailState,
            };
            localStorage.setItem('comicHistory', JSON.stringify(history));
        } catch (e) {
            console.error("Error saving history to local storage", e);
        }
    };

    useEffect(() => {
        const fetchChapterPages = async () => {
            if (!chapterLink) {
                setError(new Error('No chapter link provided'));
                setLoading(false);
                return;
            }
            setLoading(true);
            setError(null);
            setPages([]);
            setNavigation({ previousChapter: null, nextChapter: null });
            window.scrollTo(0, 0); 

            try {
                const response = await axios.get(`https://www.sankavollerei.com/comic/chapter${chapterLink}`);
                
                const chapters = response.data.chapters || [];
                const images = response.data.images || [];
                const navData = response.data.navigation || { previousChapter: null, nextChapter: null };

                setPages(images);
                setCurrentChapters(chapters);
                setNavigation(navData);
                
                if (chapters.length > 0) {
                    const chapterIndex = chapters.findIndex(
                        ch => String(ch.chapter) === String(chapterNumber)
                    );

                    setCurrentChapterIndex(chapterIndex !== -1 ? chapterIndex : 0);
                } else {
                    setCurrentChapterIndex(0);
                }
                
                setLoading(false);

                saveHistory({ 
                    chapterLink, 
                    comicTitle, 
                    chapterNumber,
                });

            } catch (err) {
                setError(err);
                setLoading(false);
                setPages([
                    'https://picsum.photos/800/1200?random=1',
                    'https://picsum.photos/800/1200?random=2',
                    'https://picsum.photos/800/1200?random=3',
                    'https://picsum.photos/800/1200?random=4'
                ]);
            }
        };

        fetchChapterPages();
    }, [chapterLink, chapterNumber]);

    useEffect(() => {
        const handleScroll = () => {
            const container = isFullscreen ? comicContainerRef.current : document.documentElement;
            if (!container) return;

            const winScroll = container.scrollTop;
            const height = container.scrollHeight - container.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            setScrollProgress(scrolled);
        };

        const scrollableElement = isFullscreen ? comicContainerRef.current : window;
        if (scrollableElement) {
            scrollableElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollableElement) {
                scrollableElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [isFullscreen]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            comicContainerRef.current.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const handleBack = () => {
        navigate(`/detail-comic/${slug}`, {
            state: comicDetailState
        });
    };

    const handleNextChapter = () => {
        const nextChapterSlug = navigation.nextChapter;
        if (nextChapterSlug) {
            const newChapterNumber = nextChapterSlug.split('-').pop(); 
            
            navigate(`/read-comic/${slug}/${nextChapterSlug}`, { 
                state: { 
                    chapterLink: nextChapterSlug, 
                    comicTitle: comicTitle, 
                    chapterNumber: newChapterNumber,
                    comicDetailState: comicDetailState
                } 
            });
        }
    };

    const handlePrevChapter = () => {
        const prevChapterSlug = navigation.previousChapter;
        if (prevChapterSlug) {
            const newChapterNumber = prevChapterSlug.split('-').pop(); 

            navigate(`/read-comic/${slug}/${prevChapterSlug}`, { 
                state: { 
                    chapterLink: prevChapterSlug, 
                    comicTitle: comicTitle, 
                    chapterNumber: newChapterNumber,
                    comicDetailState: comicDetailState 
                } 
            });
        }
    };

    if (loading) {
        return (
            <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-[#1a1a1a] min-h-screen flex flex-col justify-center items-center">
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
                    <div className="relative">
                        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
                        <div className="absolute inset-0 rounded-full border-2 border-purple-500/10 dark:border-purple-400/10"></div>
                    </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium tracking-wide">Memuat Chapter...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-[#1a1a1a] min-h-screen">
                <div className="flex justify-center items-center min-h-screen p-4">
                    <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border border-gray-200/30 dark:border-gray-700/30 rounded-2xl p-8 text-center max-w-md shadow-2xl">
                        <svg className="w-14 h-14 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Terjadi Kesalahan</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{error.message}</p>
                        <button
                            onClick={handleBack}
                            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 text-white text-sm font-medium rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200"
                        >
                            Kembali ke Detail
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const hasNext = !!navigation.nextChapter;
    const hasPrev = !!navigation.previousChapter;

    return (
        <div ref={comicContainerRef} className={`relative bg-gradient-to-br from-white to-gray-50 dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-[#1a1a1a] min-h-screen ${isFullscreen ? 'overflow-y-auto' : ''}`}>
            {/* Top Navigation Bar */}
            <div className={`fixed top-0 left-0 right-0 backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 shadow-sm z-50 border-b border-gray-200/30 dark:border-gray-800/30 transition-all ${isFullscreen ? 'hidden' : 'block'}`}>
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex justify-between items-center h-14">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white active:scale-95 transition-all duration-200 p-2 -ml-2 rounded-lg"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
                            <span className="text-sm font-medium hidden sm:inline">Kembali</span>
                        </button>

                        <div className="flex items-center gap-2 flex-1 justify-center mx-4">
                            <div className="text-center max-w-xs sm:max-w-md truncate">
                                <h2 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                    {comicTitle}
                                </h2>
                                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                    Chapter {chapterNumber || 'Unknown'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleFullscreen}
                                className="flex items-center justify-center w-10 h-10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 active:scale-95 transition-all duration-200 rounded-lg"
                            >
                                <FontAwesomeIcon icon={faExpand} className="text-sm" />
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center justify-center w-10 h-10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 active:scale-95 transition-all duration-200 rounded-lg"
                            >
                                <FontAwesomeIcon icon={faHome} className="text-sm" />
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-0.5 bg-gray-100 dark:bg-gray-800/50">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-150"
                            style={{ width: `${scrollProgress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Comic Pages */}
            <div className={`pt-14 pb-28 sm:pb-32 ${isFullscreen ? 'pt-0' : ''}`}>
                <div className="max-w-3xl mx-auto px-0">
                    {pages.map((page, index) => (
                        <div key={index} className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 to-transparent dark:from-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            <img
                                src={page}
                                alt={`Halaman ${index + 1}`}
                                width="800"
                                height="1200"
                                loading={index < 2 ? "eager" : "lazy"}
                                decoding="async"
                                className="w-full h-auto object-contain block transition-opacity duration-300"
                                onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                                onError={(e) => {
                                    e.currentTarget.src = `https://picsum.photos/800/1200?random=${index}`;
                                }}
                            />
                            <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                {index + 1}/{pages.length}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div className={`fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-t border-gray-200/30 dark:border-gray-800/30 z-50 transition-all ${isFullscreen ? 'hidden' : 'block'}`}>
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex justify-between items-center py-3 gap-3">
                        <button
                            onClick={handlePrevChapter}
                            disabled={!hasPrev}
                            className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl font-medium transition-all duration-200 flex-1 justify-center ${
                                hasPrev
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:opacity-90 active:scale-95 shadow-md'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                            }`}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
                            <span className="text-sm font-medium">Sebelumnya</span>
                        </button>

                        <div className="px-4 py-2 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{chapterNumber}</p>
                        </div>

                        <button
                            onClick={handleNextChapter}
                            disabled={!hasNext}
                            className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl font-medium transition-all duration-200 flex-1 justify-center ${
                                hasNext
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:opacity-90 active:scale-95 shadow-md'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                            }`}
                        >
                            <span className="text-sm font-medium">Selanjutnya</span>
                            <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadComic;
