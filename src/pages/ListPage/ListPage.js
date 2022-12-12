import React, { Component } from "react";
import "./ListPage.css";
import { connect } from "react-redux";
import { getList, getMovieInfoByImdbID } from "../../redux/actions";

class ListPage extends Component {
  state = {
    isClicked: false,
  };
  
  componentDidMount() {
    const id = this.props.match.params;
    this.props.getList(id.id);
  }
  render() {
    return (
      <div className="list-page">
        <h1 className="list-page__title">My lists</h1>
        <ul>
          {this.props.movieDetails.map((item) => {
            return (
           
              
                  <div className="info">
                
                   
                      <a
                        href={`https://www.imdb.com/title/${item.imdbID}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                     <h1>{item.Title} </h1>
                      </a>
                    
                   
                    
                   
                  </div>
               
            );
          })}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    title: state.title,
    movieDetails: state.movieDetails,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getList: (id) => dispatch(getList(id)),
  getMovieInfoByImdbID: (listMovies) => {
    dispatch(getMovieInfoByImdbID(listMovies));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
