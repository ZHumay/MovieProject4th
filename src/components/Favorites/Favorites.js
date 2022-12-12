import React, { useState } from "react";
import "./Favorites.css";
import { connect } from "react-redux";
import { removeMovieFromFavoriteList, postList, getDisabled } from "../../redux/actions";
import { Link } from "react-router-dom";

const Favorites = (props)=> {
    
  const [ state,setState] = useState({
    isSbm: false,
    title: "",
  });
  const favoriteChangeHandler = (e) => {
    setState({ title: e.target.value });
  };
  const getImdbIDArray = () => {
    let favoritesIDArray = props.favoriteList.map((item) => {
      return item.imdbID;
    });
    return favoritesIDArray;
  };
  const saveListHandler = () => {
   setState({ isSbm: true });
    props.postList(state.title,getImdbIDArray());
    props.getDisabled(true)
  };

    const {favoriteList} = props
    const { title, isSbm } = state;
    return (
      <div className="favorites">
        <input
          value={title}
          className="favorites__name"
          placeholder="Enter list name"
          disabled={state.isSbm}
          onChange={favoriteChangeHandler}
        />
        <ul className="favorites__list">
          {props.favoriteList.map((item) => {
            return (
              <li key={item.imdbID} className="favorites__">
                {item.Title} {item.Year}
                <button className="favorites__removeBtn"
                  onClick={() =>
                    props.removeMovieFromFavoriteList(item.imdbID)
                  }
                  disabled={isSbm}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
        {!isSbm ? (
          <button
            type="button"
            className="favorites__save"
            onClick={saveListHandler}
            disabled={title=== "" || favoriteList.length === 0}
          >
            Save
          </button>
          
        ) : (
          <button className="favorites__link__btn">
            <Link
              to={`/list/${props.listID}`}
              type="button"
              className="favorites__save"
              target="_blank"
            >
           Go to Selected Movies
            </Link>
          </button>
        )}
      </div>
    );
  }

const mapStateToProps = (state) => {
  return {
    favoriteList: state.favoriteList,
    favoritesIDArray: state.favoritesIDArray,
    listID: state.listID,
    isSubmit : state.isSubmit
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeMovieFromFavoriteList: (id) => {
      dispatch(removeMovieFromFavoriteList(id));
    },
    postList: (title, favoritesIDArray) => {
      dispatch(postList(title, favoritesIDArray));
    },
    getDisabled : (bool) => {
      dispatch(getDisabled(bool));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
