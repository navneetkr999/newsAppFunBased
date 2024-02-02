import React, {useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'


export default function News (props) {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [articlesLength, setArticlesLength] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        props.setProgress(20);
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        document.title = `News-365 - ${capitalizeFirstLetter(props.category)}`
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchMoreData = async () => {
        setPage(page + 1);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setArticlesLength(articlesLength + parsedData.articles.length);
        document.title = `News-365 - ${capitalizeFirstLetter(props.category)}`
    }

    return (
        <>
            <h1 className='text-center text-uppercase' style={{marginTop: "80px"}}>News 365 - Top Headlines</h1>
            {loading && <Spinner/>}
            <InfiniteScroll
            dataLength={articlesLength}
            next={fetchMoreData}
            hasMore={articlesLength !== totalResults}
            loader={<Spinner/>}
            >
                <div className="container my-3">
                    <div className="row">
                        {articles && articles.map((article) => {
                            let title = article.title ? article.title : 'This is a default title';
                            let desc = article.description ? article.description : 'This is a default description';
                            let urlToImage = article.urlToImage ? article.urlToImage : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';
                            return <div className="col-md-4" key={Math.random().toString().substr(2, 6)}>
                                <NewsItem title={title.slice(0, 45)} description={desc.slice(0, 70)} imageUrl={urlToImage} newsUrl={article.url} source = {article.source.name ? article.source.name : 'Unknown'} author={article.author ? article.author : 'Unknown'} publishedDate={article.publishedAt ? new Date(article.publishedAt).toDateString() : 'Date not available'} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 12
}
News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
}
