import React, { Component } from "react";
import "./MovieItem.css";
import { connect } from "react-redux";
import { addFavoriteList } from "../../redux/actions";

const MovieItem =(props)=> {
  
  const ifIdInFavorites = (imdbID) => {
    const active =props.favoriteList.find((item) => {
      return item.imdbID === imdbID;
    });
    if (active) {
      return true;
    }
  };

    const { Title, Year, Poster, imdbID } =props;
    return (
      <article className="movie-item">
        <img className="movie-item__poster" src={Poster} alt={Title} />
        <div className="movie-item__info">
          <h3 className="movie-item__title">
            {Title}&nbsp;({Year})
          </h3>
          <button
            type="button"
            className="movie-item__add-button"
            onClick={() =>props.addFavoriteList(imdbID)}
            disabled={ifIdInFavorites(imdbID) ||props.disabled}
          >
             {ifIdInFavorites(imdbID) ? "Added" : "Add to list"}
          </button>
        </div>
      </article>
    );
  }

const mapStateToProps = (state) => {
  return {
    favoriteList: state.favoriteList,
    disabled: state.isSubmit
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addFavoriteList: (imdbID) => {
      dispatch(addFavoriteList(imdbID));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);
