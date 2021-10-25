import { Tooltip } from "@mui/material";
import { POSTER_URL } from "../../api/movie-db";
import { Movie } from "../../interfaces/movie";

import styles from './RelatedMovieItem.module.css';

interface RelatedMovieInterface {
    movie: Movie
}
const RelatedMovieItem = ({movie}: RelatedMovieInterface) => {
    return (
        <>
            <section className={styles.relatedMovieContainer}>
                <Tooltip title={<h4>{movie.title}</h4>} arrow>

                <img src={`${POSTER_URL}${movie.poster_path}`} alt="Movie poster image" />
                </Tooltip>
            </section>
        </>
    );
};

export default RelatedMovieItem;