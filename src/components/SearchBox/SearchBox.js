import React, { useState } from 'react';
import './SearchBox.css';
import { fetchMovies } from "../../redux/actions"
import { connect } from "react-redux"

const SearchBox = (props) => {

    const [state, setState] = useState({
        searchLine: '',

    })

    const searchLineChangeHandler = (e) => {
        setState({ searchLine: e.target.value });
        console.log(state.searchLine)
    }
    const searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        props.dispatch(fetchMovies(state.searchLine))
    }
   
        const { searchLine } = state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                    Search movie by title:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="For example, Shawshank Redemption"
                            onChange={searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Search
                    </button>
                </form>
            </div>
        );
    }

export default connect(null)(SearchBox);