import React, { useEffect, useState } from 'react'
const API_URL = process.env.REACT_APP_API_URL;
import HomeBanner from '../Components/HomeBanner';
import Subscribe from '../Components/Subscribe';
import TopMovies from '../Components/TopMovies';
import NowShowingMovies from '../Components/MovieSection/NowShowingMovies';
import ComingSoonMovies from '../Components/MovieSection/ComingSoonMovies';
const Home = ({ setWatchList, watchList }) => {
  const [filterCtg, setFilterCtg] = useState('Action');
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(`${API_URL}/api/movies/search?type=${filterCtg}`, {
      signal: signal
    })
      .then(res => res.json())
      .then(data => {
        setTopMovies(data.Search.slice(0, 8));
      })

    return () => {
      controller.abort();
    }
  }, [filterCtg])

  return (
    <>
      <HomeBanner />
      <TopMovies filterCtg={filterCtg} setFilterCtg={setFilterCtg} topMovies={topMovies} setWatchList={setWatchList} watchList={watchList} />
      <NowShowingMovies setWatchList={setWatchList} watchList={watchList} />
      <ComingSoonMovies setWatchList={setWatchList} watchList={watchList} />
      <Subscribe />
    </>
  )
}

export default Home;