import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AnimeList() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    axios.get('https://kitsu.io/api/edge/anime?sort=popularityRank&limit=10')
      .then(response => {
        setAnimes(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container d-flex">
      <h1>Top 10 Anime del momento</h1>
      <div className="row">
        {animes.map(anime => (
          <div className="col-md-4 mb-3" key={anime.id}>
            <div className="card">
              <img src={anime.attributes.posterImage.medium} className="card-img-top" alt={anime.attributes.canonicalTitle} />
              <div className="card-body">
                <h5 className="card-title">{anime.attributes.canonicalTitle}</h5>
                <p className="card-text">{anime.attributes.synopsis}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default AnimeList;
