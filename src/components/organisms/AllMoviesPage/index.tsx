import React from "react";
import { useSelector } from "react-redux";
import { iMovieDetails } from "../../../types/movieDetails.interface";
import { iState } from "../../../types/store.interface";
import Spinner from "../../atoms/Spinner";
import MovieCard from "../../molecules/MovieCard";
import { MainMoviePage, LinkStyle } from "./styles";

const AllMoviesPage: React.FC = () => {
  const moviesList = useSelector((state: iState) => state.movies.moviesList);

  return (
    <>
      {moviesList.length === 0 ? (
        <Spinner />
      ) : (
        <MainMoviePage>
          {moviesList.map((movie: iMovieDetails, index) => (
            <LinkStyle key={index} to={`/movie/${movie.id}`}>
              <MovieCard genres={movie.genres} poster={movie.poster_path} title={movie.title} runtime={movie.runtime} />
            </LinkStyle>
          ))}
        </MainMoviePage>
      )}
    </>
  );
};

export default AllMoviesPage;
