import { useEffect, useState } from 'react';
import styles from './MoviesList.module.css';

import { getMovies } from "../../api/movie-db";
import { Grid } from '@mui/material';
import MovieItem from '../MovieItem/MovieItem';
import { useRouter } from 'next/router';


const MoviesList = (({ searchTerm }) => {
    const [movies, setMovies] = useState([]);

    const { locale } = useRouter();

    useEffect(() => {
        if (searchTerm) {
            getMovies(searchTerm, locale ?? 'en').then((movies) => {
                setMovies(movies.results);
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [searchTerm, locale]);


    return (
        <Grid container spacing={3} className={styles.moviesGrid}>
            {movies.map((movie: any) => (
                <Grid item xs={12} md={6} key={movie.id}>
                    <MovieItem movie={movie} />
                </Grid>
            ))}
        </Grid>
    )
})
export default MoviesList
