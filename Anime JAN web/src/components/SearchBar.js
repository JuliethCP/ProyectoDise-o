import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';
import { Link, useHistory } from 'react-router-dom';

const SearchResults = ({ animes }) => {
  return (
    <div className="container-fluid -content-center align-items-center" style={{ background: '#fff url(https://images2.alphacoders.com/823/823422.png) right bottom/cover no-repeat padding-box fixed' }}> 
      <div className="row" > 
        {animes.map((anime) => (
          <div key={anime.id} className="card col-md-3 col-sm-2" style={{background: '#ffffff00', border: '#ffffff00', marginBottom: '15px', marginTop: '15px'}} >
            <div className="card-group text-center bg-transparent animate__animated animate__fadeInUp" style={{backgroundColor: 'white'}}>
              <img 
                src={anime.attributes.posterImage.medium} 
                alt="card-img-top" 
                style={{ width: '100%', borderRadius: '20px',backgroundColor: 'transparent'}}
              />
              <div className="anime-info " style={{backgroundColor: 'white', borderRadius: '20px', marginTop: '15px'}}>
                <h3>
                  <Link to={`/anime/${encodeURIComponent(anime.attributes.slug)}`} className="btn btn-outline-secondary border-0" style={{width: '100%', borderRadius: '20px',}}>
                  View Details of {anime.attributes.canonicalTitle}
                  </Link>
                </h3>
                <p>Rating: {anime.attributes.averageRating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SearchBar = ({ onSearch  }) => {
  const [query, setQuery] = useState('');
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory(); // get the history object from react-router-dom

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setAnimes([]); // clear previous search results
  
    try {
      const response = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${query}`);
      const data = response.data.data;
      setAnimes(data);
      onSearch(data); // Pass the search results to the parent component
      history.push('/searchresults'); // Change the URL to /searchresults
    } catch (error) {
      console.log(error);
    }
  
    setLoading(false);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-bar">
        <input type="text" placeholder="Search for anime" value={query} onChange={handleChange} />
        <button type="submit">{loading ? <div className="loader"></div> : "Search"}</button>
      </form>
      {animes.length > 0 && <SearchResults animes={animes} />}
    </div>
  );
};

export default SearchBar;