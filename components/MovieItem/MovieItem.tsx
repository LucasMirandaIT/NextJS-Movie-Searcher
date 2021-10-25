import { forwardRef, useEffect, useState } from 'react';
import styles from './MovieItem.module.css';

import Link from 'next/link';

import { POSTER_URL } from '../../api/movie-db';

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import MovieDetailsModal from '../MovieDetailsModal/MovieDetailsModal';
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';

import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router';
import { Movie } from '../../interfaces/movie';

// import useTranslation from 'next-translate/useTranslation'
// const {t, lang} = useTranslation('home');

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children?: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface MovieItemInterface {
    movie: Movie;
    translationFile: string;
}

const MovieItem = (({ movie, translationFile }: MovieItemInterface) => {

    const [open, setOpen] = useState(false);
    const { t, lang } = useTranslation(translationFile ?? 'home');

    const { locale } = useRouter();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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

    return (
        <>
            {/* <Link href={{pathname: 'movie-details', query: {movieId: movie.id}}}> */}
            <Tooltip title={<h3>{t('movieItem.seeMore')}</h3>} arrow className={styles.movieTooltip}>
                <section className={styles.movieInfo} onClick={handleClickOpen}>
                    <img className={styles.posterImg} src={`${POSTER_URL}${movie.poster_path}`} />
                    <div className={styles.movieDetailedInfo}>
                        <p className={styles.movieTitle}>{movie.title}</p>
                        <p className={styles.movieReleaseDate}>{moment(movie?.release_date).format(checkFormat())}</p>
                        <span>{movie.overview.substring(0, 200) + '...'}</span>
                        {/* <h2>{movie.vote_average ? movie.vote_average + ' / 10' : 'NR'}</h2> */}
                    </div>
                </section>
            </Tooltip>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
                maxWidth="md"
                PaperProps={{style: {backgroundColor: '#081c24', color: 'white'}}}
                aria-describedby="alert-dialog-slide-description"
            >
                <MovieDetailsModal movieId={movie.id} open={open} translationFile={translationFile} handleClose={handleClose} />
            </Dialog>
            {/* </Link> */}
        </>
    )
})
export default MovieItem
