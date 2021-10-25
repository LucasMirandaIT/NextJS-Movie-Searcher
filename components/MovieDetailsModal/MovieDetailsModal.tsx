import { DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { getMovie, getSimilarMovies, POSTER_URL } from "../../api/movie-db";
import { Movie } from "../../interfaces/movie";

import styles from './MovieDetailsModal.module.css';

import moment from 'moment';


import useTranslation from 'next-translate/useTranslation'
import { useRouter } from "next/router";
import RelatedMovieItem from "../RelatedMovieItem/RelatedMovieItem";


interface MovieDetailsModalProps {
    movieId: number,
    translationFile?: string
} 

const MovieDetailsModal = (({ movieId, translationFile }: MovieDetailsModalProps) => {
    const { t, lang } = useTranslation(translationFile ?? 'home');

    const [movieDetails, setMovieDetails] = useState<Movie>();
    const [selectedMovie, setSelectedMovie] = useState<Movie>();
    const [similarMovies, setSimilarMovies] = useState<Movie[]>();

    const { locale } = useRouter();

    const checkFormat = () => {
        switch (locale) {
            case 'pt':
                return 'DD/MM/yyyy';
            case 'de':
                return 'DD.MM.yyyy';
            default:
                return 'MMMM do, yy';
        }
    }

    
    const fetchMovieData = (movieId: number) => {
        getMovie(movieId, locale ?? 'en').then((res) => {
            getRecommendations(movieId);
            setMovieDetails(res);
        });
    };

    const getRecommendations = (id: number) => {
        getSimilarMovies(id, locale ?? 'en').then((res) => {
            res && setSimilarMovies(res.results);
        });
    };

    useEffect(() => {
        if (movieId) {
            fetchMovieData(movieId);
        }
    }, [movieId]);

    useEffect(() => {
        if (selectedMovie) {
            fetchMovieData(selectedMovie.id);
        }
    }, [selectedMovie]);

    const renderSimilar = (similarMovies: Movie[]) => {
        return similarMovies.splice(0, 5).map((movie, key) => {
            return (<section onClick={() => handleClick(movie)}>
                <RelatedMovieItem movie={movie} />
            </section>)
        })
    };

    const handleClick = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const voteBackgroundColor = (vote?: number) => {
        if (vote) {
            if (vote > 0 && vote <= 4) {
                return 'red';

            } else if (vote > 4 && vote <= 7) {
                return '#D8AB13';

            } else if (vote > 7 && vote <= 10) {
                return 'green';
            } else {
                return 'gray';
            }
        }
    }
    return (
        <>
            <DialogTitle>{movieDetails?.title}</DialogTitle>
            <DialogContent>
                <main>
                    <div className={styles.movieSection}>
                        <img className={styles.posterImg} src={`${POSTER_URL}${movieDetails?.poster_path}`} alt="Movie poster image"/>
                        <section className={styles.movieInformation}>
                            <section className={styles.movieDetails_genres}>
                                <p className={styles.detailsKey}>{t('movieDetails.genres')}: &nbsp;</p>
                                <p>
                                    {movieDetails?.genres?.map((genre, key) => genre.name).join(', ')}
                                </p>
                            </section>
                            <section className={styles.movieDetails_releaseDate}>
                                <p className={styles.detailsKey}>{t('movieDetails.releaseDate')}: &nbsp;</p>
                                <p>{moment(movieDetails?.release_date).format(checkFormat())}</p>
                                {(moment(movieDetails?.release_date) > moment()) && (
                                    <p>{t('movieDetails.prevision')}</p>
                                )
                                }
                            </section>
                            <section className={styles.movieDetails_voteAverage}>
                                <p className={styles.detailsKey}>{t('movieDetails.note')}: &nbsp;</p>
                                <h2 className={styles.movieVoteAverage} style={{ backgroundColor: voteBackgroundColor(movieDetails?.vote_average) }}>{movieDetails?.vote_average ? movieDetails?.vote_average : 'NR'}</h2>
                            </section>
                        </section>
                    </div>
                    {movieDetails?.overview && (
                        <section className={styles.movieDetails_overview}>
                            <h3>{t('movieDetails.overview')}</h3>
                            <p>{movieDetails?.overview}</p>
                        </section>
                    )}
                    {
                        (similarMovies && similarMovies.length > 0) && (
                            <section className={styles.movieDetails_overview}>
                                <h3>{t('movieDetails.relatedMovies')}</h3>
                                <div className={styles.similarMovies}>{renderSimilar(similarMovies ?? [])}</div>
                            </section>
                        )
                    }
                </main>
            </DialogContent>
        </>
    );
});

export default MovieDetailsModal;