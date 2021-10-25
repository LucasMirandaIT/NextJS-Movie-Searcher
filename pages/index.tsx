import type { NextPage } from 'next'
import Head from 'next/head';
import styles from '../styles/Home.module.css'

import Search from '../components/Search/Search';

import MovieIcon from '@mui/icons-material/MovieOutlined';
import { useState } from 'react';
import MoviesList from '../components/MoviesList/MoviesList';

const Home: NextPage = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const changeSearchTerm = (value: string) => {
    setSearchTerm(value);
  }

  const linkRel = "noreferrer";
  
  return (
    <>
      <Head>
        <title>Movie Searcher</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`${styles.headerContainer}  ${searchTerm ? styles.expanded : ""}`}>
        <div className={styles.icons}>
          <MovieIcon className={styles.theatersIcon} />
          <a
            href="https://www.themoviedb.org/"
            title="The Movie DB Logo"
            target="_blank"
            rel={linkRel}
          >
            <img src="/assets/images/the-movie-db-logo.svg" className={styles.movieDbLogo} alt="The Movie DB Logo" />
          </a>
        </div>
        <h1 style={{ textTransform: "capitalize" }}> Movie Searcher </h1>
        <main className={`${styles.main} ${searchTerm ? styles.expanded : ""}`}>
          <Search inputChange={changeSearchTerm} />
        </main>
      </header>
      {
       searchTerm && (
      <div id="moviesList" className={styles.moviesList}>
          <MoviesList searchTerm={searchTerm}/>
      </div>
        )
      }
    </>
  )
}

export default Home;