import React from 'react'
import DetailComic from '../components/Detail-Comic/DetailComic'
import SEO from '../components/SEO'

const PageDetail = () => {
    return (
        <>
            <SEO 
                title="Detail Komik"
                description="Baca komik favorit Anda dengan koleksi lengkap chapter"
            />
            <DetailComic />
        </>
    )
}

export default PageDetail
