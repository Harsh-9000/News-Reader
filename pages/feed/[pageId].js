import { Navbar } from '@/components/navbar';
import styles from '../../styles/Feed.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const Feed = ({ pageNumber, articles }) => {
    const router = useRouter();

    const [gridView, setGridView] = useState(false);

    return (
        <div className='page-container'>

            <Navbar />

            <div className={styles.gridToggle}>
                <button className={styles.toggleButton} onClick={() => setGridView(!gridView)}>
                    {gridView ? 'List View' : 'Grid View'}
                </button>
            </div>
            <div className={gridView ? styles.gridContainer : styles.main}>
                {articles.map((article, index) => (
                    <div key={index} className={gridView ? styles.gridPost : styles.listPost}>
                        <h1 onClick={() => (window.location.href = article.url)}>
                            {article.title}
                        </h1>
                        <p>{article.description}</p>
                        {gridView && article.urlToImage && <img src={article.urlToImage} />}
                    </div>
                ))}
            </div>

            <div className={styles.paginator}>
                <div onClick={() => {
                    if (pageNumber > 1) {
                        router.push(`/feed/${pageNumber - 1}`)
                    }
                }}
                    className={pageNumber === 1 ? styles.disabled : styles.active}>
                    Previous Page
                </div>

                <div>#{pageNumber}</div>

                <div onClick={() => {
                    if (pageNumber < 6) {
                        router.push(`/feed/${pageNumber + 1}`)
                    }
                }}
                    className={pageNumber === 6 ? styles.disabled : styles.active}>
                    Next Page
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async pageContext => {
    const pageNumber = pageContext.query.pageId;

    if (!pageNumber || pageNumber < 1 || pageNumber > 6) {
        return {
            props: {
                articles: [],
                pageNumber: 1,
            }
        }
    }

    const apiResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&pageSize=6&page=${pageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
            },
        },
    );

    const apiJson = await apiResponse.json();

    const { articles } = apiJson;

    return {
        props: {
            articles,
            pageNumber: Number.parseInt(pageNumber),
        }
    }
}

export default Feed;