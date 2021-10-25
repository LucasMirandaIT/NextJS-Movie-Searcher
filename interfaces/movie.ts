import {Collection} from './collection';

export interface IdName {
    id: number,
    name: string
};

export interface ProductionCompany {
    id: number,
    logo_path?: string,
    name: string,
    origin_country?: string
}

export interface ProductionCountry {
    iso_3166_1: string,
    name: string
}

export interface SpokenLanguage {
    english_name: string,
    iso_639_1: string,
    name: string
}

export interface Movie {
        adult: boolean,
        backdrop_path?: string,
        belongs_to_collection?: Collection,
        budget: number,
        genres?: Array<IdName>,
        homepage?: string,
        id: number,
        imdb_id?: string,
        original_language: string,
        original_title: string,
        overview: string,
        popularity: number,
        poster_path: string,
        production_companies: Array<ProductionCompany>,
        production_countries: Array<ProductionCountry>,
        release_date: string,
        revenue: number,
        runtime: number,
        spoken_languages: Array<SpokenLanguage>,
        status: string,
        tagline: string,
        title: string,
        video: boolean,
        vote_average: number,
        vote_count: number
}