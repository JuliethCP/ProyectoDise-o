import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import { Link } from 'react-router-dom';


function AnimeList() {
  const [actionAnimes, setActionAnimes] = useState([]);
  const [romanceAnimes, setRomanceAnimes] = useState([]);
  const [adventureAnimes, setAdventureAnimes] = useState([]);

  useEffect(() => {
    axios.get('https://kitsu.io/api/edge/anime?sort=popularityRank&filter[genres]=action&limit=10')
      .then(response => {
        setActionAnimes(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('https://kitsu.io/api/edge/anime?sort=popularityRank&filter[genres]=romance&limit=10')
      .then(response => {
        setRomanceAnimes(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('https://kitsu.io/api/edge/anime?sort=popularityRank&filter[genres]=adventure&limit=10')
      .then(response => {
        setAdventureAnimes(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container-fluid -content-center align-items-center" style={{ background: '#fff url(https://images2.alphacoders.com/823/823422.png) right bottom/cover no-repeat padding-box fixed' }}> 
      <div className="row">
      <h1>Top 10 Action Animes</h1>
      {actionAnimes.map(anime => (
          <div className="card col-md-3 col-sm-2" style={{background: '#ffffff00', border: '#ffffff00', marginBottom: '15px', marginTop: '15px'}} key={anime.id}>
            <div className="card-group text-center bg-transparent animate__animated animate__fadeInUp" style={{backgroundColor: 'white'}}>
              <img src={anime.attributes.posterImage.small} className="card-img-top" alt={anime.attributes.canonicalTitle} style={{ width: '100%', borderRadius: '20px',backgroundColor: 'transparent'}} />
              <div className="card-body text-dark" style={{backgroundColor: 'white', borderRadius: '20px', marginTop: '15px'}}>
                <h5 className="card-title">{anime.attributes.canonicalTitle}</h5>
                <Link to={`/anime/${encodeURIComponent(anime.attributes.slug)}`}className="btn btn-outline-secondary border-0" style={{width: '100%', borderRadius: '20px'}}>
                  See {anime.attributes.canonicalTitle} Details
                </Link>
              </div>
            </div>
          </div>
        ))}
        

        <h1>Top 10 Romance Animes</h1>
        {romanceAnimes.map(anime => (
          <div className="card col-md-3 col-sm-2" style={{background: '#ffffff00', border: '#ffffff00', marginBottom: '15px', marginTop: '15px'}} key={anime.id}>
            <div className="card-group text-center bg-transparent animate__animated animate__fadeInUp" style={{backgroundColor: 'white'}}>
              <img src={anime.attributes.posterImage.small} className="card-img-top" alt={anime.attributes.canonicalTitle} style={{ width: '100%', borderRadius: '20px',backgroundColor: 'transparent'}} />
              <div className="card-body text-dark" style={{backgroundColor: 'white', borderRadius: '20px', marginTop: '15px'}}>
                <h5 className="card-title">{anime.attributes.canonicalTitle}</h5>
                <Link to={`/anime/${encodeURIComponent(anime.attributes.slug)}`}className="btn btn-outline-secondary border-0" style={{width: '100%', borderRadius: '20px'}}>
                  See {anime.attributes.canonicalTitle} Details
                </Link>
              </div>
            </div>
          </div>
        ))}
        <h1>Top 10 Adventure Animes</h1>
        {adventureAnimes.map(anime => (
          <div className="card col-md-3 col-sm-2" style={{background: '#ffffff00', border: '#ffffff00', marginBottom: '15px', marginTop: '15px'}} key={anime.id}>
            <div className="card-group text-center bg-transparent animate__animated animate__fadeInUp" style={{backgroundColor: 'white'}}>
              <img src={anime.attributes.posterImage.small} className="card-img-top" alt={anime.attributes.canonicalTitle} style={{ width: '100%', borderRadius: '20px',backgroundColor: 'transparent'}} />
              <div className="card-body text-dark" style={{backgroundColor: 'white', borderRadius: '20px', marginTop: '15px'}} >
                <h5 className="card-title">{anime.attributes.canonicalTitle}</h5>
                <Link to={`/anime/${encodeURIComponent(anime.attributes.slug)}`}className="btn btn-outline-secondary border-0" style={{width: '100%', borderRadius: '20px'}}>
                  See {anime.attributes.canonicalTitle} Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnimeList;