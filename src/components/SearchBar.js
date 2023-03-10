import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = ({ history }) => {
  const [query, setQuery] = useState('');
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${query}`);
      const data = response.data.data;
      setAnimes(data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleClick = (animeId) => {
    history.push(`/anime/${animeId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input type="text" placeholder="Search for anime" value={query} onChange={handleChange} />
      <button type="submit">{loading ? <div className="loader"></div> : "Search"}</button>
      {animes.map((anime) => (
        <div key={anime.id} className="search-results">
          <img src={anime.attributes.posterImage.medium} alt="Anime poster" onClick={() => handleClick(anime.id)} />
          <div className="anime-info">
            <h3 onClick={() => handleClick(anime.id)}>{anime.attributes.titles.en}</h3>
           
            <p><strong>Rating:</strong> {anime.attributes.averageRating}</p>
          </div>
        </div>
      ))}
    </form>
  );
};

/*return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input type="text" placeholder="Search for anime" value={query} onChange={handleChange} />
      <button type="submit">{loading ? <div className="loader"></div> : "Search"}</button>
      <ul className="search-results">
        {animes.map((anime) => (
          <li key={anime.id} className="anime-item">
            <img src={anime.attributes.posterImage.medium} alt="Anime poster" onClick={() => handleClick(anime.id)} />
            <div className="anime-info">
              <h3 onClick={() => handleClick(anime.id)}>{anime.attributes.titles.en}</h3>
              <p>{anime.attributes.synopsis}</p>
              <p><strong>Rating:</strong> {anime.attributes.averageRating}</p>
            </div>
          </li>
        ))}
      </ul>
    </form>
  );
};*/

export default SearchBar;