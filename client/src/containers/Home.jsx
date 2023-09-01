import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAllGames,
  getMyGames,
  getAllGenres,
} from "../store/actions/gameActions";
import AllGames from "../components/AllGames";
import Search from "../components/Search";
import "../assets/containers/Home.scss";
import Halo from "../assets/Halo.mp4"; // Ruta al video de fondo

const Home = ({
  games,
  getAllGames,
  myGames,
  getMyGames,
  genres,
  getAllGenres,
  favorites,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getAllGames();
    getMyGames();
    getAllGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  if (count <= 1) {
    setTimeout(() => {
      setCount(count + 1);
      console.log(count);
    }, 1000);
  }

  return (
    <div className="home">
      <video autoPlay loop muted className="background-video">
        <source src={Halo} type="video/mp4" />
        Tu navegador no admite el elemento de video.
      </video>

      <Search genres={genres} />

      {games !== undefined && (
        <AllGames
          title="VideoGames"
          games={games}
          state={"allGames"}
          genres={genres}
          callAgain={getAllGames}
        />
      )}

      {favorites.length > 0 ? (
        <AllGames
          title="VideoGamesFavoritos"
          games={favorites}
          state="favorites"
          genres={genres}
        />
      ) : (
        <></>
      )}

      {myGames !== undefined && (
        <AllGames
          title="Tus VideoGames creados"
          games={myGames}
          state={"myGames"}
          genres={genres}
          callAgain={getMyGames}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  games: state.allGames,
  myGames: state.myGames,
  genres: state.allGenres,
  favorites: state.favorites,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGames: (game) => {
      dispatch(getAllGames(game));
    },
    getMyGames: (game) => {
      dispatch(getMyGames(game));
    },
    getAllGenres: (genre) => {
      dispatch(getAllGenres(genre));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
