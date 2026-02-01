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
                saveHistory({ chapterLink, comicTitle, chapterNumber });

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
        navigate(`/detail-comic/${slug}`, { state: comicDetailState });
    };

    const handleNextChapter = () => {
        const nextChapterSlug = navigation.nextChapter;
        if (nextChapterSlug) {
            const newChapterNumber = nextChapterSlug.split('-').pop(); 
            navigate(`/read-comic/${slug}/${nextChapterSlug}`, { 
                state: { chapterLink: nextChapterSlug, comicTitle: comicTitle, chapterNumber: newChapterNumber, comicDetailState: comicDetailState } 
            });
        }
    };

    const handlePrevChapter = () => {
        const prevChapterSlug = navigation.previousChapter;
        if (prevChapterSlug) {
            const newChapterNumber = prevChapterSlug.split('-').pop(); 
            navigate(`/read-comic/${slug}/${prevChapterSlug}`, { 
                state: { chapterLink: prevChapterSlug, comicTitle: comicTitle, chapterNumber: newChapterNumber, comicDetailState: comicDetailState } 
            });
        }
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-950 min-h-screen flex flex-col justify-center items-center">
                <div className="w-16 h-16 border-4 border-gray-300 dark:border-gray-700 border-t-gray-800 dark:border-t-gray-400 animate-spin mb-4"></div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Memuat Chapter...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-gray-950 min-h-screen flex items-center justify-center p-4">
                <div className="border-2 border-gray-800 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 text-center max-w-md">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800 dark:text-gray-200 mb-2">Terjadi Kesalahan</h2>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-6">{error.message}</p>
                    <button
                        onClick={handleBack}
                        className="bg-gray-800 dark:bg-gray-700 text-white px-6 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-900 dark:hover:bg-gray-600 transition-all"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        );
    }

    const hasNext = !!navigation.nextChapter;
    const hasPrev = !!navigation.previousChapter;

    return (
        <div ref={comicContainerRef} className={`bg-white dark:bg-gray-950 min-h-screen ${isFullscreen ? 'overflow-y-auto' : ''}`}>
            {/* Top Navigation Bar - Industrial Style */}
            <div className={`fixed top-0 left-0 right-0 bg-gray-800 dark:bg-gray-900 shadow-sm z-50 border-b-2 border-gray-900 dark:border-gray-800 ${isFullscreen ? 'hidden' : 'block'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Back Button */}
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-bold text-[11px] uppercase tracking-wider"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <span className="hidden sm:inline">Back</span>
                        </button>

                        {/* Title */}
                        <div className="flex items-center gap-2 flex-1 justify-center mx-4">
                            <h2 className="text-xs md:text-sm font-bold text-center truncate text-white uppercase tracking-tight">
                                {comicTitle} - <span className="text-gray-400">Ch.{chapterNumber || '?'}</span>
                            </h2>
                        </div>

                        {/* Right Buttons */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleFullscreen}
                                className="text-gray-300 hover:text-white transition-colors"
                                title="Fullscreen"
                            >
                                <FontAwesomeIcon icon={faExpand} />
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="text-gray-300 hover:text-white transition-colors"
                                title="Home"
                            >
                                <FontAwesomeIcon icon={faHome} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-0.5 bg-gray-900 dark:bg-gray-950">
                    <div
                        className="h-full bg-white transition-all duration-150"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div>
            </div>

            {/* Comic Pages */}
            <div className={`${isFullscreen ? 'pt-0' : 'pt-[65px] pb-24'}`}>
                <div className="max-w-4xl mx-auto bg-black">
                    {pages.map((page, index) => (
                        <div key={index} className="relative">
                            <img
                                src={page}
                                alt={`Halaman ${index + 1}`}
                                width="800"
                                height="1200"
                                loading={index < 2 ? "eager" : "lazy"}
                                decoding="async"
                                className="w-full h-auto object-contain block"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Navigation Bar - Industrial Style */}
            <div className={`fixed bottom-0 left-0 right-0 bg-gray-800 dark:bg-gray-900 shadow-sm z-50 border-t-2 border-gray-900 dark:border-gray-800 ${isFullscreen ? 'hidden' : 'block'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4 gap-4">
                        {/* Previous Chapter Button */}
                        <button
                            onClick={handlePrevChapter}
                            disabled={!hasPrev}
                            className={`flex items-center gap-2 px-6 py-3 font-bold text-[11px] uppercase tracking-widest transition-all ${
                                hasPrev
                                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <span className="hidden sm:inline">Previous</span>
                        </button>

                        {/* Chapter Info */}
                        <div className="text-center">
                            <p className="text-sm font-bold text-white uppercase tracking-wider">
                                Chapter <span className="text-gray-400">{chapterNumber}</span>
                            </p>
                        </div>

                        {/* Next Chapter Button */}
                        <button
                            onClick={handleNextChapter}
                            disabled={!hasNext}
                            className={`flex items-center gap-2 px-6 py-3 font-bold text-[11px] uppercase tracking-widest transition-all ${
                                hasNext
                                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            <span className="hidden sm:inline">Next</span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadComic;
